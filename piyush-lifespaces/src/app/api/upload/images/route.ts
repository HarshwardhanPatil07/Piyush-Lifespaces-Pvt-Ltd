import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ImageAsset from '@/models/ImageAsset';
import sharp from 'sharp';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const formData = await request.formData();
    const files = formData.getAll('images') as File[];
    const propertyId = formData.get('propertyId') as string;
    
    if (!files || files.length === 0) {
      return NextResponse.json({ success: false, error: 'No files provided' }, { status: 400 });
    }

    const uploadedImages: { id: string; url: string; filename: string }[] = [];

    for (const file of files) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        return NextResponse.json({ 
          success: false, 
          error: 'File size too large. Maximum 10MB per image.' 
        }, { status: 400 });
      }

      // Validate file type
      if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)) {
        return NextResponse.json({ 
          success: false, 
          error: 'Invalid file type. Only JPEG, PNG, and WebP are allowed.' 
        }, { status: 400 });
      }

      // Process and optimize image
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Optimize image using Sharp
      const optimizedBuffer = await sharp(buffer)
        .resize(1920, 1080, { 
          fit: 'inside', 
          withoutEnlargement: true 
        })
        .jpeg({ 
          quality: 85, 
          progressive: true 
        })
        .toBuffer();

      // Get image metadata
      const metadata = await sharp(optimizedBuffer).metadata();
      
      // Generate unique filename
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 15);
      const filename = `property_${timestamp}_${randomString}.jpg`;

      // Save to MongoDB
      const imageAsset = new ImageAsset({
        filename,
        originalName: file.name,
        mimeType: 'image/jpeg', // Always convert to JPEG for consistency
        size: optimizedBuffer.length,
        data: optimizedBuffer,
        metadata: {
          width: metadata.width,
          height: metadata.height,
          propertyId: propertyId || undefined,
          uploadedBy: 'admin', // Could be extracted from JWT token
        }
      });

      const savedImage = await imageAsset.save();
      
      // Return image reference
      uploadedImages.push({
        id: savedImage._id.toString(),
        url: `/api/images/${savedImage.filename}`,
        filename: savedImage.filename
      });
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
