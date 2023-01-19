import Hidden from "../Hidden";
import React from "react";
import { shallow } from "enzyme";

describe("<Hidden />", () => {
    it("should render a span component", () => {
        const hidden = shallow(<Hidden />);

        expect(hidden).toMatchSnapshot();
    });

    it("should use the correct classes based on size rules", () => {
        const hidden = shallow(<Hidden xs sm xl />);

        expect(hidden.prop("className")).toBe("rcg-h-xs rcg-h-sm rcg-h-xl");
    });

    it("should prioritize hide prop when present", () => {
        const hidden = shallow(<Hidden hide={{ xs: true, md: false }} md />);

        expect(hidden.prop("className")).toBe("rcg-h-xs rcg-h-sm");
    });
});
