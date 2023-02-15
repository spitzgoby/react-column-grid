import { Numeric } from "./utils/numeric";
import { DEFAULT_GAP } from "./constants/gap";
import { createContext } from "react";

export const ThemeContext = createContext<{ gap: Numeric }>({
    gap: DEFAULT_GAP,
});

export default ThemeContext;
