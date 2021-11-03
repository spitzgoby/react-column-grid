import { exportAllDeclaration } from '@babel/types';
import { shallow } from 'enzyme';
import Grid from '../Grid';
import React from 'react';

describe('<Grid />', () => {
    it('should create a grid container', () => {
        const grid = shallow(<Grid container />);

        expect(grid).toMatchSnapshot();
    });

    it('should create a grid item', () => {
        const grid = shallow(<Grid item />);

        expect(grid).toMatchSnapshot();
    });

    it('should create a grid item with an offset and width', () => {
        const grid = shallow(<Grid item xs={3} offset={{ xs: 3 }} />);

        expect(grid).toMatchSnapshot();
    });

    it('should create a grid item with multiple offsets and widths', () => {
        const grid = shallow(<Grid item 
            xs={12}
            sm={10}
            md={8}
            lg={6}
            xl={4}
            offset={{ xs: 0, sm: 1, md: 2, lg: 3, xl: 4 }} />);

        expect(grid).toMatchSnapshot();
    });

    it('should not add a class for an offset and width that are too large', () => {
        const grid = shallow(<Grid item xs={12} offset={{ xs: 2 }} />);

        expect(grid.hasClass('swa-react-grid--item_xs_2_12')).toBeFalse;
    });
});