import { BreakpointsDefinition } from "../utils/breakpoints";
import { sizes } from "../utils/breakpoints";
import { generateScreenQueries } from "../utils/mediaQueries";

export const generateHiddenBreakpointCss = (breakpoints: BreakpointsDefinition) => {
    const sizeDefinitions = sizes.map((size) => `.rcg-h-${size}{display: none;}`);

    return generateScreenQueries(breakpoints, sizeDefinitions)
}