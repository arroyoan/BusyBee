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

const router = express.Router()

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