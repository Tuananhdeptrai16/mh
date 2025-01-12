import moment from 'moment';
import numeral from 'numeral';
import { isArray, isEmpty, isString } from 'src/shared/utils/Typeof';
import { DAY_OF_WEEK } from 'src/shared/constants/Date';
import {
  DATE,
  DATE_TIME,
  DECIMAL,
  MONTH,
  SQL_DATE,
  SQL_TIMESTAMP,
  TIME,
  TIME_FULL_24,
  TIMESTAMP,
} from 'src/shared/constants/Format';
import 'moment/locale/vi';
import { MAP_MIME_TYPE_2_EXTENSION } from 'src/shared/constants/MediaTypes';

moment.locale('vi');

export const toTimeFull24 = function (str) {
  const momentObj = moment(str);
  if (momentObj.isValid()) {
    return momentObj.format(TIME_FULL_24);
  }
  return str;
};

export const toTimestamp = function (str) {
  const momentObj = moment(str);
  if (momentObj.isValid()) {
    return momentObj.format(TIMESTAMP);
  }
  return str;
};

export const toDateTime = function (str) {
  const momentObj = moment(str);
  if (momentObj.isValid()) {
    return momentObj.format(DATE_TIME);
  }
  return str;
};

export const toDateSrt = function (str) {
  if (!str) return '';
  const momentObj = moment(str);
  if (momentObj.isValid()) {
    return momentObj.format(DATE);
  }
  return str;
};

export const toTimeSrt = function (str) {
  const momentObj = moment(str).locale('en');
  if (momentObj.isValid()) {
    return momentObj.format(TIME);
  }
  return str;
};

export const toDate = function (str) {
  return moment(str);
};

export const toDatetime = function (str) {
  if (!str) return null;
  if (str) {
    return moment(str).toDate().getTime();
  }
  return moment().toDate().getTime();
};

export const toMonthStr = function (str) {
  const momentObj = moment(str);
  if (momentObj.isValid()) {
    return momentObj.format(MONTH);
  }
  return str;
};

export const toSQLDate = function (val, format = SQL_DATE) {
  if (isArray(val)) {
    const [dateFrom, dateTo] = val;
    return [moment(dateFrom).format(format), moment(dateTo).format(format)];
  }
  return moment(val).format(format);
};

export const getMinDate = function (arr) {
  if (arr) {
    const dateCompare = arr.map((item) => moment(item));
    const minDate = moment.min(dateCompare);
    if (minDate) return minDate.toDate();
  }
  return null;
};

export const showNestTimeStr = function (timeStr) {
  if (timeStr) {
    const creationTime = new Date(timeStr);
    const now = new Date();
    const minuteDiff = Math.floor((now - creationTime) / (1000 * 60));
    if (minuteDiff < 1) {
      return 'Vừa xong';
    } else if (minuteDiff < 60) {
      return `${Math.floor(minuteDiff)} phút trước`;
    } else if (minuteDiff / 60 <= 24) {
      return `${Math.floor(minuteDiff / 60)} giờ trước`;
    } else if (minuteDiff / 12 <= 48) {
      return 'Hôm qua';
    } else if (now.getFullYear() > creationTime.getFullYear()) {
      return `Tháng ${
        creationTime.getMonth() + 1
      }, ${creationTime.getFullYear()} `;
    }
    // Default
    return `${creationTime.getDate()} Tháng ${creationTime.getMonth() + 1}`;
  }
  return '';
};

export const getMaxDate = function (arr) {
  if (arr) {
    const dateCompare = arr.map((item) => moment(item));
    const maxDate = moment.max(dateCompare);
    if (maxDate) return maxDate.toDate();
  }
  return null;
};

export const toNumber = function (str) {
  if (typeof str === 'number') {
    return str;
  } else if (!isNaN(str)) {
    return parseInt(str);
  }
  return 0;
};

export const toNumberSpace = function (number) {
  if (number) {
    return numeral(number).format('0,0');
  }
  return '0';
};

export const toCurrency = function (number) {
  if (number) {
    return numeral(number).format('0,0') + '₫';
  } else if (number === undefined || number === null) {
    return '-';
  }
  return '0₫';
};

export const toFromNow = function (number) {
  const date1 = moment(number);
  const date2 = moment();
  const numDay = date2.diff(date1, 'day') + 1;
  if (numDay > 30) return toDateSrt(number);

  return moment(number).fromNow();
};

export const toDecimal = function (str) {
  if (str) {
    return numeral(str).format(DECIMAL);
  }
  return null;
};

export const toSQLTime = function (value) {
  if (value) {
    return moment(value).format(SQL_TIMESTAMP);
  }
  return null;
};

