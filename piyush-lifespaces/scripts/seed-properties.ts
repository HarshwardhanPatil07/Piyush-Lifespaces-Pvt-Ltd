import mongoose from 'mongoose';
import Property from '../src/models/Property';

const MONGODB_URI = 'mongodb+srv://piyush:piyush123@piyush-lifespaces.poqh0e8.mongodb.net/?retryWrites=true&w=majority&appName=piyush-lifespaces';

const sampleProperties = [
  {
    title: 'Piyush Heights - Premium Residences',
    description: 'Experience luxury living at its finest with our premium 3 & 4 BHK residences. Located in the heart of the city with world-class amenities and modern architecture.',
    location: 'Banjara Hills, Hyderabad',
    price: '₹1.2 Cr - ₹2.5 Cr',
    area: '1800-3200 sq ft',
    bedrooms: 3,
    bathrooms: 3,
    status: 'ongoing',
    type: 'residential',
    amenities: ['Swimming Pool', 'Gym & Fitness Center', 'Children Play Area', 'Landscaped Gardens', '24/7 Security', 'Power Backup', 'Covered Parking'],
    images: [
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAoACgDASIAAhEBAxEB/8QAGwAAAQUBAQAAAAAAAAAAAAAABQADBgcIBAL/xAAsEAABAwMCBAYCAwEAAAAAAAABAgMEAAUGEQcSITETQVFhcYEUkaGx8P/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGxEAAwADAQEAAAAAAAAAAAAAAQIDAAQFEf/aAAwDAQACEQMRAD8A',
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAoACgDASIAAhEBAxEB/8QAGwAAAQUBAQAAAAAAAAAAAAAABQADBgcIBAL/xAAsEAABAwMCBAYCAwEAAAAAAAABAgMEAAUGEQcSITETQVFhcYEUkaGx8P/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGxEAAwADAQEAAAAAAAAAAAAAAQIDAAQFEf/aAAwDAQACEQMRAD8A'
    ],
    features: ['Premium Location', 'Modern Architecture', 'Vastu Compliant', 'High-Speed Elevators'],
    possession: 'December 2025',
    developer: 'Piyush Lifespaces Pvt Ltd',
    rera: 'P02400003456',
    isActive: true,
    isFeatured: true
  },
  {
    title: 'Piyush Commercial Hub',
    description: 'State-of-the-art commercial spaces designed for modern businesses. Prime location with excellent connectivity and premium infrastructure.',
    location: 'HITEC City, Hyderabad',
    price: '₹80 L - ₹3 Cr',
    area: '500-2500 sq ft',
    bedrooms: 0,
    bathrooms: 2,
    status: 'completed',
    type: 'commercial',
    amenities: ['24/7 Security', 'Power Backup', 'High-Speed Internet', 'Conference Rooms', 'Food Court', 'Ample Parking'],
    images: [
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAoACgDASIAAhEBAxEB/8QAGwAAAQUBAQAAAAAAAAAAAAAABQADBgcIBAL/xAAsEAABAwMCBAYCAwEAAAAAAAABAgMEAAUGEQcSITETQVFhcYEUkaGx8P/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGxEAAwADAQEAAAAAAAAAAAAAAQIDAAQFEf/aAAwDAQACEQMRAD8A'
    ],
    features: ['Prime Commercial Location', 'Modern Infrastructure', 'Ready to Move', 'High ROI Potential'],
    possession: 'Ready to Occupy',
    developer: 'Piyush Lifespaces Pvt Ltd',
    rera: 'P02400003457',
    isActive: true,
    isFeatured: true
  },
  {
    title: 'Piyush Garden Villas',
    description: 'Luxury independent villas with private gardens. Perfect blend of comfort and elegance in a serene environment.',
    location: 'Kompally, Hyderabad',
    price: '₹2.8 Cr - ₹4.5 Cr',
    area: '3000-4500 sq ft',
    bedrooms: 4,
    bathrooms: 4,
    status: 'upcoming',
    type: 'villa',
    amenities: ['Private Garden', 'Swimming Pool', 'Servant Quarters', 'Car Parking', 'Security', 'Club House'],
    images: [
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAoACgDASIAAhEBAxEB/8QAGwAAAQUBAQAAAAAAAAAAAAAABQADBgcIBAL/xAAsEAABAwMCBAYCAwEAAAAAAAABAgMEAAUGEQcSITETQVFhcYEUkaGx8P/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGxEAAwADAQEAAAAAAAAAAAAAAQIDAAQFEf/aAAwDAQACEQMRAD8A'
    ],
    features: ['Independent Villas', 'Premium Interiors', 'Gated Community', 'Luxury Amenities'],
    possession: 'March 2026',
    developer: 'Piyush Lifespaces Pvt Ltd',
    rera: 'P02400003458',
    isActive: true,
    isFeatured: false
  },
  {
    title: 'Piyush Elite Apartments',
    description: 'Affordable luxury apartments with modern amenities. Perfect for first-time home buyers and young professionals.',
    location: 'Kondapur, Hyderabad',
    price: '₹65 L - ₹1.1 Cr',
    area: '1100-1650 sq ft',
    bedrooms: 2,
    bathrooms: 2,
    status: 'ongoing',
    type: 'apartment',
    amenities: ['Gym', 'Swimming Pool', 'Children Play Area', 'Landscaped Gardens', 'Community Hall', 'Security'],
    images: [
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAoACgDASIAAhEBAxEB/8QAGwAAAQUBAQAAAAAAAAAAAAAABQADBgcIBAL/xAAsEAABawMCBAYCAwEAAAAAAAABAgMEAAUGEQcSITETQVFhcYEUkaGx8P/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGxEAAwADAQEAAAAAAAAAAAAAAQIDAAQFEf/aAAwDAQACEQMRAD8A'
    ],
    features: ['Affordable Luxury', 'Modern Design', 'Great Connectivity', 'Investment Opportunity'],
    possession: 'September 2025',
    developer: 'Piyush Lifespaces Pvt Ltd',
    rera: 'P02400003459',
    isActive: true,
    isFeatured: true
  }
];

async function seedDatabase() {
  try {
    console.log('🔄 Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');

    // Clear existing properties
    console.log('🗑️ Clearing existing properties...');
    await Property.deleteMany({});

    // Insert sample properties
    console.log('📝 Inserting sample properties...');
    const insertedProperties = await Property.insertMany(sampleProperties);
    
    console.log(`✅ Successfully inserted ${insertedProperties.length} properties:`);
    insertedProperties.forEach(property => {
      console.log(`  - ${property.title} (${property.status})`);
    });

    console.log('\n🎉 Database seeded successfully!');
    console.log('You can now view the properties at http://localhost:3000/projects');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

seedDatabase();
