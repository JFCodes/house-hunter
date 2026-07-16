import { T_AdNew } from '@house-hunter/data-model'
// App
import { AdSchema } from '../schema'
import { db } from '../database'
import { sql } from 'drizzle-orm'

export async function upsertAds (ads: Array<T_AdNew>): Promise<void> {
  await db.insert(AdSchema)
    .values(ads)
    .onConflictDoUpdate({
      target: AdSchema.targetAndId,
      set: {
        active: sql`excluded.${AdSchema.active}`,
        descriptionShort: sql`excluded.${AdSchema.descriptionShort}`,
        constructionYear: sql`excluded.${AdSchema.constructionYear}`,
        price: sql`excluded.${AdSchema.price}`,
        url: sql`excluded.${AdSchema.url}`,
        areaBuilt: sql`excluded.${AdSchema.areaBuilt}`,
        areaLiving: sql`excluded.${AdSchema.areaLiving}`,
        areaTotal: sql`excluded.${AdSchema.areaTotal}`,
        locationIsExact: sql`excluded.${AdSchema.locationIsExact}`,
        locationLocalZone: sql`excluded.${AdSchema.locationLocalZone}`,
        locationZipCode: sql`excluded.${AdSchema.locationZipCode}`,
        locationAddress: sql`excluded.${AdSchema.locationAddress}`,
        locationRegion: sql`excluded.${AdSchema.locationRegion}`,
        locationLongitude: sql`excluded.${AdSchema.locationLongitude}`,
        locationLatitude: sql`excluded.${AdSchema.locationLatitude}`,
        typologyHasParking: sql`excluded.${AdSchema.typologyHasParking}`,
        typologyHasGarage: sql`excluded.${AdSchema.typologyHasGarage}`,
        typologyBedrooms: sql`excluded.${AdSchema.typologyBedrooms}`,
        typologyBathrooms: sql`excluded.${AdSchema.typologyBathrooms}`,
        typologyOtherRooms: sql`excluded.${AdSchema.typologyOtherRooms}`,
        typologyTotalRooms: sql`excluded.${AdSchema.typologyTotalRooms}`,
        typologyParkingSpots: sql`excluded.${AdSchema.typologyParkingSpots}`,
        contactAgencyContact: sql`excluded.${AdSchema.contactAgencyContact}`,
        contactAgencyName: sql`excluded.${AdSchema.contactAgencyName}`,
        contactUserContact: sql`excluded.${AdSchema.contactUserContact}`,
        contactUsername: sql`excluded.${AdSchema.contactUsername}`,
        images: sql`excluded.${AdSchema.images}`,
        imageMain: sql`excluded.${AdSchema.imageMain}`,
      }
    })
}
