import { 
    breakpoints, 
    createScreenMediaQuery 
} from './breakpoints';

const getDisplay = (props, size) => props.hide?.[size] ? 'none' : null;

export default breakpoints.reduce((styles, breakpoint) => ({
    ...styles,
    [createScreenMediaQuery(breakpoint)]: {
        hidden: {
            display: props => getDisplay(props, breakpoint.size)
        }
    }
}), {
    hidden: {}
});