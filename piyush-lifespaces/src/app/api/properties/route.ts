import { NextRequest, NextResponse } from 'next/server';

// Mock database - In production, this would be replaced with actual database operations
let properties = [
  {
    id: '1',
    title: 'Luxury Villa in Banjara Hills',
    description: 'Exquisite 4BHK villa with premium amenities and stunning architecture in the heart of Banjara Hills.',
    location: 'Banjara Hills, Hyderabad',
    price: '₹2.5 Cr',
    area: '3500 sq ft',
    bedrooms: 4,
    bathrooms: 4,
    status: 'ongoing',
    type: 'villa',
    amenities: ['Swimming Pool', 'Gym', 'Garden', 'Security', 'Parking'],
    images: ['/api/placeholder/800/600', '/api/placeholder/800/600'],
    features: ['Premium Location', 'Modern Architecture', 'Luxury Interiors'],
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '2',
    title: 'Premium Apartments in Gachibowli',
    description: 'Modern 2BHK and 3BHK apartments with world-class amenities in the IT corridor of Hyderabad.',
    location: 'Gachibowli, Hyderabad',
    price: '₹85 L - ₹1.2 Cr',
    area: '1200-1800 sq ft',
    bedrooms: 3,
    bathrooms: 2,
    status: 'completed',
    type: 'apartment',
    amenities: ['Club House', 'Swimming Pool', 'Gym', 'Children Play Area', 'Security'],
    images: ['/api/placeholder/800/600', '/api/placeholder/800/600'],
    features: ['IT Corridor Location', 'Ready to Move', 'Premium Amenities'],
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z'
  },
  {
    id: '3',
    title: 'Commercial Complex in HITEC City',
    description: 'State-of-the-art commercial spaces perfect for offices and retail outlets in HITEC City.',
    location: 'HITEC City, Hyderabad',
    price: '₹5 Cr - ₹15 Cr',
    area: '2000-8000 sq ft',
    bedrooms: 0,
    bathrooms: 4,
    status: 'upcoming',
    type: 'commercial',
    amenities: ['24/7 Security', 'Power Backup', 'Parking', 'Conference Rooms', 'Food Court'],
    images: ['/api/placeholder/800/600', '/api/placeholder/800/600'],
    features: ['Prime Commercial Location', 'Modern Infrastructure', 'High ROI'],
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z'
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    let filteredProperties = [...properties];

    // Apply filters
    if (type && type !== 'all') {
      filteredProperties = filteredProperties.filter(property => property.type === type);
    }

    if (status && status !== 'all') {
      filteredProperties = filteredProperties.filter(property => property.status === status);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredProperties = filteredProperties.filter(property =>
        property.title.toLowerCase().includes(searchLower) ||
        property.location.toLowerCase().includes(searchLower) ||
        property.description.toLowerCase().includes(searchLower)
      );
    }

    return NextResponse.json({
      success: true,
      data: filteredProperties,
      total: filteredProperties.length
    });
  } catch (error) {
    console.error('Error fetching properties:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch properties' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const newProperty = {
      id: (properties.length + 1).toString(),
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    properties.push(newProperty);

    return NextResponse.json({
      success: true,
      data: newProperty,
      message: 'Property created successfully'
    });
  } catch (error) {
    console.error('Error creating property:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create property' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    const propertyIndex = properties.findIndex(p => p.id === id);
    
    if (propertyIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Property not found' },
        { status: 404 }
      );
    }

    properties[propertyIndex] = {
      ...properties[propertyIndex],
      ...updateData,
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      data: properties[propertyIndex],
      message: 'Property updated successfully'
    });
  } catch (error) {
    console.error('Error updating property:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update property' },
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
        { success: false, error: 'Property ID is required' },
        { status: 400 }
      );
    }

    const propertyIndex = properties.findIndex(p => p.id === id);
    
    if (propertyIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Property not found' },
        { status: 404 }
      );
    }

    properties.splice(propertyIndex, 1);

    return NextResponse.json({
      success: true,
      message: 'Property deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting property:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete property' },
      { status: 500 }
    );
  }
}
