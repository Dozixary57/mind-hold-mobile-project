export const RoundToTwoDecimals = (num: number): number => {
  return Math.round(num * 100) / 100;
}