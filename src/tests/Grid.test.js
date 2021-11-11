import { exportAllDeclaration } from '@babel/types';
import { mount, shallow } from 'enzyme';
import Grid from '../Grid';
import React from 'react';
import { logValidationWarning } from 'jest-validate';

describe('<Grid />', () => {
    describe('when the grid is a container', () => {
        it('should create a grid container', () => {
            const grid = shallow(<Grid container />);

            expect(grid).toMatchSnapshot();
        });

        it('should increase the offset of child grid items in each size class', () => {
            const grid = shallow((
                <Grid container>
                    <Grid item width={{xs: 12, md: 3}} offset={{xs: 0, md: 3}} />
                    <Grid item width={{xs: 12, md: 3}} offset={{xs: 0, md: 3}} />
                </Grid>
            ));
            const expectedOffsets = [{
                xs: 0, sm: 0, md: 3, lg: 0, xl: 0
            }, {
                xs: 0, sm: 0, md: 9, lg: 0, xl: 0
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
                xs: 0, sm: 0, md: 3, lg: 0, xl: 0
            }, {
                xs: 2, sm: 0, md: 9, lg: 0, xl: 0
            }, {
                xs: 0, sm: 0, md: 3, lg: 0, xl: 0
            }];

            expect(grid.children().forEach((item, index) => {
                const element = item.getElement();

                Object.keys(element.props.offset).forEach(size => {
                    expect(element.props.offset[size]).toEqual(expectedOffsets[index][size]);
                });
            }));
        });
    });

    describe('when applying grid gap', () => {
        it('should apply the gap as em if it is a numeric value', () => {
            const grid = shallow(<Grid container gap={1.5} />);

            expect(grid.props().style.gap).toEqual('1.5em');
        });

        it('should apply the gap provided', () => {
            const grid = shallow(<Grid container gap='24px' />);

            expect(grid.props().style.gap).toEqual('24px');
        });

        it('should leave the gap empty if none was specified', () => {
            const grid = shallow(<Grid container />);

            expect(grid.props().style.gap).toBeUndefined;
        });

        it('should ignore the gap value if the grid component is not a container', () => {
            const grid = shallow(<Grid item />);

            expect(grid.props().style.gap).toBeUndefined;
        });
    });

    describe('when the grid is an item', () => {
        it('should create a grid item', () => {
            const grid = shallow(<Grid item />);

            expect(grid).toMatchSnapshot();
        });

        it('should create a grid item with an offset and width', () => {
            const grid = shallow(<Grid item width={{ xs: 3 }} offset={{ xs: 3 }} />);

            expect(grid).toMatchSnapshot();
        });

        it('should create a grid item with multiple offsets and widths', () => {
            const grid = shallow(<Grid item 
                width={{ xs: 12, sm: 10, md: 8, lg: 6, xl: 4 }}
                offset={{ xs: 0, sm: 1, md: 2, lg: 3, xl: 4 }} 
            />);

            expect(grid).toMatchSnapshot();
        });

        it('should not add a class for an offset and width that are too large', () => {
            const grid = shallow(<Grid item width={{ xs: 12 }} offset={{ xs: 2 }} />);

            expect(grid.hasClass('swa-react-grid--item_xs_2_12')).toBeFalse;
        });

        it('should not add a class for a non-numeric width', () => {
            const grid = shallow(<Grid item width={{ xs: 'twelve' }} />);

            expect(grid).toMatchSnapshot();
        });

        it('should not add a class for a non-numeric offset', () => {
            const grid = shallow(<Grid item width={{ xs: '10' }} offset={{ xs: 'two' }} />);

            expect(grid).toMatchSnapshot();
        });
    });
});