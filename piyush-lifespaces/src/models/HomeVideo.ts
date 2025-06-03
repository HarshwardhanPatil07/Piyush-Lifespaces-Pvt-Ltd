import mongoose from 'mongoose'

export interface IHomeVideo {
  _id?: string
  title: string
  description: string
  videoUrl: string
  thumbnailUrl: string
  isActive: boolean
  createdAt?: Date
  updatedAt?: Date
}

const HomeVideoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxLength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxLength: [300, 'Description cannot exceed 300 characters']
  },
  videoUrl: {
    type: String,
    required: [true, 'Video URL is required']
  },
  thumbnailUrl: {
    type: String,
    required: [true, 'Thumbnail URL is required']
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

export default mongoose.models.HomeVideo || mongoose.model<IHomeVideo>('HomeVideo', HomeVideoSchema)
