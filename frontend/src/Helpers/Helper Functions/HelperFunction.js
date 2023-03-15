export const findClosestDate = (dates) => {
  const currentDate = new Date();
  let closestDate = null;
  let closestDiff = Infinity;

  for (let i = 0; i < dates.length; i++) {
    const date = new Date(dates[i]);
    const diff = Math.abs(currentDate.getTime() - date.getTime());

    if (diff < closestDiff) {
      closestDate = date;
      closestDiff = diff;
    }
  }

  return closestDate;
};
