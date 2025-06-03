// Script to seed sample reviews for testing

const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/piyush-lifespaces';

const sampleReviews = [
  {
    name: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    phone: "+91 9876543210",
    location: "Mumbai, Maharashtra",
    rating: 5,
    review: "Excellent experience with Piyush Lifespaces! The quality of construction is top-notch and the team was very professional throughout the process. Our dream home became a reality thanks to them.",
    property: "Piyush Heights",
    propertyType: "residential",
    category: "quality",
    verified: true,
    helpful: 12,
    status: "approved",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15")
  },
  {
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+91 9876543211",
    location: "Pune, Maharashtra",
    rating: 4,
    review: "Great service and timely delivery. The amenities provided are excellent and the location is perfect for families. Highly recommend Piyush Lifespaces for anyone looking for quality housing.",
    property: "Piyush Gardens",
    propertyType: "residential",
    category: "service",
    verified: true,
    helpful: 8,
    status: "approved",
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20")
  },
  {
    name: "Amit Patel",
    email: "amit.patel@email.com",
    phone: "+91 9876543212",
    location: "Ahmedabad, Gujarat",
    rating: 5,
    review: "Outstanding location with all modern amenities. The connectivity to major business districts is excellent. Perfect for both residential and investment purposes.",
    property: "Piyush Commerce Hub",
    propertyType: "commercial",
    category: "location",
    verified: true,
    helpful: 15,
    status: "approved",
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-02-01")
  },
  {
    name: "Sneha Reddy",
    email: "sneha.reddy@email.com",
    phone: "+91 9876543213",
    location: "Hyderabad, Telangana",
    rating: 4,
    review: "The amenities provided are world-class. Swimming pool, gym, children's play area - everything is well maintained. Great place to live with family.",
    property: "Piyush Paradise",
    propertyType: "residential",
    category: "amenities",
    verified: true,
    helpful: 6,
    status: "approved",
    createdAt: new Date("2024-02-10"),
    updatedAt: new Date("2024-02-10")
  },
  {
    name: "Vikash Singh",
    email: "vikash.singh@email.com",
    phone: "+91 9876543214",
    location: "Delhi, Delhi",
    rating: 5,
    review: "Excellent value for money! The pricing is very competitive compared to other builders and the quality is superior. We got more than what we paid for.",
    property: "Piyush Towers",
    propertyType: "residential",
    category: "value",
    verified: true,
    helpful: 10,
    status: "approved",
    createdAt: new Date("2024-02-15"),
    updatedAt: new Date("2024-02-15")
  },
  {
    name: "Meera Joshi",
    email: "meera.joshi@email.com",
    phone: "+91 9876543215",
    location: "Bangalore, Karnataka",
    rating: 4,
    review: "Professional team and excellent customer service. They were always available to answer our queries and concerns. The handover process was smooth and hassle-free.",
    property: "Piyush Elite",
    propertyType: "residential",
    category: "service",
    verified: true,
    helpful: 7,
    status: "approved",
    createdAt: new Date("2024-02-20"),
    updatedAt: new Date("2024-02-20")
  },
  {
    name: "Arjun Kapoor",
    email: "arjun.kapoor@email.com",
    phone: "+91 9876543216",
    location: "Chennai, Tamil Nadu",
    rating: 5,
    review: "Top-quality construction with attention to detail. Every corner of the apartment reflects the craftsmanship and dedication of the Piyush Lifespaces team.",
    property: "Piyush Residency",
    propertyType: "residential",
    category: "quality",
    verified: true,
    helpful: 9,
    status: "approved",
    createdAt: new Date("2024-02-25"),
    updatedAt: new Date("2024-02-25")
  },
  {
    name: "Kavita Agarwal",
    email: "kavita.agarwal@email.com",
    phone: "+91 9876543217",
    location: "Jaipur, Rajasthan",
    rating: 4,
    review: "Great location with easy access to schools, hospitals, and shopping centers. The neighborhood is safe and well-developed. Perfect for raising a family.",
    property: "Piyush Greens",
    propertyType: "residential",
    category: "location",
    verified: false,
    helpful: 5,
    status: "approved",
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date("2024-03-01")
  },
  {
    name: "Rohit Gupta",
    email: "rohit.gupta@email.com",
    phone: "+91 9876543218",
    location: "Indore, Madhya Pradesh",
    rating: 5,
    review: "Exceptional amenities and facilities. The clubhouse, sports facilities, and landscaping are all top-notch. It feels like living in a resort.",
    property: "Piyush Crown",
    propertyType: "residential",
    category: "amenities",
    verified: true,
    helpful: 11,
    status: "approved",
    createdAt: new Date("2024-03-05"),
    updatedAt: new Date("2024-03-05")
  },
  {
    name: "Sunita Desai",
    email: "sunita.desai@email.com",
    phone: "+91 9876543219",
    location: "Surat, Gujarat",
    rating: 4,
    review: "Good value for money with decent amenities. The build quality is solid and the project was delivered on time. Would recommend to others looking for affordable housing.",
    property: "Piyush Homes",
    propertyType: "residential",
    category: "value",
    verified: true,
    helpful: 4,
    status: "approved",
    createdAt: new Date("2024-03-10"),
    updatedAt: new Date("2024-03-10")
  }
];

async function seedReviews() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db();
    const reviewsCollection = db.collection('reviews');
    
    // Clear existing reviews
    await reviewsCollection.deleteMany({});
    console.log('Cleared existing reviews');
    
    // Insert sample reviews
    const result = await reviewsCollection.insertMany(sampleReviews);
    console.log(`Inserted ${result.insertedCount} sample reviews`);
    
    // Create indexes for better performance
    await reviewsCollection.createIndex({ rating: 1 });
    await reviewsCollection.createIndex({ property: 1 });
    await reviewsCollection.createIndex({ category: 1 });
    await reviewsCollection.createIndex({ status: 1 });
    await reviewsCollection.createIndex({ createdAt: -1 });
    console.log('Created indexes');
    
  } catch (error) {
    console.error('Error seeding reviews:', error);
  } finally {
    await client.close();
    console.log('Database connection closed');
  }
}

// Run the seed function
seedReviews().catch(console.error);
