A simple, lightweight and terse grid based layout system for React
applications. It allows you to quickly generate responsive layouts
for a great looking application on any screen size.

The library relies on the
[CSS Grid Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
system.

It does not currently support
[css grid templates](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template)
(which are awesome) but support for this may be added in the future.

---

## Installation

### npm

```
npm install -s react-column-grid
```

### yarn

```
yarn add react-column-grid
```

The `<Grid />` component can be imported using either

```Javascript
const { Grid } = require('react-column-grid');
```

OR

```Javascript
const Grid = require('react-column-grid');
```

---

## Getting Started

If you're familiar with either
[Bootstrap's layout grid](https://getbootstrap.com/docs/4.0/layout/grid/) or
[Material UI's <Grid> components](https://mui.com/components/grid/)'s
then the syntax should be familiar.

This example will generate a grid with three evenly spaced columns if the user
is on a medium screen (e.g. tablet) but generates three full-width rows when
the user is on a smaller screen (e.g. phone, small tablet) and generates three
evenly spaced rows that are centered with several columns of white space on a
larger screen (e.g. monitor).

```Javascript
<Grid container>
    <Grid item width={{xs: 12, md: 4, lg: 2}} offset={{lg: 3}}><p>Item 1</p></Grid>
    <Grid item width={{xs: 12, md: 4, lg: 2}}><p>Item 2</p></Grid>
    <Grid item width={{xs: 12, md: 4, lg: 2}}><p>Item 3</p></Grid>
</Grid>
```

Each `<Grid>` component can be an `item`, a `container`, or both. The root
`container` component wraps all of the `item` components and provides the
layout area. Each `item` component then determines how many columns it will
span using the `width` prop. By default a row spans 12 columns, so when we
set the value `width={xs: 12}` we are saying that this copmonent should take
up a full row on an e**x**tra **s**mall screen. It's important to note that
an `item` component must be the descendant of a `container`.

The value `width={md: 4}`
instructs the component to take up 4 columns or 1/3 of the total row when the
screen is medium sized.

Finally, when the user's screen is large sized there is an offset of 3 columns
placed before the first item and then each item takes up 1/6 of the total width
of the container.

## Sizes and Breakpoints

The available screen sizes, in ascending order, are:

-   `xs`: extra-small (0px-599px)
-   `sm`: small (600px-899px))
-   `md`: medium (900px-1199px)
-   `lg`: large (1200px-1535px)
-   `xl`: extra-large (1536px+)

These breakpoints are based on
[Material UI's default breakpoints](https://mui.com/customization/breakpoints/)

When no value is defined for a prop that uses breakpoints, the value for the
next smallest size is used instead. In the following example the "Box 1"
component does not have a width defined for `sm` so it would use the value of
`xs` which is 12 in this case. The "Box 2" component would use the width value
of `md` for both `lg` and `xl` since it is the closest smaller size defined.

```Javascript
<Grid container>
    <Grid item width={{ xs: 12, md: 8, lg: 8, xl: 8 }}>Box 1</Grid>
    <Grid item width={{ xs: 12, sm: 12, md: 8 }}>Box 2</Grid>
</Grid>
```

See the [Grid component documentation](./src/Grid.md) for a complete list of
props that use breakpoints.

## Width and Offset

The `width` property is an object that defines the number of columns an item
should span at a given size. For example, if you wanted to define an item that
spans the entire screen on a phone but only takes up half the screen on a
large monitor you would set `width={{ xs: 12, xl: 6 }}`.

The `offset` property defines the number of columns the item should be spaced
from its nearest sibling. Two common use cases are to center `item`s
horizontally on a row and to shove `item`s to the edge of their `container`

```Javascript
// Create 2 horizontally centered items
// The formula for a centered item's offset is (12 - width) / 2,
// which in case is (12 - 6) / 2 = 3
<Grid container>
    <Grid item width={{ xs: 6 }} offset={{ xs: 3 }}>Row 1</Grid>
    <Grid item width={{ xs: 6 }} offset={{ xs: 3 }}>Row 2</Grid>
</Grid>
```

```Javascript
// Create 2 items on the left and right edges of their container
// The offset only needs to be placed on the second item and the
// formula is 12 - width1 - width2, which in this case is
// (12 - 2 - 2) = 8
<Grid container>
    <Grid item width={{ xs: 2 }}>Start</Grid>
    <Grid item width={{ xs: 2 }} offset={{ xs: 8 }}>End</Grid>
</Grid>
```

For elements that have the same `width` and/or `offset` across all screen
sizes you can use the shorthand syntax.

```Javascript
// Shorthand syntax for width and offset
<Grid container>
    <Grid item width={6} offset="6">Strings or integers can be used for shorthand</Grid>
</Grid>
```

## Clear and Hide

The `clear` and `hide` properties are similar to `width` and
`offset` in the sense that they both use [breakpoints](#breakpoints),
but use boolean values instead of numeric ones.

The `clear` prop defines whether a given item should prevent siblings
from being placed after in on the same row. One use case would be to create
a grid of `item`s that don't add up to the length of the row.

```Javascript
<Grid container>
    <Grid item width={2}>                       (0,0)</Grid>
    <Grid item width={2}>                       (0,1)</Grid>
    <Grid item width={2} clear={{ xs: true }}>  (0,2)</Grid>
    // since the previous item is cleared, the next item will begin
    // on a new row even though the total widths of the previous 3
    // items does not take up the full span of a row
    <Grid item width={2}>                       (1,0)</Grid>
    <Grid item width={2}>                       (1,1)</Grid>
    <Grid item width={2} clear={{ xs: true }}>  (1,2)</Grid>
    <Grid item width={2}>                       (2,0)</Grid>
    <Grid item width={2}>                       (2,1)</Grid>
    <Grid item width={2} clear={{ xs: true }}>  (2,2)</Grid>
</Grid>
```

The `hide` prop defines whether an `item` should be shown at a particular
screen size. This is most useful for elements like a "Hamburger Menu" that
should only show up when the user is on a smaller device.

```Javascript
<Grid container>
    <Grid item width={{ sm: 12 }} hide={{ xs: true, sm: false }}>
        I show up on small screens and larger
    </Grid>
    <Grid item width={12} hide={{ sm: true }}>
        I only show up on extra small screens
    </Grid>
</Grid>
```

## `<Hidden />`

When you want to show/hide an item without creating new layout items
you can use the `<Hidden />` component. It has a single prop `hide`
which behaves the same as on the `<Grid />` component.

```Javascript
    <Grid container>
        <Grid item width={12}>
            <Hidden hide={{ xs: true, sm: false }}>Hide me on small screens</Hidden>
        </Grid>
    </Grid>
```

## Grid Customization

The above examples assumed the default 12-column layout system, but
it possible to use any custom number of columns that you need. The
`columns` prop can only be assigned to a `container` element and it
will change the number of columns used to layout `item`s.

```Javascript
<Grid container columns={6}>
    <Grid offset={1} width={4}>
        I am horizontally centered and take up 2/3 of the screen
    </Grid>
</Grid>
```

The `gap` property allows you to assign the space between each column
(often referred to as the "gutter"). This can be a string defining any
width or a number in which case the unit will be `em`.

```Javascript
<Grid container gap={2}>
    <Grid item width={6}>There are 2em between me and my sibling</Grid>
    <Grid item width={6}>There are 2em between me and my sibling</Grid>
</Grid>

<Grid container gap={"30px"}>
    <Grid item width={6}>There are 30px between me and my sibling</Grid>
    <Grid item width={6}>There are 30px between me and my sibling</Grid>
</Grid>
```
