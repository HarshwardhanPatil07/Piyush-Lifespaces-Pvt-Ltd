'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ImageUploadComponent from './ImageUploadComponent';
import VideoUploadComponent from './VideoUploadComponent';
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
  ChevronDown,
  Play
} from 'lucide-react';

interface HomeSlide {
  _id?: string;
  title: string;
  subtitle: string;
  description: string;
  imageId: string;
  ctaText: string;
  ctaLink: string;
  order: number;
  isActive: boolean;
}

interface HomeVideo {
  _id?: string;
  title: string;
  description: string;
  videoId: string;
  thumbnailImageId: string;
  isActive: boolean;
}

interface FeaturedReview {
  _id?: string;
  customerName: string;
  customerLocation?: string;
  customerImageId?: string;
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
      }      if (videosRes.ok) {
        const videosData = await videosRes.json();
        console.log('Videos data received:', videosData);
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
      const url = '/api/admin/home-slides';
      const method = slideData._id ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slideData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Slide saved successfully:', result);
        await fetchData();
        setShowModal(false);
        setEditingItem(null);
      } else {
        const error = await response.json();
        console.error('Failed to save slide:', error);
        alert(`Failed to save slide: ${error.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error saving slide:', error);
      alert('Error saving slide. Please try again.');
    } finally {
      setSaving(false);
    }
  };
  const handleSaveVideo = async (videoData: HomeVideo) => {
    try {
      setSaving(true);
      const url = '/api/admin/home-video';
      const method = videoData._id ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(videoData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Video saved successfully:', result);
        await fetchData();
        setShowModal(false);
        setEditingItem(null);
      } else {
        const error = await response.json();
        console.error('Failed to save video:', error);
        alert(`Failed to save video: ${error.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error saving video:', error);
      alert('Error saving video. Please try again.');
    } finally {
      setSaving(false);
    }
  };  const handleSaveFeaturedReview = async (reviewData: FeaturedReview) => {
    try {
      setSaving(true);
      const url = '/api/admin/featured-reviews';
      const method = reviewData._id ? 'PUT' : 'POST';
        // Map form field names to API field names
      const mappedData = {
        _id: reviewData._id,
        name: reviewData.customerName,
        location: reviewData.customerLocation || 'Customer',
        rating: reviewData.rating,
        review: reviewData.reviewText,
        imageId: reviewData.customerImageId,
        property: reviewData.propertyName || 'General',
        order: reviewData.order,
        isActive: reviewData.isActive,
        isCustom: reviewData.isCustom
      };
      
      console.log('Mapped review data:', mappedData);
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mappedData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Review saved successfully:', result);
        await fetchData();
        setShowModal(false);
        setEditingItem(null);
      } else {
        const error = await response.json();
        console.error('Failed to save review:', error);
        alert(`Failed to save review: ${error.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error saving featured review:', error);
      alert('Error saving review. Please try again.');
    } finally {
      setSaving(false);
    }
  };
  const handleDelete = async (type: string, id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const url = `/api/admin/${type}?id=${id}`;
      const response = await fetch(url, { method: 'DELETE' });
      
      if (response.ok) {
        const result = await response.json();
        console.log('Item deleted successfully:', result);
        await fetchData();
      } else {
        const error = await response.json();
        console.error('Failed to delete item:', error);
        alert(`Failed to delete item: ${error.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Error deleting item. Please try again.');
    }
  };
  const handleReorderSlides = async (slideId: string, direction: 'up' | 'down') => {
    const currentSlide = slides.find(s => s._id === slideId);
    if (!currentSlide) return;

    const newOrder = direction === 'up' ? currentSlide.order - 1 : currentSlide.order + 1;
    
    try {
      const response = await fetch('/api/admin/home-slides', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...currentSlide, order: newOrder })
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Slide reordered successfully:', result);
        await fetchData();
      } else {
        const error = await response.json();
        console.error('Failed to reorder slide:', error);
      }
    } catch (error) {
      console.error('Error reordering slide:', error);
    }
  };
  const toggleActive = async (type: string, id: string, currentStatus: boolean) => {
    try {
      // Find the current item to get all its data
      let currentItem;
      if (type === 'home-slides') {
        currentItem = slides.find(s => s._id === id);
      } else if (type === 'home-video') {
        currentItem = videos.find(v => v._id === id);
      } else if (type === 'featured-reviews') {
        currentItem = featuredReviews.find(r => r._id === id);
      }
      
      if (!currentItem) {
        console.error('Item not found for toggle');
        return;
      }
      
      const response = await fetch(`/api/admin/${type}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...currentItem, isActive: !currentStatus })
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Item toggled successfully:', result);
        await fetchData();
      } else {
        const error = await response.json();
        console.error('Failed to toggle item:', error);
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
        imageId: '',
        ctaText: 'Learn More',
        ctaLink: '/properties',
        order: slides.length + 1,
        isActive: true
      });    } else if (type === 'video') {
      setEditingItem(item || {
        title: '',
        description: '',
        videoId: '',
        thumbnailImageId: '',
        isActive: true
      });    } else if (type === 'review') {
      setEditingItem(item || {
        customerName: '',
        customerLocation: '',
        customerImageId: '',
        rating: 5,
        reviewText: '',
        propertyName: '',
        isActive: true,
        order: featuredReviews.length + 1,
        isCustom: true
      });
    }setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
    setEditingItem(null);
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
              <div className="flex-1">                <div className="flex items-center space-x-4">                  {slide.imageId && (
                    <img
                      src={`/api/images/${slide.imageId}`}
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
  const renderVideosSection = () => {
    const activeVideo = videos.find(video => video.isActive);
    const inactiveVideos = videos.filter(video => !video.isActive);
    
    console.log('Rendering videos section:', {
      totalVideos: videos.length,
      activeVideo: activeVideo ? { id: activeVideo._id, title: activeVideo.title, videoId: activeVideo.videoId } : null,
      inactiveVideosCount: inactiveVideos.length
    });

    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-900">Video Content</h3>
          <button
            onClick={() => openModal('video')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Add Video</span>
          </button>
        </div>        {/* Current Active Video Section */}
        {activeVideo ? (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-500 fill-current" />
                <h4 className="text-lg font-semibold text-gray-900">Currently Active Video</h4>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">LIVE</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => fetchData()}
                  className="bg-white text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-1 text-sm border border-gray-200"
                >
                  <span>Refresh</span>
                </button>
                <button
                  onClick={() => openModal('video', activeVideo)}
                  className="bg-white text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors flex items-center space-x-1 text-sm border border-blue-200"
                >
                  <Edit2 size={16} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete('home-video', activeVideo._id!)}
                  className="bg-white text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors flex items-center space-x-1 text-sm border border-red-200"
                >
                  <Trash2 size={16} />
                  <span>Delete</span>
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Enhanced Video Preview */}
              <div className="space-y-4">
                {activeVideo.videoId ? (
                  <div className="relative bg-black rounded-lg overflow-hidden shadow-lg group">                    <video
                      id={`video-preview-${activeVideo._id}`}
                      src={`/api/videos/${activeVideo.videoId}`}
                      className="w-full h-48 object-contain"
                      muted
                      playsInline
                      preload="metadata"
                      poster={activeVideo.thumbnailImageId ? `/api/images/${activeVideo.thumbnailImageId}` : undefined}onLoadStart={() => {
                        console.log('🎬 Video loading:', activeVideo.videoId);
                      }}
                      onLoadedMetadata={() => {
                        console.log('📹 Video metadata ready:', activeVideo.videoId);
                      }}
                      onLoadedData={() => {
                        console.log('✅ Video data loaded:', activeVideo.videoId);
                      }}
                      onCanPlay={() => {
                        console.log('▶️ Video ready to play:', activeVideo.videoId);
                      }}onError={(e) => {
                        const videoElement = e.currentTarget as HTMLVideoElement;
                        const error = videoElement.error;
                        
                        // Only log if there's an actual error
                        if (error) {
                          console.error('Video preview error for:', activeVideo.videoId, {
                            errorCode: error.code,
                            errorMessage: error.message,
                            videoSrc: `/api/videos/${activeVideo.videoId}`,
                            networkState: videoElement.networkState,
                            readyState: videoElement.readyState
                          });
                        }
                      }}
                    >
                      Your browser does not support the video tag.
                    </video>
                    
                    {/* Video Controls Overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <button
                        onClick={() => {
                          const videoElement = document.querySelector(`#video-preview-${activeVideo._id}`) as HTMLVideoElement;
                          if (videoElement) {
                            if (videoElement.paused) {
                              videoElement.play();
                            } else {
                              videoElement.pause();
                            }
                          }
                        }}
                        className="bg-white/90 text-blue-600 p-4 rounded-full hover:bg-white transition-all duration-200 shadow-lg transform hover:scale-110"
                        title="Play/Pause video preview"
                      >
                        <Play size={24} />
                      </button>
                    </div>
                  </div>
                ) : activeVideo.thumbnailImageId ? (
                  <div className="relative bg-gray-100 rounded-lg overflow-hidden shadow-lg h-48">
                    <img
                      src={`/api/images/${activeVideo.thumbnailImageId}`}
                      alt={activeVideo.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <span className="bg-white/90 text-gray-600 px-3 py-2 rounded-lg text-sm">
                        No Video File
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center">
                    <div className="text-center">
                      <Video className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500 text-sm">No video or thumbnail</p>
                    </div>
                  </div>
                )}

                {/* Video Actions */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => window.open(`/api/videos/${activeVideo.videoId}`, '_blank')}
                    className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center justify-center space-x-2"
                    disabled={!activeVideo.videoId}
                  >
                    <Play size={16} />
                    <span>View Full Video</span>
                  </button>
                  <button
                    onClick={() => navigator.clipboard.writeText(`${window.location.origin}/api/videos/${activeVideo.videoId}`)}
                    className="bg-gray-100 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                    disabled={!activeVideo.videoId}
                  >
                    Copy URL
                  </button>
                </div>
              </div>

              {/* Video Information */}
              <div className="space-y-4">
                <div>
                  <h5 className="text-xl font-bold text-gray-900 mb-2">{activeVideo.title}</h5>
                  <p className="text-gray-600 leading-relaxed">{activeVideo.description}</p>
                </div>

                {/* Video Details Grid */}
                <div className="bg-white rounded-lg p-4 space-y-3 border">
                  <h6 className="font-semibold text-gray-900 border-b pb-2">Video Details</h6>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-500">Status:</span>
                      <span className="ml-2 text-green-600 font-medium">Active</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Type:</span>
                      <span className="ml-2">Homepage Video</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Video ID:</span>
                      <span className="ml-2 font-mono text-xs text-gray-700">{activeVideo.videoId || 'None'}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Thumbnail:</span>
                      <span className="ml-2 font-mono text-xs text-gray-700">{activeVideo.thumbnailImageId || 'None'}</span>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex space-x-2 pt-2 border-t">
                    <button
                      onClick={() => toggleActive('home-video', activeVideo._id!, activeVideo.isActive)}
                      className="flex-1 bg-red-100 text-red-700 py-2 px-3 rounded-lg hover:bg-red-200 transition-colors text-sm flex items-center justify-center space-x-2"
                    >
                      <EyeOff size={16} />
                      <span>Deactivate</span>
                    </button>
                    <button
                      onClick={() => window.open('/', '_blank')}
                      className="flex-1 bg-green-100 text-green-700 py-2 px-3 rounded-lg hover:bg-green-200 transition-colors text-sm flex items-center justify-center space-x-2"
                    >
                      <Eye size={16} />
                      <span>View Live</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-xl p-8 text-center border-2 border-dashed border-gray-300">
            <Video className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">No Active Video</h4>
            <p className="text-gray-600 mb-4">Upload a video to display on your homepage</p>
            <button
              onClick={() => openModal('video')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Upload First Video
            </button>
          </div>
        )}

        {/* Other Videos Section */}
        {inactiveVideos.length > 0 && (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <span>Other Videos</span>
              <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">{inactiveVideos.length}</span>
            </h4>
            
            <div className="grid gap-4">
              {inactiveVideos.map((video) => (
                <motion.div
                  key={video._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow-sm p-4 border hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {video.videoId ? (
                          <div className="relative">                            <video
                              id={`video-preview-${video._id}`}
                              src={`/api/videos/${video.videoId}`}
                              className="w-24 h-16 object-cover rounded"
                              muted
                              playsInline
                              preload="metadata"
                              poster={video.thumbnailImageId ? `/api/images/${video.thumbnailImageId}` : undefined}onLoadStart={() => {
                                console.log('🎬 Inactive video loading:', video.videoId);
                              }}
                              onLoadedMetadata={() => {
                                console.log('📹 Inactive video metadata ready:', video.videoId);
                              }}onError={(e) => {
                                const videoElement = e.currentTarget as HTMLVideoElement;
                                const error = videoElement.error;
                                
                                // Only log if there's an actual error
                                if (error) {
                                  console.error('Inactive video preview error for:', video.videoId, {
                                    errorCode: error.code,
                                    errorMessage: error.message,
                                    videoSrc: `/api/videos/${video.videoId}`,
                                    networkState: videoElement.networkState,
                                    readyState: videoElement.readyState
                                  });
                                }
                              }}
                            />
                          </div>
                        ) : video.thumbnailImageId ? (
                          <img
                            src={`/api/images/${video.thumbnailImageId}`}
                            alt={video.title}
                            className="w-24 h-16 object-cover rounded"
                          />
                        ) : (
                          <div className="w-24 h-16 bg-gray-100 rounded flex items-center justify-center">
                            <Video className="h-6 w-6 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-900">{video.title}</h5>
                        <p className="text-sm text-gray-600 mt-1 overflow-hidden" style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical'
                        }}>{video.description}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-xs text-gray-500">Inactive</span>
                          {video.videoId && (
                            <span className="text-xs text-blue-600">Video uploaded</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1">
                      {video.videoId && (
                        <button
                          onClick={() => {
                            const videoElement = document.querySelector(`#video-preview-${video._id}`) as HTMLVideoElement;
                            if (videoElement) {
                              if (videoElement.paused) {
                                videoElement.play();
                              } else {
                                videoElement.pause();
                              }
                            }
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                          title="Play/Pause video preview"
                        >
                          <Play size={16} />
                        </button>
                      )}
                      
                      <button
                        onClick={() => toggleActive('home-video', video._id!, video.isActive)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded"
                        title="Make Active"
                      >
                        <Eye size={16} />
                      </button>
                      
                      <button
                        onClick={() => openModal('video', video)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                        title="Edit Video"
                      >
                        <Edit2 size={16} />
                      </button>
                      
                      <button
                        onClick={() => handleDelete('home-video', video._id!)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                        title="Delete Video"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>        )}
      </div>
    );
  };

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
              <div className="flex-1">                <div className="flex items-center space-x-4 mb-2">
                  {review.customerImageId && (
                    <img
                      src={`/api/images/${review.customerImageId}`}
                      alt={review.customerName}
                      className="w-12 h-12 object-cover rounded-full"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        // Prevent infinite re-render by only setting fallback once
                        if (target.src !== "/images/default-avatar.svg") {
                          target.src = "/images/default-avatar.svg";
                        }
                      }}
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
    if (!showModal || !editingItem) return null;    const isSlide = editingItem.hasOwnProperty('subtitle');
    const isVideo = editingItem.hasOwnProperty('videoId') || editingItem.hasOwnProperty('videoUrl');
    const isReview = editingItem.hasOwnProperty('rating');

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center p-6 border-b">
            <h3 className="text-xl font-bold text-gray-900">
              {editingItem._id ? 'Edit' : 'Add'} {isSlide ? 'Slide' : isVideo ? 'Video' : 'Review'}
            </h3>            <button
              onClick={handleCancel}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>          <div className="p-6">
            {isSlide && (
              <SlideForm
                slide={editingItem}
                onSave={handleSaveSlide}
                onCancel={handleCancel}
                saving={saving}
              />
            )}
            
            {isVideo && (
              <VideoForm
                video={editingItem}
                onSave={handleSaveVideo}
                onCancel={handleCancel}
                saving={saving}
              />
            )}
            
            {isReview && (
              <ReviewForm
                review={editingItem}
                onSave={handleSaveFeaturedReview}
                onCancel={handleCancel}
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
function SlideForm({ slide, onSave, onCancel, saving }: { slide: HomeSlide, onSave: (slide: HomeSlide) => void, onCancel: () => void, saving: boolean }) {
  const [formData, setFormData] = useState(slide);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Debug log to check form data
    console.log('Submitting slide data:', formData);
    
    // Validate that imageId is present
    if (!formData.imageId) {
      alert('Please upload an image before saving.');
      return;
    }
    
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
      </div>      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Slide Image</label>
        <ImageUploadComponent
          onImagesUploaded={(imageIds) => {
            console.log('Images uploaded for slide:', imageIds);
            if (imageIds.length > 0) {
              setFormData({ ...formData, imageId: imageIds[0] });
            } else {
              setFormData({ ...formData, imageId: '' });
            }
          }}
          maxImages={1}
          initialImages={formData.imageId ? [formData.imageId] : []}
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
          </label>        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
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

function VideoForm({ video, onSave, onCancel, saving }: { video: HomeVideo, onSave: (video: HomeVideo) => void, onCancel: () => void, saving: boolean }) {
  const [formData, setFormData] = useState(video);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Debug log to check form data
    console.log('Submitting video data:', formData);
      // Validate that both video and thumbnail are present
    if (!formData.videoId) {
      alert('Please upload a video before saving.');
      return;
    }
    
    if (!formData.thumbnailImageId) {
      alert('Please upload a thumbnail image before saving.');
      return;
    }
    
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
      </div>      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Video Upload</label>
        <VideoUploadComponent
          onVideoUploaded={(videoId) => {
            console.log('Video uploaded:', videoId);
            setFormData({ ...formData, videoId });
          }}
          maxVideos={1}
          initialVideo={formData.videoId || ''}
        />
      </div><div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail Image</label>
        <ImageUploadComponent
          onImagesUploaded={(imageIds) => {
            console.log('Images uploaded for video:', imageIds);
            if (imageIds.length > 0) {
              setFormData({ ...formData, thumbnailImageId: imageIds[0] });
            } else {
              setFormData({ ...formData, thumbnailImageId: '' });
            }
          }}
          maxImages={1}
          initialImages={formData.thumbnailImageId ? [formData.thumbnailImageId] : []}
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
      </div>      <div className="flex justify-end space-x-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
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

function ReviewForm({ review, onSave, onCancel, saving }: { review: FeaturedReview, onSave: (review: FeaturedReview) => void, onCancel: () => void, saving: boolean }) {  const [formData, setFormData] = useState({
    ...review,
    customerName: review.customerName || '',
    customerLocation: review.customerLocation || '',
    customerImageId: review.customerImageId || '',
    rating: review.rating || 5,
    reviewText: review.reviewText || '',
    propertyName: review.propertyName || '',
    isActive: review.isActive !== undefined ? review.isActive : true,
    order: review.order || 1,
    isCustom: review.isCustom !== undefined ? review.isCustom : true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Debug log to check form data
    console.log('Submitting review data:', formData);
    
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>        <input
          type="text"
          value={formData.customerName}
          onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Customer Location</label>
        <input
          type="text"
          value={formData.customerLocation}
          onChange={(e) => setFormData({ ...formData, customerLocation: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="e.g., Mumbai, Delhi, Bangalore"
          required
        />
      </div>      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Customer Image (Optional)</label><ImageUploadComponent
          onImagesUploaded={(imageIds) => {
            console.log('Images uploaded for review:', imageIds);
            if (imageIds.length > 0) {
              setFormData({ ...formData, customerImageId: imageIds[0] });
            } else {
              setFormData({ ...formData, customerImageId: '' });
            }
          }}
          maxImages={1}
          initialImages={formData.customerImageId ? [formData.customerImageId] : []}
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
      </div>      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Property Name (Optional)</label>
        <input
          type="text"
          value={formData.propertyName}
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
      </div>      <div className="flex justify-end space-x-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
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
