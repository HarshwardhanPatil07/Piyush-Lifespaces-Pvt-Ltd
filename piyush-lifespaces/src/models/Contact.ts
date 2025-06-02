import mongoose, { Schema, Document } from 'mongoose';

export interface IContact extends Document {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  propertyInterest?: string;
  source: string;
  status: 'new' | 'responded' | 'resolved';
  isRead: boolean;
  response?: string;
  respondedAt?: Date;
  respondedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema = new Schema<IContact>({
  name: { type: String, required: true, trim: true },
  email: { 
    type: String, 
    required: true, 
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: { 
    type: String, 
    required: true, 
    trim: true,
    match: [/^[\+]?[0-9\s\-\(\)]{10,}$/, 'Please enter a valid phone number']
  },
  subject: { type: String, required: true, trim: true },
  message: { type: String, required: true },
  propertyInterest: { type: String },
  source: { type: String, required: true, default: 'contact-form' },
  status: { 
    type: String, 
    enum: ['new', 'responded', 'resolved'],
    default: 'new'
  },
  isRead: { type: Boolean, default: false },
  response: { type: String },
  respondedAt: { type: Date },
  respondedBy: { type: String }
}, {
  timestamps: true
});

// Create indexes
ContactSchema.index({ email: 1 });
ContactSchema.index({ status: 1 });
ContactSchema.index({ createdAt: -1 });

export default mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);
