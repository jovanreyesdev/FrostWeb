export const toYMDFormat = (dateString) => new Date(dateString).toISOString().slice(0, 10);
