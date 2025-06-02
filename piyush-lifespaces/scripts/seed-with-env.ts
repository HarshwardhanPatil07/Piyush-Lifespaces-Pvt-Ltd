import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

console.log('Environment variables loaded');
console.log('MONGODB_URI available:', !!process.env.MONGODB_URI);

// Now import the rest of the modules
import connectDB from '../src/lib/mongodb';
import Property from '../src/models/Property';
import Inquiry from '../src/models/Inquiry';
import Contact from '../src/models/Contact';

const sampleProperties = [
  {
    title: "Luxury Villa in Banjara Hills",
    description: "Stunning 4BHK villa with modern amenities, swimming pool, and garden. Located in the heart of Banjara Hills with excellent connectivity.",
    price: 45000000,
    location: "Banjara Hills, Hyderabad",
    type: "villa",
    bedrooms: 4,
    bathrooms: 4,
    area: 3500,
    status: "ongoing",
    features: ["Swimming Pool", "Garden", "Parking", "Security", "Power Backup"],
    images: [
      "/images/villa-1-1.jpg",
      "/images/villa-1-2.jpg",
      "/images/villa-1-3.jpg"
    ],
    amenities: ["24/7 Security", "Swimming Pool", "Gym", "Club House", "Children's Play Area"],
    completionDate: new Date('2024-12-31'),
    isActive: true,
    views: 156
  },
  {
    title: "Modern Apartment Complex - Gachibowli",
    description: "Contemporary 3BHK apartments in IT corridor with state-of-the-art facilities and excellent investment potential.",
    price: 12500000,
    location: "Gachibowli, Hyderabad",
    type: "apartment",
    bedrooms: 3,
    bathrooms: 3,
    area: 1850,
    status: "completed",
    features: ["Modular Kitchen", "Balcony", "Parking", "Lift", "Power Backup"],
    images: [
      "/images/apartment-1-1.jpg",
      "/images/apartment-1-2.jpg",
      "/images/apartment-1-3.jpg"
    ],
    amenities: ["Swimming Pool", "Gym", "Jogging Track", "Multi-purpose Hall", "Children's Play Area"],
    completionDate: new Date('2023-06-15'),
    isActive: true,
    views: 89
  },
  {
    title: "Commercial Space - Jubilee Hills",
    description: "Prime commercial space perfect for offices, retail, or business operations. Strategic location with high footfall.",
    price: 25000000,
    location: "Jubilee Hills, Hyderabad",
    type: "commercial",
    bedrooms: 0,
    bathrooms: 2,
    area: 2200,
    status: "upcoming",
    features: ["Central AC", "Parking", "High-speed Internet", "Conference Room", "Reception Area"],
    images: [
      "/images/commercial-1-1.jpg",
      "/images/commercial-1-2.jpg",
      "/images/commercial-1-3.jpg"
    ],
    amenities: ["24/7 Security", "Power Backup", "Elevators", "Cafeteria", "Parking"],
    completionDate: new Date('2025-03-30'),
    isActive: true,
    views: 34
  },
  {
    title: "Residential Plots - Kompally",
    description: "DTCP approved residential plots with clear titles. Perfect for building your dream home in a developing area.",
    price: 8500000,
    location: "Kompally, Hyderabad",
    type: "residential",
    bedrooms: 0,
    bathrooms: 0,
    area: 2400,
    status: "ongoing",
    features: ["DTCP Approved", "Clear Title", "Gated Community", "24/7 Security", "Wide Roads"],
    images: [
      "/images/plot-1-1.jpg",
      "/images/plot-1-2.jpg",
      "/images/plot-1-3.jpg"
    ],
    amenities: ["Street Lighting", "Underground Drainage", "Water Supply", "Electricity", "Security"],
    completionDate: new Date('2024-09-15'),
    isActive: true,
    views: 67
  },
  {
    title: "Luxury Penthouse - Hitec City",
    description: "Exclusive penthouse with panoramic city views, private terrace, and premium finishes. Ultimate luxury living experience.",
    price: 35000000,
    location: "Hitec City, Hyderabad",
    type: "apartment",
    bedrooms: 4,
    bathrooms: 5,
    area: 4200,
    status: "completed",
    features: ["Private Terrace", "City View", "Jacuzzi", "Home Theater", "Smart Home"],
    images: [
      "/images/penthouse-1-1.jpg",
      "/images/penthouse-1-2.jpg",
      "/images/penthouse-1-3.jpg"
    ],
    amenities: ["Concierge Service", "Valet Parking", "Spa", "Rooftop Pool", "Private Elevator"],
    completionDate: new Date('2023-12-01'),
    isActive: true,
    views: 123
  },
  {
    title: "Budget Homes - Outer Ring Road",
    description: "Affordable 2BHK homes for first-time buyers. Well-planned layout with all basic amenities and good connectivity.",
    price: 5500000,
    location: "Outer Ring Road, Hyderabad",
    type: "apartment",
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    status: "ongoing",
    features: ["Modular Kitchen", "Balcony", "Parking", "Lift", "Security"],
    images: [
      "/images/budget-1-1.jpg",
      "/images/budget-1-2.jpg",
      "/images/budget-1-3.jpg"
    ],
    amenities: ["Playground", "Community Hall", "Security", "Power Backup", "Water Supply"],
    completionDate: new Date('2024-08-20'),
    isActive: true,
    views: 78
  }
];

