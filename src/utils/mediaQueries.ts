import { BreakpointsDefinition } from "./breakpoints"

const MEDIA_QUERY_PREFIX = "@media screen";
export const generateScreenQueries = (breakpointDefinitions: BreakpointsDefinition, classDefinition: string[]): string[] =>
    breakpointDefinitions.map((breakpointDefinition, index) => {
        let result = MEDIA_QUERY_PREFIX;
        const { maxWidth, minWidth } = breakpointDefinition;

        if (minWidth) {
            result = result.concat(` and (min-width: ${minWidth})`);
        }

        if (maxWidth) {
            result = result.concat(` and (max-width: ${maxWidth})`);
        }

        return result.concat(`{${classDefinition[index]}}`);
    });
