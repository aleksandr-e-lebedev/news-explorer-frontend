export default (intervalLength) => {
  if (typeof intervalLength !== 'number') {
    return undefined;
  }

  const date = new Date();

  const parseDate = () => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}-${month}-${day}`;
  };

  const dateTo = parseDate();

  date.setDate(date.getDate() - intervalLength);

  const dateFrom = parseDate();

  return {
    dateTo,
    dateFrom,
  };
};
