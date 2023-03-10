import { 
    getValueOfNumeric, 
    Numeric, 
    numericIsInteger 
} from '../utils/numeric';
import classNames from "classnames";
import {
    BooleanBreakpointValues,
    generateContainerClassName,
    generateSizeClassNames,
    getAdjustedLayoutProps,
    NumericBreakpointValues
} from "./Grid.layout";
import PropTypes, { ReactNodeLike } from "prop-types";
import React, { useContext } from "react";
import { GridProvider, GridContext } from '../GridProvider';
import { addMissingSizes, DEFAULT_SCREEN_WIDTHS, ScreenWidths, sizes } from "../utils/breakpoints";

import { DEFAULT_GAP } from "../utils/gap";
import { DEFAULT_COLUMNS, INITIAL_ID } from '../GridProvider/GridContext';

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
    breakpoints?: ScreenWidths,
    children: ReactNodeLike,
    className?: string,
    clear?: boolean | BooleanBreakpointValues,
    columns?: number,
    container?: boolean,
    gap?: Numeric,
    hide?: BooleanBreakpointValues,
    item?: boolean,
    offset?: NumericBreakpointValues | Numeric,
    width?: NumericBreakpointValues | Numeric,
}

const Grid: React.FC<Props> = (props) => {
    const {
        breakpoints: propBreakpoints,
        children,
        className,
        columns: propColumns,
        container,
        gap: propGap,
        hide = {},
        item,
        offset = {},
        width = { xs: 12 },
    } = props;
    const { 
        breakpoints: contextBreakpoints, 
        columns: contextColumns, 
        gap: contextGap,
        id 
    } = useContext(GridContext);
    const breakpoints = propBreakpoints || contextBreakpoints || DEFAULT_SCREEN_WIDTHS;
    const columns = propColumns || contextColumns || DEFAULT_COLUMNS;
    const gap = propGap || contextGap || DEFAULT_GAP;    

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

    const hasPropsThatOverrideContext = () => 
        breakpoints !== contextBreakpoints
        || columns !== contextColumns
        || gap !== contextGap;
    const shouldRenderWithProvider = () => container && (id === INITIAL_ID || hasPropsThatOverrideContext());

    // Generate classes based on width, offset and sizes
    const sizeClassNames = generateSizeClassNames({
        hide: adjustedHide,
        item,
        offset: adjustedOffset,
        width: adjustedWidth,
    }, id);

    const getClass = () =>
        classNames({ [generateContainerClassName(id)]: container }, sizeClassNames, className);

    const renderChildren = () => {
        let currentColumns = { xs: 0, sm: 0, md: 0, lg: 0, xl: 0 };
        const childrenToRender = Array.isArray(children)
            ? children
            : [children];

        return childrenToRender.map((child, index) => {
            let renderedChild = child;

            if (child?.type?.name === Grid.name) {
                let renderedChildProps = { 
                    ...child.props,
                    key: index
                };

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
                                currentColumns,
                                columns
                            );

                        currentColumns[size] = getValueOfNumeric(adjustedColumn);
                        acc[size] = getValueOfNumeric(adjustedOffset);

                        return acc;
                    }, {});

                    renderedChildProps = {
                        ...renderedChildProps,
                        offset: renderedChildOffset,
                    };
                } 

                renderedChild = <Grid {...renderedChildProps} />;
            }

            return renderedChild;
        });
    };

    const renderWithoutGridProvider = () => (
        <div className={getClass()}>
            <>{container ? renderChildren() : children}</>
        </div>
    );

    const renderWithGridProvider = () => (
        <GridProvider breakpoints={breakpoints} columns={columns} gap={gap}>
            <Grid {...props} />
        </GridProvider>
    )

    return (
        shouldRenderWithProvider() ? renderWithGridProvider() : renderWithoutGridProvider()
    );
};

Grid.propTypes = {
    breakpoints: PropTypes.arrayOf(PropTypes.number),
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
    columns: PropTypes.number,
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
