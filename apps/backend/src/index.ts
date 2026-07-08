import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
// App
import { controller as NoCacheController } from './controllers/no-cache'
import { EventQueue } from './engine/event-queue'
import { router as ApiRouter } from './routers'
import './data'

const PORT = 3000

EventQueue.initialize()

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cors({ origin: '*' }))

app.use('/api', NoCacheController, ApiRouter)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
