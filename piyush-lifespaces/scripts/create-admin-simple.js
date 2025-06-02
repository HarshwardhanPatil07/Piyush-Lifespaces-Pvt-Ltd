const { config } = require('dotenv');
config({ path: '.env.local' });

const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

const MONGODB_URI = process.env.MONGODB_URI;

async function createAdminUser() {
  if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI not found in environment variables');
    return;
  }

  console.log('🔍 MongoDB URI loaded:', MONGODB_URI.substring(0, 20) + '...');
  
  const client = new MongoClient(MONGODB_URI);
  
  try {
    console.log('🔍 Connecting to MongoDB...');
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
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
