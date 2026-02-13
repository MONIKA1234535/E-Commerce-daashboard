import Product from '../models/ProductModel.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    // Basic product seeding/creation if none exist (for testing)
    const count = await Product.countDocuments();
    if (count === 0) {
        await Product.create({ name: 'Sample Laptop', price: 1200, description: 'High performance laptop.', countInStock: 10 });
        await Product.create({ name: 'Sample Smartphone', price: 799, description: 'Latest model smartphone.', countInStock: 25 });
    }

    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export { getProducts, getProductById };