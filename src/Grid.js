import { addMissingSizes, sizes } from "./breakpoints";
import classNames from "classnames";
import styles from "./Grid.styles";
import PropTypes from "prop-types";
import React from "react";
import { createUseStyles } from "react-jss";

const defaultClear = false;
const defaultColumns = 12;
const defaultHide = false;
const defaultOffset = 0;
const defaultWidth = 12;
const shortHandProps = ["offset", "width"];

const Grid = ({
    children,
    columns,
    className,
    container,
    gap = null,
    hide = {},
    item,
    offset = {},
    width = { xs: 12 },
}) => {
    const isInteger = (value) => !isNaN(parseInt(value, 10));

    const useShorthandSyntax = (propName, prop) =>
        shortHandProps.includes(propName) && isInteger(prop);

    const adjustedColumns = isInteger(columns)
        ? parseInt(columns, 10)
        : defaultColumns;
    const adjustedHide = addMissingSizes(
        "hide",
        hide,
        defaultHide,
        useShorthandSyntax
    );
    const adjustedOffset = addMissingSizes(
        "offset",
        offset,
        defaultOffset,
        useShorthandSyntax
    );
    const adjustedWidth = addMissingSizes(
        "width",
        width,
        defaultWidth,
        useShorthandSyntax
    );
    const useStyles = createUseStyles(styles);
    const {
        container: containerClass,
        grid: gridClass,
        item: itemClass,
    } = useStyles({
        columns: adjustedColumns,
        container,
        gap,
        hide: adjustedHide,
        offset: adjustedOffset,
        width: adjustedWidth,
    });

    const areValidColumns = (colWidth, colOffset) =>
        !isNaN(parseInt(colWidth, 10)) &&
        !isNaN(parseInt(colOffset, 10)) &&
        colWidth > 0 &&
        colOffset + colWidth <= adjustedColumns;

    const getClass = () => {
        return classNames(
            {
                "swa-react-grid": true,
                "swa-react-grid--container": container,
                [containerClass]: container,
                [itemClass]: item,
            },
            gridClass,
            className
        );
    };

    const getAdjustedLayoutProps = (
        size,
        offset,
        width,
        hide,
        clear,
        columns
    ) => {
        const sizeHide = hide?.[size];
        const sizeOffset = parseInt(offset?.[size], 10) || 0;
        const sizeWidth = parseInt(width?.[size], 10);
        const suggestedOffset = columns[size] + sizeOffset;
        let adjustedColumn = columns[size];
        let adjustedOffset = sizeHide ? 0 : sizeOffset;

        if (areValidColumns(sizeWidth, suggestedOffset) && !sizeHide) {
            adjustedOffset = suggestedOffset;
            adjustedColumn = !clear[size] ? suggestedOffset + sizeWidth : 0;
        } else if (areValidColumns(sizeWidth, sizeOffset) && !sizeHide) {
            adjustedOffset = sizeOffset;
            adjustedColumn = !clear[size] ? sizeOffset + sizeWidth : 0;
        }

        return {
            adjustedOffset,
            adjustedColumn,
        };
    };

    const renderChildren = () => {
        let currentColumns = { xs: 0, sm: 0, md: 0, lg: 0, xl: 0 };
        const childrenToRender = Array.isArray(children)
            ? children
            : [children];

        return childrenToRender.map((child, index) => {
            let renderedChild = child;

            if (child?.type?.name === Grid.name && child?.props?.item) {
                const renderedChildOffset = sizes.reduce((acc, size) => {
                    const completedClear = addMissingSizes(
                        "clear",
                        child.props.clear,
                        defaultClear,
                        useShorthandSyntax
                    );
                    const completedHide = addMissingSizes(
                        "hide",
                        child.props.hide,
                        defaultHide,
                        useShorthandSyntax
                    );
                    const completedOffset = addMissingSizes(
                        "offset",
                        child.props.offset,
                        defaultOffset,
                        useShorthandSyntax
                    );
                    const completedWidth = addMissingSizes(
                        "width",
                        child.props.width,
                        defaultWidth,
                        useShorthandSyntax
                    );
                    const { adjustedColumn, adjustedOffset } =
                        getAdjustedLayoutProps(
                            size,
                            completedOffset,
                            completedWidth,
                            completedHide,
                            completedClear,
                            currentColumns
                        );

                    currentColumns[size] = adjustedColumn;
                    acc[size] = adjustedOffset;

                    return acc;
                }, {});
                const renderedChildProps = {
                    ...child.props,
                    key: index,
                    offset: renderedChildOffset,
                };

                renderedChild = <Grid {...renderedChildProps} />;
            }

            return renderedChild;
        });
    };

    return (
        <div className={getClass()}>
            {container ? renderChildren() : children}
        </div>
    );
};

Grid.propTypes = {
    children: PropTypes.node,
    clear: PropTypes.shape({
        xs: PropTypes.bool,
        sm: PropTypes.bool,
        md: PropTypes.bool,
        lg: PropTypes.bool,
        xl: PropTypes.bool,
    }),
    className: PropTypes.string,
    columns: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    container: PropTypes.bool,
    gap: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    hide: PropTypes.shape({
        xs: PropTypes.bool,
        sm: PropTypes.bool,
        md: PropTypes.bool,
        lg: PropTypes.bool,
        xl: PropTypes.bool,
    }),
    item: PropTypes.bool,
    offset: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.shape({
            xs: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            sm: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            md: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            lg: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            xl: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        }),
    ]),
    width: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.shape({
            xs: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            sm: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            md: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            lg: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            xl: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        }),
    ]),
};

export default Grid;
