// Simple admin user creation script using TypeScript
import connectDB from '../src/lib/mongodb';
import User from '../src/models/User';
import bcrypt from 'bcryptjs';

async function createAdminUser() {
  try {
    console.log('🔧 Creating admin user...');
    await connectDB();

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ email: 'admin@piyushlifespaces.com' });
    
    if (existingAdmin) {
      console.log('✅ Admin user already exists!');
      console.log('Email:', existingAdmin.email);
      console.log('Role:', existingAdmin.role);
      console.log('Active:', existingAdmin.isActive);
      return;
    }

    // Create admin user
    console.log('👤 Creating new admin user...');
    const hashedPassword = await bcrypt.hash('admin123', 12);
    
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@piyushlifespaces.com',
      password: hashedPassword,
      role: 'admin',
      isActive: true,
      permissions: ['read', 'write', 'delete', 'admin']
    });

    console.log('✅ Admin user created successfully!');
    console.log('ID:', adminUser._id);
    console.log('Email:', adminUser.email);
    console.log('Role:', adminUser.role);
    console.log('');
    console.log('🔐 Login Credentials:');
    console.log('Email: admin@piyushlifespaces.com');
    console.log('Password: admin123');

  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    throw error;
  }
}

// Run the function
createAdminUser()
  .then(() => {
    console.log('✅ Admin creation process completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Admin creation process failed:', error);
    process.exit(1);
  });
