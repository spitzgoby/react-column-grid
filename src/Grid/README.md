# Grid

## breakpoints

**Type**: `PropTypes.arrayOf(PropTypes.number)`  
**Default**: `[600, 900, 1200, 1536]`  
**Description**: Changes the screen widths at which the breakpoints are defined.
It must be a 4 element array of increasing numbers. The first number is the
pixel count at which the layout jumps from `xs` to `sm`. The second number shows
the jump from `sm` to `md`, and this pattern continues for the last 2 numbers.
If this array is too short or not in ascending order it will be ignored and the
default values used instead.

**Usage**:

```Javascript
<GridProvider breakpoints={[500, 1000, 1500, 2000]}>
  <Grid container>
</GridProvider>
```

---

## className

**Type**: `PropTypes.string`  
**Default**: `undefined`
**Description**: Provides a way to add additional classes to the wrapping DOM
element. Any values here are applied last and thus will override the classes
generated automatically.

**Usage**

```Javascript
<Grid className="my-cool-classname" />
```

---

## clear

**Type**:

```Javascript
PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
        xs: PropTypes.bool,
        sm: PropTypes.bool,
        md: PropTypes.bool,
        lg: PropTypes.bool,
        xl: PropTypes.bool,
    })
])
```

**Default**: `false`  
**Description**: Determines whether a given item should take up the remaining space
of he row that it occupies even if its width and offset would not normally span an
entire row. If no value is set at a given breakpoint the value from the next
smallest breakpoint will be used. This value is ignored if the `item` prop is
`false`. In order to clear the row across all breakpoints simply set the value to
`true`.

**Usage**:

```Javascript
// Creates a grid that has 3 rows on xs and sm screens, but only 2 rows on md
// and larger screens. The final row always clears.
<Grid container>
    <Grid item
        clear={{ xs: true, md: false }}
        width={{ xs: 6, md: 3 }}
        offset={{ xs: 3 }} />
    <Grid item
        clear={{ xs: true, md: false }}
        width={{ xs: 6, md: 3 }}
        offset={{ xs: 3 }} />
    <Grid item clear width={6} offset={3} />
</Grid>
```

---

## columns

**Type**: `PropTypes.number`  
**Default**: `12`  
**Description**: Defines the number of columns to use in the grid layout. If
this value is defined and descendant `<Grid>` components have an `offset` or
`width` value that exceeds the column count then their behavior is
unpredictable. In most cases they will be layed out according to the browser's
auto grid layout engine.

**Usage**:

```Javascript
<GridProvider columns={6}>
  <Grid container>
</GridProvider>
```

---

## container

**Type**: `PropTypes.bool`  
**Default**: `false`  
**Description**: Determines whether the grid component is a container. All grids
should have a container element at the root. The container element will have its
`display` attribute set to `grid`.

**Usage**

```Javascript
<Grid container />
```

---

## gap

**Type**: `PropTypes.oneOf([PropTypes.string, PropTypes.number])`  
**Default**: `'1em'`
**Description**: Determines the size of the grap between grid columns. The default
unit is `em`, but a string can be provided with an arbitrary unit. The component
does not validate the string and will happily apply any arbitrary value as the gap.
This value is ignored if the component is not a `container`. This value will be
inherited by any descendant grid containers.

**Usage**:

```Javascript
// Sets the grid-gap to 20px for the container
<Grid container gap="20px"></Grid>
```

---

## hide

**Type**:

```Javascript
PropTypes.shape({
    xs: PropTypes.bool,
    sm: PropTypes.bool,
    md: PropTypes.bool,
    lg: PropTypes.bool,
    xl: PropTypes.bool
})
```

**Default**:

```Javascript
{
    xs: false,
    sm: false,
    md: false,
    lg: false,
    xl: false
}
```

**Description**: Allows grid items or containers to be hidden at specific breakpoints.
If a value is provided at a given breakpoint then it will be applied to all breakpoints
that size or larger until a `false` value is explicitly declared. This item will be
given the `display: none` attribute.

**Usage**:

```Javascript
// Creates an item that only appears at the md break point.
<Grid item hide={{ xs: true, md: false, lg: true }}></Grid>

// Creates an item that is only displayed on xs or md screens
<Grid item hide={{ md: true }}></Grid>
```

---

## item

**Type**: `PropTypes.bool`  
**Default**: `true`  
**Description**: Determines whether the grid component is an item within a container.
An item will have `grid-column` properties assigned based on the width and offset
prop values.  
**Usage**

```Javascript
<Grid item />
```

---

## offset

**Type**:

```Javascript
PropTypes.shape({
    xs: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
    sm: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
    md: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
    lg: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
    xl: PropTypes.oneOf([PropTypes.number, PropTypes.string])
})
```

**Default**:

```Javascript
{
    xs: 0,
    sm: 0,
    md: 0,
    lg: 0,
    xl: 0
}
```

**Description**: Sets the number of columns that the given item should be spaced from
the start of the grid at a given breakpoint. If no value is set at a given breakpoint
then the value from the next smallest breakpoint will be used. This prop is ignored
if the `item` prop is `false`. In order to apply the same offset at all breakpoints
simply provide a single numeric value.

**Usage**:

```Javascript
// Creates an item that is full width on xs and sm screens, 66% width and centered
// on md screens, and 50% and centered on lg or xl screens.
<Grid item  offset={{ md: 4, lg: 3 }} width={{ xs: 12, md: 8, lg: 6 }} />

// Creates an item with an offset of 4 across all breakpoints
<Grid item offset={4} width={8} />
```

---

## width

**Type**:

```Javascript
PropTypes.shape({
    xs: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
    sm: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
    md: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
    lg: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
    xl: PropTypes.oneOf([PropTypes.number, PropTypes.string])
})
```

**Default**:

```Javascript
{
    xs: 12,
    sm: 0,
    md: 0,
    lg: 0,
    xl: 0
}
```

**Description**: Sets the number of columns a grid item spans for a given breakpoint.
If the value is not defined at a given break point then the value for the next
smallest breakpoint will be assigned. This prop is ignored if the `item` prop is
`false`. In order to apply the same width at all breakpoints simply provide a single
numeric value.

**Usage**:

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
<Grid item width={{ xs: 12, md: 8, xl: 6 }} />

// Creates an item of width 12 at all breakpoints.
<Grid item width='12' />
```
