# Piyush Lifespaces Admin Dashboard

This admin dashboard provides comprehensive management capabilities for the Piyush Lifespaces real estate website.

## Features

### 🏠 Property Management
- Add, edit, delete properties
- Manage property images and galleries
- Set property status (ongoing, completed, upcoming)
- Configure pricing and specifications
- Manage amenities and features
- RERA compliance tracking

### 📞 Inquiry Management
- View and manage customer inquiries
- Track inquiry status and priority
- Assign inquiries to team members
- Follow-up scheduling
- Lead scoring and qualification
- Export inquiries to CRM

### 📧 Contact Management
- Handle contact form submissions
- Respond to customer queries
- Track communication history
- Status management (new, responded, resolved)

### 📊 Analytics Dashboard
- Property view statistics
- Inquiry conversion rates
- Monthly performance metrics
- Lead source tracking
- Revenue analytics

### 🔐 User Management
- Admin, manager, and agent roles
- Permission-based access control
- User activity tracking
- Secure authentication

## Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB database
- SMTP email configuration

### Installation

1. **Clone and install dependencies**
   ```bash
   cd piyush-lifespaces
   npm install
   ```

2. **Configure environment variables**
   Copy `.env.local` and update the values:
   ```bash
   # Database
   MONGODB_URI=mongodb://localhost:27017/piyush-lifespaces
   
   # Email
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   
   # Admin
   ADMIN_EMAIL=admin@piyushlifespaces.com
   ADMIN_PASSWORD=admin123
   ```

3. **Seed the database**
   ```bash
   npm run seed
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Access the admin dashboard**
   - Navigate to `http://localhost:3000/admin`
   - Login with: `admin@piyushlifespaces.com` / `admin123`

## API Endpoints

### Properties
- `GET /api/properties` - List properties with filters
- `POST /api/properties` - Create new property
- `PUT /api/properties` - Update property
- `DELETE /api/properties` - Delete property

### Inquiries
- `GET /api/inquiries` - List inquiries with filters
- `POST /api/inquiries` - Create new inquiry
- `PUT /api/inquiries` - Update inquiry status
- `DELETE /api/inquiries` - Delete inquiry

### Contact
- `GET /api/contact` - List contact submissions
- `POST /api/contact` - Submit contact form

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

## Database Models

### Property Model
```typescript
{
  title: string;
  description: string;
  location: string;
  price: string;
  area: string;
  bedrooms: number;
  bathrooms: number;
  status: 'ongoing' | 'completed' | 'upcoming';
  type: 'residential' | 'commercial' | 'villa' | 'apartment';
  amenities: string[];
  images: string[];
  features: string[];
  // ... more fields
}
```

### Inquiry Model
```typescript
{
  name: string;
  email: string;
  phone: string;
  property: string;
  propertyId: ObjectId;
  message: string;
  status: 'new' | 'contacted' | 'qualified' | 'closed';
  source: 'website' | 'phone' | 'email' | 'social';
  budget: string;
  priority: 'low' | 'medium' | 'high';
  // ... more fields
}
```

## Email Integration

The system automatically sends:
- **Admin notifications** for new inquiries
- **Auto-reply emails** to customers
- **Follow-up reminders** for agents
- **Welcome emails** for new registrations

## Security Features

- **Password hashing** with bcrypt
- **JWT authentication** for API access
- **Role-based permissions**
- **Input validation** and sanitization
- **Rate limiting** on API endpoints
- **CORS protection**

## Deployment

### Environment Setup
1. Set up MongoDB Atlas or local MongoDB
2. Configure SMTP email service
3. Set production environment variables
4. Build the application: `npm run build`
5. Start production server: `npm start`

### Recommended Hosting
- **Frontend**: Vercel, Netlify, or AWS Amplify
- **Database**: MongoDB Atlas
- **Email**: SendGrid, AWS SES, or Gmail SMTP
- **File Storage**: AWS S3, Cloudinary

## Integration Options

### CRM Integration
- Salesforce API
- HubSpot CRM
- Zoho CRM
- Custom CRM webhooks

### Payment Gateway
- Razorpay for Indian payments
- Stripe for international
- PayU for alternative payments

### Communication
- WhatsApp Business API
- SMS gateway integration
- Video calling integration
- Live chat support

## Support

For technical support or questions:
- Email: tech@piyushlifespaces.com
- Documentation: [Link to docs]
- Support Portal: [Link to support]

## Version History

- **v1.0.0** - Initial release with core features
- **v1.1.0** - Added email integration and dashboard
- **v1.2.0** - Enhanced admin features and API improvements
