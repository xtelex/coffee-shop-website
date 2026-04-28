import express from 'express'
import {
  getCoffees,
  getCoffeeById,
  createCoffee,
  updateCoffee,
  deleteCoffee
} from '../controllers/coffeeController.js'

const router = express.Router()

router.route('/')
  .get(getCoffees)
  .post(createCoffee)

router.route('/:id')
  .get(getCoffeeById)
  .put(updateCoffee)
  .delete(deleteCoffee)

export default router
