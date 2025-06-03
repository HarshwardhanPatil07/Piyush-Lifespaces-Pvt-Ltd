import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import HomeSlide from '@/models/HomeSlide'

export async function GET() {
  try {
    await connectDB()
    
    const slides = await HomeSlide.find({ isActive: true })
      .sort({ order: 1 })
      .select('-__v')
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
