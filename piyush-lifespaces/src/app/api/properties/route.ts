import { NextRequest, NextResponse } from 'next/server';
import { createDatabaseService } from '@/lib/database';
import Property, { IProperty } from '@/models/Property';

// Create database service instance
const propertyService = createDatabaseService(Property);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const type = searchParams.get('type');
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const sort = searchParams.get('sort') || 'createdAt';
    const order = searchParams.get('order') || 'desc';

    // If ID is provided, return single property
    if (id) {
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
    }

    // Build query filters
    let filters: any = { isActive: true };

    if (type && type !== 'all') {
      filters.type = type;
    }

    if (status && status !== 'all') {
      filters.status = status;
    }

    if (featured === 'true') {
      filters.isFeatured = true;
    }

    // Handle search
    if (search) {
      const searchResult = await propertyService.search(search, filters, {
        limit,
        skip: (page - 1) * limit,
        sort: { [sort]: order === 'desc' ? -1 : 1 }
      });
      
      if (!searchResult.success) {
        return NextResponse.json(
          { success: false, error: searchResult.error },
          { status: 500 }
        );
      }
      
      return NextResponse.json({
        success: true,
        data: searchResult.data,
        total: searchResult.total,
        page,
        limit,
        totalPages: Math.ceil((searchResult.total || 0) / limit)
      });
    }

    // Regular query with pagination
    const result = await propertyService.find(filters, {
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

    return NextResponse.json({
      success: true,
      data: result.data,
      total: result.total,
      page,
      limit,
      totalPages: Math.ceil((result.total || 0) / limit)
    });
  } catch (error) {
    console.error('Error in GET /api/properties:', error);
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
    const requiredFields = ['title', 'description', 'location', 'price', 'area', 'bedrooms', 'bathrooms', 'type', 'status'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { success: false, error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    const result = await propertyService.create(body);
    
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.data,
      message: 'Property created successfully'
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error in POST /api/properties:', error);
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
        { success: false, error: 'Property ID is required' },
        { status: 400 }
      );
    }

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
    console.error('Error in PUT /api/properties:', error);
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
    const soft = searchParams.get('soft') === 'true';

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Property ID is required' },
        { status: 400 }
      );
    }

    let result;
    if (soft) {
      // Soft delete - mark as inactive
      result = await propertyService.softDeleteById(id);
    } else {
      // Hard delete - permanently remove
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
    console.error('Error in DELETE /api/properties:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
