export const toYMDFormat = (date) => new Date(date)
  .toISOString()
  .slice(0, 10);


export const compare = (date1, date2) => date1.getTime() === date2.getTime();
