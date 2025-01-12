import { MODAL_SIZE } from '../constants/Modal';

export const getWidthByModalSize = (size) => {
  if (size === MODAL_SIZE.SMALL) return 320;
  if (size === MODAL_SIZE.MEDIUM) return 620;
  if (size === MODAL_SIZE.LARGE) return 920;
  if (size === MODAL_SIZE.XLARGE) return 1120;
  return size;
};

export const convertObjectMapper = ({ errors, fieldMapper }) => {
  let errorMapper = {};

  const errorsShow = Object.keys(errors).map((fieldName) => {
    return {
      validating: false,
      errors: errors[fieldName] ? [errors[fieldName]] : [],
      name: fieldName,
    };
  });
  errorMapper = errorsShow.reduce((accumulator, currentValue) => {
    const fieldTarget = Object.keys(fieldMapper).find((key) =>
      fieldMapper[key]?.includes(currentValue?.name),
    );

    if (fieldTarget) {
      const indexTarget = accumulator.findIndex(
        (item) => item?.name === fieldTarget,
      );

      if (indexTarget === -1) {
        accumulator.push({
          ...currentValue,
          name: fieldTarget,
        });
      } else {
        const errorFieldUpdate = accumulator[indexTarget]?.errors || [];

        accumulator[indexTarget] = {
          ...accumulator[indexTarget],
          errors: [...errorFieldUpdate, ...currentValue?.errors],
        };
      }
    } else {
      accumulator.push(currentValue);
    }

    return accumulator;
  }, []);
  return errorMapper;
};
