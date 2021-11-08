import './App.scss';
import { Grid } from '../src';
import React from 'react';

export default props => {
    return (
        <div className="app">
            <Grid container>
                <Grid className="app--title" item width={{ xs: 12, md: 6 }} offset={{ xs: 0, md: 3 }}>
                    <h1>Hello World</h1>
                </Grid>
            </Grid>
        </div>
    );
};