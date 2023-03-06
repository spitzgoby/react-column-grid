import { DEFAULT_GAP } from "../constants/gap";
import { DEFAULT_COLUMNS } from "../GridProvider/GridContext";
import { Breakpoint, sizes } from "../utils/breakpoints";
import { 
    getValueOfNumeric, 
    Numeric, 
    numericIsDecimal,
    numericIsInteger 
} from "../utils/numeric";

export type NumericBreakpointValues = {
    xs?: Numeric,
    sm?: Numeric,
    md?: Numeric,
    lg?: Numeric,
    xl?: Numeric
};
export type BooleanBreakpointValues = {
    xs?: boolean,
    sm?: boolean,
    md?: boolean,
    lg?: boolean,
    xl?: boolean
}

const gapHasNoUnits = (gap: string) => numericIsInteger(gap) || numericIsDecimal(gap);
export const getGap = (gap: Numeric): string => {
    let result: string = DEFAULT_GAP;

    if (typeof gap === 'string') {
        if (gapHasNoUnits(gap)) {
            result = gap + 'em';
        } else {
            result = gap as string 
        }
    } else if (typeof gap === 'number') {
        result = gap + 'em'; 
    }     
    
    return result;
}

const areValidColumns = (colWidth: Numeric, colOffset: Numeric): boolean => {
    const width = getValueOfNumeric(colWidth);
    const offset = getValueOfNumeric(colOffset);

    return !isNaN(width) &&
    !isNaN(offset) &&
    width > 0 &&
    width + offset <= DEFAULT_COLUMNS;
}

export const getAdjustedLayoutProps = (
    size: Breakpoint,
    offset: NumericBreakpointValues,
    width: NumericBreakpointValues,
    hide: BooleanBreakpointValues,
    clear: BooleanBreakpointValues,
    columns: NumericBreakpointValues
) => {
    const sizeHide = hide?.[size];
    const sizeOffset = getValueOfNumeric(offset?.[size]) || 0;
    const sizeWidth = getValueOfNumeric(width?.[size]);
    const suggestedOffset = getValueOfNumeric(columns[size]) + sizeOffset;
    let adjustedColumn = columns[size];
    let adjustedOffset = sizeHide ? 0 : sizeOffset;

    if (areValidColumns(sizeWidth, suggestedOffset) && !sizeHide) {
        adjustedOffset = suggestedOffset;
        adjustedColumn = !clear[size] ? suggestedOffset + sizeWidth : 0;
    } else if (
        areValidColumns(sizeWidth, sizeOffset) &&
        !sizeHide
    ) {
        adjustedOffset = sizeOffset;
        adjustedColumn = !clear[size] ? sizeOffset + sizeWidth : 0;
    }

    return {
        adjustedOffset,
        adjustedColumn,
    };
};

type SizeClassNamesParams = { 
    hide: BooleanBreakpointValues, 
    item: boolean, 
    offset: NumericBreakpointValues, 
    width: NumericBreakpointValues
};
type SizeClassNames = {
    [key: string]: boolean,
}
export const generateSizeClassNames = ({ hide, item, offset, width }: SizeClassNamesParams, id: string) => {
    return sizes.reduce((acc: SizeClassNames, size: Breakpoint) => {
        acc[generateHiddenClassNameForSize(size, id)] = hide[size];
        acc[generateColumnSpanClassNameForSize(size, offset[size], width[size], id)] = item;

        return acc;
    }, {});
};

export const generateContainerClassName = (id: string) => `${id}-c`;
export const generateHiddenClassNameForSize = (size: string, id: string) => 
    `${id}-${size}_h`
export const generateColumnSpanClassNameForSize = (
    size: string, 
    offset: Numeric, 
    width: Numeric, 
    id: string
    ) => `${id}-${size}-${getValueOfNumeric(offset) + 1}-${getValueOfNumeric(width)}`;
