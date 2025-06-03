import mongoose from 'mongoose'

export interface IHomeSlide {
  _id?: string
  title: string
  subtitle: string
  description: string
  image: string
  ctaText: string
  ctaLink: string
  order: number
  isActive: boolean
  createdAt?: Date
  updatedAt?: Date
}

const HomeSlideSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxLength: [100, 'Title cannot exceed 100 characters']
  },
  subtitle: {
    type: String,
    required: [true, 'Subtitle is required'],
    trim: true,
    maxLength: [150, 'Subtitle cannot exceed 150 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxLength: [300, 'Description cannot exceed 300 characters']
  },
  image: {
    type: String,
    required: [true, 'Image URL is required']
  },
  ctaText: {
    type: String,
    required: [true, 'CTA text is required'],
    trim: true,
    maxLength: [50, 'CTA text cannot exceed 50 characters']
  },
  ctaLink: {
    type: String,
    required: [true, 'CTA link is required'],
    trim: true
  },
  order: {
    type: Number,
    required: true,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

// Create index for faster queries
HomeSlideSchema.index({ order: 1, isActive: 1 })

export default mongoose.models.HomeSlide || mongoose.model<IHomeSlide>('HomeSlide', HomeSlideSchema)
