import mongoose, { Schema, Document } from 'mongoose';

export interface IInquiry extends Document {
  name: string;
  email: string;
  phone: string;
  property?: string;
  propertyId?: mongoose.Types.ObjectId;
  message: string;
  status: 'new' | 'contacted' | 'qualified' | 'closed' | 'not-interested';
  source: 'website' | 'phone' | 'email' | 'social' | 'referral' | 'walk-in';
  budget?: string;
  priority: 'low' | 'medium' | 'high';
  assignedTo?: string;
  notes?: string;
  followUpDate?: Date;
  lastContactedAt?: Date;
  tags?: string[];
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const InquirySchema = new Schema<IInquiry>({
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
  property: { type: String, trim: true },
  propertyId: { type: Schema.Types.ObjectId, ref: 'Property' },
  message: { type: String, required: true },
  status: { 
    type: String, 
    required: true, 
    enum: ['new', 'contacted', 'qualified', 'closed', 'not-interested'],
    default: 'new'
  },
  source: { 
    type: String, 
    required: true, 
    enum: ['website', 'phone', 'email', 'social', 'referral', 'walk-in'],
    default: 'website'
  },
  budget: { type: String },
  priority: { 
    type: String, 
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  assignedTo: { type: String },
  notes: { type: String },
  followUpDate: { type: Date },
  lastContactedAt: { type: Date },
  tags: [{ type: String }],
  isRead: { type: Boolean, default: false }
}, {
  timestamps: true
});

// Create indexes for better query performance
InquirySchema.index({ email: 1 });
InquirySchema.index({ phone: 1 });
InquirySchema.index({ status: 1, priority: 1 });
InquirySchema.index({ propertyId: 1 });
InquirySchema.index({ createdAt: -1 });
InquirySchema.index({ followUpDate: 1 });

export default mongoose.models.Inquiry || mongoose.model<IInquiry>('Inquiry', InquirySchema);
