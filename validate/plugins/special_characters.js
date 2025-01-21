import { SPECIAL_CHARACTERS } from 'src/shared/constants/Regex';
import { isEmpty } from 'src/shared/utils/Typeof';
import { extend } from './index';

extend('special_characters', {
  params: [],
  validate: (value) => {
    try {
      if (isEmpty(value)) return true;
      return !SPECIAL_CHARACTERS.test(value);
    } catch (error) {
      return false;
    }
  },
  messageId: 'form_validate.check_special_characters',
});
