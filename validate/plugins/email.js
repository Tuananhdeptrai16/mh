import { EMAIL_PATTERN } from 'src/shared/constants/Regex';
import { isEmpty } from 'src/shared/utils/Typeof';
import { extend } from './index';

extend('email', {
  params: [],
  validate: (value) => {
    try {
      if (isEmpty(value)) return true;
      return EMAIL_PATTERN.test(value);
    } catch (error) {
      return false;
    }
  },
  messageId: 'form_validate.email',
});
