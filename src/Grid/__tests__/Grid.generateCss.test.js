jest.mock("../../utils/mediaQueries", () => ({
    generateScreenQueries: jest.fn(),
}));
jest.mock("../../utils/breakpoints", () => ({ sizes: ["xs"] }));

import { generateScreenQueries } from "../../utils/mediaQueries";
import {
    generateGridBreakpointCss,
    generateGridContainerCss,
} from "../Grid.generateCss";

describe("Generating Grid CSS", () => {
    it("should create size classes and generate media queries with them", () => {
        const mockBreakpointDefinitions = [
            {
                size: "xs",
                minWidth: "499px",
            },
        ];

        generateGridBreakpointCss(mockBreakpointDefinitions, 2, "rcg");

        expect(generateScreenQueries).toHaveBeenCalledWith(
            mockBreakpointDefinitions,
            [
                ".rcg-xs_h{display: none;}.rcg-xs-1-1{grid-column:1/ span 1;}.rcg-xs-1-2{grid-column:1/ span 2;}.rcg-xs-2-1{grid-column:2/ span 1;}",
            ]
        );
    });

    it("should create a root container class definition", () => {
        expect(generateGridContainerCss(1, "rcg")).toEqual(
            ".rcg-c{display: grid;grid-template-columns: repeat(1, 1fr);}"
        );
    });
});
