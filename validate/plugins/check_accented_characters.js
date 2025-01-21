import { CHECK_ACCENTED_CHARACTERS } from 'src/shared/constants/Regex';
import { isEmpty } from 'src/shared/utils/Typeof';
import { extend } from './index';

extend('check_accented_characters', {
  params: [],
  validate: (value) => {
    try {
      if (isEmpty(value)) return true;
      return !CHECK_ACCENTED_CHARACTERS.test(value);
    } catch (error) {
      return false;
    }
  },
  messageId: 'form_validate.check_accented_characters',
});
