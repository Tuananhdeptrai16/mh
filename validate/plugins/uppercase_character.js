import { UPPERCASE_CHARACTERS } from 'src/shared/constants/Regex';
import { isEmpty } from 'src/shared/utils/Typeof';
import { extend } from './index';

extend('uppercase_character', {
  params: [],
  validate: (value) => {
    try {
      if (isEmpty(value)) return true;
      return !UPPERCASE_CHARACTERS.test(value);
    } catch (error) {
      return false;
    }
  },
  messageId: 'form_validate.check_uppercase_characters',
});
