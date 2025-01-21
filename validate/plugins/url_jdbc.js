import { URL_JDBC_REGEX } from 'src/shared/constants/Regex';
import { isEmpty } from 'src/shared/utils/Typeof';
import { extend } from './index';

extend('url_jdbc', {
  params: [],
  validate: (value) => {
    try {
      const trimmedValue = value.trim();
      if (isEmpty(trimmedValue)) return true;
      return URL_JDBC_REGEX.test(trimmedValue);
    } catch (error) {
      return false;
    }
  },
  messageId: 'form_validate.url_jdbc',
});
