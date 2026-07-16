import { T_AdNew } from '@house-hunter/data-model'
// App
import { AdSchema } from '../schema'
import { excluded } from '../utils'
import { db } from '../database'
import { sql } from 'drizzle-orm'

export async function upsertAds (ads: Array<T_AdNew>): Promise<void> {
  await db.insert(AdSchema)
    .values(ads)
    .onConflictDoUpdate({
      target: AdSchema.targetAndId,
      set: {
        active: excluded(AdSchema.active),
        descriptionShort: excluded(AdSchema.descriptionShort),
        constructionYear: excluded(AdSchema.constructionYear),
        price: excluded(AdSchema.price),
        url: excluded(AdSchema.url),
        areaBuilt: excluded(AdSchema.areaBuilt),
        areaLiving: excluded(AdSchema.areaLiving),
        areaTotal: excluded(AdSchema.areaTotal),
        locationIsExact: excluded(AdSchema.locationIsExact),
        locationLocalZone: excluded(AdSchema.locationLocalZone),
        locationZipCode: excluded(AdSchema.locationZipCode),
        locationAddress: excluded(AdSchema.locationAddress),
        locationRegion: excluded(AdSchema.locationRegion),
        locationLongitude: excluded(AdSchema.locationLongitude),
        locationLatitude: excluded(AdSchema.locationLatitude),
        typologyHasParking: excluded(AdSchema.typologyHasParking),
        typologyHasGarage: excluded(AdSchema.typologyHasGarage),
        typologyBedrooms: excluded(AdSchema.typologyBedrooms),
        typologyBathrooms: excluded(AdSchema.typologyBathrooms),
        typologyOtherRooms: excluded(AdSchema.typologyOtherRooms),
        typologyTotalRooms: excluded(AdSchema.typologyTotalRooms),
        typologyParkingSpots: excluded(AdSchema.typologyParkingSpots),
        contactAgencyContact: excluded(AdSchema.contactAgencyContact),
        contactAgencyName: excluded(AdSchema.contactAgencyName),
        contactUserContact: excluded(AdSchema.contactUserContact),
        contactUsername: excluded(AdSchema.contactUsername),
        images: excluded(AdSchema.images),
        imageMain: excluded(AdSchema.imageMain),
      }
    })
}
