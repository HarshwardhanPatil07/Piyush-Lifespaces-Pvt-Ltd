import { NextRequest, NextResponse } from 'next/server';
import { createDatabaseService } from '@/lib/database';
import Inquiry, { IInquiry } from '@/models/Inquiry';

const inquiryService = createDatabaseService(Inquiry);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await inquiryService.findById(id);
    
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: 'Inquiry not found' },
        { status: 404 }
      );
    }

    // Mark as read when viewed
    if (!result.data?.isRead) {
      await inquiryService.updateById(params.id, { isRead: true });
    }

    return NextResponse.json({
      success: true,
      data: result.data
    });
  } catch (error) {
    console.error('Error fetching inquiry:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch inquiry' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: inquiryId } = await params;
    const body = await request.json();
    
    // Remove id field if present to avoid conflicts
    const { id, _id, ...updateData } = body;
    
    const result = await inquiryService.updateById(inquiryId, {
      ...updateData,
      updatedAt: new Date()
    });
    
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || 'Inquiry not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.data,
      message: 'Inquiry updated successfully'
    });
  } catch (error) {
    console.error('Error updating inquiry:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update inquiry' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await inquiryService.deleteById(id);
    
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || 'Inquiry not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting inquiry:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete inquiry' },
      { status: 500 }
    );
  }
}
