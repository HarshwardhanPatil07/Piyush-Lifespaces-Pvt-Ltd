import mongoose from 'mongoose'

export interface IFeaturedReview {
  _id?: string
  reviewId?: string
  name: string
  location: string
  rating: number
  review: string
  image: string
  property: string
  order: number
  isActive: boolean
  isCustom: boolean // true if manually added, false if linked to review
  createdAt?: Date
  updatedAt?: Date
}

const FeaturedReviewSchema = new mongoose.Schema({
  reviewId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review',
    required: false // Optional for custom reviews
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxLength: [100, 'Name cannot exceed 100 characters']
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
    maxLength: [100, 'Location cannot exceed 100 characters']
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5']
  },
  review: {
    type: String,
    required: [true, 'Review text is required'],
    trim: true,
    maxLength: [500, 'Review cannot exceed 500 characters']
  },
  image: {
    type: String,
    required: [true, 'Image URL is required']
  },
  property: {
    type: String,
    required: [true, 'Property name is required'],
    trim: true,
    maxLength: [100, 'Property name cannot exceed 100 characters']
  },
  order: {
    type: Number,
    required: true,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isCustom: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

// Create index for faster queries
FeaturedReviewSchema.index({ order: 1, isActive: 1 })

export default mongoose.models.FeaturedReview || mongoose.model<IFeaturedReview>('FeaturedReview', FeaturedReviewSchema)
