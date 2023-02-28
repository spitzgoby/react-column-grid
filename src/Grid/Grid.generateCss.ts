import { BreakpointsDefinition } from "../utils/breakpoints";
import { generateScreenQueries } from "../utils/mediaQueries";
import { sizes } from "../utils/breakpoints";

const containerDisplay = 'display: grid;';
export const generateGridContainerCss = (columns: number) => {
    const containerTemplateColumns = `grid-template-columns: repeat(${columns}, 1fr);`;

    return `.rcg-c{${containerDisplay}${containerTemplateColumns}}`;
}

export const generateGridBreakpointCss = (breakpoints: BreakpointsDefinition, columns: number) => {
    let columnSpanClassDefinition: string[] = sizes.map((size) => {
        let sizeDefintions: string[] = [`.rcg-${size}_h{display: none;}`];        

        for (let col = 1; col <= columns; col++) {
            for (let width = 1; width <= columns; width++) {
                if (col + width <= columns + 1) {
                    sizeDefintions.push(`.rcg-${size}-${col}-${width}{grid-column:${col}/ span ${width};}`) ;
                } else {
                    width = columns;
                }
            }
        }

        return sizeDefintions.join('');
    });

    return generateScreenQueries(breakpoints, columnSpanClassDefinition);
}