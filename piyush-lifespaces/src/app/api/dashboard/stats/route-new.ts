import { NextRequest, NextResponse } from 'next/server';
import { createDatabaseService } from '@/lib/database';
import Property from '@/models/Property';
import Inquiry from '@/models/Inquiry';
import Contact from '@/models/Contact';
import User from '@/models/User';

const propertyService = createDatabaseService(Property);
const inquiryService = createDatabaseService(Inquiry);
const contactService = createDatabaseService(Contact);
const userService = createDatabaseService(User);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '30'; // days
    const detailed = searchParams.get('detailed') === 'true';

    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(period));

    // Get basic counts
    const [
      totalProperties,
      activeProperties,
      totalInquiries,
      newInquiries,
      totalContacts,
      totalUsers
    ] = await Promise.all([
      propertyService.count({}),
      propertyService.count({ isActive: true }),
      inquiryService.count({}),
      inquiryService.count({ 
        createdAt: { $gte: startDate, $lte: endDate }
      }),
      contactService.count({}),
      userService.count({ isActive: true })
    ]);

    // Get property statistics
    const propertyStats = await propertyService.aggregate([
      {
        $group: {
          _id: null,
          totalViews: { $sum: '$views' },
          totalInquiries: { $sum: '$inquiries' },
          avgViews: { $avg: '$views' },
          avgInquiries: { $avg: '$inquiries' }
        }
      }
    ]);

    // Get properties by status
    const propertiesByStatus = await propertyService.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Get properties by type
    const propertiesByType = await propertyService.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 }
        }
      }
    ]);

    // Get inquiry statistics
    const inquiryStats = await inquiryService.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Get unread inquiries count
    const unreadInquiries = await inquiryService.count({ isRead: false });

    // Get inquiry trends (last 7 days)
    const inquiryTrends = await inquiryService.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: '$createdAt'
            }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Get recent activities if detailed view is requested
    let recentActivities = [];
    if (detailed) {
      const [recentInquiries, recentProperties] = await Promise.all([
        inquiryService.find({}, {
          sort: { createdAt: -1 },
          limit: 5,
          select: 'name email property status createdAt'
        }),
        propertyService.find({}, {
          sort: { createdAt: -1 },
          limit: 5,
          select: 'title location status createdAt'
        })
      ]);

      recentActivities = [
        ...(recentInquiries.data || []).map(inquiry => ({
          type: 'inquiry',
          title: `New inquiry from ${inquiry.name}`,
          description: inquiry.property || 'General inquiry',
          timestamp: inquiry.createdAt,
          status: inquiry.status
        })),
        ...(recentProperties.data || []).map(property => ({
          type: 'property',
          title: `New property added: ${property.title}`,
          description: property.location,
          timestamp: property.createdAt,
          status: property.status
        }))
      ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
       .slice(0, 10);
    }

    // Get top performing properties
    const topProperties = await propertyService.find({}, {
      sort: { views: -1, inquiries: -1 },
      limit: 5,
      select: 'title location views inquiries images'
    });

    const dashboardData = {
      overview: {
        totalProperties: totalProperties.count || 0,
        activeProperties: activeProperties.count || 0,
        totalInquiries: totalInquiries.count || 0,
        newInquiries: newInquiries.count || 0,
        unreadInquiries: unreadInquiries.count || 0,
        totalContacts: totalContacts.count || 0,
        totalUsers: totalUsers.count || 0
      },
      propertyStats: {
        totalViews: propertyStats.data?.[0]?.totalViews || 0,
        totalPropertyInquiries: propertyStats.data?.[0]?.totalInquiries || 0,
        avgViews: Math.round(propertyStats.data?.[0]?.avgViews || 0),
        avgInquiries: Math.round(propertyStats.data?.[0]?.avgInquiries || 0)
      },
      charts: {
        propertiesByStatus: propertiesByStatus.data || [],
        propertiesByType: propertiesByType.data || [],
        inquiryStatus: inquiryStats.data || [],
        inquiryTrends: inquiryTrends.data || []
      },
      topProperties: topProperties.data || [],
      ...(detailed && { recentActivities })
    };

    return NextResponse.json({
      success: true,
      data: dashboardData
    });

  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dashboard statistics' },
      { status: 500 }
    );
  }
}
