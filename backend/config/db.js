import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // This looks for the MONGO_URI variable in your .env file
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // If your .env file is not being read, this will trigger the "undefined" error
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;