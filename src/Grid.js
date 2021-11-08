import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import './Grid.scss';

const numCols = 12;
const defaultWidths = { xs: 12 };
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];

const Grid = ({
    children,
    className,
    container,
    item,
    offset = {},
    width = { xs: 12 }
}) => {
    const widths = { ...defaultWidths, ...width };
    
    const areValidColumns = (colWidth, colOffset) =>
        !isNaN(parseInt(colWidth, 10)) &&
        !isNaN(parseInt(colOffset, 10)) &&
        colWidth > 0 && 
        colOffset + colWidth <= numCols;
   
    const calculateColSizes = () => 
        sizes.reduce((acc, size) => {
            const colWidth = widths[size];
            const colOffset = offset[size];
            
            return (areValidColumns(colWidth, colOffset)) 
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