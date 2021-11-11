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

    const renderChildren = () => {
        let currentColumn = {
            xs: 0,
            sm: 0,
            md: 0,
            lg: 0,
            xl: 0
        };

        return children?.map((child, index) => {
            const {
                item,
                offset,
                width
            } = child.props;
            let renderedChild = child;

            if (child.type.name === 'Grid' && item) {
                const renderedChildOffset = sizes.reduce((acc, size) => {
                    const sizeOffset = offset?.[size] || 0;
                    const sizeWidth = width?.[size];
                    const adjustedOffset = currentColumn[size] + sizeOffset;

                    if (areValidColumns(adjustedOffset, sizeWidth)) {
                        acc[size] = adjustedOffset;
                        currentColumn[size] = (adjustedOffset + sizeWidth) % numCols;
                    } else {
                        acc[size] = sizeOffset;
                    }

                    return acc;
                }, {});
                const renderedChildProps = {
                    ...child.props,
                    key: index,
                    offset: renderedChildOffset
                }
                
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