import { KEY_CACHE } from '../shared/constants/Cache';
import { currentTime } from '../shared/utils/DateTime';
import { saveLocalData, getLocalData } from './LocalStorage';

const getAllDataCacheKey = () => {
  return getLocalData(KEY_CACHE) || {};
};

export function getDataCache(name) {
  const allData = getAllDataCacheKey();
  const valueCache = allData?.[name] || {};
  const now = currentTime();
  if (valueCache?.timeEnd >= now || !valueCache?.timeEnd) {
    return valueCache?.value;
  } else {
    removeCacheData(name);
  }
}

export function saveDataCache(name, data, timeCache) {
  const allData = getAllDataCacheKey() || {};
  const timeNow = currentTime();

  const dataUpdate = {
    ...allData,
    [name]: {
      data: data,
      timeEnd: timeNow + timeCache,
    },
  };

  const dataSaveCache = Object.entries(dataUpdate)
    .filter(([, value]) => {
      return value?.timeEnd > timeNow;
    })
    .sort(([, value1], [, value2]) => value1?.timeEnd - value2.timeEnd)
    .reduce((accumulator, [cacheItemKey, value], currentIndex) => {
      // limit 15 key save to cache
      if (currentIndex < 15) {
        accumulator[cacheItemKey] = value;
      }
      return accumulator;
    }, {});

  saveLocalData(KEY_CACHE, dataSaveCache);
}

export function removeCacheData(name) {
  // eslint-disable-next-line no-unused-vars
  const { [name]: tmp, ...dataNew } = getAllDataCacheKey() || {};
  saveLocalData(KEY_CACHE, dataNew);
}
