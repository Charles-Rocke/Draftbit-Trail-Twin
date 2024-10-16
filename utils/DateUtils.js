import dayjs from 'dayjs';
import * as DateFns from 'date-fns';

export const addSeconds = (d, n = 0) => dayjs(d).add(n, 'seconds');
export const addMinutes = (d, n = 0) => dayjs(d).add(n, 'minutes');
export const addHours = (d, n = 0) => dayjs(d).add(n, 'hours');
export const addDays = (d, n = 0) => dayjs(d).add(n, 'days');
export const addWeeks = (d, n = 0) => dayjs(d).add(n, 'weeks');
export const addMonths = (d, n = 0) => dayjs(d).add(n, 'months');
export const addYears = (d, n = 0) => dayjs(d).add(n, 'years');
export const format = (d, f = '') => dayjs(d).format(f);
export const formatDistanceToNow = d =>
  DateFns.formatDistanceToNow(new Date(d));
