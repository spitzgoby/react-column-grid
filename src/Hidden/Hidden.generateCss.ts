import { BreakpointsDefinition } from "../utils/breakpoints";
import { sizes } from "../utils/breakpoints";
import { generateScreenQueries } from "../utils/mediaQueries";

export const generateClassNameForSize = (size: string, id: string) => `${id}-h-${size}`;

export const generateHiddenBreakpointCss = (breakpoints: BreakpointsDefinition, id: string) => {
    const sizeDefinitions = sizes.map((size) => `.${generateClassNameForSize(size, id)}{display: none;}`);

    return generateScreenQueries(breakpoints, sizeDefinitions)
}