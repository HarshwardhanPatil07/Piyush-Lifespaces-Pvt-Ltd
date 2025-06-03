import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Review from '@/models/Review';

// GET - Fetch all approved reviews with filtering and sorting
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const rating = searchParams.get('rating');
    const property = searchParams.get('property');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sortBy') || 'newest';
    const includeAll = searchParams.get('includeAll') === 'true'; // For admin access    
    const skip = (page - 1) * limit;
    
    // Build query
    const query: any = includeAll ? {} : { status: 'approved' };
    
    if (rating) {
      query.rating = parseInt(rating);
    }
    
    if (property) {
      query.property = property
    }
    
    if (category) {
      query.category = category
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { review: { $regex: search, $options: 'i' } },
        { property: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ]
    }
    
    // Build sort object
    let sortObject: any = {}
    switch (sortBy) {
      case 'newest':
        sortObject = { createdAt: -1 }
        break
      case 'oldest':
        sortObject = { createdAt: 1 }
        break
      case 'rating':
        sortObject = { rating: -1, createdAt: -1 }
        break
      case 'helpful':
        sortObject = { helpful: -1, createdAt: -1 }
        break
      default:
        sortObject = { createdAt: -1 }
    }
    
    const reviews = await Review.find(query)
      .sort(sortObject)
      .skip(skip)
      .limit(limit)
      .select('-email -phone -updatedAt')
    
    const total = await Review.countDocuments(query)
    
    // Calculate statistics
    const allReviews = await Review.find({ status: 'approved' })
    const stats = {
      total: allReviews.length,
      average: allReviews.length > 0 ? allReviews.reduce((sum, review) => sum + review.rating, 0) / allReviews.length : 0,
      distribution: allReviews.reduce((acc, review) => {
        acc[review.rating] = (acc[review.rating] || 0) + 1
        return acc
      }, {} as { [key: number]: number })
    }
    
    // Get unique properties for filtering
    const properties = await Review.distinct('property', { status: 'approved' })
    
    return NextResponse.json({
      success: true,
      data: {
        reviews,
        stats,
        properties,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    })
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}

// POST - Submit a new review
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const {
      name,
      email,
      phone,
      location,
      rating,
      review,
      property,
      propertyType,
      category
    } = body
    
    // Validate required fields
    if (!name || !email || !location || !rating || !review || !property || !propertyType || !category) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Validate rating
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { success: false, message: 'Rating must be between 1 and 5' },
        { status: 400 }
      )
    }
    
    // Create new review
    const newReview = new Review({
      name,
      email,
      phone,
      location,
      rating,
      review,
      property,
      propertyType,
      category,
      verified: false,
      helpful: 0,
      status: 'pending'
    })
    
    await newReview.save()
    
    return NextResponse.json({
      success: true,
      message: 'Review submitted successfully. It will be published after approval.',
      data: { id: newReview._id }
    }, { status: 201 })
  } catch (error) {
    console.error('Error submitting review:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to submit review' },
      { status: 500 }
    )
  }
}

// PUT - Update helpful count or admin operations
export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json()
    const { reviewId, action, ...updateData } = body
    
    if (!reviewId) {
      return NextResponse.json(
        { success: false, message: 'Review ID is required' },
        { status: 400 }
      )
    }
    
    let updateResult
    
    if (action === 'helpful') {
      // Increment helpful count
      updateResult = await Review.findByIdAndUpdate(
        reviewId,
        { $inc: { helpful: 1 } },
        { new: true }
      )
    } else {
      // Admin update (status, verified, etc.)
      updateResult = await Review.findByIdAndUpdate(
        reviewId,
        updateData,
        { new: true }
      )
    }
    
    if (!updateResult) {
      return NextResponse.json(
        { success: false, message: 'Review not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: 'Review updated successfully',
      data: updateResult
    })
  } catch (error) {
    console.error('Error updating review:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to update review' },
      { status: 500 }
    )
  }
}

// DELETE - Delete a review (admin only)
export async function DELETE(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url)
    const reviewId = searchParams.get('id')
    
    if (!reviewId) {
      return NextResponse.json(
        { success: false, message: 'Review ID is required' },
        { status: 400 }
      )
    }
    
    const deletedReview = await Review.findByIdAndDelete(reviewId)
    
    if (!deletedReview) {
      return NextResponse.json(
        { success: false, message: 'Review not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: 'Review deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting review:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to delete review' },
      { status: 500 }
    )
  }
}
