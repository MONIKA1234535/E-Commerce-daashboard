// /backend/seeder.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/users.js'; // FIXED: removed /data/ because users.js is in backend root
import products from './data/products.js'; 
import User from './models/UserModel.js'; 
import Product from './models/ProductModel.js';
import Order from './models/OrderModel.js';
import connectDB from './config/db.js'; 
import path from 'path';

// This tells the seeder to look for the .env file in the folder above
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
connectDB(); 

const importData = async () => {
  try {
    // 1. Clear existing data to prevent duplicates
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // 2. Import users from ./users.js
    const createdUsers = await User.insertMany(users);
    
    // 3. Identify the admin user to link to products
    const adminUser = createdUsers[0]._id;

    // 4. Map the products to include the admin user ID
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    // 5. Import products with the new Unsplash URLs
    await Product.insertMany(sampleProducts);

    console.log('Data Imported Successfully!');
    process.exit();
  } catch (error) {
    // Detailed error logging to help you if it fails again
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}