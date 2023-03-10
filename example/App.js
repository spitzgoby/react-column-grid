import "./App.scss";
import { Grid } from "../src";
import { InteractiveExamples } from "./InteractiveExamples";
import SimpleExamples from "./SimpleExamples";
import React, { useState } from "react";
import classNames from "classnames";

const SIMPLE_EXAMPLES_ID = "simple";
const INTERACTIVE_EXAMPLES_ID = "interactive";
const titles = {
    [SIMPLE_EXAMPLES_ID]: "Simple",
    [INTERACTIVE_EXAMPLES_ID]: "Interactive",
};

export const App = () => {
    const [selectedExample, setSelectedExample] = useState(
        INTERACTIVE_EXAMPLES_ID
    );

    const handleExampleSelect = (exampleId) => {
        setSelectedExample(exampleId);
    };

    const renderExampleSelectButton = (exampleId) => {
        const title = titles[exampleId];
        const buttonProps = {
            className: classNames({
                "app--example-group-select--button": true,
                "app--example-group-select--button_selected":
                    selectedExample === exampleId,
            }),
            role: "button",
            onClick: () => {
                handleExampleSelect(exampleId);
            },
        };

        return <a {...buttonProps}>{title}</a>;
    };

    return (
        <Grid container className="app">
            <Grid
                item
                width={{ xs: 12, md: 8, lg: 6 }}
                offset={{ md: 2, lg: 3 }}
            >
                <Grid container>
                    <Grid item width={6}>
                        <h1>
                            <a href="https://github.com/spitzgoby/react-column-grid">
                                react-column-grid
                            </a>
                        </h1>
                    </Grid>
                    <Grid
                        className="app--example-group-select"
                        container
                        item
                        width={6}
                    >
                        <Grid
                            className="app--example-group-select--wrapper"
                            item
                            width={6}
                        >
                            {renderExampleSelectButton(SIMPLE_EXAMPLES_ID)}
                        </Grid>
                        <Grid
                            className="app--example-group-select--wrapper"
                            item
                            width={6}
                        >
                            {renderExampleSelectButton(INTERACTIVE_EXAMPLES_ID)}
                        </Grid>
                    </Grid>
                </Grid>
                {selectedExample === SIMPLE_EXAMPLES_ID ? (
                    <SimpleExamples />
                ) : (
                    <InteractiveExamples />
                )}
            </Grid>
        </Grid>
    );
};

export default App;
