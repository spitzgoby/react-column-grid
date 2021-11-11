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
    fullRow = false,
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

    const getAdjustedLayoutProps = (size, child, columns) => {
        let adjustedColumn;
        let adjustedOffset;
        const { width, offset } = child.props;
        const sizeOffset = offset?.[size] || 0;
        const sizeWidth = width?.[size];
        const suggestedOffset = columns[size] + sizeOffset;

        if (areValidColumns(suggestedOffset, sizeWidth)) {
            adjustedOffset = suggestedOffset;
            adjustedColumn = (suggestedOffset + sizeWidth) % numCols;
        } else {
            adjustedOffset = sizeOffset;
            adjustedColumn = columns[size];
        }

        return {
            adjustedOffset,
            adjustedColumn
        };
    };

    const renderChildren = () => {
        let currentColumns = { xs: 0, sm: 0, md: 0, lg: 0, xl: 0 };

        return children?.map((child, index) => {
            let renderedChild = child;

            if (child.type.name === 'Grid' && child.props.item) {
                const renderedChildOffset = sizes.reduce((acc, size) => {
                    const { 
                        adjustedColumn, 
                        adjustedOffset 
                    } = getAdjustedLayoutProps(size, child, currentColumns); 

                    currentColumns[size] = adjustedColumn;
                    acc[size] = adjustedOffset;

                    return acc;
                }, {});
                const renderedChildProps = {
                    ...child.props,
                    key: index,
                    offset: renderedChildOffset
                };
                
                renderedChild = <Grid { ...renderedChildProps } />;
            }

            return renderedChild;
        });
    };

    return (
        <div className={getClass()}>{container ? renderChildren() : children}</div>
    );
};

Grid.propTypes = {
    container: PropTypes.bool,
    fullRow: PropTypes.bool,
    item: PropTypes.bool,
    offset: PropTypes.shape({
        xs: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        sm: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        md: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        lg: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        xl: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    }),
    width: PropTypes.shape({
        xs: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        sm: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        md: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        lg: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        xl: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    })
};

export default Grid;