import { createRandomId } from "../id";

describe("createRandomId", () => {
    it("should create a random id of the given length", () => {
        expect(createRandomId(2).length).toEqual(2);
    });

    it("should create a random id with the default length if no length is provided", () => {
        expect(createRandomId().length).toEqual(3);
    });

    it("should only use alphabetic characters", () => {
        // due to the random nature of the id creation it may be necessary to
        // update this test to control Math.random if id creation becomes more
        // complicated in the future
        const alphabetRe = /^[A-Za-z]+$/;

        expect(alphabetRe.test(createRandomId())).toBe(true);
    });
});
