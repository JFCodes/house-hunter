import { existsSync, writeFileSync, writeFile, readFileSync } from 'fs'

type Options<T extends { id: string }> = {
  fallback: Array<T>
  fileName: string
}

type UpdatePayload <T extends { id: string }> =
  Partial<Omit<T, 'id'>>
  & { id: string }

export class Data<T extends { id: string }> {
  private filename: string
  private fallback: Array<T>

  public data: Array<T> = []

  constructor (options: Options<T>) {
    this.fallback = options.fallback
    this.filename = options.fileName
    this.initialize()
  }
  
  public addRecord(record: T): void {
    this.data.push(record)
    this.scheduleSaveData(this.data)
  }

  public updateRecord (payload: UpdatePayload<T>): void {
    const index = this.data.findIndex(i => i.id === payload.id)
    if (index === -1) return

    const item = this.data[index]
    if (!item) return

    // Don't allow for id mutations
    const updated = { ...item, payload, id: item.id }
    this.data[index] = updated
    this.scheduleSaveData(this.data)
  }

  // Private
  private get fullFilename () { return `./data/${this.filename}.json` }

  private initialize () {
    this.ensureFileExists()
    this.readData()
  }

  private ensureFileExists () {
    const exists = existsSync(this.fullFilename)
    if (exists) return

    this.data = JSON.parse(JSON.stringify(this.fallback))
    this.saveData(this.data)
  }

  private saveData (data: Array<T>): void {
    writeFileSync(this.fullFilename, JSON.stringify(data))
  }

  private scheduleSaveData (data: Array<T>) {
    const content = JSON.stringify(data, null, 3)
    writeFile(this.fullFilename, content, () => {})
  }

  private readData (): void {
    try {
      const content = readFileSync(this.fullFilename, 'utf-8')
      this.data = JSON.parse(content)
    } catch {
      // muted
    }
  }
}
