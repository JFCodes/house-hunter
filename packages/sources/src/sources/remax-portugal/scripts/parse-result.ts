import type { T_DiscoveryTask, T_AdNew } from '@house-hunter/data-model'
import { F_AdGetIds } from '@house-hunter/functions'
// App
import type { PostingSearchItem } from '../_types'
import { BASE_URL, BASE_IMAGE_URL } from '../_constants'

const withImageBaseUrl = (url: string) => `${BASE_IMAGE_URL}/${url}` 

export function parseResult (task: T_DiscoveryTask, fromSource: PostingSearchItem): T_AdNew {
  const { numberOfBathrooms, numberOfBedrooms } = fromSource
  const bedAndBathRooms = numberOfBathrooms + numberOfBedrooms
  const totalRooms = fromSource.totalRooms ?? bedAndBathRooms
  const otherRooms = Math.max(0, totalRooms - bedAndBathRooms)

  const region = [
    fromSource.regionName1 || '',
    fromSource.regionName2 || '',
    fromSource.regionName3 || '',
  ].filter(r => !!r).join(', ').trim()


  return {
    ...F_AdGetIds(task.target, fromSource.id),
    url: `${BASE_URL}/imoveis/${fromSource.descriptionTags}/${fromSource.listingTitle}`,
    constructionYear: fromSource.constructionYear,
    descriptionShort: fromSource.descriptionTags,
    adBuildingTypes: task.options.buildingTypes,
    price: fromSource.listingPrice,
    adType: task.options.addType,
    target: task.target,
    // Area
    areaLiving: fromSource.livingArea,
    areaTotal: fromSource.totalArea,
    areaBuilt: fromSource.builtArea,
    // Location
    locationIsExact: fromSource.isExactAddress,
    locationLongitude: fromSource.longitude,
    locationLocalZone: fromSource.localZone,
    locationLatitude: fromSource.latitude,
    locationZipCode: fromSource.zipCode,
    locationAddress: fromSource.address,
    locationRegion: region,
    // Typology
    typologyBedrooms: fromSource.numberOfBedrooms,
    typologyBathrooms: fromSource.numberOfBathrooms,
    typologyParkingSpots: fromSource.garageSpots,
    typologyHasParking: fromSource.parking,
    typologyHasGarage: fromSource.garage,
    typologyTotalRooms: totalRooms,
    typologyOtherRooms: otherRooms,
    // Contacts
    contactAgencyContact: fromSource.userAgencyPhoneNumber,
    contactUserContact: fromSource.userCellPhoneTrimmed,
    contactAgencyName: fromSource.userAgencyName || '',
    contactUsername: fromSource.userName,
    // Images
    images: fromSource.listingPictures.map(withImageBaseUrl),
    imageMain: withImageBaseUrl(fromSource.listingPictureUrl),
  }
}
