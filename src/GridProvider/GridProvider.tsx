import GridContext, { DEFAULT_COLUMNS } from "./GridContext";
import { generateGridContainerCss, generateGridBreakpointCss } from "../Grid/Grid.generateCss";
import PropTypes, { ReactNodeLike } from "prop-types";
import React, { useEffect, useState } from "react";
import { DEFAULT_SCREEN_WIDTHS, generateBreakpointDefinitions, ScreenWidths } from "../utils/breakpoints";
import { elementExistsWithId, injectCss, removeCss } from "../utils/manageStyles";
import { generateHiddenBreakpointCss } from "../Hidden/Hidden.generateCss";
import { createRandomId } from "../utils/id";
import { Numeric } from "../utils/numeric";
import { DEFAULT_GAP } from "../utils/gap";

type Props = {
    breakpoints: ScreenWidths,
    children?: ReactNodeLike,
    columns: number,
    gap: Numeric
}

const GridProvider = ({ 
    breakpoints = DEFAULT_SCREEN_WIDTHS, 
    children, 
    columns = DEFAULT_COLUMNS, 
    gap = DEFAULT_GAP 
}: Props) => {
    const [id, setId] = useState(createRandomId());

    useEffect(() => {
        let uniqueId = id;

        while (elementExistsWithId(uniqueId)) {
            uniqueId = createRandomId();
        }

        setId(uniqueId);
    }, [])    

    useEffect(() => {
        const breakpointDefinitions = generateBreakpointDefinitions(breakpoints);
        const gridBreakpointCss = generateGridBreakpointCss(breakpointDefinitions, columns, id).join('');
        const gridContainerCss = generateGridContainerCss(columns, gap, id);
        const hiddenCss = generateHiddenBreakpointCss(breakpointDefinitions, id).join('');
        const css = `${hiddenCss}${gridContainerCss}${gridBreakpointCss}`;

        removeCss(id);
        injectCss(id, css);

        return () => { removeCss(id) };
    }, [breakpoints, columns, id])

    return (
        <GridContext.Provider value={{ breakpoints, columns, gap, id }}>
            {children}
        </GridContext.Provider>
    );
};

GridProvider.propTypes = {
    breakpoints: PropTypes.arrayOf(PropTypes.number),
    children: PropTypes.node,
    columns: PropTypes.number,
    gap: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

export default GridProvider;