import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import FeaturedReview from '@/models/FeaturedReview'

export async function GET() {
  try {
    await connectDB()
    
    const reviews = await FeaturedReview.find({ isActive: true })
      .sort({ order: 1 })
      .select('-__v')
      .lean()
    
    return NextResponse.json({
      success: true,
      data: reviews
    })
  } catch (error) {
    console.error('Error fetching featured reviews:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch featured reviews' },
      { status: 500 }
    )
  }
}
