import { isEmpty } from './Typeof';

export const findParentByPath = (items, targetPath) => {
  if (isEmpty(items) || isEmpty(targetPath)) {
    return null;
  }
  for (const item of items) {
    if (targetPath.includes(item?.path)) {
      return item;
    }
    if (!isEmpty(item.children)) {
      const result = findParentByPath(item.children, targetPath);
      if (result) {
        return item;
      }
    }
  }
  return null;
};
