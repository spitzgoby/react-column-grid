import { shallow } from "enzyme";
import Grid from "../Grid";
import * as layout from "../Grid.layout";
import React from "react";
import ThemeContext from "../../ThemeContext";

describe("<Grid />", () => {
    beforeAll(() => {
        jest.spyOn(layout, "generateSizeClassNames");
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("when styling component", () => {
        it("should calculate props for all sizes when creating styles", () => {
            const hideProp = { xs: true, md: false };
            const offsetProp = { xs: "0", md: "2", lg: "3" };
            const widthProp = { xs: "6", md: "4", lg: "3" };

            shallow(
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

            shallow(
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

        it("should use supplied class", () => {
            layout.generateSizeClassNames.mockReturnValueOnce("test-class");

            const grid = shallow(<Grid item hide={{ xs: true }}></Grid>);

            expect(grid.hasClass("test-class")).toBe(true);
        });

        it("should use supplied container class if it is a container", () => {
            const grid = shallow(<Grid container hide={{ xs: true }}></Grid>);

            expect(grid.hasClass("rcg-c")).toBe(true);
        });
    });

    describe("when the grid is a container", () => {
        it("should create a grid container", () => {
            const grid = shallow(<Grid container />);

            expect(grid).toMatchSnapshot();
        });

        it("should be able to render a single child component", () => {
            const renderGrid = () => {
                shallow(
                    <Grid container item>
                        <div></div>
                    </Grid>
                );
            };

            expect(renderGrid).not.toThrow();
        });

        it("should not update props of children that are not grid items", () => {
            const NonGrid = (props) => <div>{props}</div>;
            const grid = shallow(
                <Grid container>
                    <NonGrid width={4}></NonGrid>
                    <NonGrid width={4}></NonGrid>
                </Grid>
            );

            grid.find(NonGrid).forEach((nonGrid) => {
                expect(nonGrid.prop("offset")).toBe(undefined);
            });
        });

        it("should increase the offset of child grid items in each size class", () => {
            const grid = shallow(
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
            const expectedOffsets = [
                { xs: 0, sm: 0, md: 3, lg: 3, xl: 3 },
                { xs: 0, sm: 0, md: 9, lg: 9, xl: 9 },
            ];

            expect(
                grid.children().forEach((item, index) => {
                    const element = item.getElement();

                    Object.keys(element.props.offset).forEach((size) => {
                        expect(element.props.offset[size]).toEqual(
                            expectedOffsets[index][size]
                        );
                    });
                })
            );
        });

        it("should move elements onto the next row when the columns exceed row width", () => {
            const grid = shallow(
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
            const expectedOffsets = [
                { xs: 0, sm: 0, md: 3, lg: 3, xl: 3 },
                { xs: 2, sm: 2, md: 9, lg: 9, xl: 9 },
                { xs: 0, sm: 0, md: 3, lg: 3, xl: 3 },
            ];

            expect(
                grid.children().forEach((item, index) => {
                    const element = item.getElement();

                    Object.keys(element.props.offset).forEach((size) => {
                        expect(element.props.offset[size]).toEqual(
                            expectedOffsets[index][size]
                        );
                    });
                })
            );
        });

        it("should recalculate rows when an item spills over into a new row", () => {
            const grid = shallow(
                <Grid container>
                    <Grid item width={{ xs: 6 }} offset={{ xs: 3 }} />
                    <Grid item width={{ xs: 8 }} />
                    <Grid item width={{ xs: 4 }} />
                </Grid>
            );
            const expectedOffsets = [
                { xs: 3, sm: 3, md: 3, lg: 3, xl: 3 },
                { xs: 0, sm: 0, md: 0, lg: 0, xl: 0 },
                { xs: 8, sm: 8, md: 8, lg: 8, xl: 8 },
            ];

            expect(
                grid.children().forEach((item, index) => {
                    const element = item.getElement();

                    Object.keys(element.props.offset).forEach((size) => {
                        expect(element.props.offset[size]).toEqual(
                            expectedOffsets[index][size]
                        );
                    });
                })
            );
        });

        it("should clear move an item onto the nest row if the child clears the row", () => {
            const grid = shallow(
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
            const expectedOffsets = [
                { xs: 0, sm: 0, md: 0, lg: 0, xl: 0 },
                { xs: 0, sm: 0, md: 1, lg: 1, xl: 1 },
                { xs: 1, sm: 1, md: 2, lg: 2, xl: 2 },
            ];

            expect(
                grid.children().forEach((item, index) => {
                    const element = item.getElement();

                    Object.keys(element.props.offset).forEach((size) => {
                        expect(element.props.offset[size]).toEqual(
                            expectedOffsets[index][size]
                        );
                    });
                })
            );
        });

        describe("when using custom gap", () => {
            it("should wrap its root element in a theme context provider", () => {
                const props = {
                    container: true,
                    gap: "2em",
                };
                const grid = shallow(<Grid {...props} />);

                expect(grid.find(ThemeContext.Provider).length).toBe(1);
            });

            it("should not consider gap if it is not a container", () => {
                const props = { gap: "2em" };
                const grid = shallow(<Grid {...props} />);

                expect(grid.find(ThemeContext.Provider).length).toBe(0);
            });

            it("should not consider gap if it is not provided", () => {
                const props = { container: true };
                const grid = shallow(<Grid {...props} />);

                expect(grid.find(ThemeContext.Provider).length).toBe(0);
            });

            it("should update gap state if it has changed", () => {
                const startingGap = 1.5;
                const changedGap = 2;
                const grid = shallow(<Grid container gap={startingGap} />);
                const setGapSpy = jest.fn();
                const useStateSpy = jest
                    .spyOn(React, "useState")
                    .mockImplementation((value) =>
                        // if true then this is the breakpoints call and we must return an array
                        // or the component will throw an exception
                        Array.isArray(value)
                            ? [value, jest.fn()]
                            : [startingGap, setGapSpy]
                    );

                grid.setProps({ gap: changedGap });

                expect(setGapSpy).toHaveBeenCalledWith(changedGap);

                useStateSpy.mockRestore();
            });

            it("should not update breakpoints state if it the values are equivalent", () => {
                const gap = 1.5;
                const grid = shallow(<Grid container gap={gap} />);
                const setGapSpy = jest.fn();
                const useStateSpy = jest
                    .spyOn(React, "useState")
                    .mockImplementation((value) => [value, setGapSpy]);

                grid.setProps({ gap: gap });

                expect(setGapSpy).not.toHaveBeenCalled();

                useStateSpy.mockRestore();
            });
        });
    });
});
