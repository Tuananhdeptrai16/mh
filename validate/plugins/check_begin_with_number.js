import { CHECK_BEGIN_WITH_NUMBER } from 'src/shared/constants/Regex';
import { isEmpty } from 'src/shared/utils/Typeof';
import { extend } from './index';

extend('check_begin_with_number', {
  params: [],
  validate: (value) => {
    try {
      if (isEmpty(value)) return true;
      return !CHECK_BEGIN_WITH_NUMBER.test(value);
    } catch (error) {
      return false;
    }
  },
  messageId: 'form_validate.check_begin_with_number',
});
