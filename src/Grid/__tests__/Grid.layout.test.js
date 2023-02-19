import {
    generateSizeClassNames,
    getAdjustedLayoutProps,
    getGap,
} from "../Grid.layout";

describe("Grid layout", () => {
    describe("when calculating the gap", () => {
        it("should use default gap if none is provided", () => {
            expect(getGap()).toEqual("1em");
        });

        it("should use the provided gap with em if it is an integer", () => {
            expect(getGap(2)).toEqual("2em");
        });

        it("should use the provided gap with em if it is a decimal", () => {
            expect(getGap(0.5)).toEqual("0.5em");
        });

        it("should use the provided gap with em if it is a numeric string", () => {
            expect(getGap("2")).toEqual("2em");
        });

        it("should use the provided gap if it includes measurements", () => {
            expect(getGap("32px")).toEqual("32px");
        });
    });

    describe("when adjusting layout props", () => {
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

    describe("when generating class names", () => {
        it("should generate the correct class names for an item", () => {
            const props = {
                hide: { xs: false, sm: false, md: false, lg: false, xl: false },
                item: true,
                offset: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0 },
                width: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12 },
            };

            expect(generateSizeClassNames(props)).toEqual({
                "rcg-xs_h": false,
                "rcg-sm_h": false,
                "rcg-md_h": false,
                "rcg-lg_h": false,
                "rcg-xl_h": false,
                "rcg-xs-1-12": true,
                "rcg-sm-1-12": true,
                "rcg-md-1-12": true,
                "rcg-lg-1-12": true,
                "rcg-xl-1-12": true,
            });
        });

        it("should generate the correct class names for a container", () => {
            const props = {
                hide: { xs: false, sm: false, md: false, lg: false, xl: false },
                item: false,
                offset: { xs: 0, sm: 0, md: 0, lg: 0, xl: 3 },
                width: { xs: 12, sm: 12, md: 12, lg: 12, xl: 6 },
            };

            expect(generateSizeClassNames(props)).toEqual({
                "rcg-xs_h": false,
                "rcg-sm_h": false,
                "rcg-md_h": false,
                "rcg-lg_h": false,
                "rcg-xl_h": false,
                "rcg-xs-1-12": false,
                "rcg-sm-1-12": false,
                "rcg-md-1-12": false,
                "rcg-lg-1-12": false,
                "rcg-xl-4-6": false,
            });
        });

        it("should generate the correct class names for hiding items", () => {
            const props = {
                hide: { xs: true, sm: false, md: true, lg: false, xl: true },
                item: true,
                offset: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0 },
                width: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12 },
            };

            expect(generateSizeClassNames(props)).toEqual({
                "rcg-xs_h": true,
                "rcg-sm_h": false,
                "rcg-md_h": true,
                "rcg-lg_h": false,
                "rcg-xl_h": true,
                "rcg-xs-1-12": true,
                "rcg-sm-1-12": true,
                "rcg-md-1-12": true,
                "rcg-lg-1-12": true,
                "rcg-xl-1-12": true,
            });
        });
    });
});
