import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ImageAsset from '@/models/ImageAsset';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const imageId = params?.id;
    if (!imageId) {
      return NextResponse.json(
        { error: 'Image ID is required' },
        { status: 400 }
      );
    }
    const image = await ImageAsset.findById(imageId);

    if (!image) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      );
    }

    // Return image with proper headers
    return new NextResponse(image.data, {
      headers: {
        'Content-Type': image.mimeType,
        'Content-Length': image.size.toString(),
        'Cache-Control': 'public, max-age=31536000, immutable', // Cache for 1 year
        'Content-Disposition': `inline; filename="${image.originalName}"`
      }
    });

  } catch (error) {
    console.error('Get image error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch image' },
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

    const imageId = params.id;
    const deletedImage = await ImageAsset.findByIdAndDelete(imageId);

    if (!deletedImage) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Image deleted successfully'
    });

  } catch (error) {
    console.error('Delete image error:', error);
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    );
  }
}
