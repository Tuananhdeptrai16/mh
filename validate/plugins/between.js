import { isEmpty } from 'src/shared/utils/Typeof';
import { extend } from './index';

extend('between', {
  params: ['min', 'max'],
  validate: (value, target) => {
    const { min, max } = target || {};
    try {
      if (isEmpty(min) && isEmpty(max)) return true;
      return value >= min && value <= max;
    } catch (error) {
      return false;
    }
  },
  messageId: 'form_validate.between',
});