export const toReadableTime = function (time) {
  if (typeof time === 'number') {
    return moment(time).locale('vi').fromNow();
  } else {
    return moment(time, SQL_TIMESTAMP).locale('vi').fromNow();
  }
};

export const toArray = function (val) {
  if (isArray(val)) {
    return val;
  } else if (isString(val)) {
    try {
      return JSON.parse(val);
    } catch (e) {
      console.log(e);
    }
  }
  return val;
};

export const toPercent = function (num) {
  if (num) {
    return Math.round(num * 10000 + Number.EPSILON) / 100;
  }
  return 0;
};

export const toCommarize = function (num) {
  if (num) {
    return numeral(num).format('0.[000] a');
  }
  return 0;
};

export const formatFirstLetterUppercase = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const subDayOfWeek = function (dateTo, dateFrom) {
  const value = dateTo - dateFrom;
  if (value < 0) {
    return value + 7;
  }
  return value;
};

export const getNow = function () {
  return new Date().getTime();
};

export const getDateTimeLessonNextFromLastLesson = function (
  startTime,
  nextSchedule,
) {
  const { day_of_week, start_hour, end_hour } = nextSchedule;

  try {
    const dayOfLastLesson = DAY_OF_WEEK.find(
      (day) => day?.code === day_of_week,
    );
    const subDay = subDayOfWeek(
      dayOfLastLesson?.value,
      new Date(startTime).getDay(),
    );
    const timeNext = startTime + subDay * 3600 * 24 * 1000;
    const dateStr = moment(timeNext).format(DATE);
    const nextDateTimeStart = moment(
      `${dateStr} ${start_hour}`,
      `${DATE} ${TIME_FULL_24}`,
    )
      .toDate()
      .getTime();
    const nextDateTimeEnd = moment(
      `${dateStr} ${end_hour}`,
      `${DATE} ${TIME_FULL_24}`,
    )
      .toDate()
      .getTime();
    return {
      start_time: nextDateTimeStart,
      end_time: nextDateTimeEnd,
    };
  } catch (e) {
    console.log(e);
  }
  return {};
};

export const toEnglish = function (str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
  str = str.replace(/Đ/g, 'D');
  return str;
};

export const convertToString = (value) => {
  try {
    if (isString(value)) return value;
    return JSON.stringify(value);
  } catch (err) {
    console.log(err);
  }
  return value;
};

export const convertToObject = (value) => {
  try {
    return JSON.parse(value);
  } catch (err) {
    console.log(err);
  }
  return value;
};

export const convertURLToFileType = (url) => {
  for (const mimeType in MAP_MIME_TYPE_2_EXTENSION) {
    if (url && url.includes(mimeType)) {
      return MAP_MIME_TYPE_2_EXTENSION[mimeType];
    }
  }
};

export const getFileNameFromURL = (url) => {
  let mimeTypeURL;
  for (const mimeType in MAP_MIME_TYPE_2_EXTENSION) {
    if (url && url.includes(mimeType)) {
      mimeTypeURL = mimeType;
    }
  }

  if (mimeTypeURL) {
    const math = url.match(new RegExp(`([a-zA-Z0-9_-]*${mimeTypeURL})`));
    if (math && math?.length > 0) {
      return math?.[1];
    }
  }
};

export const getFileTypeUrl = (url) => {
  let mimeTypeURL;
  for (const mimeType in MAP_MIME_TYPE_2_EXTENSION) {
    if (url && url.includes(mimeType)) {
      mimeTypeURL = mimeType;
    }
  }
  if (mimeTypeURL) {
    return MAP_MIME_TYPE_2_EXTENSION[mimeTypeURL];
  }
};

export const flatColumnsTable = (columns, dbName = '', table_order = 0) => {
  let resultFlatColumns = [];
  if (isEmpty(columns)) {
    return resultFlatColumns;
  } else {
    const processFlatColumns = (
      columns,
      dbName,
      table_order,
      parentTableName = '',
    ) => {
      columns?.forEach((item) => {
        const tableName = item?.table_name || parentTableName;
        if (!isEmpty(item?.column_list)) {
          processFlatColumns(item?.column_list, dbName, table_order, tableName);
        } else {
          const columnName = item?.column_name;
          if (tableName && columnName) {
            const dataReturn = {
              schema: dbName,
              table_name: tableName,
              column_name: `"${dbName}"."${tableName}"."${columnName}"`,
              field_name: columnName,
              table_order,
              data_type: item?.data_type,
            };
            resultFlatColumns?.push(dataReturn);
          }
        }
      });
    };
    processFlatColumns(columns, dbName, table_order);
    return resultFlatColumns;
  }
};
