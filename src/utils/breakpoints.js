export const sizes = ["xs", "sm", "md", "lg", "xl"];
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

export const areValidWidths = (widths = []) => {
    return (
        widths.length === 4 &&
        widths.reduce((valid, width, index) => {
            const parsedWidth = parseFloat(width);

            return (
                valid &&
                parsedWidth > 0 &&
                (index === 0 || parsedWidth > parseFloat(widths[index - 1]))
            );
        })
    );
};

export const createBreakpoints = (widths) => {
    return areValidWidths(widths)
        ? sizes.map((size, index) => {
              let newBreakpoint = { size };

              if (index > 0) {
                  newBreakpoint.minWidth = parseFloat(widths[index - 1]) + "px";
              }

              if (index < widths.length) {
                  newBreakpoint.maxWidth = parseFloat(widths[index]) - 1 + "px";
              }

              return newBreakpoint;
          })
        : DEFAULT_BREAKPOINTS;
};

export const areBreakpointsEquivalent = (
    breakpoints1 = [],
    breakpoints2 = []
) => {
    return (
        breakpoints1?.length === breakpoints2?.length &&
        breakpoints1.reduce((currentlyEquivalent, breakpoint1, index) => {
            let equivalent = false;

            if (currentlyEquivalent) {
                const breakpoint2 = breakpoints2[index];

                equivalent =
                    breakpoint1.size === breakpoint2.size &&
                    breakpoint1.minWidth === breakpoint2.minWidth &&
                    breakpoint1.maxWidth === breakpoint2.maxWidth;
            }

            return equivalent;
        }, true)
    );
};

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
