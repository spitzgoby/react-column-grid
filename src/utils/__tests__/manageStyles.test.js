jest.mock("../browser", () => ({
    getDocument: jest.fn(),
}));

import { elementExistsWithId, injectCss, removeCss } from "../manageStyles";
import { getDocument } from "../browser";

describe("manageStyles", () => {
    const mockId = "mockId";
    const mockStyle = "testStyle";
    let mockDocument;
    let mockElement;

    beforeEach(() => {
        mockElement = { setAttribute: jest.fn() };
        mockDocument = {
            createElement: jest.fn().mockReturnValue(mockElement),
            head: {
                children: [],
                insertBefore: jest.fn(),
                removeChild: jest.fn(),
            },
            getElementById: jest.fn().mockReturnValue(mockElement),
        };

        getDocument.mockReturnValue(mockDocument);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("when injecting css", () => {
        it("should not throw an exception if the document is unavailable", () => {
            const inject = () => injectCss(mockId, mockStyle);

            getDocument.mockReturnValueOnce();

            expect(inject).not.toThrow();
        });

        it("should add a style element to the document head with the given id", () => {
            const expectedElement = {
                ...mockElement,
                id: mockId,
                innerHTML: mockStyle,
            };

            mockDocument.getElementById.mockReturnValue(undefined);

            injectCss(mockId, mockStyle);

            expect(mockDocument.head.insertBefore).toHaveBeenCalledWith(
                expectedElement,
                null
            );
        });

        it("should add the given css to the element created", () => {
            injectCss(mockId, mockStyle);

            expect(mockElement.innerHTML).toEqual(mockStyle);
        });

        it("should set the element type correctly", () => {
            mockDocument.getElementById.mockReturnValue(undefined);

            injectCss(mockId, mockStyle);

            expect(mockElement.setAttribute).toHaveBeenCalledWith(
                "type",
                "text/css"
            );
        });

        it("should use the existing element if one exists with the given id", () => {
            mockDocument.head.children = [mockElement];

            injectCss(mockId, mockStyle);

            expect(mockDocument.createElement).not.toHaveBeenCalled();
        });
    });

    describe("when checking for an element's existence", () => {
        it("should declare when an element already exists with the given id", () => {
            expect(elementExistsWithId("rcg")).toEqual(true);
        });

        it("should declare when an element does not exist with the given id", () => {
            mockDocument.getElementById.mockReturnValueOnce(null);

            expect(elementExistsWithId("rcg")).toEqual(false);
        });
    });

    describe("when removing css", () => {
        it("should not throw an exception if the document is unavailable", () => {
            const remove = () => removeCss(mockId);

            getDocument.mockReturnValue(undefined);

            expect(remove).not.toThrow();
        });

        it("should grab the element with the given id", () => {
            removeCss(mockId);

            expect(mockDocument.getElementById).toHaveBeenCalledWith(mockId);
        });

        it("should remove the style element with the given id", () => {
            removeCss(mockId);

            expect(mockDocument.head.removeChild).toHaveBeenCalledWith(
                mockElement
            );
        });

        it("should not attempt to remove an element if it can not be found", () => {
            mockDocument.getElementById.mockReturnValueOnce(null);

            removeCss(mockId);

            expect(mockDocument.head.removeChild).not.toHaveBeenCalled();
        });
    });
});
