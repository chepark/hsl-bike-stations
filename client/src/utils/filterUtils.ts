export const stringifiedRange = (
  range: [number, number]
): string | undefined => {
  if (range[0] == 0 && range[1] == 0) return undefined;
  return range.join('-');
};
