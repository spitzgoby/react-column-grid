import {
    addMissingSizes,
    DEFAULT_BREAKPOINTS,
    generateBreakpointDefinitions,
} from "../breakpoints";

describe("breakpoints", () => {
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

    describe("when generating breakpoint definitions", () => {
        it("should generate correct breakpoints for valid screen widths", () => {
            const mockScreenWidths = [500, 1000, 1500, 2000];
            const expectedBreakpointDefinitions = [
                {
                    size: "xs",
                    maxWidth: "499px",
                },
                {
                    size: "sm",
                    maxWidth: "999px",
                    minWidth: "500px",
                },
                {
                    size: "md",
                    maxWidth: "1499px",
                    minWidth: "1000px",
                },
                {
                    size: "lg",
                    maxWidth: "1999px",
                    minWidth: "1500px",
                },
                {
                    size: "xl",
                    minWidth: "2000px",
                },
            ];

            expect(generateBreakpointDefinitions(mockScreenWidths)).toEqual(
                expectedBreakpointDefinitions
            );
        });

        it("should provide default breakpoints if not enough width values are provided", () => {
            const mockScreenWidths = [500, 1000, 1500];

            expect(generateBreakpointDefinitions(mockScreenWidths)).toEqual(
                DEFAULT_BREAKPOINTS
            );
        });

        it("should provide default breakpoints if the widths are not in increasing order", () => {
            const mockScreenWidths = [2000, 1500, 1000, 500];

            expect(generateBreakpointDefinitions(mockScreenWidths)).toEqual(
                DEFAULT_BREAKPOINTS
            );
        });

        it("should provide default breakpoints if no widths are provided", () => {
            expect(generateBreakpointDefinitions()).toEqual(
                DEFAULT_BREAKPOINTS
            );
        });
    });
});
