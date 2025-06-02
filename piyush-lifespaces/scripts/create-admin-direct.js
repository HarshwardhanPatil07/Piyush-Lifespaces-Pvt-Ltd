import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

const MONGODB_URI = 'mongodb+srv://piyush:piyush123@piyush-lifespaces.poqh0e8.mongodb.net/piyush-lifespaces?retryWrites=true&w=majority&appName=piyush-lifespaces';

async function createAdminUser() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    console.log('🔍 Connecting to MongoDB...');
    await client.connect();
    
    const db = client.db('piyush-lifespaces');
    const usersCollection = db.collection('users');
    
    // Check if admin user exists
    const existingAdmin = await usersCollection.findOne({ email: 'admin@piyushlifespaces.com' });
    
    if (existingAdmin) {
      console.log('✅ Admin user already exists!');
      console.log(`Email: ${existingAdmin.email}`);
      console.log(`Role: ${existingAdmin.role}`);
      console.log(`Active: ${existingAdmin.isActive}`);
      return;
    }
    
    console.log('❌ No admin user found. Creating one...');
    
    // Hash password
    const hashedPassword = await bcrypt.hash('admin123', 12);
    
    // Create admin user
    const adminUser = {
      name: 'Admin',
      email: 'admin@piyushlifespaces.com',
      password: hashedPassword,
      role: 'admin',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await usersCollection.insertOne(adminUser);
    console.log('✅ Admin user created successfully!');
    console.log(`User ID: ${result.insertedId}`);
    
    console.log('\n📝 Admin Login Credentials:');
    console.log('Email: admin@piyushlifespaces.com');
    console.log('Password: admin123');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
    console.log('🔌 MongoDB connection closed');
  }
}

createAdminUser();
