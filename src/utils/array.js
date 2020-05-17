export const getHighestValue = (arr) => Math.max(...arr);

export const filterByElement = (arr, element) => arr
  .filter((a) => a.elementId === element);

export const findByElement = (arr, element) => arr
  .find((a) => a.elementId === element);
