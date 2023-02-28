jest.mock("../../Grid/Grid.generateCss", () => ({
    generateGridBreakpointCss: jest.fn().mockReturnValue([".breakpointCss"]),
    generateGridContainerCss: jest.fn().mockReturnValue(".containerCss"),
}));
jest.mock("../../Hidden/Hidden.generateCss", () => ({
    generateHiddenBreakpointCss: jest.fn().mockReturnValue([".hiddenCss"]),
}));
jest.mock("../../utils/manageStyles", () => ({
    injectCss: jest.fn(),
    removeCss: jest.fn(),
}));
jest.mock("../../utils/breakpoints", () => ({
    generateBreakpointDefinitions: jest
        .fn()
        .mockReturnValue("breakpointDefinitions"),
}));

import GridProvider from "../GridProvider";
import { injectCss, removeCss } from "../../utils/manageStyles";
import { render } from "@testing-library/react";
import {
    generateGridBreakpointCss,
    generateGridContainerCss,
} from "../../Grid/Grid.generateCss";
import React from "react";
import { DEFAULT_COLUMNS } from "../GridContext";

describe("<GridProvider>", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should gather breakpoint css for grid components", () => {
        const numColumns = 12;

        render(<GridProvider breakpoints={[]} columns={numColumns} />);

        expect(generateGridBreakpointCss).toHaveBeenCalledWith(
            "breakpointDefinitions",
            numColumns
        );
    });

    it("should gather container css for grid components", () => {
        const numColumns = 12;

        render(<GridProvider breakpoints={[]} columns={numColumns} />);

        expect(generateGridContainerCss).toHaveBeenCalledWith(numColumns);
    });

    it("should use default column count if none is provided", () => {
        render(<GridProvider breakpoints={[]} />);

        expect(generateGridContainerCss).toHaveBeenCalledWith(DEFAULT_COLUMNS);
    });

    it("should attempt to inject css when first mounted", () => {
        render(<GridProvider breakpoints={[]} />);

        expect(injectCss).toHaveBeenCalledWith(
            "rcg-styles-1",
            ".hiddenCss.containerCss.breakpointCss"
        );
    });

    it("should remove css when the component unmounts", () => {
        const { unmount } = render(<GridProvider breakpoints={[]} />);

        unmount();

        expect(removeCss).toHaveBeenCalledWith("rcg-styles-1");
    });
});
