import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';

import './Grid.scss';

const defaultClear = false;
const defaultHidden = false;
const defaultOffset = 0;
const defaultWidth = 12;
const numCols = 12;
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];


const Grid = ({
    children,
    columns,
    className,
    container,
    gap = null,
    hidden = {},
    item,
    offset = {},
    width = { xs: 12 }
}) => {
    const addMissingSizesForProp = (prop = {}, defaultValue) => 
        sizes.reduce((acc, size, index) => {
        if (!prop.hasOwnProperty(size)) {
            if (index > 0) {
                acc[size] = acc[sizes[index - 1]];
            } else {
                acc[size] = defaultValue;
            }
        } else {
            acc[size] = prop[size];
        }

        return acc;
        }, {});

    const adjustedHidden = addMissingSizesForProp(hidden, defaultHidden);
    const adjustedOffset = addMissingSizesForProp(offset, defaultOffset);
    const adjustedWidth = addMissingSizesForProp(width, defaultWidth);
    const useStyles = createUseStyles(styles);
    const { 
        container: containerClass,
        grid: gridClass,
        item: itemClass
    } = useStyles({ 
        columns,
        container, 
        gap,
        hidden: adjustedHidden,
        offset: adjustedOffset,
        width: adjustedWidth
    });
    
    const areValidColumns = (colWidth, colOffset) =>
        !isNaN(parseInt(colWidth, 10)) &&
        !isNaN(parseInt(colOffset, 10)) &&
        colWidth > 0 && 
        colOffset + colWidth <= numCols;
   
    const getClass = () => {
        return classNames(
            {
                'swa-react-grid': true,
                'swa-react-grid--container': container,
                [containerClass]: container,
                [itemClass]: item
            }, 
            gridClass,
            className
        );
    };

    const getAdjustedLayoutProps = (size, offset, width, hidden, clear, columns) => {
        const sizeHidden = hidden?.[size];
        const sizeOffset = offset?.[size] || 0;
        const sizeWidth = width?.[size];
        const suggestedOffset = columns[size] + sizeOffset;
        let adjustedColumn = columns[size];
        let adjustedOffset = sizeHidden ? 0 : sizeOffset;

        if (areValidColumns(sizeWidth, suggestedOffset) && !sizeHidden) {
            adjustedOffset = suggestedOffset;
            adjustedColumn = !clear[size] 
                ? suggestedOffset + sizeWidth
                : 0;
        } else if (areValidColumns(sizeWidth, sizeOffset) && !sizeHidden) {
            adjustedOffset = sizeOffset;
            adjustedColumn =  !clear[size]
                ? sizeOffset + sizeWidth
                : 0;
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
                    const completedClear = addMissingSizesForProp(child.props.clear, defaultClear);
                    const completedHidden = addMissingSizesForProp(child.props.hidden, defaultHidden);
                    const completedOffset = addMissingSizesForProp(child.props.offset, defaultOffset);
                    const completedWidth = addMissingSizesForProp(child.props.width, defaultWidth);
                    const { 
                        adjustedColumn, 
                        adjustedOffset 
                    } = getAdjustedLayoutProps(
                        size, 
                        completedOffset, 
                        completedWidth,
                        completedHidden, 
                        completedClear,
                        currentColumns,
                    ); 

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
    clear: PropTypes.shape({
        xs: PropTypes.bool,
        sm: PropTypes.bool,
        md: PropTypes.bool,
        lg: PropTypes.bool,
        xl: PropTypes.bool
    }),
    columns: PropTypes.number,
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