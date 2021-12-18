import { addMissingSizes } from './breakpoints';
import React from 'react';
import { createUseStyles } from 'react-jss';
import styles from './Hidden.styles';

const defaultHide = false;

const Hidden = ({ children, hide }) => {
    const useShorthandSyntax = () => false;
    const adjustedHide = addMissingSizes('hide', hide, defaultHide, useShorthandSyntax);
    const useStyles = createUseStyles(styles);
    const { hidden: hiddenClass } = useStyles({ hide: adjustedHide });

    return (
        <span className={hiddenClass}>{children}</span>
    );
} 

export default Hidden;