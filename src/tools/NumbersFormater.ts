const RoundToInteger = (num: number): number => {
  return Math.round(num);
};

const RoundUpToInteger = (num: number): number => {
  return Math.ceil(num);
};

const RoundToOneDecimal = (num: number): number => {
  return Math.round(num * 10) / 10;
};

const RoundToTwoDecimals = (num: number): number => {
  return Math.round(num * 100) / 100;
}

export {
  RoundToInteger,
  RoundUpToInteger,
  RoundToOneDecimal,
  RoundToTwoDecimals,
};