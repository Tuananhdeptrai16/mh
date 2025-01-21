import { extend } from './index';

extend('confirmed', {
  params: ['targetInput'],
  validate: (value, target) => {
    try {
      const { targetInput } = target || {};
      if (!value) return true;
      return value === targetInput;
    } catch (error) {
      return false;
    }
  },
  messageId: 'form_validate.confirmed',
});
