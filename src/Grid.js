import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import './Grid.scss';

const numCols = 12;
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];

const Grid = ({
    children,
    className,
    container,
    offset = {},
    item,
    ...props
}) => {
    const calculateColSizes = () => 
        sizes.reduce((acc, size) => {
            const colWidth = props[size];
            const colOffset = offset[size];
            
            return (colWidth > 0 && colOffset + colWidth <= numCols) 
                ? acc.concat([`swa-react-grid--item_${size}_${colOffset}_${colWidth}`]) 
                : acc;
        }, []);
    

    const getClass = () => {
        return classNames(
            className, 
            {
                'swa-react-grid': true,
                'swa-react-grid--container': container,
                'swa-react-grid--item': item,
            }, 
            calculateColSizes()
        );
    };

    return (
        <div className={getClass()}>{children}</div>
    );
};

Grid.propTypes = {
    container: PropTypes.bool,
    item: PropTypes.bool
};

export default Grid;