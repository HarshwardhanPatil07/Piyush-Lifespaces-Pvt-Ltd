import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface EmailOptions {
  to: string;
  subject: string;
  html?: string;
  text?: string;
}

export const sendEmail = async (options: EmailOptions) => {
  try {
    const mailOptions = {
      from: `"Piyush Lifespaces" <${process.env.SMTP_USER}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
};

export const sendInquiryNotification = async (inquiry: any) => {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@piyushlifespaces.com';
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">New Property Inquiry</h2>
      <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0;">Customer Details</h3>
        <p><strong>Name:</strong> ${inquiry.name}</p>
        <p><strong>Email:</strong> ${inquiry.email}</p>
        <p><strong>Phone:</strong> ${inquiry.phone}</p>
        <p><strong>Property Interest:</strong> ${inquiry.property || 'General Inquiry'}</p>
        <p><strong>Budget:</strong> ${inquiry.budget || 'Not specified'}</p>
        <p><strong>Source:</strong> ${inquiry.source}</p>
      </div>
      <div style="background: #f1f5f9; padding: 20px; border-radius: 8px;">
        <h3 style="margin-top: 0;">Message</h3>
        <p>${inquiry.message}</p>
      </div>
      <div style="margin-top: 20px; text-align: center;">
        <a href="${process.env.NEXTAUTH_URL}/admin" 
           style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
          View in Admin Dashboard
        </a>
      </div>
    </div>
  `;

  return await sendEmail({
    to: adminEmail,
    subject: `New Property Inquiry from ${inquiry.name}`,
    html
  });
};

export const sendInquiryAutoReply = async (inquiry: any) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #2563eb; margin: 0;">Piyush Lifespaces</h1>
        <p style="color: #64748b; margin: 5px 0;">Premium Real Estate Developer</p>
      </div>
      
      <h2>Thank you for your inquiry!</h2>
      
      <p>Dear ${inquiry.name},</p>
      
      <p>Thank you for your interest in our properties. We have received your inquiry and one of our property consultants will get back to you within 24 hours.</p>
      
      <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0;">Your Inquiry Details</h3>
        <p><strong>Property:</strong> ${inquiry.property || 'General Inquiry'}</p>
        <p><strong>Message:</strong> ${inquiry.message}</p>
        <p><strong>Reference ID:</strong> ${inquiry.id || 'N/A'}</p>
      </div>
      
      <p>In the meantime, feel free to:</p>
      <ul>
        <li>Browse our other <a href="${process.env.NEXTAUTH_URL}/projects">premium projects</a></li>
        <li>Read our <a href="${process.env.NEXTAUTH_URL}/faqs">frequently asked questions</a></li>
        <li>Call us directly at <strong>+91 98765 43210</strong></li>
      </ul>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
        <p style="margin: 0; color: #64748b;">Best regards,<br>Piyush Lifespaces Team</p>
        <p style="margin: 10px 0 0 0; color: #64748b; font-size: 14px;">
          📧 info@piyushlifespaces.com<br>
          📞 +91 98765 43210<br>
          🌐 www.piyushlifespaces.com
        </p>
      </div>
    </div>
  `;

  return await sendEmail({
    to: inquiry.email,
    subject: 'Thank you for your inquiry - Piyush Lifespaces',
    html
  });
};

export const sendContactFormNotification = async (contact: any) => {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@piyushlifespaces.com';
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">New Contact Form Submission</h2>
      <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0;">Contact Details</h3>
        <p><strong>Name:</strong> ${contact.name}</p>
        <p><strong>Email:</strong> ${contact.email}</p>
        <p><strong>Phone:</strong> ${contact.phone}</p>
        <p><strong>Subject:</strong> ${contact.subject}</p>
        <p><strong>Property Interest:</strong> ${contact.propertyInterest || 'Not specified'}</p>
      </div>
      <div style="background: #f1f5f9; padding: 20px; border-radius: 8px;">
        <h3 style="margin-top: 0;">Message</h3>
        <p>${contact.message}</p>
      </div>
    </div>
  `;

  return await sendEmail({
    to: adminEmail,
    subject: `Contact Form: ${contact.subject}`,
    html
  });
};
