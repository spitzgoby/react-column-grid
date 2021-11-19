export const breakpoints = [{
    size: 'xs',
    maxWidth: '599px',
}, {
    size: 'sm',
    maxWidth: '899px',
    minWidth: '600px'
}, {
    size: 'md',
    maxWidth: '1199px',
    minWidth: '900px'
}, {
    size: 'lg',
    maxWidth: '1535px',
    minWidth: '1200px'
}, {
    size: 'xl',
    minWidth: '1536px'
}];

const getDisplay = (props, size) =>
    props.hidden?.[size]
        ? 'none'
        : props.container ? 'grid': 'block';

const createScreenMediaQuery = (breakpoint, attr) => 
    '@media screen' +
        `${breakpoint.minWidth ? ` and (min-width: ${breakpoint.minWidth})` : ''}` +
        `${breakpoint.maxWidth ? ` and (max-width: ${breakpoint.maxWidth})` : ''}`

const createHiddenStyles = () =>
    breakpoints.reduce((hiddenStyles, breakpoint) => {
        hiddenStyles[createScreenMediaQuery(breakpoint, 'max-width')] = {
            grid: { display: props => getDisplay(props, breakpoint.size) }
        }
        
        return hiddenStyles;
    }, {});

export default {
    grid: {
        display: props => getDisplay(props, 'xl')
    },
    ...createHiddenStyles()
};