import { isEmpty } from 'src/shared/utils/Typeof';
import { extend } from 'src/validate/plugins';

extend('notEmpty', {
  params: [],
  validate: (value) => {
    try {
      return !isEmpty(value);
    } catch (e) {
      return false;
    }
  },
  messageId: 'form_validate.require',
});
