'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Image as ImageIcon, 
  Video, 
  Star, 
  Save, 
  X, 
  Upload,
  Eye,
  EyeOff,
  ChevronUp,
  ChevronDown
} from 'lucide-react';

interface HomeSlide {
  _id?: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  order: number;
  isActive: boolean;
}

interface HomeVideo {
  _id?: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  isActive: boolean;
}

interface FeaturedReview {
  _id?: string;
  customerName: string;
  customerImage?: string;
  rating: number;
  reviewText: string;
  propertyName?: string;
  isActive: boolean;
  order: number;
  isCustom: boolean;
  originalReviewId?: string;
}

export default function HomeContentManagement() {
  const [activeSection, setActiveSection] = useState('slides');
  const [slides, setSlides] = useState<HomeSlide[]>([]);
  const [videos, setVideos] = useState<HomeVideo[]>([]);
  const [featuredReviews, setFeaturedReviews] = useState<FeaturedReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      setLoading(true);
      
      const [slidesRes, videosRes, reviewsRes] = await Promise.all([
        fetch('/api/admin/home-slides'),
        fetch('/api/admin/home-video'),
        fetch('/api/admin/featured-reviews')
      ]);

      if (slidesRes.ok) {
        const slidesData = await slidesRes.json();
        setSlides(Array.isArray(slidesData.data) ? slidesData.data : []);
      } else {
        console.error('Failed to fetch slides:', slidesRes.status);        setSlides([]);
      }

      if (videosRes.ok) {
        const videosData = await videosRes.json();
        setVideos(Array.isArray(videosData.data) ? videosData.data : []);
      } else {
        console.error('Failed to fetch videos:', videosRes.status);        setVideos([]);
      }

      if (reviewsRes.ok) {
        const reviewsData = await reviewsRes.json();
        setFeaturedReviews(Array.isArray(reviewsData.data) ? reviewsData.data : []);
      } else {
        console.error('Failed to fetch reviews:', reviewsRes.status);        setFeaturedReviews([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      // Ensure all states are properly initialized even on error
      setSlides([]);
      setVideos([]);
      setFeaturedReviews([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSlide = async (slideData: HomeSlide) => {
    try {
      setSaving(true);
      const url = slideData._id 
        ? `/api/admin/home-slides/${slideData._id}`
        : '/api/admin/home-slides';
      
      const response = await fetch(url, {
        method: slideData._id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slideData)
      });

      if (response.ok) {
        await fetchData();
        setShowModal(false);
        setEditingItem(null);
      }
    } catch (error) {
      console.error('Error saving slide:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveVideo = async (videoData: HomeVideo) => {
    try {
      setSaving(true);
      const url = videoData._id 
        ? `/api/admin/home-video/${videoData._id}`
        : '/api/admin/home-video';
      
      const response = await fetch(url, {
        method: videoData._id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(videoData)
      });

      if (response.ok) {
        await fetchData();
        setShowModal(false);
        setEditingItem(null);
      }
    } catch (error) {
      console.error('Error saving video:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveFeaturedReview = async (reviewData: FeaturedReview) => {
    try {
      setSaving(true);
      const url = reviewData._id 
        ? `/api/admin/featured-reviews/${reviewData._id}`
        : '/api/admin/featured-reviews';
      
      const response = await fetch(url, {
        method: reviewData._id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData)
      });

      if (response.ok) {
        await fetchData();
        setShowModal(false);
        setEditingItem(null);
      }
    } catch (error) {
      console.error('Error saving featured review:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (type: string, id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const url = `/api/admin/${type}/${id}`;
      const response = await fetch(url, { method: 'DELETE' });
      
      if (response.ok) {
        await fetchData();
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleReorderSlides = async (slideId: string, direction: 'up' | 'down') => {
    const currentSlide = slides.find(s => s._id === slideId);
    if (!currentSlide) return;

    const newOrder = direction === 'up' ? currentSlide.order - 1 : currentSlide.order + 1;
    
    try {
      const response = await fetch(`/api/admin/home-slides/${slideId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...currentSlide, order: newOrder })
      });

      if (response.ok) {
        await fetchData();
      }
    } catch (error) {
      console.error('Error reordering slide:', error);
    }
  };

  const toggleActive = async (type: string, id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/${type}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !currentStatus })
      });

      if (response.ok) {
        await fetchData();
      }
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };

  const openModal = (type: string, item?: any) => {
    if (type === 'slide') {
      setEditingItem(item || {
        title: '',
        subtitle: '',
        description: '',
        image: '',
        ctaText: 'Learn More',
        ctaLink: '/properties',
        order: slides.length + 1,
        isActive: true
      });
    } else if (type === 'video') {
      setEditingItem(item || {
        title: '',
        description: '',
        videoUrl: '',
        thumbnailUrl: '',
        isActive: true
      });
    } else if (type === 'review') {
      setEditingItem(item || {
        customerName: '',
        customerImage: '',
        rating: 5,
        reviewText: '',
        propertyName: '',
        isActive: true,
        order: featuredReviews.length + 1,
        isCustom: true
      });
    }
    setShowModal(true);
  };

  const renderSlidesSection = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900">Hero Slides</h3>
        <button
          onClick={() => openModal('slide')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Slide</span>
        </button>
      </div>

      <div className="grid gap-4">
        {slides.map((slide) => (
          <motion.div
            key={slide._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-6 border"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-4">                  {slide.image && (
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-20 h-12 object-cover rounded"
                    />
                  )}
                  <div>
                    <h4 className="font-bold text-gray-900">{slide.title}</h4>
                    <p className="text-sm text-gray-600">{slide.subtitle}</p>
                    <p className="text-xs text-gray-500">Order: {slide.order}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleActive('home-slides', slide._id!, slide.isActive)}
                  className={`p-2 rounded ${slide.isActive ? 'text-green-600' : 'text-gray-400'}`}
                  title={slide.isActive ? 'Active' : 'Inactive'}
                >
                  {slide.isActive ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
                
                <button
                  onClick={() => handleReorderSlides(slide._id!, 'up')}
                  className="p-2 text-gray-600 hover:text-blue-600"
                  disabled={slide.order === 1}
                >
                  <ChevronUp size={20} />
                </button>
                
                <button
                  onClick={() => handleReorderSlides(slide._id!, 'down')}
                  className="p-2 text-gray-600 hover:text-blue-600"
                  disabled={slide.order === slides.length}
                >
                  <ChevronDown size={20} />
                </button>
                
                <button
                  onClick={() => openModal('slide', slide)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                >
                  <Edit2 size={20} />
                </button>
                
                <button
                  onClick={() => handleDelete('home-slides', slide._id!)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderVideosSection = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900">Video Content</h3>
        <button
          onClick={() => openModal('video')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Video</span>
        </button>
      </div>      <div className="grid gap-4">
        {Array.isArray(videos) && videos.map((video) => (
          <motion.div
            key={video._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-6 border"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-4">
                  {video.thumbnailUrl && (
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-20 h-12 object-cover rounded"
                    />
                  )}
                  <div>
                    <h4 className="font-bold text-gray-900">{video.title}</h4>
                    <p className="text-sm text-gray-600">{video.description}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleActive('home-video', video._id!, video.isActive)}
                  className={`p-2 rounded ${video.isActive ? 'text-green-600' : 'text-gray-400'}`}
                  title={video.isActive ? 'Active' : 'Inactive'}
                >
                  {video.isActive ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
                
                <button
                  onClick={() => openModal('video', video)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                >
                  <Edit2 size={20} />
                </button>
                
                <button
                  onClick={() => handleDelete('home-video', video._id!)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderReviewsSection = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900">Featured Reviews</h3>
        <button
          onClick={() => openModal('review')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Review</span>
        </button>
      </div>

      <div className="grid gap-4">
        {featuredReviews.map((review) => (
          <motion.div
            key={review._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-6 border"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-2">
                  {review.customerImage && (
                    <img
                      src={review.customerImage}
                      alt={review.customerName}
                      className="w-12 h-12 object-cover rounded-full"
                    />
                  )}
                  <div>
                    <h4 className="font-bold text-gray-900">{review.customerName}</h4>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                    {review.propertyName && (
                      <p className="text-xs text-gray-500">{review.propertyName}</p>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{review.reviewText}</p>
                <p className="text-xs text-gray-500">
                  Order: {review.order} | {review.isCustom ? 'Custom' : 'From Reviews'}
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleActive('featured-reviews', review._id!, review.isActive)}
                  className={`p-2 rounded ${review.isActive ? 'text-green-600' : 'text-gray-400'}`}
                  title={review.isActive ? 'Active' : 'Inactive'}
                >
                  {review.isActive ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
                
                <button
                  onClick={() => openModal('review', review)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                >
                  <Edit2 size={20} />
                </button>
                
                <button
                  onClick={() => handleDelete('featured-reviews', review._id!)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderModal = () => {
    if (!showModal || !editingItem) return null;

    const isSlide = editingItem.hasOwnProperty('subtitle');
    const isVideo = editingItem.hasOwnProperty('videoUrl');
    const isReview = editingItem.hasOwnProperty('rating');

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center p-6 border-b">
            <h3 className="text-xl font-bold text-gray-900">
              {editingItem._id ? 'Edit' : 'Add'} {isSlide ? 'Slide' : isVideo ? 'Video' : 'Review'}
            </h3>
            <button
              onClick={() => setShowModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-6">
            {isSlide && (
              <SlideForm
                slide={editingItem}
                onSave={handleSaveSlide}
                saving={saving}
              />
            )}
            
            {isVideo && (
              <VideoForm
                video={editingItem}
                onSave={handleSaveVideo}
                saving={saving}
              />
            )}
            
            {isReview && (
              <ReviewForm
                review={editingItem}
                onSave={handleSaveFeaturedReview}
                saving={saving}
              />
            )}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Home Content Management</h2>
        
        {/* Section Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'slides', label: 'Hero Slides', icon: ImageIcon },
              { id: 'videos', label: 'Videos', icon: Video },
              { id: 'reviews', label: 'Featured Reviews', icon: Star }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeSection === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon size={20} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="mt-6">
        {activeSection === 'slides' && renderSlidesSection()}
        {activeSection === 'videos' && renderVideosSection()}
        {activeSection === 'reviews' && renderReviewsSection()}
      </div>

      {/* Modal */}
      {renderModal()}
    </div>
  );
}

// Form Components
function SlideForm({ slide, onSave, saving }: { slide: HomeSlide, onSave: (slide: HomeSlide) => void, saving: boolean }) {
  const [formData, setFormData] = useState(slide);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
        <input
          type="text"
          value={formData.subtitle}
          onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
        <input
          type="url"          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">CTA Text</label>
          <input
            type="text"
            value={formData.ctaText}
            onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">CTA Link</label>
          <input
            type="text"
            value={formData.ctaLink}
            onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
          <input
            type="number"
            value={formData.order}
            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
            min="1"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div className="flex items-center">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <span className="ml-2 text-sm text-gray-700">Active</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <button
          type="button"
          onClick={() => {}}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
        >
          {saving && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>}
          <Save size={20} />
          <span>Save</span>
        </button>
      </div>
    </form>
  );
}

function VideoForm({ video, onSave, saving }: { video: HomeVideo, onSave: (video: HomeVideo) => void, saving: boolean }) {
  const [formData, setFormData] = useState(video);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Video URL</label>
        <input
          type="url"
          value={formData.videoUrl}
          onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail URL</label>
        <input
          type="url"
          value={formData.thumbnailUrl}
          onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      <div className="flex items-center">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.isActive}
            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
          <span className="ml-2 text-sm text-gray-700">Active</span>
        </label>
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <button
          type="button"
          onClick={() => {}}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
        >
          {saving && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>}
          <Save size={20} />
          <span>Save</span>
        </button>
      </div>
    </form>
  );
}

function ReviewForm({ review, onSave, saving }: { review: FeaturedReview, onSave: (review: FeaturedReview) => void, saving: boolean }) {
  const [formData, setFormData] = useState(review);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
        <input
          type="text"
          value={formData.customerName}
          onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Customer Image URL (Optional)</label>
        <input
          type="url"
          value={formData.customerImage || ''}
          onChange={(e) => setFormData({ ...formData, customerImage: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
        <select
          value={formData.rating}
          onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        >
          {[5, 4, 3, 2, 1].map(rating => (
            <option key={rating} value={rating}>{rating} Star{rating !== 1 ? 's' : ''}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Review Text</label>
        <textarea
          value={formData.reviewText}
          onChange={(e) => setFormData({ ...formData, reviewText: e.target.value })}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Property Name (Optional)</label>
        <input
          type="text"
          value={formData.propertyName || ''}
          onChange={(e) => setFormData({ ...formData, propertyName: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
          <input
            type="number"
            value={formData.order}
            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
            min="1"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div className="flex items-center">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <span className="ml-2 text-sm text-gray-700">Active</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <button
          type="button"
          onClick={() => {}}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
        >
          {saving && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>}
          <Save size={20} />
          <span>Save</span>
        </button>
      </div>
    </form>
  );
}
