import express from 'express';
import { addOrderItems } from '../controllers/orderController.js'; 

const router = express.Router();

router.route('/').post(addOrderItems); // POST to create a new order

export default router;