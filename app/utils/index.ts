export const getCloser = (
  value: number,
  checkOne: number,
  checkTwo: number,
): number =>
  Math.abs(value - checkOne) < Math.abs(value - checkTwo) ? checkOne : checkTwo;
