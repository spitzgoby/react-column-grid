# Hidden

## hide
__Type__: 
```Javascript
PropTypes.shape({
    xs: PropTypes.bool,
    sm: PropTypes.bool,
    md: PropTypes.bool,
    lg: PropTypes.bool,
    xl: PropTypes.bool
})
```
__Default__:
```Javascript
{
    xs: false,
    sm: false,
    md: false,
    lg: false,
    xl: false
}
```
__Description__: Determines whether the children will be hidden at a given 
breakpoint. If no value is set for a breakpoint then the value from the 
next smallest breakpoint will be used. 

__Usage__:
```Javascript
// Hides the text when the user's device is xs and shows it for all
// other breakpoints.
<Hidden hide={{ xs: true, sm: false }}>Hide me on xs screens</Hidden>
```