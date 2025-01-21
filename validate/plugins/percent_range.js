import { isEmpty } from 'src/shared/utils/Typeof';
import { extend } from 'src/validate/plugins';

extend('percent_range', {
  params: ['min', 'max'],
  validate: (value, target) => {
    const { min: minValue, max: maxValue } = target || {};
    try {
      if (isEmpty(minValue) || isEmpty(maxValue)) return true;
      const [minNum, maxNum] = value;
      if (minNum && maxNum) {
        return minNum < maxNum && minNum >= minValue && maxNum <= maxValue;
      }
      return minNum >= minValue && maxNum <= maxValue;
    } catch (e) {
      return false;
    }
  },
  messageId: 'form_validate.percent_range',
});
