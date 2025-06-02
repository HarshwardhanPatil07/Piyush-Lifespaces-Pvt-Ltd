import { NextRequest, NextResponse } from 'next/server';
import { createDatabaseService } from '@/lib/database';
import Inquiry, { IInquiry } from '@/models/Inquiry';
import Property from '@/models/Property';

const inquiryService = createDatabaseService(Inquiry);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');
    const source = searchParams.get('source');
    const assignedTo = searchParams.get('assignedTo');
    const propertyId = searchParams.get('propertyId');
    const isRead = searchParams.get('isRead');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const sort = searchParams.get('sort') || 'createdAt';
    const order = searchParams.get('order') || 'desc';
    const populate = searchParams.get('populate') === 'true';

    // If ID is provided, return single inquiry
    if (id) {
      const result = await inquiryService.findById(id, {
        populate: populate ? { path: 'propertyId', select: 'title location price images' } : undefined
      });
      
      if (!result.success) {
        return NextResponse.json(
          { success: false, error: result.error },
          { status: 404 }
        );
      }
      
      // Mark as read when viewed
      if (!result.data?.isRead) {
        await inquiryService.updateById(id, { isRead: true });
      }
      
      return NextResponse.json({
        success: true,
        data: result.data
      });
    }

    // Build query filters
    let filters: any = {};

    if (status && status !== 'all') {
      filters.status = status;
    }

    if (priority && priority !== 'all') {
      filters.priority = priority;
    }

    if (source && source !== 'all') {
      filters.source = source;
    }

    if (assignedTo) {
      filters.assignedTo = assignedTo;
    }

    if (propertyId) {
      filters.propertyId = propertyId;
    }

    if (isRead !== null && isRead !== undefined) {
      filters.isRead = isRead === 'true';
    }

    // Handle search
    if (search) {
      filters.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } },
        { property: { $regex: search, $options: 'i' } }
      ];
    }

    const populateOptions = populate ? { path: 'propertyId', select: 'title location price images' } : undefined;

    const result = await inquiryService.find(filters, {
      sort: { [sort]: order === 'desc' ? -1 : 1 },
      limit,
      skip: (page - 1) * limit,
      populate: populateOptions
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    // Get unread count
    const unreadResult = await inquiryService.count({ isRead: false });

    return NextResponse.json({
      success: true,
      data: result.data,
      total: result.total,
      unreadCount: unreadResult.count || 0,
      page,
      limit,
      totalPages: Math.ceil((result.total || 0) / limit)
    });
    
  } catch (error) {
    console.error('Error in GET /api/inquiries:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'message'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { success: false, error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // If property is provided, try to find and link the property
    if (body.property && !body.propertyId) {
      const propertyService = createDatabaseService(Property);
      const propertyResult = await propertyService.find({
        $or: [
          { title: { $regex: body.property, $options: 'i' } },
          { location: { $regex: body.property, $options: 'i' } }
        ]
      }, { limit: 1 });
      
      if (propertyResult.success && propertyResult.data && propertyResult.data.length > 0) {
        body.propertyId = propertyResult.data[0]._id;
        
        // Increment inquiry count for the property
        await propertyService.updateById(propertyResult.data[0]._id, { $inc: { inquiries: 1 } });
      }
    }

    const result = await inquiryService.create(body);
    
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.data,
      message: 'Inquiry submitted successfully'
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error in POST /api/inquiries:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Inquiry ID is required' },
        { status: 400 }
      );
    }

    // Add timestamp for status changes
    if (updateData.status) {
      updateData.lastContactedAt = new Date();
    }

    const result = await inquiryService.updateById(id, updateData);
    
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: result.error === 'Document not found' ? 404 : 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.data,
      message: 'Inquiry updated successfully'
    });
    
  } catch (error) {
    console.error('Error in PUT /api/inquiries:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Inquiry ID is required' },
        { status: 400 }
      );
    }

    const result = await inquiryService.deleteById(id);
    
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: result.error === 'Document not found' ? 404 : 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry deleted successfully'
    });
    
  } catch (error) {
    console.error('Error in DELETE /api/inquiries:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}