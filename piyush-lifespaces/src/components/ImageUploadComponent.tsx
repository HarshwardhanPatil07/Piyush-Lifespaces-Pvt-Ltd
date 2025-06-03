'use client';

import React, { useState, useCallback } from 'react';
import { Upload, X, Image as ImageIcon, Loader } from 'lucide-react';

interface UploadedImage {
  id: string;
  filename: string;
  originalName: string;
  url: string;
  size: number;
  metadata: {
    width?: number;
    height?: number;
  };
}

interface ImageUploadComponentProps {
  onImagesUploaded: (imageIds: string[]) => void;
  propertyId?: string;
  maxImages?: number;
  initialImages?: string[];
}

export default function ImageUploadComponent({
  onImagesUploaded,
  propertyId,
  maxImages = 10,
  initialImages = []
}: ImageUploadComponentProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [dragActive, setDragActive] = useState(false);

  // Load initial images if provided
  React.useEffect(() => {
    if (initialImages.length > 0) {
      loadInitialImages();
    }
  }, [initialImages]);

  const loadInitialImages = async () => {
    try {
      const imagePromises = initialImages.map(async (imageId) => {
        const response = await fetch(`/api/images/${imageId}`);
        if (response.ok) {
          return {
            id: imageId,
            filename: `image_${imageId}`,
            originalName: 'Existing Image',
            url: `/api/images/${imageId}`,
            size: 0,
            metadata: {}
          };
        }
        return null;
      });

      const images = (await Promise.all(imagePromises)).filter(Boolean) as UploadedImage[];
      setUploadedImages(images);
    } catch (error) {
      console.error('Error loading initial images:', error);
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = async (files: File[]) => {
    if (uploadedImages.length + files.length > maxImages) {
      alert(`Maximum ${maxImages} images allowed`);
      return;
    }

    setUploading(true);

    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append('image', file);
        if (propertyId) {
          formData.append('propertyId', propertyId);
        }

        const response = await fetch('/api/images/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Upload failed');
        }

        const result = await response.json();
        return result.data;
      });

      const newImages = await Promise.all(uploadPromises);
      const updatedImages = [...uploadedImages, ...newImages];
      setUploadedImages(updatedImages);
      
      // Notify parent component with image IDs
      onImagesUploaded(updatedImages.map(img => img.id));

    } catch (error) {
      console.error('Upload error:', error);
      alert(`Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = async (imageId: string) => {
    try {
      const response = await fetch(`/api/images/${imageId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedImages = uploadedImages.filter(img => img.id !== imageId);
        setUploadedImages(updatedImages);
        onImagesUploaded(updatedImages.map(img => img.id));
      } else {
        console.error('Failed to delete image');
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        } ${uploading ? 'pointer-events-none opacity-50' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={uploading}
        />
        
        <div className="space-y-4">
          {uploading ? (
            <>
              <Loader className="mx-auto h-12 w-12 text-blue-500 animate-spin" />
              <p className="text-lg font-medium text-gray-700">Uploading images...</p>
            </>
          ) : (
            <>
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div>
                <p className="text-lg font-medium text-gray-700">
                  Drop images here or click to upload
                </p>
                <p className="text-sm text-gray-500">
                  Support for JPEG, PNG, WebP (Max: {maxImages} images, 10MB each)
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Uploaded Images Grid */}
      {uploadedImages.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-lg font-medium text-gray-700">
            Uploaded Images ({uploadedImages.length}/{maxImages})
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {uploadedImages.map((image) => (
              <div key={image.id} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={image.url}
                    alt={image.originalName}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Image Info Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 rounded-lg flex items-center justify-center">
                  <button
                    onClick={() => removeImage(image.id)}
                    className="opacity-0 group-hover:opacity-100 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all duration-200"
                    title="Remove image"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Image Details */}
                <div className="mt-2 text-xs text-gray-500">
                  <p className="truncate" title={image.originalName}>
                    {image.originalName}
                  </p>
                  {image.size > 0 && (
                    <p>{formatFileSize(image.size)}</p>
                  )}
                  {image.metadata.width && image.metadata.height && (
                    <p>{image.metadata.width} × {image.metadata.height}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
