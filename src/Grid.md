# Grid

## container
__Type__: `PropTypes.bool`  
__Default__: `false`  
__Description__: Determines whether the grid component is a container. All grids 
should have a container element at the root. The container element will have its
`display` attribute set to `grid`.

__Usage__
```Javascript
<Grid container></Grid>
```

--- 

## item
__Type__: `PropTypes.bool`  
__Default__: `true`  
__Description__: Determines whether the grid component is an item within a container.
An item will have `grid-column` properties assigned based on the width and offset
prop values.   
__Usage__
```Javascript
<Grid item />
```

--- 

## width
__Type__: 
```Javascript
PropTypes.shape({
    xs: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
    sm: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
    md: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
    lg: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
    xl: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
})
```
__Default__: 
```Javascript
{
    xs: 12,
    sm: 0,
    md: 0,
    lg: 0,
    xl: 0
}
```
__Description__: Sets the number of columns a grid item spans for a given breakpoint.
If the value is not defined at a given break point then the value for the next 
smallest breakpoint will be assigned. This prop is ignored if the `item` prop is 
`false`.  

__Usage__:
```Javascript
// Creates a grid with a predefined width at every breakpoint
<Grid item width={{
    xs: '12',
    sm: '10',
    md: '8',
    lg: 6,
    xl: 4
}} />

// No value is set for sm or xl. The sm width will inherit a width of 12 from
// the xs value, and lg will inherit 8 from the md value.
<Grid item width={{ xs: 12, md: 8, xl: 6 }}></Grid>
```

--- 

## offset
__Type__:
```Javascript
PropTypes.shape({
    xs: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
    sm: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
    md: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
    lg: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
    xl: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
})
```
__Default__: 
```Javascript
{
    xs: 0,
    sm: 0,
    md: 0,
    lg: 0,
    xl: 0
}
```
__Description__: Sets the number of columns that the given item should be spaced from
the start of the grid at a given breakpoint. If no value is set at a given breakpoint
then the value from the next smallest breakpoint will be used. This prop is ignored 
if the `item` prop is `false`.

__Usage__:
```Javascript
// Creates an item that is full width on xs and sm screens, 66% width and centered 
// on md screens, and 50% and centered on lg or xl screens.
<Grid item  offset={{ md: 4, lg: 3 }} width={{ xs: 12, md: 8, lg: 6 }}>
```

--- 

## hidden
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
__Description__: Allows grid items or containers to be hidden at specific breakpoints.
If a value is provided at a given breakpoint then it will be applied to all breakpoints
that size or larger until a `false` value is explicitly declared. This item will be 
given the `display: none` attribute.

__Usage__:
```Javascript
// Creates an item that only appears at the md break point.
<Grid item hidden={{ xs: true, md: false, lg: true }}></Grid>

// Creates an item that is only displayed on xs or md screens
<Grid item hidden={{ md: true }}></Grid>
```


---

## gap
__Type__: `PropTypes.oneOf([PropTypes.string, PropTypes.number])`  
__Default__: `'1em'`
__Description__: Determines the size of the grap between grid columns. The default
unit is `em`, but a string can be provided with an arbitrary unit. The component 
does not validate the string and will happily apply any arbitrary value as the gap.
This value is ignored if the component is not a `container`. 

__Usage__:
```Javascript
// Sets the grid-gap to 20px for the container
<Grid container gap="20px"></Grid>
```