import { addMissingSizes, createBreakpoints } from "../breakpoints";

describe("breakpoints", () => {
    describe("when creating breakpoints", () => {
        it("should reject widths that contain non-numeric values", () => {
            const invalidWidths = ["a", 100, 200, 300];

            expect(() => createBreakpoints(invalidWidths)).toThrow();
        });

        it("should reject fewer than 4 width definitions", () => {
            const invalidWidths = [100, 200, 300];

            expect(() => createBreakpoints(invalidWidths)).toThrow();
        });

        it("should reject more than 4 width definitions", () => {
            const invalidWidths = [100, 200, 300, 400, 500];

            expect(() => createBreakpoints(invalidWidths)).toThrow();
        });

        it("should reject width defintions that are not in increasing order", () => {
            const invalidWidths = [200, 100, 300, 400];

            expect(() => createBreakpoints(invalidWidths)).toThrow();
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
});
