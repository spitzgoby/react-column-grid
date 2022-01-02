import { createScreenMediaQuery, defaultBreakpoints } from "./breakpoints";

const getDisplay = (props, size) => (props.hide?.[size] ? "none" : null);

export default defaultBreakpoints.reduce(
    (styles, breakpoint) => ({
        ...styles,
        [createScreenMediaQuery(breakpoint)]: {
            hidden: {
                display: (props) => getDisplay(props, breakpoint.size),
            },
        },
    }),
    {
        hidden: {},
    }
);
