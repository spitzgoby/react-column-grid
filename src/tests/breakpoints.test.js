import {
    addMissingSizes,
    areBreakpointsEquivalent,
    areValidWidths,
    createBreakpoints,
    createScreenMediaQuery,
    DEFAULT_BREAKPOINTS,
} from "../breakpoints";

describe("breakpoints", () => {
    describe("when validating widths", () => {
        it("should reject widths that contain non-numeric values", () => {
            const invalidWidths = ["a", 100, 200, 300];

            expect(areValidWidths(invalidWidths)).toBeFalse;
        });

        it("should reject widths that are too short", () => {
            const invalidWidths = [100, 200, 300];

            expect(areValidWidths(invalidWidths)).toBeFalse;
        });

        it("should reject widths that are too long", () => {
            const invalidWidths = [100, 200, 300, 400, 500];

            expect(areValidWidths(invalidWidths)).toBeFalse;
        });

        it("should reject widths that are not in increasing order", () => {
            const invalidWidths = [200, 100, 300, 400];

            expect(areValidWidths(invalidWidths)).toBeFalse;
        });
    });

    describe("when creating breakpoints", () => {
        it("should use default breakpoints when widths are invalid", () => {
            const invalidWidths = [200, 100, 300, 400];

            expect(createBreakpoints(invalidWidths)).toBe(DEFAULT_BREAKPOINTS);
        });

        it("should create an array of breakpoints given 4 pixel counts", () => {
            expect(createBreakpoints([500, 1000, 1500, 2000])).toEqual([
                {
                    size: "xs",
                    maxWidth: "499px",
                },
                {
                    size: "sm",
                    minWidth: "500px",
                    maxWidth: "999px",
                },
                {
                    size: "md",
                    minWidth: "1000px",
                    maxWidth: "1499px",
                },
                {
                    size: "lg",
                    minWidth: "1500px",
                    maxWidth: "1999px",
                },
                {
                    size: "xl",
                    minWidth: "2000px",
                },
            ]);
        });

        it("should translate strings into their numeric values", () => {
            expect(createBreakpoints(["500", "1000", 1500, "2000"])).toEqual([
                {
                    size: "xs",
                    maxWidth: "499px",
                },
                {
                    size: "sm",
                    minWidth: "500px",
                    maxWidth: "999px",
                },
                {
                    size: "md",
                    minWidth: "1000px",
                    maxWidth: "1499px",
                },
                {
                    size: "lg",
                    minWidth: "1500px",
                    maxWidth: "1999px",
                },
                {
                    size: "xl",
                    minWidth: "2000px",
                },
            ]);
        });
    });

    describe("when comparing lists of breakpoints", () => {
        it("should check the length of the compared breakpoints lists", () => {
            const breakpoints1 = [{ size: "xs", minWidth: "500px" }];
            const breakpoints2 = [{ size: "xs", minWidth: "500px" }, {}];

            expect(areBreakpointsEquivalent(breakpoints1, breakpoints2))
                .toBeFalse;
        });

        it("should check the sizes of the compared breakpoints lists", () => {
            const breakpoints1 = [{ size: "xs", minWidth: "500px" }];
            const breakpoints2 = [{ size: "sm", minWidth: "500px" }];

            expect(areBreakpointsEquivalent(breakpoints1, breakpoints2))
                .toBeFalse;
        });

        it("should check the min width of the compared breakpoints lists", () => {
            const breakpoints1 = [{ size: "xs", minWidth: "500px" }];
            const breakpoints2 = [{ size: "xs", minWidth: "5px" }];

            expect(areBreakpointsEquivalent(breakpoints1, breakpoints2))
                .toBeFalse;
        });

        it("should check the max width of the compared breakpoints lists", () => {
            const breakpoints1 = [{ size: "xs", maxWidth: "500px" }];
            const breakpoints2 = [{ size: "xs", maxWidth: "5px" }];

            expect(areBreakpointsEquivalent(breakpoints1, breakpoints2))
                .toBeFalse;
        });

        it("should determine that two breakpoints lists are equivalent", () => {
            const breakpoints1 = [{ size: "xs", maxWidth: "500px" }];
            const breakpoints2 = [{ size: "xs", maxWidth: "500px" }];

            expect(areBreakpointsEquivalent(breakpoints1, breakpoints2))
                .toBeTrue;
        });
    });

    describe("when creating missing sizes", () => {
        it("should create an object using default values", () => {
            expect(addMissingSizes("prop", {}, "test", () => false)).toEqual({
                xs: "test",
                sm: "test",
                md: "test",
                lg: "test",
                xl: "test",
            });
        });

        it("should use the next smallest size for missing values", () => {
            const mockProps = {
                xs: "a",
                md: "b",
            };

            expect(
                addMissingSizes("prop", mockProps, "test", () => false)
            ).toEqual({
                xs: "a",
                sm: "a",
                md: "b",
                lg: "b",
                xl: "b",
            });
        });

        it("should pass the name of the prop when determining whether it uses shorthand", () => {
            const mockShorthand = jest.fn();

            addMissingSizes("prop", {}, "value", mockShorthand);

            expect(mockShorthand).toHaveBeenCalledWith("prop", {});
        });

        it("should apply shorthand syntax when available", () => {
            expect(
                addMissingSizes("prop", "value", "test", () => true)
            ).toEqual({
                xs: "value",
                sm: "value",
                md: "value",
                lg: "value",
                xl: "value",
            });
        });
    });

    describe("when creating media queries", () => {
        it("should create a media query from a breakpoint with min and max width", () => {
            const breakpoint = { minWidth: "1px", maxWidth: "5px" };
            const expectedQuery =
                "@media screen and (min-width: 1px) and (max-width: 5px)";

            expect(createScreenMediaQuery(breakpoint)).toEqual(expectedQuery);
        });

        it("should create a media query from a breakpoint with only min width", () => {
            const breakpoint = { minWidth: "1px" };
            const expectedQuery = "@media screen and (min-width: 1px)";

            expect(createScreenMediaQuery(breakpoint)).toEqual(expectedQuery);
        });

        it("should create a media query from a breakpoint with only max width", () => {
            const breakpoint = { maxWidth: "5px" };
            const expectedQuery = "@media screen and (max-width: 5px)";

            expect(createScreenMediaQuery(breakpoint)).toEqual(expectedQuery);
        });
    });
});
