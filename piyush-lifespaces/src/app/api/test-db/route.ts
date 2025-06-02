import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
  try {
    console.log('🔄 Testing database connection...');
    await connectDB();
    console.log('✅ Database connected successfully');
    
    // Test creating a simple user
    const testUser = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'test123',
      role: 'agent' as const,
      isActive: true,
      permissions: ['read']
    };
    
    // Check if test user already exists
    const existingUser = await User.findOne({ email: testUser.email });
    if (existingUser) {
      await User.deleteOne({ email: testUser.email });
    }
    
    const createdUser = await User.create(testUser);
    console.log('✅ Test user created:', createdUser._id);
    
    // Clean up
    await User.deleteOne({ _id: createdUser._id });
    console.log('✅ Test user deleted');
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database connection and CRUD operations working correctly',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Database test failed:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
