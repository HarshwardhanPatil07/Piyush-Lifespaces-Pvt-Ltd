// Simple MongoDB connection test
import connectDB from '../src/lib/mongodb';
import mongoose from 'mongoose';

async function testConnection() {
  try {
    console.log('🔄 Testing MongoDB connection...');
    await connectDB();
    console.log('✅ MongoDB connection successful!');
    console.log('📊 Connection state:', mongoose.connection.readyState);
    console.log('🗄️ Database name:', mongoose.connection.db?.databaseName);
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔒 Connection closed');
    process.exit(0);
  }
}

testConnection();
