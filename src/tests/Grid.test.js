const mockUseStyles = jest.fn();
jest.mock('react-jss', () => ({ createUseStyles: () => mockUseStyles }));

import { shallow } from 'enzyme';
import Grid from '../Grid';
import React from 'react';

describe('<Grid />', () => {
    beforeEach(() => {
        mockUseStyles.mockImplementation(() => ({}));
    });

    afterEach(() => {
        mockUseStyles.mockReset();
    });

    describe('when styling component', () => {
        it('should calculate props for all sizes when creating styles', () => {
            const hiddenProp = { xs: true, md: false };
            const offsetProp = { xs: '0', md: '2', lg: '3' };
            const widthProp = { xs: '6', md: '4', lg: '3' };

            shallow(<Grid 
                container 
                gap='2em'
                hidden={hiddenProp} 
                offset={offsetProp}
                width={widthProp}
            />);

            expect(mockUseStyles).toHaveBeenCalledWith({ 
                container: true, 
                gap: '2em',
                hidden: { xs: true, sm: true, md: false, lg: false, xl: false},
                offset: { xs: '0', sm: '0', md: '2', lg: '3', xl: '3' },
                width: { xs: '6', sm: '6', md: '4', lg: '3', xl: '3' }
            });
        });

        it('should use supplied .grid class', () => {
            mockUseStyles.mockImplementation(() => ({ grid: 'test-grid-class' }));

            const grid = shallow(<Grid item hidden={{ xs: true }}></Grid>);

            expect(grid.hasClass('test-grid-class')).toBe(true);
        });

        it('should use supplied .container class if it is a container', () => {
            mockUseStyles.mockImplementation(() => ({ container: 'test-container-class' }));

            const grid = shallow(<Grid container hidden={{ xs: true }}></Grid>);

            expect(grid.hasClass('test-container-class')).toBe(true);
        });

        it('should use supplied .item class if it is an item', () => {
            mockUseStyles.mockImplementation(() => ({ item: 'test-item-class' }));

            const grid = shallow(<Grid item hidden={{ xs: true }}></Grid>);

            expect(grid.hasClass('test-item-class')).toBe(true);
        });
    });

    describe('when the grid is a container', () => {
        it('should create a grid container', () => {
            const grid = shallow(<Grid container />);

            expect(grid).toMatchSnapshot();
        });

        it('should be able to render a single child component', () => {
            const renderGrid = () => {
                shallow(<Grid container item><div></div></Grid>);
            }

            expect(renderGrid).not.toThrow();
        });

        it('should increase the offset of child grid items in each size class', () => {
            const grid = shallow((
                <Grid container>
                    <Grid item width={{xs: 12, md: 3}} offset={{xs: 0, md: 3}} />
                    <Grid item width={{xs: 12, md: 3}} offset={{xs: 0, md: 3}} />
                </Grid>
            ));
            const expectedOffsets = [{
                xs: 0, sm: 0, md: 3, lg: 3, xl: 3
            }, {
                xs: 0, sm: 0, md: 9, lg: 9, xl: 9
            }];

            expect(grid.children().forEach((item, index) => {
                const element = item.getElement();

                Object.keys(element.props.offset).forEach(size => {
                    expect(element.props.offset[size]).toEqual(expectedOffsets[index][size]);
                });
            }));
        });

        it('should move elements onto the next row when the columns exceed row width', () => {
            const grid = shallow((
                <Grid container>
                    <Grid item width={{xs: 6, md: 3}} offset={{xs: 0, md: 3}} />
                    <Grid item width={{xs: 6, md: 3}} offset={{xs: 2, md: 3}} />
                    <Grid item width={{xs: 12, md: 3}} offset={{xs: 0, md: 3}} />
                </Grid>
            ));
            const expectedOffsets = [{
                xs: 0, sm: 0, md: 3, lg: 3, xl: 3
            }, {
                xs: 2, sm: 2, md: 9, lg: 9, xl: 9
            }, {
                xs: 0, sm: 0, md: 3, lg: 3, xl: 3
            }];

            expect(grid.children().forEach((item, index) => {
                const element = item.getElement();

                Object.keys(element.props.offset).forEach(size => {
                    expect(element.props.offset[size]).toEqual(expectedOffsets[index][size]);
                });
            }));
        });
    });
});