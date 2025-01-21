import { NUMBER_REGEX } from 'src/shared/constants/Regex';
import { isEmpty } from 'src/shared/utils/Typeof';
import { extend } from './index';

extend('numeric', {
  params: [],
  validate: (value) => {
    try {
      if (isEmpty(value)) return true;
      return NUMBER_REGEX.test(value);
    } catch (error) {
      return false;
    }
  },
  messageId: 'form_validate.numeric',
});
