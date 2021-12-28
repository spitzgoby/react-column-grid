export const breakpoints = [
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
export const sizes = breakpoints.map((breakpoint) => breakpoint.size);

export const addMissingSizes = (propName, prop = {}, defaultValue, shorthand) =>
    sizes.reduce((acc, size, index) => {
        if (!Object.prototype.hasOwnProperty.call(prop, size)) {
            if (index > 0) {
                acc[size] = acc[sizes[index - 1]];
            } else if (shorthand(propName, prop)) {
                acc[size] = prop;
            } else {
                acc[size] = defaultValue;
            }
        } else {
            acc[size] = prop[size];
        }

        return acc;
    }, {});

export const createScreenMediaQuery = (breakpoint) =>
    "@media screen" +
    `${breakpoint.minWidth ? ` and (min-width: ${breakpoint.minWidth})` : ""}` +
    `${breakpoint.maxWidth ? ` and (max-width: ${breakpoint.maxWidth})` : ""}`;
