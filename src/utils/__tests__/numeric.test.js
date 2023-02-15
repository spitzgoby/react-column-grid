import { numericIsInteger, getValueOfNumeric } from "../numeric";

describe("numeric utilities", () => {
    describe("when determining if a numeric is an integer", () => {
        it("should determine when a string is an integer", () => {
            expect(numericIsInteger("1")).toBe(true);
        });

        it("should determine when a string is not an integer", () => {
            expect(numericIsInteger("1.1")).toBe(false);
        });

        it("should determine when a number is an integer", () => {
            expect(numericIsInteger(1)).toBe(true);
        });

        it("should determine when a number is not an integer", () => {
            expect(numericIsInteger(1.1)).toBe(false);
        });

        it("should determine that undefined is not an integer", () => {
            expect(numericIsInteger(undefined)).toBe(false);
        });
    });

    describe("when getting the value of a numeric", () => {
        it("should return the parsed value of a string", () => {
            expect(getValueOfNumeric("1")).toEqual(1);
        });

        it("should return the value of a number", () => {
            expect(getValueOfNumeric(1)).toEqual(1);
        });

        it("should return NaN for an invalid string", () => {
            expect(getValueOfNumeric("abc")).toEqual(NaN);
        });

        it("should return undefined for undefined", () => {
            expect(getValueOfNumeric(undefined)).toEqual(undefined);
        });
    });
});
