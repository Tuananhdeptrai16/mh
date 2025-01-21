import moment from 'moment';
import { extend } from 'src/validate/plugins';

extend('timeLTE', {
  params: ['maxTime', 'period'],
  validate: (value, target) => {
    const { maxTime, period = 0 } = target || {};
    try {
      if (!maxTime || !value) return true;
      const moment1 = moment(maxTime, 'HH:mm:ss');
      const moment2 = moment(value, 'HH:mm:ss');
      return period * 60 - moment2.diff(moment1, 's') >= 0;
    } catch (e) {
      return false;
    }
  },
  messageId: 'form_validate.timeLTE',
});
