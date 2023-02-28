import { BreakpointsDefinition } from "./breakpoints"

const MEDIA_QUERY_PREFIX = "@media screen";
export const generateScreenQueries = (breakpointDefinitions: BreakpointsDefinition, classDefinition: string[]): string[] =>
    breakpointDefinitions.map((breakpointDefinition, index) => {
        const { maxWidth, minWidth } = breakpointDefinition;
        let result = MEDIA_QUERY_PREFIX;
        let classAttributes = classDefinition[index]

        if (minWidth) {
            result = result.concat(` and (min-width: ${minWidth})`);
        }

        if (maxWidth) {
            result = result.concat(` and (max-width: ${maxWidth})`);
        }

        return result.concat(`{${classAttributes}}`);
    });
