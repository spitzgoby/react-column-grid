import React, { useState } from "react";
import { DEFAULT_SCREEN_WIDTHS, sizes } from "../src/utils/breakpoints";
import { Grid } from "../src";

export const InteractiveExamples = () => {
    const [breakpoints, setBreakpoints] = useState(DEFAULT_SCREEN_WIDTHS);

    const handleBreakpointChange = (e, index) => {
        const newBreakpoints = [...breakpoints];

        newBreakpoints[index] = parseInt(e.target.value);

        setBreakpoints(newBreakpoints);
    };

    const renderBreakpointInput = (breakpoint, index) => {
        const inputProps = {
            key: index,
            onChange: (e) => handleBreakpointChange(e, index),
            value: breakpoint,
        };

        return <input {...inputProps} />;
    };

    const renderBreakpointDefinition = (breakpoint, index) => {
        return (
            <span>
                {sizes[index]}|{sizes[index + 1]}: {breakpoint}px
            </span>
        );
    };

    return (
        <div>
            <h2>Breakpoints</h2>
            {breakpoints.map(renderBreakpointInput)}
            <Grid breakpoints={breakpoints} container>
                {breakpoints.map((breakpoint, index) => (
                    <Grid className="app--box" key={index} item width={3}>
                        {renderBreakpointDefinition(breakpoint, index)}
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};
