import { addMissingSizes } from "../utils/breakpoints";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import { createUseStyles } from "react-jss";
import styles from "./Hidden.styles";
import { ThemeContext } from "../ThemeContext";

const defaultHide = false;

const useShorthandSyntax = () => false;

const Hidden = ({ children, hide, xs, sm, md, lg, xl }) => {
    const { breakpoints } = useContext(ThemeContext);
    const buildHideUsingShorthandSizes = () => ({ xs, sm, md, lg, xl });
    const hasShorthandSizes = xs || sm || md || lg || xl;
    const adjustedHide =
        hide || !hasShorthandSizes
            ? addMissingSizes("hide", hide, defaultHide, useShorthandSyntax)
            : buildHideUsingShorthandSizes();
    const useStyles = createUseStyles(styles(breakpoints));
    const { hidden: hiddenClass } = useStyles({ hide: adjustedHide });

    return <span className={hiddenClass}>{children}</span>;
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
