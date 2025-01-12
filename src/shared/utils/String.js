import {
  get,
  isEqual,
  isNull,
  isObject,
  isUndefined,
  replace,
  uniqBy,
} from 'lodash';
import { htmlRegexG } from 'src/shared/constants/Regex';
import { isArray, isString } from 'src/shared/utils/Typeof';

export function nonAccentVietnamese(str) {
  if (!str) return str;
  str = str.toLowerCase();
  //     We can also use this instead of from line 11 to line 17
  //     str = str.replace(/\u00E0|\u00E1|\u1EA1|\u1EA3|\u00E3|\u00E2|\u1EA7|\u1EA5|\u1EAD|\u1EA9|\u1EAB|\u0103|\u1EB1|\u1EAF|\u1EB7|\u1EB3|\u1EB5/g, "a");
  //     str = str.replace(/\u00E8|\u00E9|\u1EB9|\u1EBB|\u1EBD|\u00EA|\u1EC1|\u1EBF|\u1EC7|\u1EC3|\u1EC5/g, "e");
  //     str = str.replace(/\u00EC|\u00ED|\u1ECB|\u1EC9|\u0129/g, "i");
  //     str = str.replace(/\u00F2|\u00F3|\u1ECD|\u1ECF|\u00F5|\u00F4|\u1ED3|\u1ED1|\u1ED9|\u1ED5|\u1ED7|\u01A1|\u1EDD|\u1EDB|\u1EE3|\u1EDF|\u1EE1/g, "o");
  //     str = str.replace(/\u00F9|\u00FA|\u1EE5|\u1EE7|\u0169|\u01B0|\u1EEB|\u1EE9|\u1EF1|\u1EED|\u1EEF/g, "u");
  //     str = str.replace(/\u1EF3|\u00FD|\u1EF5|\u1EF7|\u1EF9/g, "y");
  //     str = str.replace(/\u0111/g, "d");
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // Â, Ê, Ă, Ơ, Ư
  return str;
}

export function matchText(targetText, searchText) {
  if (!searchText || !targetText) return false;

  const targetTextNormal = nonAccentVietnamese(
    (targetText ?? '').toLowerCase(),
  ).trim();
  const searchTextNormal = nonAccentVietnamese(
    (searchText ?? '').toLowerCase(),
  ).trim();

  const tokens = searchTextNormal.split(' ');

  return !tokens.find((token) => !targetTextNormal.includes(token));
}

//* Ham xoa dau tieng viet

export const removeAccents = (str) => {
  return str
    ?.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
};

export const removeWithoutAlphabet = (str) => {
  return str.replace(/[^a-zA-Z\s]/g, ' ');
};

export const formatHtml = (text) => {
  return (text || '').replace(htmlRegexG, ' ').replace(/\s+/g, ' ');
};

export function decodeHTMlToText(htmlStr) {
  const str = formatHtml(htmlStr);
  let txt = document.createElement('textarea');

  txt.innerHTML = str;

  return txt.value;
}

export const stringIsHTML = (string) => {
  try {
    const doc = new DOMParser().parseFromString(string, 'text/html');
    return Array.from(doc.body.childNodes).some((node) => node.nodeType === 1);
  } catch (err) {
    return true;
  }
};

export const convertLabel2Name = (label) => {
  if (isString(label)) {
    return replace(
      removeWithoutAlphabet(removeAccents(label).toLowerCase().trim()),
      /\s+/g,
      '_',
    );
  }
  return '';
};

export const parse = (str) => {
  if (str) {
    try {
      return JSON.parse(str);
    } catch (e) {
      console.log(e);
    }
  }
};

export const getValueByKey = (obj, key) => {
  const result = get(obj, key);
  return result || '';
};

export const stringify = (data, ...args) => {
  if (data) {
    try {
      return JSON.stringify(data, ...args);
    } catch (e) {
      console.log(e);
    }
  }
};

export const getDataObjectFormTemplate = (data) => {
  if (isObject(data) || isArray(data)) {
    return data;
  }
  return parse(data);
};

export const parserLog = (log) => {
  if (log) {
    return log.replace('\u001b[46m', '').replace('\u001b[0m', '');
  }
  return '';
};

export const removeDuplicateInArr = (arr, key = 'id', callback) => {
  if (!callback) {
    return uniqBy(arr, key);
  }
  return uniqBy(arr, callback);
};

/**
 * Trả về giá trị thay đổi của một field
 * * Nếu field không thay đổi, return undefined, ngược lại return giá trị thay đổi
 * @param beforeValue : giá trị trước khí thay đổi
 * @param afterValue : giá trị sau khi thay đổi
 * @returns : afterValue | undefined
 */
export const getValueAfterChange = (beforeValue, afterValue) => {
  if (
    isEqual(beforeValue, afterValue) ||
    isUndefined(afterValue) ||
    isNull(afterValue)
  ) {
    return undefined;
  }
  return afterValue;
};

export const returnObjectWithChangeValue = (beforeObj, afterObj) => {
  const result = {};
  Object.keys(afterObj).forEach((key) => {
    const value = getValueAfterChange(beforeObj[key], afterObj[key]);
    if (!value) return;
    result[key] = value;
  });
  return result;
};

// export const camelToSnakeCase = (value) =>
//   value.replace(/[a-z]+[A-Z]/g, (str) =>
//     str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`),
//   );

export const camelToSnakeCase = (value) =>
  value.replace(
    /([a-z])([A-Z])/g,
    (match, p1, p2) => `${p1}_${p2.toLowerCase()}`,
  );

export const extractViewTableAndColumns = function (listStatement) {
  let table = null;
  const columns = new Set();

  function processColumnNode(columnNode) {
    const columnName = columnNode?.alias?.name || columnNode?.expr?.name;
    if (columnName) {
      columns.add(columnNode?.alias?.name || columnNode?.expr?.name);
    }
    // TODO nếu cần check, bây giờ đang còn nhiều view tạo dữ liệu luôn là null
    // if (columnNode?.expr?.table && columnNode.expr.name) {
    //   columns.add(columnNode.alias.name || columnNode.expr.name);
    // }
  }

  function traverseQuery(query) {
    if (query.columns) {
      query.columns.forEach((col) => processColumnNode(col));
    }

    if (query.in) {
      traverseQuery(query.in);
    }
  }

  const ast = listStatement.find(
    (statement) => statement.type === 'create view',
  );

  if (ast?.query) {
    table = ast?.name?.name;
    traverseQuery(ast.query);
  }

  return {
    table,
    columns: Array.from(columns),
  };
};
