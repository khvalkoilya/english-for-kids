export default function getPercent(item) {
  let percent = item.false / (item.true + item.false);
  percent *= 100;
  percent = Math.round(percent * 100) / 100;
  if (Number.isNaN(percent)) {
    percent = 0;
  }
  return percent;
}
