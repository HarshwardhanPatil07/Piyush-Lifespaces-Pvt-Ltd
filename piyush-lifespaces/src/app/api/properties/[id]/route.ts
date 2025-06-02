import { NextRequest, NextResponse } from 'next/server';
import { createDatabaseService } from '@/lib/database';
import Property from '@/models/Property';

const propertyService = createDatabaseService(Property);

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    const result = await propertyService.findById(id);
    
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 404 }
      );
    }
    
    // Increment view count
    await propertyService.updateById(id, { $inc: { views: 1 } });
    
    return NextResponse.json({
      success: true,
      data: result.data
    });
    
  } catch (error) {
    console.error('Error fetching property:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const updateData = await request.json();
    
    // Remove undefined values
    Object.keys(updateData).forEach(key => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });
    
    const result = await propertyService.updateById(id, updateData);
    
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: result.error === 'Document not found' ? 404 : 400 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: result.data,
      message: 'Property updated successfully'
    });
    
  } catch (error) {
    console.error('Error updating property:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { searchParams } = new URL(request.url);
    const soft = searchParams.get('soft') === 'true';
    
    let result;
    if (soft) {
      result = await propertyService.softDeleteById(id);
    } else {
      result = await propertyService.deleteById(id);
    }
    
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: result.error === 'Document not found' ? 404 : 400 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: `Property ${soft ? 'deactivated' : 'deleted'} successfully`
    });
    
  } catch (error) {
    console.error('Error deleting property:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
