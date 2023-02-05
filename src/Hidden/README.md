# Hidden

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

**Description**: Determines whether the children will be hidden at a given
breakpoint. If no value is set for a breakpoint then the value from the
next smallest breakpoint will be used.

**Usage**:

```Javascript
// Hides the text when the user's device is xs and shows it for all
// other breakpoints.
<Hidden hide={{ xs: true, sm: false }}>Hide me on xs screens</Hidden>
```

---

## xs

**Type**: `PropTypes.bool`  
**Default**: `false`  
**Description**: Determines whether the children will be hidden at the
extra small breakpoint. This value will only target the `xs` size, and
will not be used at the other breakpoints. If the `hide` property is
also defined it will be given precedence.

---

## sm

**Type**: `PropTypes.bool`  
**Default**: `false`  
**Description**: Determines whether the children will be hidden at the
small breakpoint. This value will only target the `sm` size, and will
not be used at the other breakpoints. If the `hide` property is also
defined it will be given precedence.

---

## md

**Type**: `PropTypes.bool`  
**Default**: `false`  
**Description**: Determines whether the children will be hidden at the
medium breakpoint. This value will only target the `md` size, and
will not be used at the other breakpoints. If the `hide` property is
also defined it will be given precedence.

---

## lg

**Type**: `PropTypes.bool`  
**Default**: `false`  
**Description**: Determines whether the children will be hidden at the
large breakpoint. This value will only target the `lg` size, and
will not be used at the other breakpoints. If the `hide` property is
also defined it will be given precedence.

---

## xl

**Type**: `PropTypes.bool`  
**Default**: `false`  
**Description**: Determines whether the children will be hidden at the
extra large breakpoint. This value will only target the `xl` size, and
will not be used at the other breakpoints. If the `hide` property is
also defined it will be given precedence.
