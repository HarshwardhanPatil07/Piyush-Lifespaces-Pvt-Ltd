// Check admin user in database
import connectDB from '../src/lib/mongodb';
import User from '../src/models/User';

async function checkAdmin() {
  try {
    console.log('🔍 Checking admin user...');
    await connectDB();
    
    const users = await User.find({}).lean();
    console.log('📊 All Users:');
    users.forEach((user, index) => {
      console.log(`User ${index + 1}:`);
      console.log(`  Email: ${user.email}`);
      console.log(`  Role: ${user.role}`);
      console.log(`  Name: ${user.name}`);
    });
    
    const adminUser = await User.findOne({ role: 'admin' }).lean();
    if (adminUser) {
      console.log('\n✅ Admin user found!');
      console.log(`Email: ${adminUser.email}`);
      console.log(`Name: ${adminUser.name}`);
    } else {
      console.log('\n❌ No admin user found!');
      console.log('Creating admin user from environment variables...');
      
      const bcryptjs = await import('bcryptjs');
      const hashedPassword = await bcryptjs.default.hash(process.env.ADMIN_PASSWORD || 'admin123', 12);
      
      const newAdmin = new User({
        name: 'Admin',
        email: process.env.ADMIN_EMAIL || 'admin@piyushlifespaces.com',
        password: hashedPassword,
        role: 'admin'
      });
      
      await newAdmin.save();
      console.log('✅ Admin user created successfully!');
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    process.exit(0);
  }
}

checkAdmin();
