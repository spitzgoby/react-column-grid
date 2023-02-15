export type Numeric = string | number | undefined;

const integerStringExpression = /^[0-9]+$/;
export const numericIsInteger = (numeric: Numeric) => {
  let result;  

  if (!numeric) {
    result = false;
  } else if (typeof numeric === 'string') {
    result = integerStringExpression.test(numeric);
  } else {
    result = Number.isInteger(numeric);
  }

  return result;
}

export const getValueOfNumeric = (numeric: Numeric): number | undefined =>
    typeof numeric === 'string' ? parseFloat(numeric) : numeric;