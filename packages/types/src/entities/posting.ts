import type { E_TASK_SOURCE } from './task'

// When we add more, need to update F_Validator_PostingType
export type T_PostingOperation =
  | 'rent'
  | 'buy'

export type T_PostingType =
  | 'single-home'
  | 'apartment'

export type T_PostingLocation = {
  isExact: boolean
  longitude: number
  latitude: number
  localZone: string
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
  bathrooms: number
  otherRooms: number
  totalRooms: null | number
  hasParking: boolean
  hasGarage: boolean
  parkingSpots: number
}

export type T_PostingImages = {
  main: string
  images: Array<string>
}

export type T_PostingContacts = {
  agencyContact: string
  agencyName: string
  userContact: string
  username: string
}

export type T_Posting = {
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
  sourceId: string
  active: boolean
  price: number
  url: string
  id: string
}
