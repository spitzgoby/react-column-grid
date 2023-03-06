import { createContext } from "react";
import { ScreenWidths } from "../utils/breakpoints";

export const DEFAULT_COLUMNS = 12;
export const INITIAL_ID = '_';

export type GridContextValues = {
    breakpoints: ScreenWidths,
    columns: number,
    id: string
};

export const GridContext = createContext<GridContextValues>({
    breakpoints: [600, 900, 1200, 1536],
    columns: DEFAULT_COLUMNS,
    id: INITIAL_ID
});

export default GridContext;
