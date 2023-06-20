export const getDateTime = (date: Date) => {
  const h = date.getHours();
  const min = date.getMinutes();
  return `${h < 10 ? '0' + h.toString() : h}:${
    min < 10 ? '0' + min.toString() : min
  }`;
};
