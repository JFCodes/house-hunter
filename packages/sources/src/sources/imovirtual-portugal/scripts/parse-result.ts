import type { T_DiscoveryTask, T_AdNew } from '@house-hunter/data-model'
import { F_AdGetIds } from '@house-hunter/functions'

// App
import type { PostingSearchItem } from '../_types'
import { BASE_URL } from '../_constants'

const getUrl = (href: string): string => {
  const withLang = href
    .replace('[lang]', '')
    .replace('/ad/', '/anuncio/')
  return `${BASE_URL}/${withLang}`
}

const getRoomsNumber = (stringValue: string): number => {
  switch (stringValue) {
    case 'ONE': return 1
    case 'TWO': return 2
    case 'THREE': return 3
    case 'FOUR': return 4
    case 'FIVE': return 5
    case 'SIX': return 6
    case 'SEVEN': return 7
    case 'EIGHT': return 8
    case 'NINE': return 8
    case 'TEN': return 10
    case 'ELEVEN': return 11
    case 'TWELVE': return 12
    case 'THIRTEEN': return 13
    case 'FOURTEEN': return 14
    case 'FIFTEEN': return 15
    case 'SIXTEEN': return 16
    case 'SEVENTEEN': return 17
    case 'EIGHTEEN': return 18
    case 'NINETEEN': return 19
    case 'TWENTY': return 20
    case 'MORE':
    default: return 0
  }
}

export function parseResult (task: T_DiscoveryTask, fromSource: PostingSearchItem): T_AdNew {
  const { advertOwner, agency, location } = fromSource
  const { city, province, street } = location.address

  const region = `${city.name} ${province.name}`
  const streetOrEmpty = street?.name ?? ''
  const hasZipCode = streetOrEmpty.length === 8 && streetOrEmpty[4] === '-' 
  const bedrooms = getRoomsNumber(fromSource.roomsNumber)

  return {
    ...F_AdGetIds(task.target, fromSource.id),
    adBuildingTypes: task.options.buildingTypes,
    price: fromSource.totalPrice?.value ?? 0,
    descriptionShort: fromSource.title,
    adType: task.options.addType,
    url: getUrl(fromSource.href),
    // Area
    areaTotal: fromSource.terrainAreaInSquareMeters || fromSource.areaInSquareMeters,
    areaLiving: fromSource.areaInSquareMeters,
    areaBuilt: fromSource.terrainAreaInSquareMeters,
    // Location
    locationAddress: `${street?.name ?? ''} ${street?.number ?? ''}`.trim(),
    locationZipCode: hasZipCode ? streetOrEmpty : '',
    locationLongitude: null,
    locationRegion: region,
    locationLatitude: null,
    locationIsExact: false,
    locationLocalZone: '',
    // Typology
    typologyTotalRooms: bedrooms,
    typologyBedrooms: bedrooms,
    typologyParkingSpots: null,
    typologyHasParking: null,
    typologyOtherRooms: null,
    typologyHasGarage: null,
    typologyBathrooms: null,
    // Contacts
    contactUserContact: advertOwner.contacts[0] ?? '',
    contactUsername: advertOwner.name ?? '',
    contactAgencyName: agency?.name ?? '',
    contactAgencyContact: '',
    // Images
    imageMain: fromSource.images[0]?.large ?? null,
    images: fromSource.images.map(i => i.large),
  }
}
