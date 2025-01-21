import { isEmpty } from 'src/shared/utils/Typeof';
import { extend } from 'src/validate/plugins';
import moment from 'moment';

extend('date_text', {
  params: ['format'],
  defaultValueParams: ['DD/MM/YYYY'],
  validate: (value, target) => {
    const { format } = target || {};
    try {
      if (isEmpty(value)) return true;
      return moment(value.trim(), format, true).isValid();
    } catch (e) {
      return false;
    }
  },
  messageId: 'form_validate.date_text',
});
