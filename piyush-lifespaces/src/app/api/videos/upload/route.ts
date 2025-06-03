import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import VideoAsset from '@/models/VideoAsset';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['video/mp4', 'video/mpeg', 'video/quicktime', 'video/webm', 'video/avi'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only MP4, MPEG, QuickTime, WebM, and AVI files are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (100MB limit)
    const maxSize = 100 * 1024 * 1024; // 100MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size too large. Maximum size is 100MB.' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const filename = `${uuidv4()}-${file.name}`;

    // Create video asset
    const videoAsset = new VideoAsset({
      filename,
      originalName: file.name,
      mimeType: file.type,
      size: file.size,
      data: buffer,
      metadata: {
        uploadedBy: 'admin', // You can get this from session/auth
        description: formData.get('description') as string || ''
      }
    });

    await videoAsset.save();

    return NextResponse.json({
      success: true,
      videoId: videoAsset._id,
      filename: videoAsset.filename,
      originalName: videoAsset.originalName,
      size: videoAsset.size,
      mimeType: videoAsset.mimeType
    });

  } catch (error) {
    console.error('Video upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload video' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const videoId = searchParams.get('id');

    if (!videoId) {
      return NextResponse.json(
        { error: 'Video ID is required' },
        { status: 400 }
      );
    }

    const deletedVideo = await VideoAsset.findByIdAndDelete(videoId);

    if (!deletedVideo) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Video deleted successfully'
    });

  } catch (error) {
    console.error('Delete video error:', error);
    return NextResponse.json(
      { error: 'Failed to delete video' },
      { status: 500 }
    );
  }
}
