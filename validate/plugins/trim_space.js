import { TRIM_SPACE } from 'src/shared/constants/Regex';
import { isEmpty } from 'src/shared/utils/Typeof';
import { extend } from './index';

extend('trim_space', {
  params: [],
  validate: (value) => {
    try {
      if (isEmpty(value)) return true;
      return !TRIM_SPACE.test(value);
    } catch (error) {
      return false;
    }
  },
  messageId: 'form_validate.check_trim_space',
});
