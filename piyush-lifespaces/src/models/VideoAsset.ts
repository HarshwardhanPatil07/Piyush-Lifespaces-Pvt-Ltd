import mongoose, { Schema, Document } from 'mongoose';

export interface IVideoAsset extends Document {
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  data: Buffer;
  duration?: number; // in seconds
  metadata: {
    width?: number;
    height?: number;
    propertyId?: string;
    uploadedBy?: string;
    description?: string;
    bitrate?: number;
    codec?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const VideoAssetSchema = new Schema<IVideoAsset>({
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
    enum: ['video/mp4', 'video/mpeg', 'video/quicktime', 'video/webm', 'video/avi']
  },
  size: { 
    type: Number, 
    required: true,
    max: 100 * 1024 * 1024 // 100MB limit for videos
  },
  data: { 
    type: Buffer, 
    required: true 
  },
  duration: {
    type: Number, // duration in seconds
    min: 0
  },
  metadata: {
    width: { type: Number },
    height: { type: Number },
    propertyId: { type: String },
    uploadedBy: { type: String },
    description: { type: String },
    bitrate: { type: Number },
    codec: { type: String }
  }
}, {
  timestamps: true
});

// Create indexes for better performance
// Note: filename index is already created by unique: true
VideoAssetSchema.index({ 'metadata.propertyId': 1 });
VideoAssetSchema.index({ createdAt: -1 });

export default mongoose.models.VideoAsset || mongoose.model<IVideoAsset>('VideoAsset', VideoAssetSchema);
