import mongoose, { Schema, Document } from 'mongoose';

export interface IImageAsset extends Document {
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  data: Buffer;
  metadata: {
    width?: number;
    height?: number;
    propertyId?: string;
    uploadedBy?: string;
    description?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const ImageAssetSchema = new Schema<IImageAsset>({
  filename: { 
    type: String, 
    required: true, 
    unique: true 
  },
  originalName: { 
    type: String, 
    required: true 
  },
  mimeType: { 
    type: String, 
    required: true,
    enum: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  },
  size: { 
    type: Number, 
    required: true,
    max: 10 * 1024 * 1024 // 10MB limit
  },
  data: { 
    type: Buffer, 
    required: true 
  },
  metadata: {
    width: { type: Number },
    height: { type: Number },
    propertyId: { type: String },
    uploadedBy: { type: String },
    description: { type: String }
  }
}, {
  timestamps: true
});

// Create indexes for better performance
// Note: filename index is already created by unique: true
ImageAssetSchema.index({ 'metadata.propertyId': 1 });
ImageAssetSchema.index({ createdAt: -1 });

export default mongoose.models.ImageAsset || mongoose.model<IImageAsset>('ImageAsset', ImageAssetSchema);
