import { isEqual, unionBy, get } from 'lodash';
import {
  isArray,
  isNumber,
  isObject,
  isString,
  isUndefined,
} from 'src/shared/utils/Typeof';

export const getValue = (item, key) => {
  switch (true) {
    case isString(item):
      return item.trim();
    case isObject(item): {
      if (key) {
        return item[key];
      } else {
        return undefined;
      }
    }
    case isArray(item):
      return item.map((child) => getValue(child, key));
    default:
      return item;
  }
};

export const getOptionByField = (options, valueFieldId, key) => {
  if (!key) return valueFieldId;
  switch (true) {
    case isString(valueFieldId):
    case isNumber(valueFieldId): {
      return options.find((option) => option?.[key] === valueFieldId);
    }
    case isArray(valueFieldId):
      return unionBy(
        options.filter((option) => valueFieldId.includes(option[key])),
        (item) => item[key],
      );
    default:
      return null;
  }
};

export const compareValue = (value1, value2, key) => {
  if (isUndefined(value2)) {
    return true;
  }
  switch (true) {
    case isString(value1) || isString(value2):
      if (isString(value1) && isString(value2)) {
        return (value1 ?? '').trim() === (value2 ?? '').trim();
      }
      return false;
    case isObject(value1) || isObject(value2): {
      if (isObject(value1) && isObject(value2)) {
        if (key) {
          return compareValue(value1?.[key], value2?.[key]);
        } else {
          return isEqual(value1, value2);
        }
      } else {
        return false;
      }
    }
    case isArray(value1) || isArray(value2):
      if (isArray(value1) && isArray(value2)) {
        if (!value1 || !value2 || value1?.length !== value2?.length) {
          return false;
        }
        if (value1.length === 0 && value2.length === 0) {
          return true;
        }
        return value1.every((valueItem1) => {
          return value2.some((valueItem2) => {
            return compareValue(valueItem1, valueItem2, key);
          });
        });
      } else {
        return false;
      }
    case isNumber(value1) || isNumber(value2):
    default:
      return isEqual(value1, value2);
  }
};

export const compareFieldChangeProject = (
  projectSource = {},
  projectTarget = {},
  field = {},
) => {
  if (field.fieldId) {
    return compareValue(
      get(projectSource, field.fieldId),
      get(projectTarget, field.fieldId),
    );
  } else {
    return compareValue(
      get(projectSource, field.value),
      get(projectTarget, field.value),
      field.key,
    );
  }
};
