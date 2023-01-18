export default [
    {
        description: `
            Three evenly spaced columns across all screen sizes. It is only 
            necessary to define the extra small width because it will be
            inherited by the larger sizes.`,
        sourceCode:
            "<Grid container>\n" +
            "    <Grid item width={4}>Box 1</Grid>\n" +
            "    <Grid item width={4}>Box 2</Grid>\n" +
            "    <Grid item width={4}>Box 3</Grid>\n" +
            "</Grid>",
        title: "Example 1",
    },
    {
        description: `
            6 cells in progressively fewer columns as the screen size narrows.
            This ensures that there is ample space to interact with the component 
            on smaller devices.`,
        sourceCode:
            "<Grid container>\n" +
            "    <Grid item width={{ xs: 12, sm: 6, lg: 4 }}>Box 1</Grid>\n" +
            "    <Grid item width={{ xs: 12, sm: 6, lg: 4 }}>Box 2</Grid>\n" +
            "    <Grid item width={{ xs: 12, sm: 6, lg: 4 }}>Box 3</Grid>\n" +
            "    <Grid item width={{ xs: 12, sm: 6, lg: 4 }}>Box 4</Grid>\n" +
            "    <Grid item width={{ xs: 12, sm: 6, lg: 4 }}>Box 5</Grid>\n" +
            "    <Grid item width={{ xs: 12, sm: 6, lg: 4 }}>Box 6</Grid>\n" +
            "</Grid>",
        title: "Example 2",
    },
    {
        description: `
            A centered item with progressively less surrounding whitespace as
            the screen narrows. It's uneccesary to define the extra small 
            or extra large offsets as they default to 0 and the large value, 
            respectively. `,
        sourceCode:
            "<Grid container>\n" +
            "    <Grid item \n" +
            "        width={{ xs: 12, sm: 10, md: 8, lg: 6 }}\n" +
            "        offset={{ sm: 1, md: 2, lg: 3 }}>Centered Box\n" +
            "    </Grid>\n" +
            "</Grid>",
        title: "Example 3",
    },
    {
        description: `
            A responsive header that shows and hides items at various screen 
            sizes.`,
        sourceCode:
            "<Grid container>\n" +
            "   <Grid item width={6}>\n" +
            "       <Hidden hide={{ sm: true }}>\n" +
            "           <img />\n" +
            "       </Hidden>\n" +
            "       <Hidden xs>\n" +
            "            <a>Home</a>\n" +
            "       </Hidden>\n" +
            "   </Grid>\n" +
            "   <Grid item width={6}>\n" +
            "       <Hidden hide={{ md: true }}>\n" +
            "           <img />\n" +
            "       </Hidden>\n" +
            "       <Hidden hide={{ xs: true, md: false }}>\n" +
            "    </Grid>\n" +
            "</Grid>",
        title: "Example 4",
    },
    {
        description:
            "A multi-item layout with cells that span multiple rows with a reduced gap",
        sourceCode:
            "<Grid container gap={0.5}>\n" +
            "   <Grid container item width={6}>\n" +
            "       <Grid item width={12}>Rows 1 and 2</Grid>\n" +
            "   </Grid>\n" +
            "   <Grid container item width={6}>\n" +
            "       <Grid container item width={12}>\n" +
            "           <Grid item width={6}>Row 1 Left</Grid>\n" +
            "           <Grid item width={6}>Row 1 Right</Grid>\n" +
            "       </Grid>\n" +
            "       <Grid item width={12}>Row 2</Grid>\n" +
            "   </Grid>\n" +
            "</Grid>\n",
        title: "Example 5",
    },
];
