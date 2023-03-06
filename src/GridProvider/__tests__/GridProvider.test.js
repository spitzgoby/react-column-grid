jest.mock("../../Grid/Grid.generateCss", () => ({
    generateGridBreakpointCss: jest.fn().mockReturnValue([".breakpointCss"]),
    generateGridContainerCss: jest.fn().mockReturnValue(".containerCss"),
}));
jest.mock("../../Hidden/Hidden.generateCss", () => ({
    generateHiddenBreakpointCss: jest.fn().mockReturnValue([".hiddenCss"]),
}));
jest.mock("../../utils/manageStyles", () => ({
    elementExistsWithId: jest.fn().mockReturnValue(false),
    injectCss: jest.fn(),
    removeCss: jest.fn(),
}));
jest.mock("../../utils/breakpoints", () => ({
    generateBreakpointDefinitions: jest
        .fn()
        .mockReturnValue("breakpointDefinitions"),
}));
jest.mock("../../utils/id", () => ({
    createRandomId: jest.fn().mockReturnValue("rcg"),
}));

import GridProvider from "../GridProvider";
import {
    elementExistsWithId,
    injectCss,
    removeCss,
} from "../../utils/manageStyles";
import { render } from "@testing-library/react";
import {
    generateGridBreakpointCss,
    generateGridContainerCss,
} from "../../Grid/Grid.generateCss";
import React from "react";
import { DEFAULT_COLUMNS } from "../GridContext";
import { createRandomId } from "../../utils/id";

const MOCK_ID = "rcg";

describe("<GridProvider>", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should gather breakpoint css for grid components", () => {
        const numColumns = 12;

        render(<GridProvider breakpoints={[]} columns={numColumns} />);

        expect(generateGridBreakpointCss).toHaveBeenCalledWith(
            "breakpointDefinitions",
            numColumns,
            MOCK_ID
        );
    });

    it("should gather container css for grid components", () => {
        const numColumns = 12;

        render(<GridProvider breakpoints={[]} columns={numColumns} />);

        expect(generateGridContainerCss).toHaveBeenCalledWith(
            numColumns,
            MOCK_ID
        );
    });

    it("should use default column count if none is provided", () => {
        render(<GridProvider breakpoints={[]} />);

        expect(generateGridContainerCss).toHaveBeenCalledWith(
            DEFAULT_COLUMNS,
            MOCK_ID
        );
    });

    it("should attempt to inject css when first mounted", () => {
        render(<GridProvider breakpoints={[]} />);

        expect(injectCss).toHaveBeenCalledWith(
            "rcg",
            ".hiddenCss.containerCss.breakpointCss"
        );
    });

    it("should not reuse an existing random id", () => {
        elementExistsWithId
            .mockReturnValueOnce(true)
            .mockReturnValueOnce(false);

        render(<GridProvider />);

        expect(createRandomId.mock.calls.length).toEqual(2);
    });

    it("should increment style ids when nested at depth greater than 1", () => {
        createRandomId
            .mockReturnValueOnce(MOCK_ID)
            .mockReturnValueOnce(MOCK_ID + "2");

        render(
            <GridProvider>
                <GridProvider />
            </GridProvider>
        );

        expect(injectCss.mock.calls[0]).toEqual([
            "rcg2",
            ".hiddenCss.containerCss.breakpointCss",
        ]);
    });

    it("should remove css when the component unmounts", () => {
        const { unmount } = render(<GridProvider breakpoints={[]} />);

        unmount();

        expect(removeCss).toHaveBeenCalledWith("rcg");
    });
});
