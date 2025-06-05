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
    
    // Transform the data to match expected format for testimonials
    const transformedReviews = reviews.map(review => ({
      ...review,
      // Map imageId to image URL for compatibility with TestimonialsSection
      image: review.imageId ? `/api/images/${review.imageId}` : null
    }))
    
    return NextResponse.json({
      success: true,
      data: transformedReviews
    })
  } catch (error) {
    console.error('Error fetching featured reviews:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch featured reviews' },
      { status: 500 }
    )
  }
}
