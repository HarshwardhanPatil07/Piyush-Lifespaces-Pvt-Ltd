import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import HomeSlide from '@/models/HomeSlide'

export async function GET() {
  try {
    await connectDB()
    
    const slides = await HomeSlide.find({})
      .sort({ order: 1 })
      .lean()
    
    return NextResponse.json({
      success: true,
      data: slides
    })
  } catch (error) {
    console.error('Error fetching home slides:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch slides' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    const { title, subtitle, description, image, ctaText, ctaLink, order, isActive } = body
    
    // Validate required fields
    if (!title || !subtitle || !description || !image || !ctaText || !ctaLink) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      )
    }
    
    const slide = new HomeSlide({
      title,
      subtitle,
      description,
      image,
      ctaText,
      ctaLink,
      order: order || 0,
      isActive: isActive !== false
    })
    
    await slide.save()
    
    return NextResponse.json({
      success: true,
      data: slide,
      message: 'Slide created successfully'
    })
  } catch (error) {
    console.error('Error creating home slide:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to create slide' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    const { _id, title, subtitle, description, image, ctaText, ctaLink, order, isActive } = body
    
    if (!_id) {
      return NextResponse.json(
        { success: false, message: 'Slide ID is required' },
        { status: 400 }
      )
    }
    
    const slide = await HomeSlide.findByIdAndUpdate(
      _id,
      {
        title,
        subtitle,
        description,
        image,
        ctaText,
        ctaLink,
        order,
        isActive,
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    )
    
    if (!slide) {
      return NextResponse.json(
        { success: false, message: 'Slide not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: slide,
      message: 'Slide updated successfully'
    })
  } catch (error) {
    console.error('Error updating home slide:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to update slide' },
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
        { success: false, message: 'Slide ID is required' },
        { status: 400 }
      )
    }
    
    const slide = await HomeSlide.findByIdAndDelete(id)
    
    if (!slide) {
      return NextResponse.json(
        { success: false, message: 'Slide not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: 'Slide deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting home slide:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to delete slide' },
      { status: 500 }
    )
  }
}
