import { NextRequest, NextResponse } from 'next/server';
import { createDatabaseService } from '@/lib/database';
import Contact, { IContact } from '@/models/Contact';

const contactService = createDatabaseService(Contact);

interface ContactSubmission {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  propertyInterest?: string;
  source: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactSubmission = await request.json();
    
    // Validate required fields
    const { name, email, phone, subject, message } = body;
    if (!name || !email || !phone || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate phone number (basic validation)
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { success: false, error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    const contactData = {
      name,
      email,
      phone,
      subject,
      message,
      propertyInterest: body.propertyInterest || '',
      source: body.source || 'contact-form',
      status: 'new' as const,
      isRead: false
    };

    const result = await contactService.create(contactData);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    // TODO: Send email notification to admin
    // TODO: Send auto-reply email to customer
    console.log('New contact submission:', result.data);

    return NextResponse.json({
      success: true,
      data: result.data,
      message: 'Thank you for contacting us! We will get back to you within 24 hours.'
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit contact form' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const status = searchParams.get('status');
    const isRead = searchParams.get('isRead');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const sort = searchParams.get('sort') || 'createdAt';
    const order = searchParams.get('order') || 'desc';

    // If ID is provided, return single contact
    if (id) {
      const result = await contactService.findById(id);
      
      if (!result.success) {
        return NextResponse.json(
          { success: false, error: result.error },
          { status: 404 }
        );
      }
      
      // Mark as read when viewed
      if (!result.data?.isRead) {
        await contactService.updateById(id, { isRead: true });
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

    if (isRead !== null && isRead !== undefined) {
      filters.isRead = isRead === 'true';
    }

    // Handle search
    if (search) {
      filters.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ];
    }

    const result = await contactService.find(filters, {
      sort: { [sort]: order === 'desc' ? -1 : 1 },
      limit,
      skip: (page - 1) * limit
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    // Get unread count
    const unreadResult = await contactService.count({ isRead: false });    return NextResponse.json({
      success: true,
      data: result.data,
      total: result.total,
      unreadCount: unreadResult.count || 0,
      page,
      limit,
      totalPages: Math.ceil((result.total || 0) / limit)
    });
    
  } catch (error) {
    console.error('Error in GET /api/contact:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const action = searchParams.get('action');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Contact ID is required' },
        { status: 400 }
      );
    }

    // Handle mark as read action
    if (action === 'markRead') {
      const result = await contactService.updateById(id, { isRead: true });
      
      if (!result.success) {
        return NextResponse.json(
          { success: false, error: result.error },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        data: result.data,
        message: 'Contact marked as read'
      });
    }

    // Handle status updates
    const body = await request.json();
    const { status } = body;

    if (status && !['new', 'contacted', 'resolved'].includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Invalid status value' },
        { status: 400 }
      );
    }

    const updateData: any = {};
    if (status) updateData.status = status;

    const result = await contactService.updateById(id, updateData);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.data,
      message: 'Contact updated successfully'
    });

  } catch (error) {
    console.error('Error in PUT /api/contact:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update contact' },
      { status: 500 }
    );
  }
}
