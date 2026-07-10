import { Router, type Router as RouterType } from 'express'
// Routes
import { router as CrawlNewPostingsRouter } from './tasks/crawl-new-postings'

export const router: RouterType = Router()

router.use('/crawl-new-postings', CrawlNewPostingsRouter)
