import Hidden from "../Hidden";
import React from "react";
import { render } from "@testing-library/react";

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
});
