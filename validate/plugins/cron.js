import { isEmpty } from 'src/shared/utils/Typeof';
import { extend } from './index';
import { CHECK_CRON } from 'src/shared/constants/Regex';

extend('cron', {
  params: [],
  validate: (value) => {
    try {
      const trimmedValue = value.trim();
      if (isEmpty(trimmedValue)) return true;
      return CHECK_CRON.test(trimmedValue);
    } catch (error) {
      return false;
    }
  },
  messageId: 'form_validate.cron',
});
