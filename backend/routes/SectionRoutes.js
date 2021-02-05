import express from 'express'

import {
  createSection,
  getAllSections,
  getSingleSection,
  updateSection,
  deleteSection
} from '../controllers/SectionController.js'

// gets middlware
import { userAuth } from '../middleware/auth.js'

// get task router
import taskRouter from './TaskRoutes.js'

const router = express.Router()

// reroute to task router
router.use('/:sectionId/tasks/', taskRouter)

// uses middle ware to check that user is authorized
router.use(userAuth)

// For now here is the Basic CRUD functionality
router.route('/')
  .post(createSection)
  .get(getAllSections)

router.route('/:id')
  .get(getSingleSection)
  .put(updateSection)
  .delete(deleteSection)



export default router