import connectDB from '../src/lib/mongodb';
import Property from '../src/models/Property';
import Inquiry from '../src/models/Inquiry';
import Contact from '../src/models/Contact';
import User from '../src/models/User';
import bcrypt from 'bcryptjs';

const sampleProperties = [
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
    description: 'Modern 2BHK and 3BHK apartments with world-class amenities in the IT corridor of Hyderabad. Perfect for professionals with excellent connectivity to major IT companies.',
    location: 'Gachibowli, Hyderabad',
    price: '₹85 L - ₹1.2 Cr',
    area: '1200-1800 sq ft',
    bedrooms: 3,
    bathrooms: 2,
    status: 'completed',
    type: 'apartment',
    amenities: ['Club House', 'Swimming Pool', 'Gym', 'Children Play Area', 'Security', 'Power Backup', 'Elevator'],
    images: ['/api/placeholder/800/600', '/api/placeholder/800/600', '/api/placeholder/800/600'],
    features: ['IT Corridor Location', 'Ready to Move', 'Premium Amenities', 'Metro Connectivity', 'Shopping Centers Nearby'],
    developer: 'Piyush Lifespaces Pvt Ltd',
    possession: 'Ready to Move',
    rera: 'P02400001235',
    isFeatured: true,
    isActive: true,
    views: 234,
    inquiries: 18
  },
  {
    title: 'Commercial Complex in HITEC City',
    description: 'State-of-the-art commercial spaces perfect for offices and retail outlets in HITEC City. Modern infrastructure with high-speed elevators, central air conditioning, and 24/7 security.',
    location: 'HITEC City, Hyderabad',
    price: '₹5 Cr - ₹15 Cr',
    area: '2000-8000 sq ft',
    bedrooms: 0,
    bathrooms: 4,
    status: 'upcoming',
    type: 'commercial',
    amenities: ['24/7 Security', 'Power Backup', 'Parking', 'Conference Rooms', 'Food Court', 'High-Speed Elevators', 'Central AC'],
    images: ['/api/placeholder/800/600', '/api/placeholder/800/600', '/api/placeholder/800/600'],
    features: ['Prime Commercial Location', 'Modern Infrastructure', 'High ROI', 'IT Hub', 'Metro Connectivity'],
    developer: 'Piyush Lifespaces Pvt Ltd',
    possession: 'Mar 2026',
    rera: 'P02400001236',
    isFeatured: false,
    isActive: true,
    views: 89,
    inquiries: 7
  },
  {
    title: 'Luxury Residences in Jubilee Hills',
    description: 'Ultra-luxury 3BHK and 4BHK residences in the prestigious Jubilee Hills area. Features include private elevators, home automation, and panoramic city views.',
    location: 'Jubilee Hills, Hyderabad',
    price: '₹3.5 Cr - ₹5.5 Cr',
    area: '2500-3200 sq ft',
    bedrooms: 4,
    bathrooms: 4,
    status: 'ongoing',
    type: 'apartment',
    amenities: ['Private Elevator', 'Home Automation', 'Concierge Service', 'Valet Parking', 'Spa', 'Rooftop Garden'],
    images: ['/api/placeholder/800/600', '/api/placeholder/800/600', '/api/placeholder/800/600'],
    features: ['Ultra Luxury', 'Panoramic Views', 'Premium Location', 'Smart Home Features', 'Exclusive Amenities'],
    developer: 'Piyush Lifespaces Pvt Ltd',
    possession: 'Sep 2025',
    rera: 'P02400001237',
    isFeatured: true,
    isActive: true,
    views: 298,
    inquiries: 24
  }
];

const sampleInquiries = [
  {
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@email.com',
    phone: '+91 9876543210',
    property: 'Luxury Villa in Banjara Hills',
    message: 'Interested in scheduling a site visit. Please contact me at your earliest convenience.',
    status: 'new',
    source: 'website',
    budget: '₹2-3 Cr',
    priority: 'high'
  },
  {
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91 9876543211',
    property: 'Premium Apartments in Gachibowli',
    message: 'Looking for 3BHK apartment with good amenities. When can I visit the site?',
    status: 'contacted',
    source: 'website',
    budget: '₹1-1.5 Cr',
    priority: 'medium'
  },
  {
    name: 'Amit Patel',
    email: 'amit.patel@email.com',
    phone: '+91 9876543212',
    property: 'Commercial Complex in HITEC City',
    message: 'Need commercial space for my IT company. Please share more details about available units.',
    status: 'qualified',
    source: 'phone',
    budget: '₹5-8 Cr',
    priority: 'high'
  }
];

const sampleContacts = [
  {
    name: 'Sneha Reddy',
    email: 'sneha.reddy@email.com',
    phone: '+91 9876543213',
    subject: 'Investment Opportunities',
    message: 'I am interested in investment opportunities in your upcoming projects. Please share the details.',
    propertyInterest: 'Investment',
    source: 'contact-form',
    status: 'new'
  },
  {
    name: 'Vikram Singh',
    email: 'vikram.singh@email.com',
    phone: '+91 9876543214',
    subject: 'Home Loan Assistance',
    message: 'Do you provide home loan assistance? What are the banks you are tied up with?',
    propertyInterest: 'Home Loan',
    source: 'contact-form',
    status: 'responded'
  }
];

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');
    
    await connectDB();
    
    // Clear existing data
    console.log('🗑️ Clearing existing data...');
    await Property.deleteMany({});
    await Inquiry.deleteMany({});
    await Contact.deleteMany({});
    await User.deleteMany({});
    
    // Create admin user
    console.log('👤 Creating admin user...');
    const hashedPassword = await bcrypt.hash('admin123', 12);
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@piyushlifespaces.com',
      password: hashedPassword,
      role: 'admin',
      phone: '+91 98765 43210',
      permissions: ['all'],
      isActive: true
    });
    await adminUser.save();
    
    // Insert sample properties
    console.log('🏠 Inserting sample properties...');
    const properties = await Property.insertMany(sampleProperties);
    console.log(`✅ Inserted ${properties.length} properties`);
    
    // Insert sample inquiries with property references
    console.log('📞 Inserting sample inquiries...');
    const inquiriesWithRef = sampleInquiries.map((inquiry, index) => ({
      ...inquiry,
      propertyId: properties[index]?._id
    }));
    const inquiries = await Inquiry.insertMany(inquiriesWithRef);
    console.log(`✅ Inserted ${inquiries.length} inquiries`);
    
    // Insert sample contacts
    console.log('📧 Inserting sample contacts...');
    const contacts = await Contact.insertMany(sampleContacts);
    console.log(`✅ Inserted ${contacts.length} contacts`);
    
    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`- Properties: ${properties.length}`);
    console.log(`- Inquiries: ${inquiries.length}`);
    console.log(`- Contacts: ${contacts.length}`);
    console.log(`- Users: 1 (admin)`);
    console.log('\n🔐 Admin Login:');
    console.log('Email: admin@piyushlifespaces.com');
    console.log('Password: admin123');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    process.exit(0);
  }
}

// Run the seeder
seedDatabase();
