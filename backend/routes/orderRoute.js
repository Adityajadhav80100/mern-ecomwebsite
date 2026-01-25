import express from 'express'
import { placeOrder } from '../controllers/orderController.js'

const orderRoute = express.Router();

orderRoute.post('/order-place', placeOrder);

export default orderRoute;