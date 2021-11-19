import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';

import './Grid.scss';

const defaultWidths = { xs: 12 };
const numCols = 12;
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];


const Grid = ({
    children,
    className,
    container,
    fullRow = false,
    gap = null,
    hidden = {},
    item,
    offset = {},
    width = { xs: 12 }
}) => {
    const adjustedHidden = sizes.reduce((acc, size, index) => {
        if (!hidden.hasOwnProperty(size)) {
            if (index > 0) {
                acc[size] = acc[sizes[index - 1]];
            } else {
                acc[size] = false;
            }
        } else {
            acc[size] = hidden[size];
        }

       return acc;
    }, {});
    const useStyles = createUseStyles(styles);
    const { grid: gridClass } = useStyles({ container, hidden: adjustedHidden });
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
            {
                'swa-react-grid': true,
                'swa-react-grid--container': container,
                'swa-react-grid--item': item,
            }, 
            calculateColSizes(),
            className,
            gridClass
        );
    };

    const calculateGap = () => {
        return 
    }

    const getStyle = () => {
        let style = {};

        if (container && (gap || gap === 0)) {
            style.gap = (!isNaN(gap) && !isNaN(parseFloat(gap)))
                ? gap + 'em' 
                : gap;
        }

        return style;
    }

    const getAdjustedLayoutProps = (size, child, columns) => {
        const { hidden, offset, width } = child.props;
        const sizeHidden = hidden?.[size];
        const sizeOffset = offset?.[size] || 0;
        const sizeWidth = width?.[size];
        const suggestedOffset = columns[size] + sizeOffset;
        let adjustedColumn = columns[size];
        let adjustedOffset = sizeHidden ? 0 : sizeOffset;

        if (areValidColumns(sizeWidth, suggestedOffset) && !sizeHidden) {
            adjustedOffset = suggestedOffset;
            adjustedColumn = (suggestedOffset + sizeWidth) % numCols;
        }

        return {
            adjustedOffset,
            adjustedColumn
        };
    };

    const renderChildren = () => {
        let currentColumns = { xs: 0, sm: 0, md: 0, lg: 0, xl: 0 };
        const childrenToRender = Array.isArray(children) ? children : [children];

        return childrenToRender.map((child, index) => {
            let renderedChild = child;

            if (child?.type?.name === 'Grid' && child?.props?.item) {
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
        <div className={getClass()} style={getStyle()} >{container ? renderChildren() : children}</div>
    );
};

Grid.propTypes = {
    container: PropTypes.bool,
    gap: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    hidden: PropTypes.shape({
        xs: PropTypes.bool,
        sm: PropTypes.bool,
        md: PropTypes.bool,
        lg: PropTypes.bool,
        xl: PropTypes.bool
    }),
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