import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ImageAsset from '@/models/ImageAsset';
import sharp from 'sharp';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const formData = await request.formData();
    const file = formData.get('image') as File;
    const propertyId = formData.get('propertyId') as string;
    const description = formData.get('description') as string;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid file type. Only JPEG, PNG, and WebP are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: 'File size too large. Maximum size is 10MB.' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Process image with Sharp
    const processedImage = await sharp(buffer)
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
    const metadata = await sharp(buffer).metadata();

    // Generate unique filename
    const timestamp = Date.now();
    const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${timestamp}_${cleanName}`;

    // Create image asset document
    const imageAsset = new ImageAsset({
      filename,
      originalName: file.name,
      mimeType: 'image/jpeg', // Always JPEG after processing
      size: processedImage.length,
      data: processedImage,
      metadata: {
        width: metadata.width,
        height: metadata.height,
        propertyId: propertyId || undefined,
        description: description || undefined,
        uploadedBy: 'admin' // You can get this from auth context
      }
    });

    await imageAsset.save();

    return NextResponse.json({
      success: true,
      message: 'Image uploaded successfully',
      data: {
        id: imageAsset._id,
        filename: imageAsset.filename,
        originalName: imageAsset.originalName,
        size: imageAsset.size,
        url: `/api/images/${imageAsset._id}`,
        metadata: {
          width: imageAsset.metadata.width,
          height: imageAsset.metadata.height
        }
      }
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const images = await ImageAsset.find({})
      .select('-data') // Exclude binary data for listing
      .sort({ createdAt: -1 })
      .limit(50);

    return NextResponse.json({
      success: true,
      data: images.map(img => ({
        id: img._id,
        filename: img.filename,
        originalName: img.originalName,
        size: img.size,
        url: `/api/images/${img._id}`,
        metadata: img.metadata,
        createdAt: img.createdAt
      }))
    });

  } catch (error) {
    console.error('Get images error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch images' },
      { status: 500 }
    );
  }
}
