import { sqliteTable, integer, text} from 'drizzle-orm/sqlite-core'
import { E_AD_STATUS } from './enums'
import { E_TARGET } from '../targets'
import { T_AdBuildingType, T_AdType } from './types'

export const AdSchema = sqliteTable('ad', {
  // Id fields
  id: text('id').primaryKey().$default(() => crypto.randomUUID()),
  entityTye: text('entityType').notNull().$type<'ad'>().$default(() => 'ad'),
  fromTarget: text('fromTarget').notNull().$type<E_TARGET>(),
  target: text('target').notNull().$type<E_TARGET>(),
  targetId: text('targetId').notNull(),
  targetAndId: text('targetAndId').notNull().unique(),
  // System fields
  adBuildingTypes: text('adBuildingTypes', { mode: 'json' }).notNull().$type<Array<T_AdBuildingType>>(),
  status: text('status').notNull().$type<E_AD_STATUS>().$default(() => E_AD_STATUS.NEW),
  createdAt: integer('createdAt').notNull().$default(() => new Date().getTime()),
  updatedAt: integer('updatedAt').notNull().$default(() => new Date().getTime()),
  adType: text('adType').notNull().$type<T_AdType>(),
  proposalBig: integer('proposalBig'),
  deletedAt: integer('deletedAt'),
  notes: text('notes'),
  // Actual ad fields - Only fields to update on upsert
  active: integer('active', { mode: 'boolean' }).notNull().$default(() => true),
  descriptionShort: text('descriptionShort').notNull(),
  constructionYear: integer('constructionYear'),
  price: integer('price').notNull(),
  url: text('url').notNull(),
  // Area
  areaBuilt: integer('areaBuildArea'),
  areaLiving: integer('areaLiving').notNull(),
  areaTotal: integer('totalArea').notNull(),
  // Location
  locationIsExact: integer('locationIsExact', { mode: 'boolean' }).notNull(),
  locationLocalZone: text('locationLocalZone').notNull(),
  locationZipCode: text('locationZipCode').notNull(),
  locationAddress: text('locationAddress').notNull(),
  locationRegion: text('locationRegion').notNull(),
  locationLongitude: integer('locationLongitude'),
  locationLatitude: integer('locationLatitude'),
  // Typology
  typologyHasParking: integer('typologyHasParking', { mode: 'boolean' }),
  typologyHasGarage: integer('typologyHasGarage', { mode: 'boolean' }),
  typologyBedrooms: integer('typologyBedrooms').notNull(),
  typologyBathrooms: integer('typologyBathrooms'),
  typologyOtherRooms: integer('typologyOtherRooms'),
  typologyTotalRooms: integer('typologyTotalRooms'),
  typologyParkingSpots: integer('typologyParkingSpots'),
  // Contacts
  contactAgencyContact: text('contactAgencyContact').notNull(),
  contactAgencyName: text('contactAgencyName').notNull(),
  contactUserContact: text('contactUserContact').notNull(),
  contactUsername: text('contactUsername').notNull(),
  // Images
  images: text('images', { mode: 'json' }).notNull().$type<Array<string>>(),
  imageMain: text('imageMain'),
})

export type T_AdNew =  typeof AdSchema.$inferInsert
export type T_Ad = typeof AdSchema.$inferSelect
