import { breakpoints, createScreenMediaQuery } from "./breakpoints";

const DEFAULT_GAP = "1em";
const DEFAULT_NUM_COLS = 12;

const getGap = ({ gap }) =>
    gap || gap === 0
        ? !isNaN(gap) && !isNaN(parseFloat(gap))
            ? gap + "em"
            : gap
        : DEFAULT_GAP;

const getGridTemplateColumns = ({ columns }) =>
    `repeat(${columns ? columns : DEFAULT_NUM_COLS}, 1fr)`;

const getDisplay = (props, size) =>
    props.hide?.[size] ? "none" : props.container ? "grid" : null;

const getGridColumn = ({ width, offset }, size) => {
    const parsedOffset = parseInt(offset[size], 10) + 1;
    const parsedWidth = parseInt(width[size], 10);

    return parsedOffset && parsedWidth
        ? `${parsedOffset} / span ${parsedWidth}`
        : null;
};

export default breakpoints.reduce(
    (styles, breakpoint) => ({
        ...styles,
        [createScreenMediaQuery(breakpoint)]: {
            container: {
                gap: getGap,
            },
            grid: {
                display: (props) => getDisplay(props, breakpoint.size),
            },
            item: {
                gridColumn: (props) => getGridColumn(props, breakpoint.size),
            },
        },
    }),
    {
        container: {
            gap: getGap,
            gridTemplateColumns: getGridTemplateColumns,
        },
        grid: {},
        item: {},
    }
);
