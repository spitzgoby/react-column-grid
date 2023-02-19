import {
    numericIsInteger,
    getValueOfNumeric,
    numericIsDecimal,
} from "../numeric";

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

    describe("when determining if a numeric is a decimal", () => {
        it("should determine when a string is a decimal with a leading zero", () => {
            expect(numericIsDecimal("0.1")).toBe(true);
        });

        it("should determine when a string is a decimal without a leading zero", () => {
            expect(numericIsDecimal(".1")).toBe(true);
        });

        it("should determine an integer string is not a decimal", () => {
            expect(numericIsDecimal("1")).toBe(false);
        });

        it("should determine a string with multiple dots is not a decimal", () => {
            expect(numericIsDecimal("1.1.1")).toBe(false);
        });

        it("should determine when a number is a decimal", () => {
            expect(numericIsDecimal(0.1)).toBe(true);
        });

        it("should determine when a number is not a decimal", () => {
            expect(numericIsDecimal(1)).toBe(false);
        });

        it("should determine that undefined is not a decimal", () => {
            expect(numericIsDecimal(undefined)).toBe(false);
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
