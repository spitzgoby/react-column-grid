import { getDocument } from "../browser";

describe("browser", () => {
    it("should return the global browser object", () => {
        expect(getDocument()).toBe(document);
    });
});
