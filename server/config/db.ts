import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/new-asma-collection');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
    console.log('Running without MongoDB connection (using mock data for preview if needed).');
    // We don't exit process here so the preview can still run with mock data
  }
};
