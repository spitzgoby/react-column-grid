import { sizes } from "../utils/breakpoints";
import { DEFAULT_GAP } from "../utils/gap";

export const getGap = (gap) =>
    gap || gap === 0
        ? !isNaN(gap) && !isNaN(parseFloat(gap))
            ? gap + "em"
            : gap
        : DEFAULT_GAP;

export const areValidColumns = (colWidth, colOffset, numColumns) =>
    !isNaN(parseInt(colWidth, 10)) &&
    !isNaN(parseInt(colOffset, 10)) &&
    colWidth > 0 &&
    colOffset + colWidth <= numColumns;

const NUM_COLUMNS = 12;
export const getAdjustedLayoutProps = (
    size,
    offset,
    width,
    hide,
    clear,
    columns
) => {
    const sizeHide = hide?.[size];
    const sizeOffset = parseInt(offset?.[size], 10) || 0;
    const sizeWidth = parseInt(width?.[size], 10);
    const suggestedOffset = columns[size] + sizeOffset;
    let adjustedColumn = columns[size];
    let adjustedOffset = sizeHide ? 0 : sizeOffset;

    if (areValidColumns(sizeWidth, suggestedOffset, NUM_COLUMNS) && !sizeHide) {
        adjustedOffset = suggestedOffset;
        adjustedColumn = !clear[size] ? suggestedOffset + sizeWidth : 0;
    } else if (
        areValidColumns(sizeWidth, sizeOffset, NUM_COLUMNS) &&
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

export const generateSizeClassNames = ({ hide, item, offset, width }) => {
    return sizes.reduce((acc, size) => {
        acc[`rcg-${size}_h`] = hide[size];
        acc[`rcg-${size}-${offset[size] + 1}-${width[size]}`] = item;

        return acc;
    }, {});
};
