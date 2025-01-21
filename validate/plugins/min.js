import { isEmpty } from 'src/shared/utils/Typeof';
import { extend } from 'src/validate/plugins';

extend('min', {
  params: ['min'],
  validate: (value, target) => {
    const { min: minValue } = target || {};
    try {
      if (isEmpty(minValue)) return true;

      return value >= minValue;
    } catch (e) {
      return false;
    }
  },
  messageId: 'form_validate.min',
});
