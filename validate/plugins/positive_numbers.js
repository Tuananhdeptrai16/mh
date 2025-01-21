import { isEmpty } from 'src/shared/utils/Typeof';
import { extend } from './index';
import { POSITIVE_NUMBER } from 'src/shared/constants/Regex';
import { handleRedundantData } from 'src/shared/utils/Object';

extend('numeric_positive', {
  params: [],
  validate: (value) => {
    try {
      if (isEmpty(value)) return true;
      return POSITIVE_NUMBER.test(handleRedundantData(value));
    } catch (error) {
      return false;
    }
  },
  messageId: 'form_validate.numeric_positive',
});
