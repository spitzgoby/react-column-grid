# 2.1.1 (March 9, 2023)

## Patch

-   Make `breakpoints`, `columns`, and `gap` props optional in `<Grid>` and `<GridProvider>`

---

## 2.1.0 (March 9, 2023)

### Breaking

-   No breaking changes

### Major

-   `react-column-grid` no longer ships with custom CSS within the package.
-   Added the ability to control the screen widths of breakpoints.
-   Added the ability to change the number of columns within the grid.

### Minor

-   `gap` is no longer an inline style. All styles provided by a `className`
    will now take precedence.
-   Reduced package size to 40.8kb and zipped size to 13.4kb.

---

## 2.0.0 (February 23, 2023)

### Breaking

-   Removed the ability to control the widths at which breakpoints take effect.
-   Removed the ability to change the number of columns represented by the grid.

### Major

-   Updated to work React 18.
-   Added Typescript definitions.
-   Reduced install size from 79.2kb to 48.1kb.

### Minor

-   Added shorthand syntax for `clear` prop. Passing `true` will now clear the
    row across all breakpoints.
-   Changed `gap` styling to be inline. This value will now override any values
    provided via CSS classes.
