import { NextRequest, NextResponse } from 'next/server';

interface StatsData {
  totalProperties: number;
  activeInquiries: number;
  monthlyViews: number;
  completedSales: number;
  recentActivity: any[];
  monthlyStats: {
    month: string;
    inquiries: number;
    properties: number;
    sales: number;
  }[];
}

export async function GET(request: NextRequest) {
  try {
    // Mock analytics data - In production, this would come from your database and analytics service
    const stats: StatsData = {
      totalProperties: 24,
      activeInquiries: 12,
      monthlyViews: 1847,
      completedSales: 8,
      recentActivity: [
        {
          type: 'inquiry',
          title: 'New inquiry from Rajesh Kumar',
          time: '2 hours ago',
          property: 'Luxury Villa in Banjara Hills'
        },
        {
          type: 'property',
          title: 'Property updated: Premium Apartments',
          time: '5 hours ago',
          property: 'Premium Apartments in Gachibowli'
        },
        {
          type: 'contact',
          title: 'Contact form submission',
          time: '1 day ago',
          property: 'General Inquiry'
        },
        {
          type: 'sale',
          title: 'Sale completed',
          time: '2 days ago',
          property: 'Villa in Jubilee Hills'
        }
      ],
      monthlyStats: [
        { month: 'Jan', inquiries: 15, properties: 3, sales: 2 },
        { month: 'Feb', inquiries: 18, properties: 2, sales: 1 },
        { month: 'Mar', inquiries: 22, properties: 4, sales: 3 },
        { month: 'Apr', inquiries: 20, properties: 3, sales: 2 },
        { month: 'May', inquiries: 25, properties: 5, sales: 4 },
        { month: 'Jun', inquiries: 12, properties: 2, sales: 1 }
      ]
    };

    // Calculate growth percentages
    const currentMonth = stats.monthlyStats[stats.monthlyStats.length - 1];
    const previousMonth = stats.monthlyStats[stats.monthlyStats.length - 2];
    
    const inquiryGrowth = previousMonth ? 
      ((currentMonth.inquiries - previousMonth.inquiries) / previousMonth.inquiries * 100).toFixed(1) : '0';
    
    const propertyGrowth = previousMonth ? 
      ((currentMonth.properties - previousMonth.properties) / previousMonth.properties * 100).toFixed(1) : '0';

    const response = {
      ...stats,
      growth: {
        inquiries: inquiryGrowth,
        properties: propertyGrowth,
        views: '+12.5', // Mock data
        sales: '+8.2'   // Mock data
      }
    };

    return NextResponse.json({
      success: true,
      data: response
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dashboard statistics' },
      { status: 500 }
    );
  }
}
