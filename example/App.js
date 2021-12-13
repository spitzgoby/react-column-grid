import './App.scss';
import { Grid, Hidden } from '../src';
import Home from './home.png';
import List from './list.png';
import React from 'react';
import ReactSyntaxHighlighter from 'react-syntax-highlighter';

export default props => {
    const getSyntaxHighlighterProps = () => ({
        codeTagProps: { 
            className: 'app--code-block'
        },
        customStyle: {
            margin: 0,
            padding: 0
        },
        language: 'jsx'
    })

    return (
        <div className="app">
            <h1>Final Name of Package</h1>
            <div className="app--example">
                <h2>Example 1</h2>
                <p>
                    Three evenly spaced columns across all screen sizes. It is only 
                    necessary to define the extra small width because it will be
                    inherited by the larger sizes.
                </p>
                <Grid container>
                    <Grid item width={{ xs: 12 }}>
                        <ReactSyntaxHighlighter {...getSyntaxHighlighterProps()}>{
                            "<Grid container>\n" +
                            "    <Grid item width={{ xs: 4 }}>Box 1</Grid>\n" +
                            "    <Grid item width={{ xs: 4 }}>Box 2</Grid>\n" +
                            "    <Grid item width={{ xs: 4 }}>Box 3</Grid>\n" +
                            "</Grid>"
                        }</ReactSyntaxHighlighter>
                    </Grid>
                    <Grid container item width={{ xs: 12 }}>
                        <Grid className="app--box" item width={{ xs: 4 }}>Box 1</Grid>
                        <Grid className="app--box" item width={{ xs: 4 }}>Box 2</Grid>
                        <Grid className="app--box" item width={{ xs: 4 }}>Box 3</Grid>
                    </Grid>
                </Grid>
            </div>
            <div className="app--example">
                <h2>Example 2</h2>
                <p>
                    6 cells in progressively fewer columns as the screen size narrows.
                    This ensures that there is ample space to interact with the component 
                    on smaller devices.
                </p>
                <Grid container>
                    <Grid item width={{ xs: 12 }}>
                        <ReactSyntaxHighlighter {...getSyntaxHighlighterProps()}>{
                            "<Grid container>\n" +
                            "    <Grid item width={{ xs: 12, sm: 6, lg: 4 }}>Box 1</Grid>\n" +
                            "    <Grid item width={{ xs: 12, sm: 6, lg: 4 }}>Box 2</Grid>\n" +
                            "    <Grid item width={{ xs: 12, sm: 6, lg: 4 }}>Box 3</Grid>\n" +
                            "    <Grid item width={{ xs: 12, sm: 6, lg: 4 }}>Box 4</Grid>\n" +
                            "    <Grid item width={{ xs: 12, sm: 6, lg: 4 }}>Box 5</Grid>\n" +
                            "    <Grid item width={{ xs: 12, sm: 6, lg: 4 }}>Box 6</Grid>\n" +
                            "</Grid>"
                        }</ReactSyntaxHighlighter>
                    </Grid>
                    <Grid container item width={{ xs: 12 }}>
                        <Grid className="app--box" item width={{ xs: 12, sm: 6, lg: 4 }}>Box 1</Grid>
                        <Grid className="app--box" item width={{ xs: 12, sm: 6, lg: 4 }}>Box 2</Grid>
                        <Grid className="app--box" item width={{ xs: 12, sm: 6, lg: 4 }}>Box 3</Grid>
                        <Grid className="app--box" item width={{ xs: 12, sm: 6, lg: 4 }}>Box 4</Grid>
                        <Grid className="app--box" item width={{ xs: 12, sm: 6, lg: 4 }}>Box 5</Grid>
                        <Grid className="app--box" item width={{ xs: 12, sm: 6, lg: 4 }}>Box 6</Grid>
                    </Grid>
                </Grid>
            </div>
            <div className="app--example">
                <h2>Example 3</h2>
                <p>
                    A centered item with progressively less surrounding whitespace as
                    the screen narrows. It's uneccesary to define the extra small 
                    or extra large offsets as the default to 0 and the large value, 
                    respectively.
                </p>
                <Grid container>
                    <Grid item width={{ xs: 12 }}>
                        <ReactSyntaxHighlighter {...getSyntaxHighlighterProps()}>{
                            "<Grid container>\n" +
                            "    <Grid item \n" +
                            "        width={{ xs: 12, sm: 10, md: 8, lg: 6 }}\n" +
                            "        offset={{ sm: 1, md: 2, lg: 3 }}>Centered Box\n" +
                            "    </Grid>\n" +
                            "</Grid>"
                        }</ReactSyntaxHighlighter>
                    </Grid>
                    <Grid container item width={{ xs: 12 }}>
                        <Grid className="app--box" item 
                            width={{ xs: 12, sm: 10, md: 8, lg: 6 }}
                            offset={{ sm: 1, md: 2, lg: 3 }}>Centered Box</Grid>
                    </Grid>
                </Grid>
            </div>
            <div className="app--example">
                <h2>Example 4</h2>
                <p>
                    A responsive header that shows and hides items at various screen sizes. 
                </p>
                <Grid container>
                    <Grid item width={{ xs: 12 }}>
                        <ReactSyntaxHighlighter {...getSyntaxHighlighterProps()}>{
                            "<Grid container item width={{xs: 12}}>\n" +
                            "   <Grid item width={{ xs: 6 }}>\n" +
                            "       <Hidden hide={{ xs: false, sm: true }}>\n" +
                            "           <img />\n" +
                            "       </Hidden>\n" +
                            "       <Hidden hide={{ xs: true, sm: false }}>\n" +
                            "            <a>Home</a>\n" +
                            "       </Hidden>\n" +
                            "   </Grid>\n" +
                            "   <Grid item width={{ xs: 6 }}>\n" +
                            "       <Hidden hide={{ xs: false, md: true }}>\n" +
                            "           <img />\n" +
                            "       </Hidden>\n" +
                            "       <Hidden hide={{ xs: true, md: false }}>\n" +
                            "           <ul>\n" +
                            "               <li>User</li>\n" +
                            "               <li>Settings</li>\n" +
                            "               <li>Log Out</li>\n" +
                            "           </ul>\n" +
                            "       </Hidden>\n" +
                            "   </Grid>\n" +
                            "</Grid>\n"
                        }</ReactSyntaxHighlighter>
                    </Grid>
                    <Grid container item width={{ xs: 12 }}>
                        <Grid container item className="app--box" width={{xs: 12}}>
                            <Grid item className="app--home-nav" width={{ xs: 6 }}>
                                <Hidden hide={{ xs: false, sm: true }}>
                                    <img className="app--nav-button_logo" src={Home} />
                                </Hidden>
                                <Hidden hide={{ xs: true, sm: false }}>
                                    <a className="app--nav-button_text" href="#">Home</a>
                                </Hidden>
                            </Grid>
                            <Grid item className="app--articles-nav" width={{ xs: 6 }}>
                                <Hidden hide={{ xs: false, md: true }}>
                                    <img className="app--nav-button_logo" src={List} />
                                </Hidden>
                                <Hidden hide={{ xs: true, md: false }}>
                                    <ul className="app--articles-nav--list">
                                        <li>User</li>
                                        <li>Settings</li>
                                        <li>Log Out</li>
                                    </ul>
                                </Hidden>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};