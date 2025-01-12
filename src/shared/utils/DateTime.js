import { isNumber, isString } from 'lodash';
import moment from 'moment';
import { DATE_FORMAT } from '../constants/Date';

export const currentTime = () => Date.now();

export const getDifferentTime = (start, end, prefix = 'days') => {
  if (isString(start) && isString(end)) {
    return moment(end).diff(start, prefix) + 1;
  }
  if (isNumber(start) && isNumber(end)) {
    return moment(end).diff(start, prefix) + 1;
  }
  if (moment.isMoment(start) && moment.isMoment(end)) {
    return end.diff(start, prefix) + 1;
  }
  return 0;
};

export const getDateIso = (date, dateFormat = DATE_FORMAT) => {
  if (!date) return;
  if (moment(date).isValid()) return moment(date);
  if (moment(date, dateFormat).isValid()) {
    return moment(date, dateFormat);
  }
};

export const getTimeStamp = (date) => {
  return moment(date).valueOf();
};

export const formatDateJs = (date, format = DATE_FORMAT) => {
  if (!date) return null;
  if (moment(date).isValid()) {
    return moment(date).format(format);
  }
  if (moment(date, format).isValid()) {
    return moment(date, format).format(format);
  }
  return null;
};

export const convertDateJs = (date, convert = DATE_FORMAT) => {
  if (!date) return null;
  if (moment(date).isValid()) {
    return moment(date, convert);
  }
  if (moment(date, convert).isValid()) {
    return moment(date, convert);
  }
  return null;
};

export const calculateDiffTwoDate = (date1, date2) => {
  if (!date1 || !date2) return 0;
  if (moment(date1).isValid() && moment(date2).isValid()) {
    return moment(date1).diff(date2, 'days') + 1;
  }
  return 0;
};
