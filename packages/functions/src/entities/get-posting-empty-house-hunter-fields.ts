import { E_POSTING_USER_STATUS, T_PostingHouseHunterFields } from "@house-hunter/types";

export function F_GetPostingEmptyHouseHunterFields (): T_PostingHouseHunterFields {
  return {
    userStatus: E_POSTING_USER_STATUS.NEW,
    created: new Date().getTime(),
    proposedAmount: 0,
    dismissedAt: 0,
    notes: '',
  }
}