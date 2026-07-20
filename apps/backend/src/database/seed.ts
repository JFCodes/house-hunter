import { DiscoveryTaskSchema, E_TARGET } from '@house-hunter/data-model'
// App
import { db } from './database'

export async function seedDatabase (): Promise<void> {
  const discoveryTasks = db.select().from(DiscoveryTaskSchema).all()

  const hasImovirtual = discoveryTasks.some(d => d.target === E_TARGET.IMOVIRTUAL_PORTUGAL)
  const hasIdealista = discoveryTasks.some(d => d.target === E_TARGET.IDEALISTA_PORTUGAL)
  const hasRemax = discoveryTasks.some(d => d.target === E_TARGET.REMAX_PORTUGAL)

  if (!hasImovirtual) {
    await db.insert(DiscoveryTaskSchema).values({
      target: E_TARGET.IMOVIRTUAL_PORTUGAL,
      options: {
        buildingTypes: ['single-house'],
        location: 'leiria/leiria',
        addType: 'buy',
      }
    })
  }

  if (!hasIdealista) {
    await db.insert(DiscoveryTaskSchema).values({
      target: E_TARGET.IDEALISTA_PORTUGAL,
      options: {
        buildingTypes: ['single-house'],
        location: 'leiria/leiria',
        addType: 'buy',
      }
    })
  }

  if (!hasRemax) {
    await db.insert(DiscoveryTaskSchema).values({
      target: E_TARGET.REMAX_PORTUGAL,
      options: {
        buildingTypes: ['single-house'],
        location: 'leiria/leiria/r',
        addType: 'buy',
      }
    })
  }
}
