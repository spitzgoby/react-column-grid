import { addMissingSizes } from "../breakpoints";

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
});
