jest.mock("../../utils/mediaQueries", () => ({
    generateScreenQueries: jest.fn(),
}));

import { generateScreenQueries } from "../../utils/mediaQueries";
import { generateHiddenBreakpointCss } from "../Hidden.generateCss";

describe("Generating Hidden CSS", () => {
    it("should create size classes and generate media queries with them", () => {
        const mockBreakpointDefinitions = [
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
        ];

        generateHiddenBreakpointCss(mockBreakpointDefinitions);

        expect(generateScreenQueries).toHaveBeenCalledWith(
            mockBreakpointDefinitions,
            [
                ".rcg-h-xs{display: none;}",
                ".rcg-h-sm{display: none;}",
                ".rcg-h-md{display: none;}",
                ".rcg-h-lg{display: none;}",
                ".rcg-h-xl{display: none;}",
            ]
        );
    });
});
