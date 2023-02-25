## 2.0.0 (February 23, 2023)

### Breaking

-   Removed the ability to control the widths at which breakpoints take effect
-   Removed the ability to change the number of columns represented by the grid

### Major

-   Updated to work React 18.
-   Added Typescript definitions.
-   Reduced install size from 79.2kb to 48.1kb.

### Minor

-   Added shorthand syntax for `clear` prop. Passing `true` will now clear the row
    across all breakpoints
-   Changed `gap` styling to be inline. This value will now override any values
    provided via CSS classes
