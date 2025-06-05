import mongoose, { Schema, Document } from 'mongoose';

export interface IProperty extends Document {
  title: string;
  description: string;
  location: string;
  price: string;
  area: string;
  bedrooms: number;
  bathrooms: number;
  status: 'ongoing' | 'completed' | 'upcoming';
  type: 'residential' | 'commercial' | 'villa' | 'apartment';  amenities: string[];
  images: string[]; // Array of image asset IDs referencing ImageAsset collection
  features: string[];
  gallery?: string[]; // Array of image asset IDs for additional gallery images
  floorPlans?: string[]; // Array of image asset IDs for floor plan images
  videoUrl?: string;
  brochureUrl?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  developer?: string;
  possession?: string;
  rera?: string;
  isActive: boolean;
  isFeatured: boolean;
  views: number;
  inquiries: number;
  createdAt: Date;
  updatedAt: Date;
}

const PropertySchema = new Schema<IProperty>({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  location: { type: String, required: true, trim: true },
  price: { type: String, required: true },
  area: { type: String, required: true },
  bedrooms: { type: Number, required: true, min: 0 },
  bathrooms: { type: Number, required: true, min: 0 },
  status: { 
    type: String, 
    required: true, 
    enum: ['ongoing', 'completed', 'upcoming'],
    default: 'upcoming'
  },
  type: { 
    type: String, 
    required: true, 
    enum: ['residential', 'commercial', 'villa', 'apartment'],
    default: 'residential'
  },  amenities: [{ type: String }],
  images: [{ type: String }], // References to ImageAsset document IDs
  features: [{ type: String }],
  gallery: [{ type: String }], // References to ImageAsset document IDs
  floorPlans: [{ type: String }], // References to ImageAsset document IDs
  videoUrl: { type: String },
  brochureUrl: { type: String },
  coordinates: {
    lat: { type: Number },
    lng: { type: Number }
  },
  developer: { type: String, default: 'Piyush Lifespaces Pvt Ltd' },
  possession: { type: String },
  rera: { type: String },
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
  inquiries: { type: Number, default: 0 }
}, {
  timestamps: true
});

// Create indexes for better search performance
PropertySchema.index({ title: 'text', description: 'text', location: 'text' });
PropertySchema.index({ status: 1, type: 1 });
PropertySchema.index({ isFeatured: 1, isActive: 1 });
PropertySchema.index({ createdAt: -1 });

export default mongoose.models.Property || mongoose.model<IProperty>('Property', PropertySchema);
