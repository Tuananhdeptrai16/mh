import { extend } from './index';
import { DIGIT_REGEX } from 'src/shared/constants/Regex';

extend('non_full_digit', {
  params: [],
  validate: (value) => {
    try {
      return !DIGIT_REGEX.test(value);
    } catch (error) {
      return false;
    }
  },
  messageId: 'form_validate.non_full_numeric',
});
