import { createScreenMediaQuery, DEFAULT_BREAKPOINTS } from "../breakpoints";
import styles from "../Grid.styles";

const xsMediaQuery = createScreenMediaQuery(DEFAULT_BREAKPOINTS[0]);
const defaultStyles = styles(DEFAULT_BREAKPOINTS);

describe("Grid styles", () => {
    describe(".grid", () => {
        describe("[display]", () => {
            it("should provide a [display] value of none if the item is hidden", () => {
                const mockProps = { hide: { xs: true } };

                expect(
                    defaultStyles[xsMediaQuery].grid.display(mockProps)
                ).toEqual("none");
            });

            it("should provide a [display] value of grid if the item is a container", () => {
                const mockProps = { container: true };

                expect(
                    defaultStyles[xsMediaQuery].grid.display(mockProps)
                ).toEqual("grid");
            });

            it("should not provide a [display] value if the item is not a container nor hidden", () => {
                const mockProps = {};

                expect(
                    defaultStyles[xsMediaQuery].grid.display(mockProps)
                ).toEqual(null);
            });
        });
    });

    describe(".container", () => {
        describe("[gap]", () => {
            it("should use default gap size if no gap is provided in props", () => {
                expect(defaultStyles.container.gap({})).toEqual("1em");
            });

            it("should set gap size when it is 0", () => {
                const mockProps = { gap: 0 };

                expect(defaultStyles.container.gap(mockProps)).toEqual("0em");
            });

            it("should set the gap to em if a number is provided", () => {
                const mockProps = { gap: 2 };

                expect(defaultStyles.container.gap(mockProps)).toEqual("2em");
            });

            it("should set the gap to em if a numberic string is provided", () => {
                const mockProps = { gap: "2" };

                expect(defaultStyles.container.gap(mockProps)).toEqual("2em");
            });

            it("should set the gap to any generic size if the string is non-numeric", () => {
                const mockProps = { gap: "5%" };

                expect(defaultStyles.container.gap(mockProps)).toEqual("5%");
            });
        });

        describe("[gridTemplateColumns]", () => {
            it("should set the grid template columns based on the columns provided", () => {
                const mockProps = { columns: 6 };

                expect(
                    defaultStyles.container.gridTemplateColumns(mockProps)
                ).toEqual("repeat(6, 1fr)");
            });

            it("should set the grid template columns with defaults if no prop is provided", () => {
                const mockProps = {};

                expect(
                    defaultStyles.container.gridTemplateColumns(mockProps)
                ).toEqual("repeat(12, 1fr)");
            });
        });
    });

    describe(".item", () => {
        describe("[gridColumn]", () => {
            it("should produce a [gridColumn] value with the correct starting column and span", () => {
                const mockProps = { offset: { xs: "3" }, width: { xs: "6" } };

                expect(
                    defaultStyles[xsMediaQuery].item.gridColumn(mockProps)
                ).toEqual("4 / span 6");
            });

            it("should not produce a [gridColumn] value with a non-numeric offset", () => {
                const mockProps = { offset: { xs: "" }, width: { xs: "6" } };

                expect(
                    defaultStyles[xsMediaQuery].item.gridColumn(mockProps)
                ).toEqual(null);
            });

            it("should not produce a [gridColumn] value with a non-numeric width", () => {
                const mockProps = { offset: { xs: "3" }, width: { xs: "" } };

                expect(
                    defaultStyles[xsMediaQuery].item.gridColumn(mockProps)
                ).toEqual(null);
            });
        });
    });

    describe("@media screen and (breakpoint)", () => {
        const expectGrid = {
            container: { gap: expect.any(Function) },
            grid: { display: expect.any(Function) },
            item: { gridColumn: expect.any(Function) },
        };

        it("should contain the correct breakpoints", () => {
            expect(defaultStyles).toEqual(
                expect.objectContaining({
                    "@media screen and (max-width: 599px)": expectGrid,
                    "@media screen and (min-width: 600px) and (max-width: 899px)":
                        expectGrid,
                    "@media screen and (min-width: 900px) and (max-width: 1199px)":
                        expectGrid,
                    "@media screen and (min-width: 1200px) and (max-width: 1535px)":
                        expectGrid,
                    "@media screen and (min-width: 1536px)": expectGrid,
                })
            );
        });

        it("should only set hide properties when the size is set in the hide prop", () => {
            const mockProps = {
                container: false,
                hide: { xs: true, sm: false },
            };

            expect(
                defaultStyles[
                    "@media screen and (max-width: 599px)"
                ].grid.display(mockProps, DEFAULT_BREAKPOINTS[0])
            ).toEqual("none");
            expect(
                defaultStyles[
                    "@media screen and (min-width: 600px) and (max-width: 899px)"
                ].grid.display(mockProps, DEFAULT_BREAKPOINTS[0])
            ).toEqual(null);
        });
    });
});
