import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import HomeVideo from '@/models/HomeVideo'
import VideoAsset from '@/models/VideoAsset'

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
    const { title, description, videoId, thumbnailImageId, isActive } = body
    
    // Validate required fields
    if (!title || !description || !videoId || !thumbnailImageId) {
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
      videoId,
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
    const { _id, title, description, videoId, thumbnailImageId, isActive } = body
    
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
        videoId,
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

export async function DELETE(request: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Video ID is required' },
        { status: 400 }
      )
    }
    
    // Get the video to find associated video asset
    const video = await HomeVideo.findById(id)
    
    if (!video) {
      return NextResponse.json(
        { success: false, message: 'Video not found' },
        { status: 404 }
      )
    }
    
    // Delete the video asset if it exists
    if (video.videoId) {
      try {
        await VideoAsset.findByIdAndDelete(video.videoId)
      } catch (error) {
        console.warn('Could not delete video asset:', error)
      }
    }
    
    // Delete the home video record
    await HomeVideo.findByIdAndDelete(id)
    
    return NextResponse.json({
      success: true,
      message: 'Video deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting home video:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to delete video' },
      { status: 500 }
    )
  }
}
