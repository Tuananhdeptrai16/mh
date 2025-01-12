import { AMBASSADOR_LEVEL } from 'src/shared/constants/DataSelect';
import { useAuthUser } from 'src/@crema/utility/AuthHooks';
import { isEqual, get } from 'lodash';
import { isEmpty } from 'src/shared/utils/Typeof';

export const getRankAmbassador = ({ type, value }) => {
  let rank;
  switch (type) {
    case 'level':
      rank = AMBASSADOR_LEVEL.find((item) => item?.value === value)?.rank;
      break;
    case 'role_id': {
      const ambassador = AMBASSADOR_LEVEL.find(
        (item) => item?.roleId === value,
      );
      rank = ambassador?.rank;
      break;
    }
    case 'user': {
      const { user } = useAuthUser();
      const ambassador = AMBASSADOR_LEVEL.find(
        (item) => item?.roleId === user?.user_role?.role_id,
      );
      rank = ambassador?.rank;
      break;
    }
  }
  return rank;
};

export const compareFieldChangeAmbassador = ({
  beforeObject,
  afterObject,
  field,
}) => {
  if (field.fieldId) {
    if (
      isEmpty(get(beforeObject, field.fieldId)?.[field?.value]) &&
      isEmpty(get(afterObject, field.fieldId)?.[field?.value])
    )
      return true;

    return isEqual(
      get(beforeObject, field.fieldId)?.[field.value],
      get(afterObject, field.fieldId)?.[field.value],
    );
  }
  return isEqual(beforeObject[field.value], afterObject[field.value]);
};
