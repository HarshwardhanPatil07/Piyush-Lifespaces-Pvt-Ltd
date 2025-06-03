import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import HomeVideo from '@/models/HomeVideo'

export async function GET() {
  try {
    await connectDB()
    
    const video = await HomeVideo.findOne({ isActive: true })
      .select('-__v')
      .lean()
    
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
