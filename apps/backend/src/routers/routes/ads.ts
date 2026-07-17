import { Router, type Router as RouterType } from 'express'
// Routes
import { controller as SearchController } from '../../controllers/ads/search'

export const router: RouterType = Router()

router.get('', SearchController)

