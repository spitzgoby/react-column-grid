jest.mock("../../utils/manageStyles", () => ({
    elementExistsWithId: jest.fn().mockReturnValue(false),
    injectCss: jest.fn(),
    removeCss: jest.fn(),
}));

import Hidden from "../Hidden";
import React from "react";
import { render } from "@testing-library/react";
import { GridProvider } from "../../GridProvider";

describe("<Hidden />", () => {
    it("should render a span component", () => {
        const { container } = render(<Hidden />);

        expect(container).toMatchSnapshot();
    });

    it("should use the correct classes based on size rules", () => {
        const { container } = render(<Hidden xs sm xl />);

        expect(container).toMatchSnapshot();
    });

    it("should prioritize hide prop when present", () => {
        const { container } = render(
            <Hidden hide={{ xs: true, md: false }} md />
        );

        expect(container).toMatchSnapshot();
    });

    it("should use the id provided in the grid context", () => {
        const { container } = render(
            <GridProvider>
                <Hidden />
            </GridProvider>
        );

        expect(container).toMatchSnapshot();
    });
});
