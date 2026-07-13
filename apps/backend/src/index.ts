import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import http from 'http'
import { WebSocketServer } from 'ws'
// App
import { controller as NoCacheController } from './controllers/no-cache'
import { TaskExecutionQueue } from './tasks/execution-queue'
import { initializeWebSocket } from './websocket'
import { router as ApiRouter } from './routers'
import './data'

const PORT = 3000

TaskExecutionQueue.initialize()

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cors({ origin: '*' }))

app.use('/api', NoCacheController, ApiRouter)

const httpServer = http.createServer(app)
const websocketServer = new WebSocketServer({
  server: httpServer,
  path: '/ws',
})

initializeWebSocket(websocketServer)
httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
