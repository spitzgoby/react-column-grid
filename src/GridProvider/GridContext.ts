import { createContext } from "react";
import { ScreenWidths } from "../utils/breakpoints";

export const DEFAULT_COLUMNS = 12;

export type GridContextValues = {
    breakpoints: ScreenWidths,
    columns: number
};
export const GridContext = createContext<GridContextValues>({
    breakpoints: [600, 900, 1200, 1536],
    columns: DEFAULT_COLUMNS
});

export default GridContext;
