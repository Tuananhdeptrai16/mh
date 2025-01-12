export const DATE_FORMAT = 'DD/MM/YYYY';
export const DATE_FORMAT_LIST = [DATE_FORMAT, DATE_FORMAT];

export let DAY_OF_WEEK = [
  {
    value: 1,
    code: 'Mon',
    name: 'Thứ 2',
  },
  {
    value: 2,
    code: 'Tue',
    name: 'Thứ 3',
  },
  {
    value: 3,
    code: 'Wed',
    name: 'Thứ 4',
  },
  {
    value: 4,
    code: 'Thu',
    name: 'Thứ 5',
  },
  {
    value: 5,
    code: 'Fri',
    name: 'Thứ 6',
  },
  {
    value: 6,
    code: 'Sat',
    name: 'Thứ 7',
  },
  {
    value: 0,
    code: 'Sun',
    name: 'Chủ nhật',
  },
];

export function updateDayOfWeek(newValue) {
  DAY_OF_WEEK = newValue;
}

export function getDayOfWeek() {
  const dayOfWeek = {};
  DAY_OF_WEEK.forEach((currentValue) => {
    const { code, name } = currentValue;
    dayOfWeek[code] = name;
  }, {});
  return dayOfWeek;
}

export function calcAdsManagementRunningTime({
  start_time,
  end_time,
  total_time_pause,
}) {
  const startTime = new Date(start_time).getTime();
  const pausedTime = new Date(total_time_pause).getTime();
  const endTime = new Date(end_time).getTime();
  let currentTime = new Date().getTime();
  if (currentTime < startTime) return null;
  if (currentTime > endTime) currentTime = endTime;
  const runningTime = (currentTime - startTime - pausedTime) / 1000;
  return runningTime;
}
