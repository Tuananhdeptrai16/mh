import { findIndex } from 'lodash';
import {
  isArray,
  isEmpty,
  isFunction,
  isObject,
} from 'src/shared/utils/Typeof';
import { parse } from 'pgsql-ast-parser';
import { TYPE_RULES_NORMALIZATION } from '../constants/DataFixed';

export const updateItem = (data, condition, mergeObject, force = false) => {
  const arr = [...data];
  const index = findIndex(arr, condition);
  if (index !== -1) {
    const itemUpdate = arr[index];
    let dataUpdate = {};
    if (isFunction(mergeObject)) {
      dataUpdate = mergeObject(itemUpdate, index, arr);
    } else if (isObject(mergeObject)) {
      dataUpdate = mergeObject;
    }

    if (force) {
      arr.splice(index, 1, dataUpdate);
    } else {
      arr.splice(index, 1, { ...itemUpdate, ...dataUpdate });
    }
  }

  return arr;
};

export const onDropTree = (gData, info) => {
  const dropKey = info.node.key;
  const dragKey = info.dragNode.key;
  const dropPos = info.node.pos.split('-');
  const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

  const loop = (data, key, callback) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].key === key) {
        return callback(data[i], i, data);
      }
      if (data[i].children) {
        loop(data[i].children, key, callback);
      }
    }
  };

  const data = [...gData];

  // Find dragObject
  let dragObj;
  loop(data, dragKey, (item, index, arr) => {
    arr.splice(index, 1);
    dragObj = item;
  });

  if (!info.dropToGap) {
    // Drop on the content
    loop(data, dropKey, (item) => {
      item.children = item.children || [];
      // where to insert 示例添加到头部，可以是随意位置
      item.children.unshift(dragObj);
    });
  } else if (
    (info.node.props.children || []).length > 0 && // Has children
    info.node.props.expanded && // Is expanded
    dropPosition === 1 // On the bottom gap
  ) {
    loop(data, dropKey, (item) => {
      item.children = item.children || [];
      // where to insert 示例添加到头部，可以是随意位置
      item.children.unshift(dragObj);
      // in previous version, we use item.children.push(dragObj) to insert the
      // item to the tail of the children
    });
  } else {
    let ar = [];
    let i;
    loop(data, dropKey, (_item, index, arr) => {
      ar = arr;
      i = index;
    });
    if (dropPosition === -1) {
      ar.splice(i, 0, dragObj);
    } else {
      ar.splice(i + 1, 0, dragObj);
    }
  }
  return data;
};

export function findAddedAndRemovedItems(initialItems, changedItems) {
  initialItems = Array.isArray(initialItems) ? initialItems : [];
  changedItems = Array.isArray(changedItems) ? changedItems : [];

  const initialMap = new Map(initialItems.map((item) => [item?.id, item]));
  const changedMap = new Map(changedItems.map((item) => [item?.id, item]));

  const addedItems = changedItems.filter((item) => !initialMap.has(item?.id));
  const removedItems = initialItems.filter((item) => !changedMap.has(item?.id));

  return { addedItems, removedItems };
}

export const checkColumnDisableAll = (columns) => {
  if (!isEmpty(columns) && isArray(columns)) {
    const isCheckDisable = columns?.every((item) => {
      return item?.config?.selected === false;
    });
    return isCheckDisable;
  } else {
    return true;
  }
};

export const renderRulesJob = (rules) => {
  if (isEmpty(rules)) {
    return [];
  } else {
    const newRules = rules?.map((item) => {
      if (item?.type === TYPE_RULES_NORMALIZATION.delete_column) {
        return {
          delete_column: item?.list_column[0] || '',
          type: TYPE_RULES_NORMALIZATION.delete_column,
        };
      }
      if (item?.type === TYPE_RULES_NORMALIZATION.add_column) {
        return {
          type: TYPE_RULES_NORMALIZATION.add_column,
          add_column_data_type: item?.data_type || '',
          add_column_new_name: item?.new_column || '',
        };
      }
      if (item?.type === TYPE_RULES_NORMALIZATION.delete_rows) {
        return {
          type: TYPE_RULES_NORMALIZATION.delete_rows,
          delete_rows: item?.condition || '',
        };
      }
      if (item?.type === TYPE_RULES_NORMALIZATION.set_value) {
        return {
          type: TYPE_RULES_NORMALIZATION.set_value,
          set_value_condition: item?.condition || '',
          set_value_expression: item?.expression || '',
          set_value_add_column: item?.list_column?.[0] || '',
        };
      }
    });

    return newRules;
  }
};

