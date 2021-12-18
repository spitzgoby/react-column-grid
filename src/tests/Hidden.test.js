const mockUseStyles = jest.fn();
jest.mock('react-jss', () => ({ createUseStyles: () => mockUseStyles }));

import Hidden from '../Hidden';
import React from 'react';
import { shallow } from 'enzyme';

describe('<Hidden />', () => {
    it('should use the class provided by its styles', () => {
        mockUseStyles.mockImplementation(() => ({ hidden: 'test-hidden-class'}));

        const hidden = shallow(<Hidden />);

        expect(hidden.hasClass('test-hidden-class')).toBe(true);
    });
});