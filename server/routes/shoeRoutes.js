import express from 'express'
import {
  getShoes,
  getShoeById,
  createShoe,
  updateShoe,
  deleteShoe
} from '../controllers/shoeController.js'

const router = express.Router()

router.route('/')
  .get(getShoes)
  .post(createShoe)

router.route('/:id')
  .get(getShoeById)
  .put(updateShoe)
  .delete(deleteShoe)

export default router
