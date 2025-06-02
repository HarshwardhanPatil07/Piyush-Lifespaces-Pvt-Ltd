// Enhanced seed script for MongoDB Atlas with CRUD operations
import connectDB from '../src/lib/mongodb';
import Property from '../src/models/Property';
import Inquiry from '../src/models/Inquiry';
import Contact from '../src/models/Contact';
import User from '../src/models/User';
import bcrypt from 'bcryptjs';

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');
    await connectDB();

    // Clear existing data
    console.log('🧹 Cleaning existing data...');
    await Promise.all([
      Property.deleteMany({}),
      Inquiry.deleteMany({}),
      Contact.deleteMany({}),
      User.deleteMany({})
    ]);

    // Create admin user
    console.log('👤 Creating admin user...');
    const hashedPassword = await bcrypt.hash('admin123', 12);
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@piyushlifespaces.com',
      password: hashedPassword,
      role: 'admin',
      isActive: true,
      permissions: ['read', 'write', 'delete', 'admin']
    });

    // Create additional users
    const users = await User.create([
      {
        name: 'Sales Manager',
        email: 'sales@piyushlifespaces.com',
        password: await bcrypt.hash('sales123', 12),
        role: 'manager',
        isActive: true,
        permissions: ['read', 'write']
      },
      {
        name: 'Property Agent',
        email: 'agent@piyushlifespaces.com',
        password: await bcrypt.hash('agent123', 12),
        role: 'agent',
        isActive: true,
        permissions: ['read']
      }
    ]);

    console.log(`✅ Created ${users.length + 1} users`);

    // Create sample properties
    console.log('🏠 Creating sample properties...');
    const properties = await Property.create([
      {
        title: 'Luxury Villa in Banjara Hills',
        description: 'Exquisite 4BHK villa with premium amenities and stunning architecture in the heart of Banjara Hills. Features include private swimming pool, landscaped garden, and state-of-the-art security systems.',
        location: 'Banjara Hills, Hyderabad',
        price: '₹2.5 Cr',
        area: '3500 sq ft',
        bedrooms: 4,
        bathrooms: 4,
        status: 'ongoing',
        type: 'villa',
        amenities: ['Swimming Pool', 'Gym', 'Garden', 'Security', 'Parking', 'Club House', 'Kids Play Area'],
        images: ['/api/placeholder/800/600', '/api/placeholder/800/600', '/api/placeholder/800/600'],
        features: ['Premium Location', 'Modern Architecture', 'Luxury Interiors', 'Gated Community', 'RERA Approved'],
        developer: 'Piyush Lifespaces Pvt Ltd',
        possession: 'Dec 2025',
        rera: 'P02400001234',
        isFeatured: true,
        isActive: true,
        views: 156,
        inquiries: 12
      },
      {
        title: 'Premium Apartments in Gachibowli',
        description: 'Modern 3BHK apartments in the IT corridor with world-class amenities and excellent connectivity. Perfect for professionals working in the tech hub.',
        location: 'Gachibowli, Hyderabad',
        price: '₹1.8 Cr',
        area: '2800 sq ft',
        bedrooms: 3,
        bathrooms: 3,
        status: 'ready',
        type: 'apartment',
        amenities: ['Swimming Pool', 'Gym', 'Clubhouse', 'Security', 'Parking', 'Power Backup'],
        images: ['/api/placeholder/800/600', '/api/placeholder/800/600'],
        features: ['IT Hub Location', 'Metro Connectivity', 'Premium Amenities', 'Vastu Compliant'],
        developer: 'Piyush Lifespaces Pvt Ltd',
        possession: 'Ready to Move',
        rera: 'P02400005678',
        isFeatured: true,
        isActive: true,
        views: 203,
        inquiries: 18
      },
      {
        title: 'Elegant Townhouse in Kondapur',
        description: 'Spacious 3BHK townhouse with private terrace and garden. Located in a gated community with excellent security and modern amenities.',
        location: 'Kondapur, Hyderabad',
        price: '₹1.2 Cr',
        area: '2200 sq ft',
        bedrooms: 3,
        bathrooms: 3,
        status: 'ongoing',
        type: 'townhouse',
        amenities: ['Garden', 'Security', 'Parking', 'Community Hall', 'Children Play Area'],
        images: ['/api/placeholder/800/600', '/api/placeholder/800/600'],
        features: ['Gated Community', 'Corner Plot', 'Vastu Compliant', 'Good Ventilation'],
        developer: 'Piyush Lifespaces Pvt Ltd',
        possession: 'Jun 2025',
        rera: 'P02400009012',
        isFeatured: false,
        isActive: true,
        views: 89,
        inquiries: 7
      },
      {
        title: 'Affordable Flats in Miyapur',
        description: 'Budget-friendly 2BHK apartments with essential amenities. Great investment opportunity in a developing area with future metro connectivity.',
        location: 'Miyapur, Hyderabad',
        price: '₹85 Lakh',
        area: '1400 sq ft',
        bedrooms: 2,
        bathrooms: 2,
        status: 'ready',
        type: 'apartment',
        amenities: ['Security', 'Parking', 'Power Backup', 'Water Supply'],
        images: ['/api/placeholder/800/600'],
        features: ['Metro Connectivity', 'Affordable Price', 'Good ROI', 'Ready Possession'],
        developer: 'Piyush Lifespaces Pvt Ltd',
        possession: 'Ready to Move',
        rera: 'P02400003456',
        isFeatured: false,
        isActive: true,
        views: 145,
        inquiries: 23
      },
      {
        title: 'Commercial Space in Hitech City',
        description: 'Premium commercial office space in the heart of Hitech City. Ideal for IT companies and startups with modern infrastructure.',
        location: 'Hitech City, Hyderabad',
        price: '₹3.5 Cr',
        area: '5000 sq ft',
        bedrooms: 0,
        bathrooms: 4,
        status: 'ready',
        type: 'commercial',
        amenities: ['High Speed Internet', 'Power Backup', 'Security', 'Parking', 'Conference Rooms'],
        images: ['/api/placeholder/800/600', '/api/placeholder/800/600'],
        features: ['IT Hub Location', 'Modern Infrastructure', 'Premium Building', 'Metro Access'],
        developer: 'Piyush Lifespaces Pvt Ltd',
        possession: 'Ready to Move',
        rera: 'P02400007890',
        isFeatured: true,
        isActive: true,
        views: 78,
        inquiries: 5
      }
    ]);

    console.log(`✅ Created ${properties.length} properties`);

    // Create sample inquiries
    console.log('📝 Creating sample inquiries...');
    const inquiries = await Inquiry.create([
      {
        name: 'Rajesh Kumar',
        email: 'rajesh.kumar@email.com',
        phone: '+91-9876543210',
        property: properties[0]._id,
        message: 'I am interested in the luxury villa. Can we schedule a site visit?',
        budget: '₹2-3 Cr',
        status: 'new',
        source: 'website',
        isRead: false,
        followUpDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
      },
      {
        name: 'Priya Sharma',
        email: 'priya.sharma@email.com',
        phone: '+91-9876543211',
        property: properties[1]._id,
        message: 'Looking for a 3BHK in Gachibowli for immediate possession.',
        budget: '₹1.5-2 Cr',
        status: 'contacted',
        source: 'referral',
        isRead: true,
        followUpDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 days from now
      },
      {
        name: 'Mohammed Ali',
        email: 'mohammed.ali@email.com',
        phone: '+91-9876543212',
        property: properties[2]._id,
        message: 'Interested in the townhouse. What are the loan options available?',
        budget: '₹1-1.5 Cr',
        status: 'qualified',
        source: 'social_media',
        isRead: true,
        followUpDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000) // 1 day from now
      },
      {
        name: 'Sunita Reddy',
        email: 'sunita.reddy@email.com',
        phone: '+91-9876543213',
        property: properties[3]._id,
        message: 'First time buyer looking for affordable options.',
        budget: '₹80-90 Lakh',
        status: 'new',
        source: 'website',
        isRead: false,
        followUpDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) // 5 days from now
      },
      {
        name: 'Tech Solutions Pvt Ltd',
        email: 'contact@techsolutions.com',
        phone: '+91-9876543214',
        property: properties[4]._id,
        message: 'Looking for commercial space for our IT company expansion.',
        budget: '₹3-4 Cr',
        status: 'proposal_sent',
        source: 'direct',
        isRead: true,
        followUpDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) // 2 days from now
      }
    ]);

    console.log(`✅ Created ${inquiries.length} inquiries`);

    // Create sample contacts
    console.log('📞 Creating sample contacts...');
    const contacts = await Contact.create([
      {
        name: 'Anita Gupta',
        email: 'anita.gupta@email.com',
        phone: '+91-9876543215',
        subject: 'General Inquiry',
        message: 'I would like to know about your upcoming projects in Hyderabad.',
        status: 'new',
        isRead: false
      },
      {
        name: 'Vikram Singh',
        email: 'vikram.singh@email.com',
        phone: '+91-9876543216',
        subject: 'Investment Opportunity',
        message: 'Looking for good investment properties. Please share details.',
        status: 'replied',
        isRead: true
      },
      {
        name: 'Deepa Menon',
        email: 'deepa.menon@email.com',
        phone: '+91-9876543217',
        subject: 'Site Visit Request',
        message: 'Want to schedule site visits for multiple properties.',
        status: 'new',
        isRead: false
      }
    ]);

    console.log(`✅ Created ${contacts.length} contacts`);

    // Update property inquiry counts
    console.log('🔄 Updating property inquiry counts...');
    for (const property of properties) {
      const inquiryCount = await Inquiry.countDocuments({ property: property._id });
      await Property.findByIdAndUpdate(property._id, { inquiries: inquiryCount });
    }

    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`👤 Users: ${users.length + 1}`);
    console.log(`🏠 Properties: ${properties.length}`);
    console.log(`📝 Inquiries: ${inquiries.length}`);
    console.log(`📞 Contacts: ${contacts.length}`);
    console.log('\n🔐 Admin Login Credentials:');
    console.log('Email: admin@piyushlifespaces.com');
    console.log('Password: admin123');
    console.log('\n🌐 You can now test CRUD operations through the admin panel!');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

// Run the seed function
seedDatabase()
  .then(() => {
    console.log('✅ Seeding process completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Seeding process failed:', error);
    process.exit(1);
  });
