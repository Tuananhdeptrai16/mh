import { extend } from './index';
import { CHECK_SLASH } from 'src/shared/constants/Regex';

extend('non_slash', {
  params: [],
  validate: (value) => {
    try {
      return CHECK_SLASH.test(value);
    } catch (error) {
      return false;
    }
  },
  messageId: 'form_validate.non_slash',
});
