import { JSON_PATTERN } from 'src/shared/constants/Regex';
import { isEmpty } from 'src/shared/utils/Typeof';
import { extend } from './index';

extend('json', {
  params: [],
  validate: (value) => {
    try {
      if (isEmpty(value)) return true;
      return JSON_PATTERN.test(value);
    } catch (error) {
      return false;
    }
  },
  messageId: 'form_validate.json',
});
