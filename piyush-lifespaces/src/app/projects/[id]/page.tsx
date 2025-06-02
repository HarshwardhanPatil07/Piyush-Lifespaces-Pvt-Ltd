'use client';

import { useState, useEffect, use } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Share2, 
  Heart, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Calendar,
  Phone,
  Mail,
  MessageCircle,
  Star,
  ChevronLeft,
  ChevronRight,
  Check
} from 'lucide-react';
import Link from 'next/link';

interface Property {
  _id: string;
  title: string;
  description: string;
  location: string;
  price: string;
  area: string;
  bedrooms: number;
  bathrooms: number;
  status: 'ongoing' | 'completed' | 'upcoming';
  type: 'residential' | 'commercial' | 'villa' | 'apartment';
  amenities: string[];
  images: string[];
  features: string[];
  possession?: string;
  developer?: string;
  rera?: string;
  isFeatured?: boolean;
  createdAt: string;
  updatedAt: string;
}

interface PropertyDetailProps {
  params: Promise<{
    id: string;
  }>;
}

export default function PropertyDetail({ params }: PropertyDetailProps) {
  const resolvedParams = use(params);
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    fetchProperty();
  }, [resolvedParams.id]);
  const fetchProperty = async () => {
    try {
      const response = await fetch(`/api/properties?id=${resolvedParams.id}`);
      const data = await response.json();
      if (data.success && data.data) {
        setProperty(data.data);
      }
    } catch (error) {
      console.error('Error fetching property:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },        body: JSON.stringify({
          ...inquiryForm,
          property: property?.title,
          propertyId: property?._id,
          source: 'property-page'
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert('Inquiry submitted successfully! We will contact you soon.');
        setIsInquiryModalOpen(false);
        setInquiryForm({ name: '', email: '', phone: '', message: '' });
      }
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      alert('Failed to submit inquiry. Please try again.');
    }
  };

  const nextImage = () => {
    if (property) {
      setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
    }
  };

  const prevImage = () => {
    if (property) {
      setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'upcoming': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h1>
          <Link href="/projects" className="text-blue-600 hover:text-blue-800">
            Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/projects" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft size={20} className="mr-2" />
              Back to Properties
            </Link>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Share2 size={20} />
              </button>
              <button className="p-2 text-gray-600 hover:text-red-600">
                <Heart size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={property.images[currentImageIndex]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              {property.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {property.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {property.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {property.images.slice(0, 4).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-20 bg-gray-200 rounded-lg overflow-hidden ${
                      index === currentImageIndex ? 'ring-2 ring-blue-600' : ''
                    }`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Property Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(property.status)}`}>
                  {property.status}
                </span>
                <div className="flex items-center text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                  <span className="text-gray-600 text-sm ml-1">(4.8)</span>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin size={16} className="mr-1" />
                {property.location}
              </div>
              <div className="text-3xl font-bold text-blue-600">{property.price}</div>
            </div>

            {/* Property Stats */}
            <div className="grid grid-cols-3 gap-4 py-4 border-t border-b">
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Bed size={20} className="text-gray-600" />
                </div>
                <div className="text-lg font-semibold">{property.bedrooms}</div>
                <div className="text-sm text-gray-600">Bedrooms</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Bath size={20} className="text-gray-600" />
                </div>
                <div className="text-lg font-semibold">{property.bathrooms}</div>
                <div className="text-sm text-gray-600">Bathrooms</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Square size={20} className="text-gray-600" />
                </div>
                <div className="text-lg font-semibold">{property.area}</div>
                <div className="text-sm text-gray-600">Area</div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{property.description}</p>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
              <div className="grid grid-cols-1 gap-2">
                {property.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Check size={16} className="text-green-600 mr-2" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => setIsInquiryModalOpen(true)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Request Information
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Phone size={16} className="mr-2" />
                  Call Now
                </button>
                <button className="flex items-center justify-center py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <MessageCircle size={16} className="mr-2" />
                  WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Amenities Section */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Amenities</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {property.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center p-3 border rounded-lg">
                <Check size={16} className="text-green-600 mr-2" />
                <span className="text-gray-700">{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Inquiry Modal */}
      {isInquiryModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 w-full max-w-md"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Request Information</h3>
            <form onSubmit={handleInquirySubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={inquiryForm.name}
                onChange={(e) => setInquiryForm(prev => ({ ...prev, name: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                value={inquiryForm.email}
                onChange={(e) => setInquiryForm(prev => ({ ...prev, email: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={inquiryForm.phone}
                onChange={(e) => setInquiryForm(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                required
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                value={inquiryForm.message}
                onChange={(e) => setInquiryForm(prev => ({ ...prev, message: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                required
              />
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setIsInquiryModalOpen(false)}
                  className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Submit
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
