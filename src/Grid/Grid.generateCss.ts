import { BreakpointsDefinition } from "../utils/breakpoints";
import { generateScreenQueries } from "../utils/mediaQueries";
import { 
    generateContainerClassName,
    generateHiddenClassNameForSize, 
    generateColumnSpanClassNameForSize 
} from "./Grid.layout";
import { sizes } from "../utils/breakpoints";

const containerDisplay = 'display: grid;';
export const generateGridContainerCss = (columns: number, id: string) => {
    const containerTemplateColumns = `grid-template-columns: repeat(${columns}, 1fr);`;

    return `.${generateContainerClassName(id)}{${containerDisplay}${containerTemplateColumns}}`;
}

export const generateGridBreakpointCss = (breakpoints: BreakpointsDefinition, columns: number, id: string) => {
    let columnSpanClassDefinition: string[] = sizes.map((size) => {
        let sizeDefintions: string[] = [`.${generateHiddenClassNameForSize(size, id)}{display: none;}`];        

        for (let col = 0; col <= columns; col++) {
            for (let width = 1; width <= columns; width++) {
                if (col + width <= columns) {
                    sizeDefintions.push(
                        `.${generateColumnSpanClassNameForSize(size, col, width, id)}{grid-column:${col + 1}/ span ${width};}`
                    );
                } else {
                    width = columns;
                }
            }
        }

        return sizeDefintions.join('');
    });

    return generateScreenQueries(breakpoints, columnSpanClassDefinition);
}