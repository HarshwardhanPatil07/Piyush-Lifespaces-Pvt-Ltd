// Create admin user and test login
import connectDB from '../src/lib/mongodb.js';
import User from '../src/models/User.js';
import bcrypt from 'bcryptjs';

async function createAdminAndTest() {
  try {
    console.log('🔍 Connecting to database...');
    await connectDB();
    
    // Check if admin user exists
    let adminUser = await User.findOne({ email: 'admin@piyushlifespaces.com' });
    
    if (!adminUser) {
      console.log('❌ No admin user found. Creating one...');
      
      const hashedPassword = await bcrypt.hash('admin123', 12);
      
      adminUser = new User({
        name: 'Admin',
        email: 'admin@piyushlifespaces.com',
        password: hashedPassword,
        role: 'admin',
        isActive: true
      });
      
      await adminUser.save();
      console.log('✅ Admin user created successfully!');
    } else {
      console.log('✅ Admin user already exists!');
      console.log(`Email: ${adminUser.email}`);
      console.log(`Role: ${adminUser.role}`);
      console.log(`Active: ${adminUser.isActive}`);
    }
    
    // Test password verification
    console.log('\n🔍 Testing password verification...');
    const isPasswordValid = await bcrypt.compare('admin123', adminUser.password);
    console.log(`Password valid: ${isPasswordValid}`);
    
    // Show admin credentials
    console.log('\n📝 Admin Login Credentials:');
    console.log('Email: admin@piyushlifespaces.com');
    console.log('Password: admin123');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    process.exit(0);
  }
}

createAdminAndTest();
