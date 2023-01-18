import { addMissingSizes, sizes } from "../utils/breakpoints";
import classNames from "classnames";
import {
    generateSizeClassNames,
    getAdjustedLayoutProps,
    getGap,
} from "./Grid.layout";
import PropTypes from "prop-types";
import React from "react";
import ThemeContext from "../ThemeContext";

import "./Grid.scss";

const defaultClear = false;
const defaultHide = false;
const defaultOffset = 0;
const defaultWidth = 12;
const shortHandProps = ["offset", "width"];

const isInteger = (value) => !isNaN(parseInt(value, 10));
const useShorthandSyntax = (propName, prop) =>
    shortHandProps.includes(propName) && isInteger(prop);

const Grid = ({
    children,
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
    const { gap } = React.useContext(ThemeContext);

    const shouldUsePropGap = container && propGap;
    const calculatedGap = shouldUsePropGap ? propGap : gap;
    const [adjustedGap, setAdjustedGap] = React.useState(calculatedGap);

    if (shouldUsePropGap && adjustedGap !== propGap) {
        setAdjustedGap(calculatedGap);
    }

    // Fill out incomplete layout props
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

    // Generate classes based on width, offset and sizes
    const sizeClassNames = generateSizeClassNames({
        hide: adjustedHide,
        item,
        offset: adjustedOffset,
        width: adjustedWidth,
    });

    const getThemeValues = () => ({ gap: adjustedGap });

    const getClass = () =>
        classNames({ "rcg-c": container }, sizeClassNames, className);

    const getStyle = () => ({
        gap: container && adjustedGap && getGap(adjustedGap),
    });

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

    const renderWithThemeProvider = () => (
        <ThemeContext.Provider value={getThemeValues()}>
            {renderGrid()}
        </ThemeContext.Provider>
    );

    const renderGrid = () => (
        <div className={getClass()} style={getStyle()}>
            {container ? renderChildren() : children}
        </div>
    );

    return shouldUsePropGap ? renderWithThemeProvider() : renderGrid();
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
