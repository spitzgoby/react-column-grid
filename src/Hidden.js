import { addMissingSizes } from "./breakpoints";
import PropTypes from "prop-types";
import React from "react";
import { createUseStyles } from "react-jss";
import styles from "./Hidden.styles";

const defaultHide = false;

const Hidden = ({ children, hide }) => {
    const useShorthandSyntax = () => false;
    const adjustedHide = addMissingSizes(
        "hide",
        hide,
        defaultHide,
        useShorthandSyntax
    );
    const useStyles = createUseStyles(styles);
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
};

export default Hidden;
