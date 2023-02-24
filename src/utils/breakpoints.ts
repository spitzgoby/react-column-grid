export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type BreakpointDefinition = {
    size: Breakpoint,
    maxWidth?: string,
    minWidth?: string
}
export type BreakpointsDefinition = BreakpointDefinition[]
export const sizes: Breakpoint[] = ["xs", "sm", "md", "lg", "xl"];
export const DEFAULT_BREAKPOINTS: BreakpointsDefinition = [
    {
        size: "xs",
        maxWidth: "599px",
    },
    {
        size: "sm",
        maxWidth: "899px",
        minWidth: "600px",
    },
    {
        size: "md",
        maxWidth: "1199px",
        minWidth: "900px",
    },
    {
        size: "lg",
        maxWidth: "1535px",
        minWidth: "1200px",
    },
    {
        size: "xl",
        minWidth: "1536px",
    },
];

export type ScreenWidths = number[];
const areValidScreenWidths = (screenWidths: ScreenWidths = []): boolean => 
    screenWidths.length === sizes.length - 1 && 
    screenWidths.reduce((acc, screenWidth, index) => {
        let validScreenWidth = false;
        if (acc) {
            if (index === 0) {
                validScreenWidth = screenWidth > 0; 
            } else {
                let previousScreenWidth = screenWidths[index - 1];

                validScreenWidth = screenWidth > previousScreenWidth;
            }
        }

        return validScreenWidth;
    }, true);

export const generateBreakpointDefinitions = (screenWidths: ScreenWidths): BreakpointsDefinition => {
    let breakpointDefinitions = DEFAULT_BREAKPOINTS;   

    if (areValidScreenWidths(screenWidths)) {
        breakpointDefinitions = sizes.map((size, index) => {
            let breakpointDefinition: BreakpointDefinition = { size };

            if (index > 0) {
                breakpointDefinition.minWidth = `${screenWidths[index - 1]}px`;
            }

            if (index < sizes.length - 1) {
                breakpointDefinition.maxWidth = `${screenWidths[index] - 1}px`;
            }

            return breakpointDefinition;
        });
    }

    return breakpointDefinitions;
}

type ShorthandFunction = (propName: string, prop: any) => boolean
type SizesProp = {
    [key in Breakpoint]?: any
};
export const addMissingSizes = (propName: string, prop: Object = {}, defaultValue: any, shorthand: ShorthandFunction) =>
    sizes.reduce((acc: SizesProp, size: Breakpoint, index: number) => {
        if (!Object.prototype.hasOwnProperty.call(prop, size)) {
            if (index > 0) {
                acc[size] = acc[sizes[index - 1]];
            } else if (shorthand(propName, prop)) {
                acc[size] = prop;
            } else {
                acc[size] = defaultValue;
            }
        } else {
            acc[size] = prop[size as keyof Object];
        }

        return acc;
    }, {});