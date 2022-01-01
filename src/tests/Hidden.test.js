const mockUseStyles = jest.fn();
jest.mock("react-jss", () => ({ createUseStyles: () => mockUseStyles }));

import Hidden from "../Hidden";
import React from "react";
import { shallow } from "enzyme";

describe("<Hidden />", () => {
    beforeEach(() => {
        mockUseStyles.mockImplementation(() => ({}));
    });

    afterEach(() => {
        mockUseStyles.mockReset();
    });

    it("should render a span component", () => {
        const hidden = shallow(<Hidden />);

        expect(hidden).toMatchSnapshot();
    });

    it("should use the class provided by its styles", () => {
        mockUseStyles.mockImplementation(() => ({
            hidden: "test-hidden-class",
        }));

        const hidden = shallow(<Hidden />);

        expect(hidden.hasClass("test-hidden-class")).toBe(true);
    });

    it("should prioritize hide prop when present", () => {
        shallow(<Hidden hide={{ xs: true, sm: false }} sm />);

        expect(mockUseStyles).toHaveBeenCalledWith({
            hide: {
                xs: true,
                sm: false,
                md: false,
                lg: false,
                xl: false,
            },
        });
    });

    it("should use default hide prop when no props are passed", () => {
        shallow(<Hidden />);

        expect(mockUseStyles).toHaveBeenCalledWith({
            hide: {
                xs: false,
                sm: false,
                md: false,
                lg: false,
                xl: false,
            },
        });
    });

    it("should use the size shorthand props when no hide is available", () => {
        shallow(<Hidden sm lg />);

        expect(mockUseStyles).toHaveBeenCalledWith({
            hide: {
                xs: undefined,
                sm: true,
                md: undefined,
                lg: true,
                xl: undefined,
            },
        });
    });
});
