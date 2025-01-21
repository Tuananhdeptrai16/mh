import { CCCD_NUMBER_REGREX } from 'src/shared/constants/Regex';
import { isEmpty } from 'src/shared/utils/Typeof';
import { extend } from './index';

extend('cccd_number', {
  params: [],
  validate: (value) => {
    try {
      if (isEmpty(value)) return true;
      return CCCD_NUMBER_REGREX.test(value.trim());
    } catch (error) {
      return false;
    }
  },
  messageId: 'form_validate.cccd_number',
});
