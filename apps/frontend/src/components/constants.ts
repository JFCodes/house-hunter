import { E_POSTING_USER_STATUS } from '@house-hunter/types'
import type { Component } from 'vue'
// Components
import {
  CircleDollarSign,
  PhoneForwarded,
  BanknoteCheck,
  BanknoteX,
  Handshake,
  Bookmark,
  TagPlus,
  BadgeX,
} from '@lucide/vue'

export enum TELEPORTS {
  DROPDOWNS = 'teleports-dropdowns'
}

export const POSTING_USER_STATUS_ICONS: Record<E_POSTING_USER_STATUS, Component> = {
  [E_POSTING_USER_STATUS.NEW]: TagPlus,
  [E_POSTING_USER_STATUS.DISMISS]: BadgeX,
  [E_POSTING_USER_STATUS.INTERESTING]: Bookmark,
  [E_POSTING_USER_STATUS.CONTACT_MADE]: PhoneForwarded,
  [E_POSTING_USER_STATUS.PROPOSAL_MADE]: CircleDollarSign,
  [E_POSTING_USER_STATUS.PROPOSAL_ACCEPTED]: BanknoteCheck,
  [E_POSTING_USER_STATUS.PROPOSAL_REJECTED]: BanknoteX,
  [E_POSTING_USER_STATUS.BOUGHT]: Handshake,
}
