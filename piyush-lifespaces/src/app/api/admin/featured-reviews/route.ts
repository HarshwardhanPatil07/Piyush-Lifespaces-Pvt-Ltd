import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import FeaturedReview from '@/models/FeaturedReview'

export async function GET() {
  try {
    await connectDB()
    
    const reviews = await FeaturedReview.find({})
      .sort({ order: 1 })
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

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    const { name, location, rating, review, imageId, property, order, isActive, isCustom, reviewId } = body
    
    // Validate required fields (imageId is optional for customer image)
    if (!name || !location || !rating || !review || !property) {
      return NextResponse.json(
        { success: false, message: 'Name, location, rating, review, and property are required' },
        { status: 400 }
      )
    }
    
    const featuredReview = new FeaturedReview({
      reviewId,
      name,
      location,
      rating,
      review,
      imageId,
      property,
      order: order || 0,
      isActive: isActive !== false,
      isCustom: isCustom || false
    })
    
    await featuredReview.save()
    
    return NextResponse.json({
      success: true,
      data: featuredReview,
      message: 'Featured review created successfully'
    })
  } catch (error) {
    console.error('Error creating featured review:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to create featured review' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    const { _id, name, location, rating, review, imageId, property, order, isActive } = body
    
    if (!_id) {
      return NextResponse.json(
        { success: false, message: 'Review ID is required' },
        { status: 400 }
      )
    }
    
    const featuredReview = await FeaturedReview.findByIdAndUpdate(
      _id,
      {
        name,
        location,
        rating,
        review,
        imageId,
        property,
        order,
        isActive,
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    )
    
    if (!featuredReview) {
      return NextResponse.json(
        { success: false, message: 'Featured review not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: featuredReview,
      message: 'Featured review updated successfully'
    })
  } catch (error) {
    console.error('Error updating featured review:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to update featured review' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Review ID is required' },
        { status: 400 }
      )
    }
    
    const featuredReview = await FeaturedReview.findByIdAndDelete(id)
    
    if (!featuredReview) {
      return NextResponse.json(
        { success: false, message: 'Featured review not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: 'Featured review deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting featured review:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to delete featured review' },
      { status: 500 }
    )
  }
}
