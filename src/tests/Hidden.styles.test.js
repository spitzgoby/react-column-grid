import { createScreenMediaQuery, DEFAULT_BREAKPOINTS } from "../breakpoints";
import styles from "../Hidden.styles";

const defaultStyles = styles(DEFAULT_BREAKPOINTS);
const xsMediaQuery = createScreenMediaQuery(DEFAULT_BREAKPOINTS[0]);

describe("Hidden styles", () => {
    describe("[display]", () => {
        it("should not provide a [display] value if the item is not hidden", () => {
            const mockHiddenProps = {
                hide: { xs: false },
            };

            expect(
                defaultStyles[xsMediaQuery].hidden.display(mockHiddenProps)
            ).toBe(null);
        });

        it("should not provide a [display] value of none if the item is hidden", () => {
            const mockHiddenProps = {
                hide: { xs: true },
            };

            expect(
                defaultStyles[xsMediaQuery].hidden.display(mockHiddenProps)
            ).toBe("none");
        });
    });

    describe("@media and (breakpoint)", () => {
        const expectHidden = {
            hidden: { display: expect.any(Function) },
        };

        it("should create media queries at every breakpoint", () => {
            expect(defaultStyles).toEqual(
                expect.objectContaining({
                    "@media screen and (max-width: 599px)": expectHidden,
                    "@media screen and (min-width: 600px) and (max-width: 899px)":
                        expectHidden,
                    "@media screen and (min-width: 900px) and (max-width: 1199px)":
                        expectHidden,
                    "@media screen and (min-width: 1200px) and (max-width: 1535px)":
                        expectHidden,
                    "@media screen and (min-width: 1536px)": expectHidden,
                })
            );
        });
    });
});
