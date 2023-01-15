import { getAdjustedLayoutProps } from "../Grid.layout";

describe("Grid layout", () => {
    it("should get the adjusted layout props for an item at a given size", () => {
        const mockSize = "xs";
        const mockOffset = { xs: 0 };
        const mockWidth = { xs: 6 };
        const mockHide = { xs: false };
        const mockClear = { xs: false };
        const mockColumns = { xs: 0 };
        const mockNumColumns = 12;

        expect(
            getAdjustedLayoutProps(
                mockSize,
                mockOffset,
                mockWidth,
                mockHide,
                mockClear,
                mockColumns,
                mockNumColumns
            )
        ).toEqual({
            adjustedOffset: 0,
            adjustedColumn: 6,
        });
    });

    it("should get the adjusted layout props for an item when it overflows a row", () => {
        const mockSize = "xs";
        const mockOffset = { xs: 0 };
        const mockWidth = { xs: 7 };
        const mockHide = { xs: false };
        const mockClear = { xs: false };
        const mockColumns = { xs: 6 };
        const mockNumColumns = 12;

        expect(
            getAdjustedLayoutProps(
                mockSize,
                mockOffset,
                mockWidth,
                mockHide,
                mockClear,
                mockColumns,
                mockNumColumns
            )
        ).toEqual({
            adjustedOffset: 0,
            adjustedColumn: 7,
        });
    });

    it("should get the adjusted layout props for an item when it completes a row", () => {
        const mockSize = "xs";
        const mockOffset = { xs: 0 };
        const mockWidth = { xs: 6 };
        const mockHide = { xs: false };
        const mockClear = { xs: false };
        const mockColumns = { xs: 6 };
        const mockNumColumns = 12;

        expect(
            getAdjustedLayoutProps(
                mockSize,
                mockOffset,
                mockWidth,
                mockHide,
                mockClear,
                mockColumns,
                mockNumColumns
            )
        ).toEqual({
            adjustedOffset: 6,
            adjustedColumn: 12,
        });
    });

    it("should consider offset when calculating the new column value", () => {
        const mockSize = "xs";
        const mockOffset = { xs: 3 };
        const mockWidth = { xs: 6 };
        const mockHide = { xs: false };
        const mockClear = { xs: false };
        const mockColumns = { xs: 0 };
        const mockNumColumns = 12;

        expect(
            getAdjustedLayoutProps(
                mockSize,
                mockOffset,
                mockWidth,
                mockHide,
                mockClear,
                mockColumns,
                mockNumColumns
            )
        ).toEqual({
            adjustedOffset: 3,
            adjustedColumn: 9,
        });
    });

    it("should not consider an item if it is hidden", () => {
        const mockSize = "xs";
        const mockOffset = { xs: 3 };
        const mockWidth = { xs: 6 };
        const mockHide = { xs: true };
        const mockClear = { xs: false };
        const mockColumns = { xs: 0 };
        const mockNumColumns = 12;

        expect(
            getAdjustedLayoutProps(
                mockSize,
                mockOffset,
                mockWidth,
                mockHide,
                mockClear,
                mockColumns,
                mockNumColumns
            )
        ).toEqual({
            adjustedOffset: 0,
            adjustedColumn: 0,
        });
    });

    it("should set the new coumn count to 0 if an item clears its row", () => {
        const mockSize = "xs";
        const mockOffset = { xs: 3 };
        const mockWidth = { xs: 6 };
        const mockHide = { xs: false };
        const mockClear = { xs: true };
        const mockColumns = { xs: 0 };
        const mockNumColumns = 12;

        expect(
            getAdjustedLayoutProps(
                mockSize,
                mockOffset,
                mockWidth,
                mockHide,
                mockClear,
                mockColumns,
                mockNumColumns
            )
        ).toEqual({
            adjustedOffset: 3,
            adjustedColumn: 0,
        });
    });
});
