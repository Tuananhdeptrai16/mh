import { YEAR_REGEX } from 'src/shared/constants/Regex';
import { isEmpty } from 'src/shared/utils/Typeof';
import { extend } from './index';

extend('year', {
  params: [],
  validate: (value) => {
    try {
      if (isEmpty(value)) return true;
      return YEAR_REGEX.test(value);
    } catch (error) {
      return false;
    }
  },
  messageId: 'form_validate.year',
});
