import classNames from "classnames";
import { addMissingSizes } from "../utils/breakpoints";
import PropTypes, { ReactNodeLike } from "prop-types";
import React from "react";

import "./Hidden.scss";
import { BooleanBreakpointValues } from "../Grid/Grid.layout";

const defaultHide = false;

// Shorthand syntax does not apply to the <Hidden /> element
const useShorthandSyntax = () => false;

type Props = {
    children: ReactNodeLike,
    hide?: BooleanBreakpointValues,
    lg?: boolean,
    md?: boolean,
    sm?: boolean,
    xl?: boolean,
    xs?: boolean
};

const Hidden: React.FC<Props> = ({ children, hide, xs, sm, md, lg, xl }) => {
    const buildHideUsingShorthandSizes = () => ({ xs, sm, md, lg, xl });
    const hasShorthandSizes = xs || sm || md || lg || xl;
    const adjustedHide =
        hide || !hasShorthandSizes
            ? addMissingSizes("hide", hide, defaultHide, useShorthandSyntax)
            : buildHideUsingShorthandSizes();

    const getClass = () =>
        classNames({
            "rcg-h-xs": adjustedHide.xs,
            "rcg-h-sm": adjustedHide.sm,
            "rcg-h-md": adjustedHide.md,
            "rcg-h-lg": adjustedHide.lg,
            "rcg-h-xl": adjustedHide.xl,
        });

    return <span className={getClass()}>{children}</span>;
};

Hidden.propTypes = {
    children: PropTypes.node,
    hide: PropTypes.shape({
        xs: PropTypes.bool,
        sm: PropTypes.bool,
        md: PropTypes.bool,
        lg: PropTypes.bool,
        xl: PropTypes.bool,
    }),
    xs: PropTypes.bool,
    sm: PropTypes.bool,
    md: PropTypes.bool,
    lg: PropTypes.bool,
    xl: PropTypes.bool,
};

export default Hidden;
