import mongoose from 'mongoose'

export interface IHomeVideo {
  _id?: string
  title: string
  description: string
  videoId?: string
  videoUrl?: string // For backward compatibility
  thumbnailImageId?: string
  thumbnailUrl?: string // For backward compatibility
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
    maxLength: [300, 'Description cannot exceed 300 characters']  },  videoId: {
    type: String,
    required: false // Make optional for backward compatibility
  },
  videoUrl: {
    type: String,
    required: false // For backward compatibility
  },thumbnailImageId: {
    type: String,
    required: false // Make optional for backward compatibility
  },
  thumbnailUrl: {
    type: String,
    required: false // For backward compatibility
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

export default mongoose.models.HomeVideo || mongoose.model<IHomeVideo>('HomeVideo', HomeVideoSchema)
