import { E_AD_STATUS } from '@house-hunter/data-model'
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

export const AD_STATUS_ICONS: Record<E_AD_STATUS, Component> = {
  [E_AD_STATUS.NEW]: TagPlus,
  [E_AD_STATUS.DELETED]: BadgeX,
  [E_AD_STATUS.INTERESTING]: Bookmark,
  [E_AD_STATUS.CONTACT_MADE]: PhoneForwarded,
  [E_AD_STATUS.PROPOSAL_MADE]: CircleDollarSign,
  [E_AD_STATUS.PROPOSAL_ACCEPTED]: BanknoteCheck,
  [E_AD_STATUS.PROPOSAL_REJECTED]: BanknoteX,
  [E_AD_STATUS.COMPLETED]: Handshake,
}
