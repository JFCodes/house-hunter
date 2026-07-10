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
import { BASE_URL, BASE_IMAGE_URL } from '../_constants'

export function parseResult (task: T_TaskCrawlNewPostings, fromSource: PostingSearchItem): T_Posting {
  const getLocationData = (): T_PostingLocation => {
    const region = [
      fromSource.regionName1 || '',
      fromSource.regionName2 || '',
      fromSource.regionName3 || '',
    ].filter(r => !!r).join(', ').trim()

    return {
      isExact: fromSource.isExactAddress,
      longitude: fromSource.longitude,
      localZone: fromSource.localZone,
      latitude: fromSource.latitude,
      zipCode: fromSource.zipCode,
      address: fromSource.address,
      region: region
    }
  }

  const getContactsData = (): T_PostingContacts => ({
    agencyContact: fromSource.userAgencyPhoneNumber,
    userContact: fromSource.userCellPhoneTrimmed,
    agencyName: fromSource.userAgencyName || '',
    username: fromSource.userName
  })
  
  const getTypologyData = (): T_PostingTypology => {
    const { numberOfBathrooms, numberOfBedrooms } = fromSource
    const bedAndBathRooms = numberOfBathrooms + numberOfBedrooms
    const totalRooms = fromSource.totalRooms ?? bedAndBathRooms
    const otherRooms = Math.max(0, totalRooms - bedAndBathRooms)

    return{
      bedrooms: fromSource.numberOfBedrooms,
      bathrooms: fromSource.numberOfBathrooms,
      parkingSpots: fromSource.garageSpots,
      hasParking: fromSource.parking,
      hasGarage: fromSource.garage,
      totalRooms,
      otherRooms,
    }
  }
  const getImagesData = (): T_PostingImages => {
    const withImageBaseUrl = (url: string) => `${BASE_IMAGE_URL}/${url}` 

    return {
      images: fromSource.listingPictures.map(withImageBaseUrl), 
      main: withImageBaseUrl(fromSource.listingPictureUrl),
    }
  }
  
  const getAreasData = (): T_PostingAreas => ({
    livingArea: fromSource.livingArea,
    totalArea: fromSource.totalArea,
    builtArea: fromSource.builtArea,
  })

  const getUrl = (): string => {
    return `${BASE_URL}/imoveis/${fromSource.descriptionTags}/${fromSource.listingTitle}`
  }

  return {
    ...F_GetPostingIds(task.source, fromSource.id),
    _houseHunterFields: F_GetPostingEmptyHouseHunterFields(),
    location: getLocationData(),
    contacts: getContactsData(),
    typology: getTypologyData(),
    images: getImagesData(),
    areas: getAreasData(),
    url: getUrl(),
    constructionYear: fromSource.constructionYear,
    operation: task.options.postingOperation,
    description: fromSource.descriptionTags,
    types: task.options.postingTypes,
    price: fromSource.listingPrice,
    active: fromSource.isActive,
  }
}
