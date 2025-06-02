import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

interface MongooseConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseConnection | undefined;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

// Enhanced connection options for better performance and reliability
const connectionOptions = {
  bufferCommands: false,
  maxPoolSize: 20,
  minPoolSize: 5,
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  family: 4,
  retryWrites: true,
  retryReads: true,
  maxIdleTimeMS: 30000,
  compressors: 'zlib',
  connectTimeoutMS: 10000,
};

async function connectDB(): Promise<typeof mongoose> {
  if (cached!.conn) {
    // Check if connection is still alive
    if (mongoose.connection.readyState === 1) {
      return cached!.conn;
    }
  }

  if (!cached!.promise) {
    cached!.promise = mongoose.connect(MONGODB_URI, connectionOptions).then((mongoose) => {
      console.log('✅ Connected to MongoDB Atlas');
      
      // Set up event listeners for connection monitoring
      mongoose.connection.on('connected', () => {
        console.log('📡 MongoDB connection established');
      });
      
      mongoose.connection.on('error', (err) => {
        console.error('❌ MongoDB connection error:', err);
      });
      
      mongoose.connection.on('disconnected', () => {
        console.log('⚠️ MongoDB disconnected');
      });
      
      // Enable strict mode for better data validation
      mongoose.set('strict', true);
      mongoose.set('strictQuery', true);
      
      return mongoose;
    }).catch((error) => {
      console.error('❌ MongoDB connection error:', error);
      cached!.promise = null;
      throw error;
    });
  }

  try {
    cached!.conn = await cached!.promise;
  } catch (e) {
    cached!.promise = null;
    throw e;
  }

  return cached!.conn;
}

export default connectDB;
