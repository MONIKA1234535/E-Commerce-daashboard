import Order from '../models/OrderModel.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Public (Will be Private/Protected later)
const addOrderItems = async (req, res) => {
  // Destructure the data sent from the frontend
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400).json({ message: 'No order items' });
    return;
  } else {
    // For simplicity, we hardcode a user ID since we haven't implemented auth yet
    const placeholderUserId = '60c72b1f9f2b1d0015b6d9e0'; 

    const order = new Order({
      // We'll use a placeholder user ID for now
      user: placeholderUserId, 
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
    });

    try {
      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error during order creation' });
    }
  }
};

export { addOrderItems };