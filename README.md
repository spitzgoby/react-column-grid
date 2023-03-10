# react-column-grid

A simple, lightweight, and terse grid based layout system for React
applications. It allows you to quickly generate responsive layouts for a great
looking application at any screen size.

The library is built using the
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

### Example App

There is an example app included in this repo. To run it first clone the repo
and then run

```bash
npm install # installs dependencies
npm start # runs the application

# OR

yarn # installs dependencies
yarn start # runs the application
```

The example app provides some basic layouts and the source code required to
produce them.

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
// <Grid /> is the default export
import Grid from 'react-column-grid';
// import { Grid } from 'react-column-grid'; <== This also works

export const BasicExample = () => (
    <Grid container>
        <Grid item width={{xs: 12, md: 4, lg: 2}} offset={{lg: 3}}><p>Item 1</p></Grid>
        <Grid item width={{xs: 12, md: 4, lg: 2}}><p>Item 2</p></Grid>
        <Grid item width={{xs: 12, md: 4, lg: 2}}><p>Item 3</p></Grid>
    </Grid>
);
```

Each `<Grid>` component can be an `item`, a `container`, or both. The root
`container` component wraps all of the `item` components and provides the
layout area. Each `item` component then determines how many columns it will
span using the `width` prop. By default a row spans 12 columns, so when we
set the value `width={xs: 12}` we are saying that this copmonent should take
up a full row on an e**x**tra **s**mall screen. An `item` component must be the
descendant of a `container`.

The value `width={md: 4}`
instructs the component to take up 4 columns or 1/3 of the total row when the
screen is medium sized.

Finally, when the user's screen is large sized there is an offset of 3 columns
placed before the first item and then each item takes up 1/6 of the total width
of the container.

---

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

See the [<Grid /> documentation](./src/Grid.md) for a complete list of
props that use breakpoints.

---

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

---

## Clear and Hide

The `clear` and `hide` properties also use breakpoints, but use boolean values
instead of numeric ones.

The `clear` prop defines whether a given item should prevent siblings
from being placed after in on the same row. One use case would be to create
a grid of `item`s that don't add up to the length of the row.

```Javascript
<Grid container>
    <Grid item width={2}>                       (0,0)</Grid>
    <Grid item width={2}>                       (0,1)</Grid>
    <Grid item width={2} clear={{ xs: true }}>  (0,2)</Grid>
    {/* since the previous item is cleared, the next item will begin
        on a new row even though the total widths of the previous 3
        items does not take up the full span of a row */}
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

The `clear` property can also be a `boolean` if you want to clear the row at all
screen sizes.

---

## `<Hidden />`

When you want to show/hide an item without creating new layout items
you can use the `<Hidden />` component. It has a single prop `hide`
which behaves the same as on the `<Grid />` component.

```Javascript
    <Grid container>
        <Grid item width={12}>
            <Hidden hide={{ xs: true, sm: false }}>Hide me on extra small screens</Hidden>
        </Grid>
    </Grid>
```

There is also a shorthand syntax for hiding elements. By passing the desired
screen size as a prop you can hide only elements at that breakpoint. Unlike
the `hide` prop where the next smallest screen size value is used by larger
screen sizes, this prop only targets the specific screen size passed.

```Javascript
import { Hidden } from 'react-column-grid';

export const HiddenExample = () => (
    <Hidden xs xl>
        <span>Hide me on extra small and extra large screens</span>
    </Hidden>
);
```

---

## Grid Customization

The default grid layout can be customized for your particular needs. By default
it will produce a 12 column grid with breakpoints at 600px, 900px, 1200px, and
1536px and a `gap` of `1em`. The `<Grid />` component accepts props to customize
all 3 of these behaviors. The customization is ignored if the `<Grid />` is not
a container. When customized these properties will be used by all `<Grid />`
descendants in that container's hierarchy.

### Breakpoints

The `breakpoints` prop will set the pixel widths for each breakpoint. It is an
array of 4 positive integers in ascending order. This value is only valid when
paired with the `container` prop.

```Javascript
// Creates a great with breakpoints at 500px, 800px, 1000px, and 1500px.
// All descendants of the root container will also use these breakpoints
<Grid breakpoints={[500, 800, 1000, 1500]} container>
    <Grid container item width={{ xs: 12, md: 6}}>
        <Grid item width={6}>I</Grid>
        <Grid item width={6}>Am</Grid>
    </Grid>
    <Grid container item width={{ xs: 12, md: 6 }}>
        <Grid item width={6}>Iron</Grid>
        <Grid item width={6}>Man</Grid>
    </Grid>
</Grid>
```

### Columns

The `columns` prop will set the number of columns the `<Grid />` will display.
If this value is set be sure to constrain the width and offset values so the sum
is less than or equal to the column count. If the `width + offset` at a given
breakpoint exceeds the columns then no styles will be applied and the item will
be placed by the browser using auto layout.

```Javascript
<Grid columns={6} container>
    <Grid item width={3}>I take up half the screen</Grid>
    <Grid item width={3}>I take up half the screen</Grid>
</Grid>
```

### Gap

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

### <GridProvider />

To customize `<Grid />` behavior across an entire application it is recommended
to use the `<GridProvider />` in the root of the application. This component
can be used to set the `breakpoints`, `columns`, and `gap` of all grids within
its hierarchy. This allows global values to be added without having to set them
at the root of each route or page in your application.

```Javascript
import Home from './Home';
import { GridProvider } from 'react-column-grid';

const App = () => (
    <GridProvider breakpoints={[550, 900, 1250, 1600]}} columns={3} gap="1rem">
        <Home />
    </GridProvider>
);
```

---

## Server Side Rendering

`react-column-grid` relies on injecting styles into the `document`. If these
components are being used in an environment with Server Side Rendering (such as
[NextJS](https://nextjs.org/)) it will prevent the page from loading because the
`document` is not available. The `<Grid>` and `<Hidden>` components must be
loaded dynamically. The example below demonstrates how to do this within the
`NextJS` framework.

```Javascript
import dynamic from 'next/dynamic';

const Grid = dynamic(() => import('react-column-grid').then((rcg) => rcg.Grid), { ssr: false });

const MyComponent = () => {
    return (
        <Grid container>
            <Grid item offset={{ xs: 0, md: 3 }} width={{ xs: 12, md: 6 }}>
                I was loaded dynamically after the <code>document</code> was available
            </Grid>
        </Grid>
    )
};
```

---

## Additional Documentation

-   [Grid Documentation](./src/Grid/README.md)
-   [Hidden Documentation](./src/Hidden/README.md)
