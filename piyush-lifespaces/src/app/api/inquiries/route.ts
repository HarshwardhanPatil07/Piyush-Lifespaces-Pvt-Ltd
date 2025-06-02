import { NextRequest, NextResponse } from 'next/server';

// Mock database for inquiries
let inquiries = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    email: 'rajesh@email.com',
    phone: '+91 9876543210',
    property: 'Luxury Villa in Banjara Hills',
    propertyId: '1',
    message: 'Interested in scheduling a site visit. Please contact me at your earliest convenience.',
    status: 'new',
    priority: 'medium',
    source: 'website',
    budget: '₹2-3 Cr',
    createdAt: '2024-01-20T10:30:00Z',
    updatedAt: '2024-01-20T10:30:00Z'
  },
  {
    id: '2',
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91 9876543211',
    property: 'Premium Apartments in Gachibowli',
    propertyId: '2',
    message: 'Looking for 3BHK apartment with good amenities. When can I visit the site?',
    status: 'contacted',
    priority: 'high',
    source: 'website',
    budget: '₹1-1.5 Cr',
    createdAt: '2024-01-19T14:15:00Z',
    updatedAt: '2024-01-19T16:30:00Z'
  },
  {
    id: '3',
    name: 'Amit Patel',
    email: 'amit.patel@email.com',
    phone: '+91 9876543212',
    property: 'Commercial Complex in HITEC City',
    propertyId: '3',
    message: 'Need commercial space for my IT company. Please share more details about available units.',
    status: 'qualified',
    priority: 'high',
    source: 'phone',
    budget: '₹5-8 Cr',
    createdAt: '2024-01-18T09:45:00Z',
    updatedAt: '2024-01-18T11:20:00Z'
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const propertyId = searchParams.get('propertyId');
    const search = searchParams.get('search');
    const limit = searchParams.get('limit');

    let filteredInquiries = [...inquiries];

    // Apply filters
    if (status && status !== 'all') {
      filteredInquiries = filteredInquiries.filter(inquiry => inquiry.status === status);
    }

    if (propertyId) {
      filteredInquiries = filteredInquiries.filter(inquiry => inquiry.propertyId === propertyId);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredInquiries = filteredInquiries.filter(inquiry =>
        inquiry.name.toLowerCase().includes(searchLower) ||
        inquiry.email.toLowerCase().includes(searchLower) ||
        inquiry.phone.includes(search) ||
        inquiry.property.toLowerCase().includes(searchLower) ||
        inquiry.message.toLowerCase().includes(searchLower)
      );
    }

    // Sort by creation date (newest first)
    filteredInquiries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // Apply limit if specified
    if (limit) {
      filteredInquiries = filteredInquiries.slice(0, parseInt(limit));
    }

    return NextResponse.json(filteredInquiries);
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch inquiries' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { name, email, phone, message } = body;
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, phone, and message are required' },
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
    }    const newInquiry = {
      id: (inquiries.length + 1).toString(),
      name,
      email,
      phone,
      property: body.property || 'General Inquiry',
      propertyId: body.propertyId || null,
      message,
      status: 'new',
      priority: body.priority || 'medium',
      source: body.source || 'website',
      budget: body.budget || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    inquiries.push(newInquiry);

    // TODO: Send email notification to admin
    // TODO: Send auto-reply email to customer
    // TODO: Integrate with CRM system

    return NextResponse.json({
      success: true,
      data: newInquiry,
      message: 'Thank you for your inquiry! We will get back to you soon.'
    });
  } catch (error) {
    console.error('Error creating inquiry:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit inquiry' },
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

    const inquiryIndex = inquiries.findIndex(i => i.id === id);
    
    if (inquiryIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Inquiry not found' },
        { status: 404 }
      );
    }

    inquiries[inquiryIndex] = {
      ...inquiries[inquiryIndex],
      ...updateData,
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      data: inquiries[inquiryIndex],
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

    const inquiryIndex = inquiries.findIndex(i => i.id === id);
    
    if (inquiryIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Inquiry not found' },
        { status: 404 }
      );
    }

    inquiries.splice(inquiryIndex, 1);

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
