export const areValidColumns = (colWidth, colOffset, numColumns) =>
    !isNaN(parseInt(colWidth, 10)) &&
    !isNaN(parseInt(colOffset, 10)) &&
    colWidth > 0 &&
    colOffset + colWidth <= numColumns;

export const getAdjustedLayoutProps = (
    size,
    offset,
    width,
    hide,
    clear,
    columns,
    numColumns
) => {
    const sizeHide = hide?.[size];
    const sizeOffset = parseInt(offset?.[size], 10) || 0;
    const sizeWidth = parseInt(width?.[size], 10);
    const suggestedOffset = columns[size] + sizeOffset;
    let adjustedColumn = columns[size];
    let adjustedOffset = sizeHide ? 0 : sizeOffset;

    if (areValidColumns(sizeWidth, suggestedOffset, numColumns) && !sizeHide) {
        adjustedOffset = suggestedOffset;
        adjustedColumn = !clear[size] ? suggestedOffset + sizeWidth : 0;
    } else if (
        areValidColumns(sizeWidth, sizeOffset, numColumns) &&
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
