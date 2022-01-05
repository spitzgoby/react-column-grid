import { DEFAULT_BREAKPOINTS } from "./breakpoints";
import { DEFAULT_GAP } from "./gap";
import { createContext } from "react";

export const ThemeContext = createContext({
    breakpoints: DEFAULT_BREAKPOINTS,
    gap: DEFAULT_GAP,
});

export default ThemeContext;
