// Enhanced seed script for MongoDB Atlas with CRUD operations
import connectDB from '../src/lib/mongodb.js';
import Property from '../src/models/Property.js';
import Inquiry from '../src/models/Inquiry.js';
import Contact from '../src/models/Contact.js';
import User from '../src/models/User.js';
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

    // Sample properties data
    console.log('🏠 Creating properties...');
    const properties = await Property.create([
      {
        title: 'Luxury Villa in Banjara Hills',
        description: 'Experience luxury living in this stunning 4-bedroom villa located in the prestigious Banjara Hills. This property features modern amenities, spacious rooms, and a beautiful garden.',
        location: 'Banjara Hills, Hyderabad',
        price: '₹2.5 Cr',
        area: '3,500 sq ft',
        bedrooms: 4,
        bathrooms: 4,
        status: 'completed',
        type: 'villa',
        amenities: ['Swimming Pool', 'Gym', 'Garden', 'Security', 'Parking'],
        images: ['/images/villa1.jpg', '/images/villa2.jpg'],
        features: ['Premium Location', 'Gated Community', 'Modern Design'],
        developer: 'Piyush Lifespaces Pvt Ltd',
        possession: 'Ready to Move',
        rera: 'RERA123456',
        isActive: true,
        isFeatured: true,
        views: 125,
        inquiries: 8,
        coordinates: { lat: 17.4239, lng: 78.4738 }
      },
      {
        title: 'Premium Apartments in Gachibowli',
        description: 'Modern 3BHK apartments in the heart of Gachibowli IT corridor. Perfect for professionals with world-class amenities and excellent connectivity.',
        location: 'Gachibowli, Hyderabad',
        price: '₹1.2 Cr',
        area: '1,850 sq ft',
        bedrooms: 3,
        bathrooms: 3,
        status: 'ongoing',
        type: 'apartment',
        amenities: ['Club House', 'Swimming Pool', 'Gym', 'Children Play Area', 'Security'],
        images: ['/images/apartment1.jpg', '/images/apartment2.jpg'],
        features: ['IT Corridor', 'Metro Connectivity', 'Premium Amenities'],
        developer: 'Piyush Lifespaces Pvt Ltd',
        possession: 'Dec 2025',
        rera: 'RERA789012',
        isActive: true,
        isFeatured: true,
        views: 89,
        inquiries: 12
      },
      {
        title: 'Commercial Complex in HITEC City',
        description: 'Prime commercial space in HITEC City with excellent visibility and connectivity. Ideal for IT companies and corporate offices.',
        location: 'HITEC City, Hyderabad',
        price: '₹5.8 Cr',
        area: '8,000 sq ft',
        bedrooms: 0,
        bathrooms: 6,
        status: 'completed',
        type: 'commercial',
        amenities: ['High Speed Internet', 'Power Backup', 'Parking', 'Security', 'Cafeteria'],
        images: ['/images/commercial1.jpg', '/images/commercial2.jpg'],
        features: ['Prime Location', 'IT Hub', 'Modern Infrastructure'],
        developer: 'Piyush Lifespaces Pvt Ltd',
        possession: 'Ready to Move',
        rera: 'RERA345678',
        isActive: true,
        isFeatured: false,
        views: 67,
        inquiries: 5
      },
      {
        title: 'Residential Plots in Kompally',
        description: 'HMDA approved residential plots in the fast-developing Kompally area. Great investment opportunity with excellent growth potential.',
        location: 'Kompally, Hyderabad',
        price: '₹85 L',
        area: '200 sq yards',
        bedrooms: 0,
        bathrooms: 0,
        status: 'upcoming',
        type: 'residential',
        amenities: ['Gated Community', 'Park', 'Internal Roads', 'Street Lights'],
        images: ['/images/plot1.jpg', '/images/plot2.jpg'],
        features: ['HMDA Approved', 'Clear Titles', 'Investment Opportunity'],
        developer: 'Piyush Lifespaces Pvt Ltd',
        possession: 'June 2026',
        rera: 'RERA901234',
        isActive: true,
        isFeatured: false,
        views: 43,
        inquiries: 3
      }
    ]);

    // Sample inquiries data
    console.log('📞 Creating inquiries...');
    const inquiries = await Inquiry.create([
      {
        name: 'Rajesh Kumar',
        email: 'rajesh.kumar@email.com',
        phone: '+91 9876543210',
        property: 'Luxury Villa in Banjara Hills',
        propertyId: properties[0]._id,
        message: 'I am interested in this villa. Can we schedule a site visit this weekend?',
        status: 'new',
        source: 'website',
        priority: 'high',
        budget: '₹2-3 Cr',
        isRead: false
      },
      {
        name: 'Priya Sharma',
        email: 'priya.sharma@email.com',
        phone: '+91 9876543211',
        property: 'Premium Apartments in Gachibowli',
        propertyId: properties[1]._id,
        message: 'Looking for a 3BHK apartment with good amenities. What are the payment options?',
        status: 'contacted',
        source: 'phone',
        priority: 'medium',
        budget: '₹1-1.5 Cr',
        isRead: true,
        lastContactedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        name: 'Amit Patel',
        email: 'amit.patel@email.com',
        phone: '+91 9876543212',
        property: 'Commercial Complex in HITEC City',
        propertyId: properties[2]._id,
        message: 'Need commercial space for my IT company. Please share floor plans and pricing.',
        status: 'qualified',
        source: 'referral',
        priority: 'high',
        budget: '₹5-8 Cr',
        isRead: true,
        assignedTo: 'Sales Manager',
        followUpDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
      },
      {
        name: 'Sunita Reddy',
        email: 'sunita.reddy@email.com',
        phone: '+91 9876543213',
        property: 'Residential Plots in Kompally',
        propertyId: properties[3]._id,
        message: 'Interested in purchasing 2-3 plots for investment. What are the current rates?',
        status: 'new',
        source: 'social',
        priority: 'medium',
        budget: '₹1-2 Cr',
        isRead: false
      },
      {
        name: 'Vikram Singh',
        email: 'vikram.singh@email.com',
        phone: '+91 9876543214',
        property: 'General Inquiry',
        message: 'Looking for villa projects in Jubilee Hills or Banjara Hills area. Do you have any upcoming projects?',
        status: 'new',
        source: 'website',
        priority: 'low',
        budget: '₹3-5 Cr',
        isRead: false
      }
    ]);

    // Sample contacts data
    console.log('📧 Creating contacts...');
    const contacts = await Contact.create([
      {
        name: 'Deepak Agarwal',
        email: 'deepak.agarwal@email.com',
        phone: '+91 9876543215',
        subject: 'Property Investment Consultation',
        message: 'I would like to discuss investment opportunities in real estate. Please contact me.',
        source: 'website',
        status: 'new',
        isRead: false
      },
      {
        name: 'Kavitha Nair',
        email: 'kavitha.nair@email.com',
        phone: '+91 9876543216',
        subject: 'Home Loan Assistance',
        message: 'Do you provide home loan assistance for your properties? I need information about the process.',
        source: 'phone',
        status: 'replied',
        isRead: true,
        repliedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      }
    ]);

    console.log('✅ Database seeding completed successfully!');
    console.log('\n📊 Seeded Data Summary:');
    console.log(`Users: ${users.length + 1} (including admin)`);
    console.log(`Properties: ${properties.length}`);
    console.log(`Inquiries: ${inquiries.length}`);
    console.log(`Contacts: ${contacts.length}`);
    
    console.log('\n👤 Admin Login Credentials:');
    console.log('Email: admin@piyushlifespaces.com');
    console.log('Password: admin123');
    
    console.log('\n🔗 Test the CRUD operations:');
    console.log('1. Login to admin panel: http://localhost:3000/admin/login');
    console.log('2. View properties: http://localhost:3000/api/properties');
    console.log('3. View inquiries: http://localhost:3000/api/inquiries');
    console.log('4. View dashboard stats: http://localhost:3000/api/dashboard/stats');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    process.exit(0);
  }
}

