import {
  JUDICIAL_STATUS,
  ORGANIZATION_STATUS,
} from 'src/shared/constants/DataTableStatus';
import { isEmpty } from 'src/shared/utils/Typeof';

export const getStatusOrganization = ({
  profile_status,
  profile_locked,
  status,
  verified_by,
  reject_reason,
}) => {
  if (profile_status === 'done' || profile_locked) {
    return null;
  }

  switch (true) {
    case status === ORGANIZATION_STATUS.PENDING && isEmpty(verified_by):
      return JUDICIAL_STATUS.NEW_REQUEST;
    case status === ORGANIZATION_STATUS.PENDING &&
      !isEmpty(verified_by) &&
      isEmpty(reject_reason):
      return JUDICIAL_STATUS.WAITING_CHECK;
    case status === ORGANIZATION_STATUS.PENDING &&
      !isEmpty(verified_by) &&
      !isEmpty(reject_reason):
      return JUDICIAL_STATUS.RECHECK;
    case status === ORGANIZATION_STATUS.VERIFIED:
      return JUDICIAL_STATUS.WAITING_VERIFY;
    case status === ORGANIZATION_STATUS.APPROVED:
      return JUDICIAL_STATUS.VERIFIED;
    case status === ORGANIZATION_STATUS.LOCKED:
      return JUDICIAL_STATUS.LOCKED;
    default:
      return null;
  }
};
