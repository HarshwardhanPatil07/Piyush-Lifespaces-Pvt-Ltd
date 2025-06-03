import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import VideoAsset from '@/models/VideoAsset';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const videoId = params?.id;
    if (!videoId) {
      return NextResponse.json(
        { error: 'Video ID is required' },
        { status: 400 }
      );
    }

    const video = await VideoAsset.findById(videoId);

    if (!video) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      );
    }

    // Handle range requests for video streaming
    const range = request.headers.get('range');
    const videoSize = video.size;

    if (range) {
      // Parse range header
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : videoSize - 1;
      const chunksize = (end - start) + 1;

      // Get chunk of video data
      const chunk = video.data.subarray(start, end + 1);

      return new NextResponse(chunk, {
        status: 206, // Partial Content
        headers: {
          'Content-Type': video.mimeType,
          'Content-Length': chunksize.toString(),
          'Content-Range': `bytes ${start}-${end}/${videoSize}`,
          'Accept-Ranges': 'bytes',
          'Cache-Control': 'public, max-age=31536000, immutable',
        }
      });
    } else {
      // Return full video
      return new NextResponse(video.data, {
        headers: {
          'Content-Type': video.mimeType,
          'Content-Length': video.size.toString(),
          'Accept-Ranges': 'bytes',
          'Cache-Control': 'public, max-age=31536000, immutable',
          'Content-Disposition': `inline; filename="${video.originalName}"`
        }
      });
    }

  } catch (error) {
    console.error('Get video error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch video' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const videoId = params?.id;
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
