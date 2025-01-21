import { isEmpty } from 'src/shared/utils/Typeof';
import { extend } from 'src/validate/plugins';
import moment from 'moment';

extend('date_range_text', {
  params: ['format'],
  defaultValueParams: ['DD/MM/YYYY'],
  validate: (value, target) => {
    const { format } = target || {};
    try {
      if (isEmpty(value)) return true;
      const [dateStart, dateEnd] = value.split(' - ');
      const validateFormat =
        moment(dateStart, format, true).isValid() &&
        moment(dateEnd, format, true).isValid();
      if (!validateFormat) return false;

      // check startTime <= endTime;
      return (
        moment(dateEnd, format).diff(moment(dateStart, format), 'day') >= 0
      );
    } catch (e) {
      return false;
    }
  },
  messageId: 'form_validate.date_range_text',
});
