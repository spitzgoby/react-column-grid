export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export const sizes: Breakpoint[] = ["xs", "sm", "md", "lg", "xl"];
export const DEFAULT_BREAKPOINTS = [
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