import examples from "./examples";
import Home from "./home.png";
import List from "./list.png";
import React from "react";
import SourceCodeBlock from "./SourceCodeBlock";
import { Grid, Hidden } from "../src";

export const SimpleExamples = () => (
    <>
        <div className="app--example">
            <h2>{examples[0].title}</h2>
            <p>{examples[0].description}</p>
            <Grid container>
                <Grid item width={12}>
                    <SourceCodeBlock sourceCode={examples[0].sourceCode} />
                </Grid>
                <Grid container item width={12}>
                    <Grid className="app--box" item width={4}>
                        Box 1
                    </Grid>
                    <Grid className="app--box" item width={4}>
                        Box 2
                    </Grid>
                    <Grid className="app--box" item width={4}>
                        Box 3
                    </Grid>
                </Grid>
            </Grid>
        </div>
        <div className="app--example">
            <h2>{examples[1].title}</h2>
            <p>{examples[1].description}</p>
            <Grid container>
                <Grid item width={12}>
                    <SourceCodeBlock sourceCode={examples[1].sourceCode} />
                </Grid>
                <Grid container item width={12}>
                    <Grid
                        className="app--box"
                        item
                        width={{ xs: 12, sm: 6, lg: 4 }}
                    >
                        Box 1
                    </Grid>
                    <Grid
                        className="app--box"
                        item
                        width={{ xs: 12, sm: 6, lg: 4 }}
                    >
                        Box 2
                    </Grid>
                    <Grid
                        className="app--box"
                        item
                        width={{ xs: 12, sm: 6, lg: 4 }}
                    >
                        Box 3
                    </Grid>
                    <Grid
                        className="app--box"
                        item
                        width={{ xs: 12, sm: 6, lg: 4 }}
                    >
                        Box 4
                    </Grid>
                    <Grid
                        className="app--box"
                        item
                        width={{ xs: 12, sm: 6, lg: 4 }}
                    >
                        Box 5
                    </Grid>
                    <Grid
                        className="app--box"
                        item
                        width={{ xs: 12, sm: 6, lg: 4 }}
                    >
                        Box 6
                    </Grid>
                </Grid>
            </Grid>
        </div>
        <div className="app--example">
            <h2>{examples[2].title}</h2>
            <p>{examples[2].description}</p>
            <Grid container>
                <Grid item width={12}>
                    <SourceCodeBlock sourceCode={examples[2].sourceCode} />
                </Grid>
                <Grid container item width={12}>
                    <Grid
                        className="app--box"
                        item
                        width={{ xs: 12, sm: 10, md: 8, lg: 6, xl: 4 }}
                        offset={{ sm: 1, md: 2, lg: 3, xl: 4 }}
                    >
                        Centered Box
                    </Grid>
                </Grid>
            </Grid>
        </div>
        <div className="app--example">
            <h2>{examples[3].title}</h2>
            <p>{examples[3].description}</p>
            <Grid container>
                <Grid item width={12}>
                    <SourceCodeBlock sourceCode={examples[3].sourceCode} />
                </Grid>
                <Grid container item width={12}>
                    <Grid container item className="app--box" width={12}>
                        <Grid item className="app--home-nav" width={6}>
                            <Hidden hide={{ sm: true }}>
                                <img
                                    className="app--nav-button_logo"
                                    src={Home}
                                />
                            </Hidden>
                            <Hidden xs>
                                <a className="app--nav-button_text" href="#">
                                    Home
                                </a>
                            </Hidden>
                        </Grid>
                        <Grid item className="app--articles-nav" width={6}>
                            <Hidden hide={{ md: true }}>
                                <img
                                    className="app--nav-button_logo"
                                    src={List}
                                />
                            </Hidden>
                            <Hidden hide={{ xs: true, md: false }}>
                                <ul className="app--articles-nav--list">
                                    <li>User</li>
                                    <li>Settings</li>
                                    <li>Logout</li>
                                </ul>
                            </Hidden>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
        <div className="app--example">
            <h2>{examples[4].title}</h2>
            <p>{examples[4].description}</p>
            <Grid container>
                <Grid item width={12}>
                    <SourceCodeBlock sourceCode={examples[4].sourceCode} />
                </Grid>
                <Grid container item width={12}>
                    <Grid container gap="0.5" item width={12}>
                        <Grid container item width={6}>
                            <Grid item className="app--box" width={12}>
                                Rows 1 and 2
                            </Grid>
                        </Grid>
                        <Grid container item width={6}>
                            <Grid container item width={12}>
                                <Grid item className="app--box" width={6}>
                                    Row 1 Left
                                </Grid>
                                <Grid item className="app--box" width={6}>
                                    Row 1 Right
                                </Grid>
                            </Grid>
                            <Grid item className="app--box" width={12}>
                                Row 2
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
        <div className="app--example">
            <h2>{examples[5].title}</h2>
            <p>{examples[5].description}</p>
            <Grid container>
                <Grid item width={12}>
                    <SourceCodeBlock sourceCode={examples[5].sourceCode} />
                </Grid>
                <Grid container item width={12}>
                    <Grid container item width={12}>
                        <Grid className="app--box" clear item width={6}>
                            Row 1
                        </Grid>
                        <Grid className="app--box" clear item width={6}>
                            Row 2
                        </Grid>
                        <Grid
                            className="app--box"
                            clear={{ xs: true, md: false }}
                            item
                            width={6}
                        >
                            Row 3
                        </Grid>
                        <Grid
                            className="app--box"
                            clear={{ xs: true, md: false }}
                            item
                            width={6}
                        >
                            Row 4
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    </>
);

export default SimpleExamples;
