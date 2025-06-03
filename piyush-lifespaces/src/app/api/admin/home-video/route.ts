import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import HomeVideo from '@/models/HomeVideo'

export async function GET() {
  try {
    await connectDB()
    
    const video = await HomeVideo.findOne({}).lean()
    
    return NextResponse.json({
      success: true,
      data: video
    })
  } catch (error) {
    console.error('Error fetching home video:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch video' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    const { title, description, videoUrl, thumbnailImageId, isActive } = body
    
    // Validate required fields
    if (!title || !description || !videoUrl || !thumbnailImageId) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      )
    }
    
    // Deactivate existing videos if this one is active
    if (isActive !== false) {
      await HomeVideo.updateMany({}, { isActive: false })
    }
    
    const video = new HomeVideo({
      title,
      description,
      videoUrl,
      thumbnailImageId,
      isActive: isActive !== false
    })
    
    await video.save()
    
    return NextResponse.json({
      success: true,
      data: video,
      message: 'Video created successfully'
    })
  } catch (error) {
    console.error('Error creating home video:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to create video' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    const { _id, title, description, videoUrl, thumbnailImageId, isActive } = body
    
    if (!_id) {
      return NextResponse.json(
        { success: false, message: 'Video ID is required' },
        { status: 400 }
      )
    }
    
    // Deactivate other videos if this one is being activated
    if (isActive) {
      await HomeVideo.updateMany({ _id: { $ne: _id } }, { isActive: false })
    }
    
    const video = await HomeVideo.findByIdAndUpdate(
      _id,
      {
        title,
        description,
        videoUrl,
        thumbnailImageId,
        isActive,
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    )
    
    if (!video) {
      return NextResponse.json(
        { success: false, message: 'Video not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: video,
      message: 'Video updated successfully'
    })
  } catch (error) {
    console.error('Error updating home video:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to update video' },
      { status: 500 }
    )
  }
}
