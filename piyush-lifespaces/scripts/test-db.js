// Quick test to verify data in MongoDB
import connectDB from '../src/lib/mongodb';
import Property from '../src/models/Property';
import Inquiry from '../src/models/Inquiry';
import Contact from '../src/models/Contact';
import User from '../src/models/User';

async function testDatabase() {
  try {
    console.log('🔍 Testing database connection...');
    await connectDB();
    const mongoose = (await import('mongoose')).default;
    const conn = mongoose.connection;
    console.log(`Connected to host: ${conn.host}`);
    console.log(`Connected to database: ${conn.name}`);
    
    const propertyCount = await Property.countDocuments();
    const inquiryCount = await Inquiry.countDocuments();
    const contactCount = await Contact.countDocuments();
    const userCount = await User.countDocuments();
    
    console.log('📊 Database Status:');
    console.log(`Properties: ${propertyCount}`);
    console.log(`Inquiries: ${inquiryCount}`);
    console.log(`Contacts: ${contactCount}`);
    console.log(`Users: ${userCount}`);
    
    if (propertyCount > 0) {
      console.log('\n🏠 Sample Property:');
      const sampleProperty = await Property.findOne().lean();
      console.log(`Title: ${sampleProperty.title}`);
      console.log(`Location: ${sampleProperty.location}`);
      console.log(`Price: ${sampleProperty.price}`);
    }
    
    console.log('\n✅ Database verification completed!');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    process.exit(0);
  }
}

testDatabase();
