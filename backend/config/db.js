import mongoose from 'mongoose';
import process from 'process';

let isConnected = false;

const connectDB = async () => {
  try {
    // Attempt to connect to the database with timeout
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // 5 second timeout
      socketTimeoutMS: 45000,
    });
    
    isConnected = true;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    isConnected = false;
    // Don't exit process - let server start without DB for now
    console.error('WARNING: Server starting without database connection. Some features may not work.');
  }
};

export const checkDBConnection = () => isConnected;

export default connectDB;
