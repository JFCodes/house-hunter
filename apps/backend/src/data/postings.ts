import type { T_Posting } from '@house-hunter/types'
// App
import { Data, type Options } from './_instance'

class PostingsClass extends Data<T_Posting> {
  constructor(options: Options<T_Posting>) {
    super(options)
  }

  // For a list of postings that may exist or be new
  // Updates the postings data or adds the new posting
  // Single data op with scheduled save at the end (one OS write)
  public batchUpsert (maybeNewPostings: Array<T_Posting>): void {
    // Make a map keyed by `idWithSource` which is the unique identifier of the respective source
    const map = new Map<string, T_Posting>()
    this.data.forEach(posting => map.set(posting.sourceId, posting))

    for (const toUpsert of maybeNewPostings) {
      // If exists - updated all fields but preserve existing system id
      // If not, append new entry
      const exists = map.get(toUpsert.sourceId)
      const updated = exists
        ? { ...exists, ...toUpsert, id: exists.id }
        : toUpsert

      map.set(toUpsert.sourceId, updated)
    }

    // Finally, update the local data and schedule saving
    this.data = Array.from(map.values())
    this.scheduleSaveData(this.data)
  }
}

export const data = new PostingsClass({
  fileName: 'postings',
  fallback: [],
})
