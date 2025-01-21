import { isEmpty } from 'src/shared/utils/Typeof';
import { extend } from 'src/validate/plugins';

extend('max', {
  params: ['max'],
  validate: (value, target) => {
    const { max: maxValue } = target || {};
    try {
      if (isEmpty(maxValue)) return true;

      return value <= maxValue;
    } catch (e) {
      return false;
    }
  },
  messageId: 'form_validate.max',
});
