import { USER_NAME_REGEX } from 'src/shared/constants/Regex';
import { isEmpty } from 'src/shared/utils/Typeof';
import { extend } from './index';

extend('user_name', {
  params: [],
  validate: (value) => {
    try {
      if (isEmpty(value)) return true;
      return USER_NAME_REGEX.test(value);
    } catch (error) {
      return false;
    }
  },
  messageId: 'form_validate.user_name',
});
