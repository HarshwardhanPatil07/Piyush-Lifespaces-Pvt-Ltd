import { NextRequest, NextResponse } from 'next/server';

// Mock database for inquiries (in production, this would be from MongoDB)
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
    notes: '',
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
    notes: 'Interested in 3rd floor unit',
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
    notes: 'Looking for 5000 sq ft space',
    createdAt: '2024-01-18T09:45:00Z',
    updatedAt: '2024-01-18T11:20:00Z'
  }
];

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const inquiry = inquiries.find(i => i.id === params.id);
    
    if (!inquiry) {
      return NextResponse.json(
        { success: false, error: 'Inquiry not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: inquiry
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
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    
    const inquiryIndex = inquiries.findIndex(i => i.id === params.id);
    
    if (inquiryIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Inquiry not found' },
        { status: 404 }
      );
    }

    inquiries[inquiryIndex] = {
      ...inquiries[inquiryIndex],
      ...body,
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const inquiryIndex = inquiries.findIndex(i => i.id === params.id);
    
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
