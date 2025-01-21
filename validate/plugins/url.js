import { URL_REGEX } from 'src/shared/constants/Regex';
import { isEmpty } from 'src/shared/utils/Typeof';
import { extend } from './index';

extend('url', {
  params: [],
  validate: (value) => {
    try {
      const trimmedValue = value.trim();
      if (isEmpty(trimmedValue)) return true;
      return URL_REGEX.test(trimmedValue);
    } catch (error) {
      return false;
    }
  },
  messageId: 'form_validate.url',
});
