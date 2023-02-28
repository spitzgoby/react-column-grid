import GridContext, { DEFAULT_COLUMNS } from "./GridContext";
import { generateGridContainerCss, generateGridBreakpointCss } from "../Grid/Grid.generateCss";
import PropTypes, { ReactNodeLike } from "prop-types";
import React, { useContext, useEffect } from "react";
import { generateBreakpointDefinitions, ScreenWidths } from "../utils/breakpoints";
import { injectCss, removeCss } from "../utils/manageStyles";
import { generateHiddenBreakpointCss } from "../Hidden/Hidden.generateCss";

type Props = {
    breakpoints: ScreenWidths,
    children?: ReactNodeLike,
    columns: number
}

const GridProvider = ({ breakpoints, children, columns = DEFAULT_COLUMNS }: Props) => {
    const { depth: providedDepth } = useContext(GridContext);    
    const depth = providedDepth + 1;

    useEffect(() => {
        const id = `rcg-styles-${depth}`;
        const breakpointDefinitions = generateBreakpointDefinitions(breakpoints);
        const gridBreakpointCss = generateGridBreakpointCss(breakpointDefinitions, columns).join('');
        const gridContainerCss = generateGridContainerCss(columns);
        const hiddenCss = generateHiddenBreakpointCss(breakpointDefinitions).join('');
        const css = `${hiddenCss}${gridContainerCss}${gridBreakpointCss}`;

        injectCss(id, css);

        return () => { removeCss(id) };
    }, [])    

    return (
        <GridContext.Provider value={{ breakpoints, columns, depth }}>
            {children}
        </GridContext.Provider>
    );
};

GridProvider.propTypes = {
    breakpoints: PropTypes.arrayOf(PropTypes.number),
    children: PropTypes.node,
    columns: PropTypes.number
}

export default GridProvider;