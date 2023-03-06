import GridContext, { DEFAULT_COLUMNS, INITIAL_ID } from "./GridContext";
import { generateGridContainerCss, generateGridBreakpointCss } from "../Grid/Grid.generateCss";
import PropTypes, { ReactNodeLike } from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import { generateBreakpointDefinitions, ScreenWidths } from "../utils/breakpoints";
import { elementExistsWithId, injectCss, removeCss } from "../utils/manageStyles";
import { generateHiddenBreakpointCss } from "../Hidden/Hidden.generateCss";
import { createRandomId } from "../utils/id";

type Props = {
    breakpoints: ScreenWidths,
    children?: ReactNodeLike,
    columns: number
}

const GridProvider = ({ breakpoints, children, columns = DEFAULT_COLUMNS }: Props) => {
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
        const gridContainerCss = generateGridContainerCss(columns, id);
        const hiddenCss = generateHiddenBreakpointCss(breakpointDefinitions, id).join('');
        const css = `${hiddenCss}${gridContainerCss}${gridBreakpointCss}`;

        removeCss(id);
        injectCss(id, css);

        return () => { removeCss(id) };
    }, [breakpoints, columns, id])

    return (
        <GridContext.Provider value={{ breakpoints, columns, id }}>
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