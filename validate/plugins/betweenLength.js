import { isEmpty } from 'src/shared/utils/Typeof';
import { extend } from './index';

const isValid = (value, min, max) => {
  const valueLength = value.length;
  switch (true) {
    case isEmpty(min):
      return valueLength <= max;
    case isEmpty(max):
      return valueLength >= min;
    default:
      return valueLength <= max && valueLength >= min;
  }
};

extend('betweenLength', {
  params: ['min', 'max'],
  validate: (value, target) => {
    const { min, max } = target || {};

    try {
      if ((isEmpty(min) && isEmpty(max)) || isEmpty(value)) return true;
      return isValid(value.trim(), min, max);
    } catch (error) {
      return false;
    }
  },
  messageId: 'form_validate.betweenLength',
});