const sampleInquiries = [
  {
    propertyId: null, // Will be set after properties are created
    name: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    phone: "+91 9876543210",
    message: "I'm interested in the luxury villa in Banjara Hills. Could you please share more details about the payment plan and possession date?",
    type: "property_inquiry",
    status: "new",
    isRead: false
  },
  {
    propertyId: null,
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+91 9123456789",
    message: "Looking for a 3BHK apartment in Gachibowli area. What are the loan assistance options available?",
    type: "property_inquiry",
    status: "contacted",
    isRead: true
  },
  {
    propertyId: null,
    name: "Mohammad Ali",
    email: "mohammad.ali@email.com",
    phone: "+91 8765432109",
    message: "Interested in commercial space for my business. Can we schedule a site visit this weekend?",
    type: "site_visit",
    status: "scheduled",
    isRead: true
  },
  {
    propertyId: null,
    name: "Sneha Reddy",
    email: "sneha.reddy@email.com",
    phone: "+91 7654321098",
    message: "I would like to know about the residential plots in Kompally. Are there any ongoing offers?",
    type: "property_inquiry",
    status: "new",
    isRead: false
  }
];

const sampleContacts = [
  {
    name: "Vikram Singh",
    email: "vikram.singh@email.com",
    phone: "+91 9988776655",
    subject: "Investment Opportunities",
    message: "I'm looking for good investment opportunities in real estate. Could you please guide me with the best options available?",
    isRead: false
  },
  {
    name: "Anita Joshi",
    email: "anita.joshi@email.com",
    phone: "+91 8877665544",
    subject: "Home Loan Assistance",
    message: "Do you provide assistance with home loan applications? What are the banks you are tied up with?",
    isRead: true
  },
  {
    name: "Karthik Nair",
    email: "karthik.nair@email.com",
    phone: "+91 7766554433",
    subject: "Property Documentation",
    message: "What documents are required for property registration? Please share the complete checklist.",
    isRead: false
  }
];

async function seedDatabase() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await connectDB();
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await Property.deleteMany({});
    await Inquiry.deleteMany({});
    await Contact.deleteMany({});
    console.log('✅ Existing data cleared');

    // Insert properties
    console.log('🏢 Creating sample properties...');
    const createdProperties = await Property.insertMany(sampleProperties);
    console.log(`✅ Created ${createdProperties.length} properties`);

    // Update inquiries with property IDs
    console.log('📧 Creating sample inquiries...');
    for (let i = 0; i < sampleInquiries.length; i++) {
      if (i < createdProperties.length) {
        sampleInquiries[i].propertyId = createdProperties[i]._id;
      }
    }
    const createdInquiries = await Inquiry.insertMany(sampleInquiries);
    console.log(`✅ Created ${createdInquiries.length} inquiries`);

    // Insert contacts
    console.log('📞 Creating sample contacts...');
    const createdContacts = await Contact.insertMany(sampleContacts);
    console.log(`✅ Created ${createdContacts.length} contacts`);

    // Display summary
    console.log('\n📊 Database Seeding Summary:');
    console.log(`Properties: ${createdProperties.length}`);
    console.log(`Inquiries: ${createdInquiries.length}`);
    console.log(`Contacts: ${createdContacts.length}`);

    console.log('\n🎉 Database seeded successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();
