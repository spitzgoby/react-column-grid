import {
    addMissingSizes,
    areBreakpointsEquivalent,
    areValidWidths,
    createBreakpoints,
    sizes,
} from "./breakpoints";
import classNames from "classnames";
import { getAdjustedLayoutProps } from "./Grid.layout";
import styles from "./Grid.styles";
import PropTypes from "prop-types";
import React from "react";
import { createUseStyles } from "react-jss";
import ThemeContext from "./ThemeContext";

const defaultClear = false;
const defaultColumns = 12;
const defaultHide = false;
const defaultOffset = 0;
const defaultWidth = 12;
const shortHandProps = ["offset", "width"];

const isInteger = (value) => !isNaN(parseInt(value, 10));
const useShorthandSyntax = (propName, prop) =>
    shortHandProps.includes(propName) && isInteger(prop);

const Grid = ({
    breakpoints: propBreakpoints,
    children,
    columns,
    className,
    container,
    gap: propGap = null,
    hide = {},
    item,
    offset = {},
    width = { xs: 12 },
}) => {
    // Determine breakpoints and update state
    // State is used to ensure that the context provider does not trigger
    // unnecessary renders
    const { breakpoints, gap } = React.useContext(ThemeContext);
    const shouldUsePropBreakpoints =
        container && propBreakpoints && areValidWidths(propBreakpoints);
    const calculatedBreakpoints = shouldUsePropBreakpoints
        ? createBreakpoints(propBreakpoints)
        : breakpoints;
    const [adjustedBreakpoints, setAdjustedBreakpoints] = React.useState(
        calculatedBreakpoints
    );

    if (
        shouldUsePropBreakpoints &&
        !areBreakpointsEquivalent(calculatedBreakpoints, adjustedBreakpoints)
    ) {
        setAdjustedBreakpoints(calculatedBreakpoints);
    }

    const shouldUsePropGap = container && propGap;
    const calculatedGap = shouldUsePropGap ? propGap : gap;
    const [adjustedGap, setAdjustedGap] = React.useState(calculatedGap);

    if (shouldUsePropGap && adjustedGap !== propGap) {
        setAdjustedGap(calculatedGap);
    }

    // Fill out incomplete layout props
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
    const useStyles = createUseStyles(styles(adjustedBreakpoints));
    const {
        container: containerClass,
        grid: gridClass,
        item: itemClass,
    } = useStyles({
        columns: adjustedColumns,
        container,
        gap: adjustedGap,
        hide: adjustedHide,
        offset: adjustedOffset,
        width: adjustedWidth,
    });

    const getThemeValues = () => ({
        breakpoints: adjustedBreakpoints,
        gap: adjustedGap,
    });

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
                            currentColumns,
                            adjustedColumns
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

    const renderWithThemeProvider = () => (
        <ThemeContext.Provider value={getThemeValues()}>
            {renderGrid()}
        </ThemeContext.Provider>
    );

    const renderGrid = () => (
        <div className={getClass()}>
            {container ? renderChildren() : children}
        </div>
    );

    return shouldUsePropBreakpoints || shouldUsePropGap
        ? renderWithThemeProvider()
        : renderGrid();
};

Grid.propTypes = {
    breakpoints: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    ),
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
