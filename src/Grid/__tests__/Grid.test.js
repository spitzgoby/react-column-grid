import { render } from "@testing-library/react";
import Grid from "../Grid";
import * as layout from "../Grid.layout";
import React from "react";
import * as breakpoints from "../../utils/breakpoints";

describe("<Grid />", () => {
    beforeAll(() => {
        jest.spyOn(layout, "generateSizeClassNames");
        jest.spyOn(breakpoints, "addMissingSizes");
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("when styling component", () => {
        it("should calculate props for all sizes when creating styles", () => {
            const hideProp = { xs: true, md: false };
            const offsetProp = { xs: "0", md: "2", lg: "3" };
            const widthProp = { xs: "6", md: "4", lg: "3" };

            render(
                <Grid
                    container
                    hide={hideProp}
                    offset={offsetProp}
                    width={widthProp}
                />
            );

            expect(layout.generateSizeClassNames).toHaveBeenCalledWith({
                hide: { xs: true, sm: true, md: false, lg: false, xl: false },
                item: undefined,
                offset: { xs: "0", sm: "0", md: "2", lg: "3", xl: "3" },
                width: { xs: "6", sm: "6", md: "4", lg: "3", xl: "3" },
            });
        });

        it("should use shorthand syntax for width and offset", () => {
            const offsetProp = "1";
            const widthProp = "10";

            render(
                <Grid
                    container
                    hide={{}}
                    offset={offsetProp}
                    width={widthProp}
                />
            );

            expect(layout.generateSizeClassNames).toHaveBeenCalledWith({
                hide: { xs: false, sm: false, md: false, lg: false, xl: false },
                item: undefined,
                offset: { xs: "1", sm: "1", md: "1", lg: "1", xl: "1" },
                width: { xs: "10", sm: "10", md: "10", lg: "10", xl: "10" },
            });
        });

        it("should use shorthand syntax for clear", () => {
            render(
                <Grid container>
                    <Grid item clear />
                </Grid>
            );

            expect(breakpoints.addMissingSizes).toHaveBeenCalledWith(
                "clear",
                true,
                false,
                expect.any(Function)
            );
        });

        it("should use supplied class", () => {
            layout.generateSizeClassNames.mockReturnValueOnce("test-class");

            const { container } = render(
                <Grid item hide={{ xs: true }}></Grid>
            );

            expect(container.querySelector(".test-class")).not.toBeNull();
        });

        it("should use supplied container class if it is a container", () => {
            const { container } = render(<Grid container />);

            expect(container.querySelector(".rcg-c")).not.toBeNull();
        });
    });

    describe("when the grid is a container", () => {
        it("should create a grid container", () => {
            const { container } = render(<Grid container />);

            expect(container).toMatchSnapshot();
        });

        it("should be able to render a single child component", () => {
            const renderGrid = () => {
                render(
                    <Grid container item>
                        <div></div>
                    </Grid>
                );
            };

            expect(renderGrid).not.toThrow();
        });

        it("should not update props of children that are not grid items", () => {
            const { container } = render(
                <Grid container>
                    <div width={4} />
                    <div width={4} />
                </Grid>
            );

            expect(container).toMatchSnapshot();
        });

        it("should increase the offset of child grid items in each size class", () => {
            const { container } = render(
                <Grid container>
                    <Grid
                        item
                        width={{ xs: 12, md: 3 }}
                        offset={{ xs: 0, md: 3 }}
                    />
                    <Grid
                        item
                        width={{ xs: 12, md: 3 }}
                        offset={{ xs: 0, md: 3 }}
                    />
                </Grid>
            );

            expect(container).toMatchSnapshot();
        });

        it("should move elements onto the next row when the columns exceed row width", () => {
            const { container } = render(
                <Grid container>
                    <Grid
                        item
                        width={{ xs: 6, md: 3 }}
                        offset={{ xs: 0, md: 3 }}
                    />
                    <Grid
                        item
                        width={{ xs: 6, md: 3 }}
                        offset={{ xs: 2, md: 3 }}
                    />
                    <Grid
                        item
                        width={{ xs: 12, md: 3 }}
                        offset={{ xs: 0, md: 3 }}
                    />
                </Grid>
            );

            expect(container).toMatchSnapshot();
        });

        it("should recalculate rows when an item spills over into a new row", () => {
            const { container } = render(
                <Grid container>
                    <Grid item width={{ xs: 6 }} offset={{ xs: 3 }} />
                    <Grid item width={{ xs: 8 }} />
                    <Grid item width={{ xs: 4 }} />
                </Grid>
            );

            expect(container).toMatchSnapshot();
        });

        it("should clear move an item onto the nest row if the child clears the row", () => {
            const { container } = render(
                <Grid container>
                    <Grid
                        item
                        width={{ xs: 1 }}
                        clear={{ xs: true, md: false }}
                    />
                    <Grid item width={{ xs: 1 }} />
                    <Grid item width={{ xs: 1 }} />
                </Grid>
            );

            expect(container).toMatchSnapshot();
        });

        it("should update gap state if it has changed", () => {
            const startingGap = 1.5;
            const changedGap = 2;
            const { rerender } = render(<Grid container gap={startingGap} />);
            const setGapSpy = jest.fn();
            const useStateSpy = jest
                .spyOn(React, "useState")
                .mockImplementation(() => [startingGap, setGapSpy]);

            rerender(<Grid container gap={changedGap} />);

            expect(setGapSpy).toHaveBeenCalledWith(changedGap);

            useStateSpy.mockRestore();
        });
    });
});