// export const handlePrevRulesAddJob = (data) => {
//   const rulesReq = [];
//   const rules = data?.rules || [];
//   // delete columns
//   const listRulesDeleteColumns = [
//     ...new Set(
//       rules
//         ?.filter(
//           (item) => item?.type === TYPE_RULES_NORMALIZATION.delete_column,
//         )
//         ?.map((item) => item?.delete_column),
//     ),
//   ];
//   const reqDeleteColumns = {
//     type: TYPE_RULES_NORMALIZATION.delete_column,
//     list_column: listRulesDeleteColumns,
//   };
//   if (!isEmpty(listRulesDeleteColumns)) {
//     rulesReq?.push(reqDeleteColumns);
//   }

//   // add columns
//   const listRulesAddColumns = rules
//     ?.filter((item) => item?.type === TYPE_RULES_NORMALIZATION.add_column)
//     ?.map((item) => {
//       return {
//         type: TYPE_RULES_NORMALIZATION.add_column,
//         new_column: item?.add_column_new_name,
//         data_type: item?.add_column_data_type,
//       };
//     });
//   if (!isEmpty(listRulesAddColumns)) {
//     rulesReq?.push(listRulesAddColumns);
//   }

//   // set values
//   const listSetValue = rules
//     ?.filter((item) => item?.type === TYPE_RULES_NORMALIZATION.set_value)
//     ?.map((item) => {
//       return {
//         type: TYPE_RULES_NORMALIZATION.set_value,
//         list_column: [item?.set_value_add_column] || [],
//         expression: item?.set_value_expression,
//         // condition: item?.set_value_condition,
//         ...(!isEmpty(item?.set_value_condition) && {
//           condition: item?.set_value_condition,
//         }),
//       };
//     });
//   if (!isEmpty(listSetValue)) {
//     rulesReq?.push(listSetValue);
//   }

//   // delete record
//   const listDeleteRecord = [
//     ...new Set(
//       rules
//         ?.filter((item) => item?.type === TYPE_RULES_NORMALIZATION.delete_rows)
//         ?.map((item) => {
//           return {
//             type: TYPE_RULES_NORMALIZATION.delete_rows,
//             condition: item?.delete_rows,
//           };
//         }),
//     ),
//   ];

//   if (!isEmpty(listDeleteRecord)) {
//     rulesReq?.push(listDeleteRecord);
//   }

//   return rulesReq.flat();
// };

export const handlePrevRulesAddJob = (data) => {
  const rulesReq = [];
  const rules = data?.rules || [];

  rules.forEach((item) => {
    switch (item?.type) {
      case TYPE_RULES_NORMALIZATION.delete_column:
        rulesReq.push({
          type: TYPE_RULES_NORMALIZATION.delete_column,
          list_column: [item.delete_column],
        });
        break;

      case TYPE_RULES_NORMALIZATION.add_column:
        rulesReq.push({
          type: TYPE_RULES_NORMALIZATION.add_column,
          new_column: item.add_column_new_name,
          data_type: item.add_column_data_type,
        });
        break;

      case TYPE_RULES_NORMALIZATION.set_value:
        rulesReq.push({
          type: TYPE_RULES_NORMALIZATION.set_value,
          list_column: [item.set_value_add_column],
          expression: item.set_value_expression,
          ...(item.set_value_condition && {
            condition: item.set_value_condition,
          }),
        });
        break;

      case TYPE_RULES_NORMALIZATION.delete_rows:
        rulesReq.push({
          type: TYPE_RULES_NORMALIZATION.delete_rows,
          condition: item.delete_rows,
        });
        break;

      default:
        break;
    }
  });
  return rulesReq;
};

export const handleAnalyzeSQL = (sql) => {
  if (!isEmpty(sql))
    try {
      const sqlParser = parse(sql);
      return sqlParser || [];
    } catch (error) {
      console.log('co loi parse:', error);
      return [];
    }
  return [];
};

export const renderNewColumnDuplicate = (data) => {
  const countItemDuplicate = {};
  const listColumnDuplicate = [];
  if (isEmpty(data)) {
    return [];
  }

  (data || [])?.forEach((item) => {
    const filedName = item?.new_field_name;
    if (isEmpty(countItemDuplicate[filedName])) {
      countItemDuplicate[filedName] = 0;
    } else {
      countItemDuplicate[filedName] = countItemDuplicate[filedName] + 1;
    }
  });

  for (let item in countItemDuplicate) {
    if (countItemDuplicate[item] >= 1) {
      listColumnDuplicate.push(item);
    }
  }

  return listColumnDuplicate;
};