// Test CRUD operations
async function testCRUDOperations() {
  try {
    console.log('\n🧪 Testing CRUD operations...');
    await connectDB();

    // Test Property CRUD
    console.log('\n🏠 Testing Property CRUD:');
    
    // Create
    const newProperty = await Property.create({
      title: 'Test Property',
      description: 'This is a test property',
      location: 'Test Location',
      price: '₹1 Cr',
      area: '1000 sq ft',
      bedrooms: 2,
      bathrooms: 2,
      status: 'upcoming',
      type: 'apartment',
      amenities: ['Test Amenity'],
      images: [],
      features: ['Test Feature']
    });
    console.log('✅ Property created:', newProperty.title);

    // Read
    const properties = await Property.find({ title: 'Test Property' });
    console.log('✅ Property read:', properties.length, 'found');

    // Update
    const updatedProperty = await Property.findByIdAndUpdate(
      newProperty._id,
      { price: '₹1.2 Cr' },
      { new: true }
    );
    console.log('✅ Property updated, new price:', updatedProperty.price);

    // Delete
    await Property.findByIdAndDelete(newProperty._id);
    console.log('✅ Property deleted');

    console.log('\n🎉 All CRUD operations completed successfully!');

  } catch (error) {
    console.error('❌ Error testing CRUD operations:', error);
  }
}

// Run seeding
seedDatabase();

// Optionally run CRUD tests
// testCRUDOperations();
