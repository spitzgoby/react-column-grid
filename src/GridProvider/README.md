# GridProvider

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

## gap

**Type**: `PropTypes.oneOfType(PropTypes.number, PropTypes.string)`  
**Default**: `'1em'`  
**Description**: Determines the size of the grap between grid columns. The default
unit is `em`, but a string can be provided with an arbitrary unit. The component
does not validate the string and will happily apply any arbitrary value as the gap.
This value is ignored if the component is not a `container`. This value will be
inherited by any descendant grid containers. This value is added as an inline
style and thus cannot be overridden by adding classes to the `<Grid>`.

**Usage**:

```Javascript
<GridProvider gap="1em">
  <Grid container>
</GridProvider>
```
