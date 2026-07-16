import type { E_TASK_SOURCE } from './tasks/_base'

export enum E_POSTING_USER_STATUS {
  NEW = 'new',
  DISMISS = 'dismiss',
  INTERESTING = 'interesting',
  CONTACT_MADE = 'contact-made',
  PROPOSAL_MADE = 'proposal-made',
  PROPOSAL_ACCEPTED = 'proposal-accepted',
  PROPOSAL_REJECTED = 'proposal-rejected',
  BOUGHT = 'bought',
}

// When we add more, need to update F_Validator_PostingType
export type T_PostingOperation =
  | 'rent'
  | 'buy'

export type T_PostingType =
  | 'single-home'
  | 'apartment'

export type T_PostingLocation = {
  longitude: null | number
  latitude: null | number
  localZone: string
  isExact: boolean
  zipCode: string
  address: string
  region: string
}
export type T_PostingAreas = {
  builtArea: null | number
  livingArea: number
  totalArea: number
}

export type T_PostingTypology = {
  bedrooms: number
  bathrooms: null | number
  otherRooms: null | number
  totalRooms: null | number
  hasParking: null | boolean
  hasGarage: null | boolean
  parkingSpots: null | number
}

export type T_PostingImages = {
  images: Array<string>
  main: null | string
}

export type T_PostingContacts = {
  agencyContact: string
  agencyName: string
  userContact: string
  username: string
}

export type T_PostingHouseHunterFields = {
  userStatus: E_POSTING_USER_STATUS
  proposedAmount: number
  dismissedAt: number
  created: number
  notes: string
}

export type T_Posting = {
  _houseHunterFields: T_PostingHouseHunterFields

  location: T_PostingLocation
  contacts: T_PostingContacts
  typology: T_PostingTypology
  images: T_PostingImages
  areas: T_PostingAreas

  operation: T_PostingOperation
  types: Array<T_PostingType>
  constructionYear: number
  source: E_TASK_SOURCE
  idWithSource: string
  description: string
  sourceId: string
  active: boolean
  price: number
  url: string
  id: string
}
