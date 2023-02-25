import { addMissingSizes, sizes } from "../utils/breakpoints";
import { 
    getValueOfNumeric, 
    Numeric, 
    numericIsInteger 
} from '../utils/numeric';
import classNames from "classnames";
import {
    BooleanBreakpointValues,
    generateSizeClassNames,
    getAdjustedLayoutProps,
    getGap,
    NumericBreakpointValues
} from "./Grid.layout";
import PropTypes, { ReactNodeLike } from "prop-types";
import React from "react";

import "./Grid.scss";
import { DEFAULT_GAP } from "../constants/gap";

const defaultClear = false;
const defaultHide = false;
const defaultOffset = 0;
const defaultWidth = 12;
const booleanShortHandProps = ["clear"];
const numericShortHandProps = ["offset", "width"];

const useShorthandSyntax = (propName: string, prop: Numeric | boolean): boolean => {
    let result = false;    

    if (typeof prop === 'boolean') { 
        result = booleanShortHandProps.includes(propName);
    } else if (numericShortHandProps.includes(propName)) {
        result = numericIsInteger(prop);
    }

    return result;
}

type Props = {
    children: ReactNodeLike,
    className?: string,
    clear?: boolean | BooleanBreakpointValues,
    container?: boolean,
    gap?: Numeric,
    hide?: BooleanBreakpointValues,
    inheritedGap?: Numeric,
    item?: boolean,
    offset?: NumericBreakpointValues | Numeric,
    width?: NumericBreakpointValues | Numeric,
}

const Grid: React.FC<Props> = ({
    children,
    className,
    container,
    gap: propGap,
    hide = {},
    inheritedGap,
    item,
    offset = {},
    width = { xs: 12 },
}) => {
    const gap = propGap || inheritedGap || DEFAULT_GAP;    

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

    const getClass = () =>
        classNames({ "rcg-c": container }, sizeClassNames, className);

    const getStyle = () => ({
        gap: container && getGap(gap),
    });

    const renderChildren = () => {
        let currentColumns = { xs: 0, sm: 0, md: 0, lg: 0, xl: 0 };
        const childrenToRender = Array.isArray(children)
            ? children
            : [children];

        return childrenToRender.map((child, index) => {
            let renderedChild = child;
            let renderedChildProps;

            if (child?.type?.name === Grid.name) {
                if (child?.props?.item) {
                    const renderedChildOffset = sizes.reduce((acc: NumericBreakpointValues, size) => {
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

                        currentColumns[size] = getValueOfNumeric(adjustedColumn);
                        acc[size] = getValueOfNumeric(adjustedOffset);

                        return acc;
                    }, {});

                    renderedChildProps = {
                        ...child.props,
                        key: index,
                        offset: renderedChildOffset,
                    };
                } else if (child?.props?.container) {
                    renderedChildProps = {
                        ...child.props,
                        key: index,
                        inheritedGap: gap
                    };
                }

                renderedChild = <Grid {...renderedChildProps} />;
            }

            return renderedChild;
        });
    };

    return (
        <div className={getClass()} style={getStyle()}>
            <>{container ? renderChildren() : children}</>
        </div>
    );
};

Grid.propTypes = {
    children: PropTypes.node,
    clear: PropTypes.oneOfType([
        PropTypes.bool, 
        PropTypes.shape({
            xs: PropTypes.bool,
            sm: PropTypes.bool,
            md: PropTypes.bool,
            lg: PropTypes.bool,
            xl: PropTypes.bool,
        })
    ]),
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
