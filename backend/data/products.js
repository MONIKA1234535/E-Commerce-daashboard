// backend/data/products.js

const products = [
  {
    name: 'Sample Laptop',
    // CHANGE THIS: Use a real image URL, NOT a .js file
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500', 
    description: 'High performance laptop.',
    brand: 'Apple',
    category: 'Electronics',
    price: 1200.00,
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: 'Sample Smartphone',
    // CHANGE THIS: Use a real image URL
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500', 
    description: 'Latest model smartphone.',
    brand: 'Samsung',
    category: 'Electronics',
    price: 799.00,
    countInStock: 25,
    rating: 4.0,
    numReviews: 8,
  }
];

export default products;