import moment from 'moment';
import { extend } from 'src/validate/plugins';

extend('timeGTE', {
  params: ['valueTarget', 'min'],
  validate: (value, target) => {
    const { valueTarget, min: minValue = 0 } = target || {};
    try {
      if (!valueTarget || !value) return true;
      const moment1 = moment(valueTarget, 'HH:mm:ss');
      const moment2 = moment(value, 'HH:mm:ss');
      return moment2.diff(moment1, 's') - minValue * 60 >= 0;
    } catch (e) {
      return false;
    }
  },
  messageId: 'form_validate.timeGTE',
});
