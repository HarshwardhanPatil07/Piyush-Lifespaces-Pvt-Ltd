import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const formData = await request.formData();
    const files = formData.getAll('images') as File[];
    
    if (!files || files.length === 0) {
      return NextResponse.json({ success: false, error: 'No files provided' }, { status: 400 });
    }

    const uploadedImages: string[] = [];

    for (const file of files) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        return NextResponse.json({ 
          success: false, 
          error: 'File size too large. Maximum 10MB per image.' 
        }, { status: 400 });
      }

      // Convert file to base64 for MongoDB storage
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64 = buffer.toString('base64');
      const mimeType = file.type;
      
      // Create data URL for storage
      const dataUrl = `data:${mimeType};base64,${base64}`;
      uploadedImages.push(dataUrl);
    }

    return NextResponse.json({
      success: true,
      data: {
        images: uploadedImages,
        count: uploadedImages.length
      }
    });

  } catch (error) {
    console.error('Image upload error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to upload images' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get('url');
    
    if (!imageUrl) {
      return NextResponse.json({ success: false, error: 'Image URL required' }, { status: 400 });
    }

    // Since we're storing base64 in MongoDB, deletion is handled by removing from property
    return NextResponse.json({ success: true, message: 'Image deleted successfully' });

  } catch (error) {
    console.error('Image deletion error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete image' },
      { status: 500 }
    );
  }
}
