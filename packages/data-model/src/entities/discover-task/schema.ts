import { sqliteTable, integer, text} from 'drizzle-orm/sqlite-core'
// App
import type { T_DiscoveryTypeOptions } from './types'
import { E_DISCOVERY_TASK_STATUS } from './enums'
import { E_TARGET } from '../targets'

export const DiscoveryTaskSchema = sqliteTable('discovery-task', {
  id: text('id')
    .primaryKey()
    .$default(() => crypto.randomUUID()),

  entityTye: text('entityType')
    .notNull()
    .$type<'discovery-task'>()
    .$default(() => 'discovery-task'),
  
  status: text('status')
    .notNull()
    .$type<E_DISCOVERY_TASK_STATUS>()
    .$default(() => E_DISCOVERY_TASK_STATUS.DRAFT),
    
  options: text('options', { mode: 'json' })
    .$type<T_DiscoveryTypeOptions>()
    .notNull(),

  createdAt: integer('createdAt')
    .notNull()
    .$default(() => new Date().getTime()),

  target: text('target')
    .notNull()
    .$type<E_TARGET>(),

  isRunning: integer('isRunning', { mode: 'boolean' })
    .notNull()
    .$default(() => false),
})

export type T_DiscoveryTaskNew =  typeof DiscoveryTaskSchema.$inferInsert
export type T_DiscoveryTask = typeof DiscoveryTaskSchema.$inferSelect
