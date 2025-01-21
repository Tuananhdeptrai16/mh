import { isEmpty } from 'src/shared/utils/Typeof';
import { extend } from './index';

const isValid = (value, max) => {
  const regex = new RegExp(`^.{1,${max}}$`);
  return regex.test(value);
};

extend('maxLength', {
  params: ['max'],
  validate: (value, target) => {
    const { max } = target || {};

    try {
      if (isEmpty(max)) return true;
      return isValid(value, max);
    } catch (error) {
      return false;
    }
  },
  messageId: 'form_validate.maxLength',
});
