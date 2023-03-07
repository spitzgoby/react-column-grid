import { createContext } from "react";
import { DEFAULT_SCREEN_WIDTHS, ScreenWidths } from "../utils/breakpoints";
import { DEFAULT_GAP } from "../utils/gap";
import { Numeric } from "../utils/numeric";

export const DEFAULT_COLUMNS = 12;
export const INITIAL_ID = '_';

export type GridContextValues = {
    breakpoints: ScreenWidths,
    columns: number,
    gap: Numeric,
    id: string
};

export const GridContext = createContext<GridContextValues>({
    breakpoints: DEFAULT_SCREEN_WIDTHS,
    columns: DEFAULT_COLUMNS,
    gap: DEFAULT_GAP,
    id: INITIAL_ID
});

export default GridContext;
