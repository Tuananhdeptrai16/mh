import { isEmpty } from 'src/shared/utils/Typeof';
import { extend } from './index';
import { PASSWORD_REGEX } from 'src/shared/constants/Regex';

extend('is_password', {
  params: [],
  validate: (value) => {
    try {
      if (isEmpty(value)) return true;
      return PASSWORD_REGEX.test(value);
    } catch (error) {
      return false;
    }
  },
  messageId: 'form_validate.is_password',
});
