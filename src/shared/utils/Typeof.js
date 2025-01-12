export function isUndefined(value) {
  return typeof value === 'undefined' || value === null;
}

export function isObject(value) {
  return value && typeof value === 'object' && value.constructor === Object;
}

export function isObjectNotEmpty(value) {
  return isObject(value) && !isEmpty(value);
}

export function isArray(value) {
  return value && typeof value === 'object' && value.constructor === Array;
}

export function isArrayNotEmpty(value) {
  return isArray(value) && !isEmpty(value);
}

export function isString(value) {
  return typeof value === 'string' || value instanceof String;
}

export function isFile(value) {
  return !isUndefined(value) && value instanceof File;
}

export function isBlob(value) {
  return !isUndefined(value) && value instanceof Blob;
}

export function isEmpty(value) {
  if (isString(value)) {
    if (value?.includes('&nbsp;')) {
      return (
        value
          .replace(/<\/?p>/g, '')
          .replace(/&nbsp;/g, '')
          .trim() === ''
      );
    }
    return (
      value === '' ||
      value === undefined ||
      value === null ||
      value.trim() === ''
    );
  } else if (isObject(value)) {
    return (
      value === null ||
      Object.keys(value).length === 0 ||
      isNullUndefEmptyStrObj(value)
    );
  } else if (isArray(value)) {
    return value === null || value.length === 0;
  }
  return value === undefined || value === null;
}

export function isNumber(value) {
  // eslint-disable-next-line no-restricted-globals
  return typeof value === 'number' && isFinite(value);
}

export function isNumberStr(value) {
  // eslint-disable-next-line no-restricted-globals
  return !isUndefined(value) && value !== '' && !isNaN(value);
}

export function isFunction(value) {
  return typeof value === 'function';
}

// Returns if a value is null
export function isNull(value) {
  return value === null;
}

export function isBoolean(value) {
  return typeof value === 'boolean';
}

export function isRegExp(value) {
  return value && typeof value === 'object' && value.constructor === RegExp;
}

export function isError(value) {
  return value instanceof Error && typeof value.message !== 'undefined';
}

export function isDate(value) {
  return value instanceof Date;
}

export function isSymbol(value) {
  return typeof value === 'symbol';
}

export function isExistKey(object, key) {
  // eslint-disable-next-line no-prototype-builtins
  return isObject(object) && object.hasOwnProperty(key);
}

export function isEmptyObject(object) {
  // eslint-disable-next-line no-prototype-builtins
  return isObject(object) && Object.keys(object).length === 0;
}

export function isAsyncFunction(value) {
  return isFunction(value) && value.constructor.name === 'AsyncFunction';
}

export function isPromise(value) {
  return value instanceof Promise;
}

export function filterNull(items) {
  return (items || []).filter((item) => !!item);
}

export const getKeyOfValueObject = (obj, value) => {
  const key = Object.keys(obj).find((key) => obj[key] === value);
  return key;
};

export const checkEqualKeyOfValueObject = (obj, value, keyName) => {
  return keyName === getKeyOfValueObject(obj, value);
};

/**
 * * Check whether link is link youtube
 * @param url
 * @returns boolean
 */
export const matchYoutubeUrl = (url) => {
  var validate =
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|shorts\/?|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  if (url.match(validate)) {
    return true;
  }
  return false;
};

export const isNullUndefEmptyStrObj = (obj = {}) => {
  if (!obj) return true;
  return Object.values(obj).every((value) => {
    return value === '' || value === null || value === undefined;
  });
};
