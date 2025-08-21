export const range = (min, max) =>
  Array.from(Array(max - min), (_, index) => index + min);
