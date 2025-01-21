import moment from 'moment';

const currentDate = moment().format('YYYY-MM-DD');
const lastSevenDate = moment().subtract(6, 'days').format('YYYY-MM-DD');

export const DEFAULT_FUNCTION = () => null;

export const BYPASS_SAVE_SERVER = () => {
  return new Promise((resolve) => {
    resolve({
      status: 200,
      data: {
        code: 0,
        message: 'OK',
      },
    });
  });
};

export const TABLE_SIZE = {
  LARGE: 'large',
  MIDDLE: 'middle',
  SMALL: 'small',
};

export const TABLE_SIZE_MAPPING = {
  [TABLE_SIZE.SMALL]: 'Nhỏ',
  [TABLE_SIZE.MIDDLE]: 'Vừa',
  [TABLE_SIZE.LARGE]: 'Lớn',
};
export const DEFAULT_CONFIG_TABLE = {
  tableSize: TABLE_SIZE.MIDDLE,
  page: 1,
  pageSize: 10,
  sort: [{ field: 'id', desc: true }],
  filter: {},
  search: '',
  timeRange: [lastSevenDate, currentDate],
};

export const TYPE_FORMAT = {
  FILE: 'PDF',
  VIDEO: 'Video',
  LINK: 'Link Youtube',
  COMPRESS: 'Tệp download',
};

export const DEFAULT_FILTER_ACTIVE = {
  name: 'active',
  value: 'true',
  operation: 'eq',
};

export const KEY_EMPTY_SELECT = 'empty__$$__';
export const NO_IMG_CMS_LINK =
  'https://cdn.senvangdata.com/senvang/2022/07/12/1657591945344-crop609x360.478801.jpg';
