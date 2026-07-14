import { F_GetPostingEmptyHouseHunterFields, F_GetPostingIds } from '@house-hunter/functions'
import type {
  T_TaskCrawlNewPostings,
  T_PostingLocation,
  T_PostingTypology,
  T_PostingContacts,
  T_PostingImages,
  T_PostingAreas,
  T_Posting,
} from '@house-hunter/types'
// App
import type { PostingSearchItem } from '../_types'
import { BASE_URL } from '../_constants'

const getUrl = (href: string): string => {
  const withLang = href
    .replace('[lang]', '')
    .replace('/ad/', '/anuncio/')
  return `${BASE_URL}/${withLang}`
}

export function parseResult (task: T_TaskCrawlNewPostings, fromSource: PostingSearchItem): T_Posting {
  const getLocationData = (): T_PostingLocation => {
    const { city, province, street } = fromSource.location.address
    const region = `${city.name} ${province.name}`
    
    const streetOrEmpty = street?.name ?? ''
    const hasZipCode = streetOrEmpty.length === 8 && streetOrEmpty[4] === '-' 

    return {
      address: `${street?.name ?? ''} ${street?.number ?? ''}`.trim(),
      zipCode: hasZipCode ? streetOrEmpty : '',
      localZone: '',
      region,
      longitude: null,
      latitude: null,
      isExact: false,
    }
  }

  const getContactsData = (): T_PostingContacts => {
    const { advertOwner, agency } = fromSource

    return {
      userContact: advertOwner?.contacts[0] ?? null,
      username: advertOwner?.name ?? '',
      agencyName: agency?.name ?? '',
      agencyContact: '',
    }
  }
  
  const getTypologyData = (): T_PostingTypology => {
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

    const bedrooms = getRoomsNumber(fromSource.roomsNumber)
    return{
      totalRooms: bedrooms,
      bedrooms,
      parkingSpots: null,
      hasParking: null,
      otherRooms: null,
      hasGarage: null,
      bathrooms: null,
    }
  }

  const getImagesData = (): T_PostingImages => {
    return {
      images: fromSource.images.map(i => i.large), 
      main: fromSource.images[0]?.large ?? null,
    }
  }
  
  const getAreasData = (): T_PostingAreas => ({
    totalArea: fromSource.terrainAreaInSquareMeters || fromSource.areaInSquareMeters,
    builtArea: fromSource.terrainAreaInSquareMeters,
    livingArea: fromSource.areaInSquareMeters,
  })

  return {
    ...F_GetPostingIds(task.source, fromSource.id),
    _houseHunterFields: F_GetPostingEmptyHouseHunterFields(),
    location: getLocationData(),
    contacts: getContactsData(),
    typology: getTypologyData(),
    images: getImagesData(),
    areas: getAreasData(),
    operation: task.options.postingOperation,
    price: fromSource.totalPrice?.value ?? 0,
    types: task.options.postingTypes,
    description: fromSource.title,
    url: getUrl(fromSource.href),
    constructionYear: 0,
    active: true,
  }
}
