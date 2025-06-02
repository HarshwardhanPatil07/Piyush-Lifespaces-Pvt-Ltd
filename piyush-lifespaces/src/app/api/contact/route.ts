import { NextRequest, NextResponse } from 'next/server';

interface ContactSubmission {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  propertyInterest?: string;
  source: string;
}

// Mock storage for contact form submissions
let contactSubmissions: any[] = [];

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

    const submission = {
      id: (contactSubmissions.length + 1).toString(),
      name,
      email,
      phone,
      subject,
      message,
      propertyInterest: body.propertyInterest || '',
      source: body.source || 'contact-form',
      status: 'new',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    contactSubmissions.push(submission);

    // TODO: Send email notification to admin
    // TODO: Send auto-reply email to customer
    // TODO: Integrate with CRM system
    console.log('New contact submission:', submission);

    return NextResponse.json({
      success: true,
      data: submission,
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
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    let filteredSubmissions = [...contactSubmissions];

    // Apply filters
    if (status && status !== 'all') {
      filteredSubmissions = filteredSubmissions.filter(submission => submission.status === status);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredSubmissions = filteredSubmissions.filter(submission =>
        submission.name.toLowerCase().includes(searchLower) ||
        submission.email.toLowerCase().includes(searchLower) ||
        submission.subject.toLowerCase().includes(searchLower) ||
        submission.message.toLowerCase().includes(searchLower)
      );
    }

    // Sort by creation date (newest first)
    filteredSubmissions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({
      success: true,
      data: filteredSubmissions,
      total: filteredSubmissions.length
    });
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch contact submissions' },
      { status: 500 }
    );
  }
}
