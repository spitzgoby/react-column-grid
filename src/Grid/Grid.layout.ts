import { Breakpoint, sizes } from "../utils/breakpoints";
import { DEFAULT_GAP } from "../constants/gap";
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
    const gapType = typeof gap;
    let result: string = DEFAULT_GAP;

    if (gapType === 'string') {
        if (gapHasNoUnits(gap as string)) {
            result = gap + 'em';
        } else {
            result = gap as string 
        }
    } else if (gapType === 'number') {
        result = gap + 'em'; 
    }     
    
    return result;
}

const NUM_COLUMNS = 12;
const areValidColumns = (colWidth: Numeric, colOffset: Numeric): boolean => {
    const width = getValueOfNumeric(colWidth);
    const offset = getValueOfNumeric(colOffset);

    return !isNaN(width) &&
    !isNaN(offset) &&
    width > 0 &&
    width + offset <= NUM_COLUMNS;
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
export const generateSizeClassNames = ({ hide, item, offset, width }: SizeClassNamesParams) => {
    return sizes.reduce((acc: SizeClassNames, size: Breakpoint) => {
        acc[`rcg-${size}_h`] = hide[size];
        acc[`rcg-${size}-${getValueOfNumeric(offset[size]) + 1}-${width[size]}`] = item;

        return acc;
    }, {});
};
