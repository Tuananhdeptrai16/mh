import { filter } from 'lodash';
import moment from 'moment/moment';

export const classList = (...classNames) => {
  return filter(classNames, (item) => !!item).join(' ');
};

export const getUrlMedia = (dataSample, ratio) => {
  if (ratio === '1.91:1') {
    return dataSample.media_19_1 || dataSample.media;
  } else if (ratio === '1:1') {
    return dataSample.media_1_1 || dataSample.media;
  }
  return dataSample.media_19_1 || dataSample.media_1_1 || dataSample.media;
};

export const getUrlThumbnail = (dataSample, ratio) => {
  if (ratio === '1.91:1') {
    return dataSample?.thumbnail_19_1 || dataSample.thumbnail;
  } else if (ratio === '1:1') {
    return dataSample?.thumbnail_1_1 || dataSample.thumbnail;
  }
  return (
    dataSample.thumbnail_19_1 ||
    dataSample.thumbnail_1_1 ||
    dataSample.thumbnail
  );
};

export const disabledDateGTToday = (current) => {
  return current && current > moment();
};
export const disabledDateGTTodayBefore = (current) => {
  return current && current > moment().startOf('day');
};

export const disabledDateBeforeToday = (current) => {
  // Can not select days before today
  return current && current < moment().startOf('day');
};
