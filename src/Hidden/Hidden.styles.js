import { createScreenMediaQuery } from "../utils/breakpoints";

const getDisplay = (props, size) => (props.hide?.[size] ? "none" : null);

export default (breakpoints) =>
    breakpoints.reduce(
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
