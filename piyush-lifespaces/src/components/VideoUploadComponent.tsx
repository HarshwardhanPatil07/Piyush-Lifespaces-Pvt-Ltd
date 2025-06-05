'use client';

import { useState, useRef } from 'react';
import { Upload, X, Play, Trash2 } from 'lucide-react';

interface VideoUploadComponentProps {
  onVideoUploaded: (videoId: string) => void;
  maxVideos?: number;
  initialVideo?: string;
}

export default function VideoUploadComponent({ 
  onVideoUploaded, 
  maxVideos = 1, 
  initialVideo 
}: VideoUploadComponentProps) {
  const [uploadedVideo, setUploadedVideo] = useState<string | null>(initialVideo || null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    
    // Reset error state
    setError(null);
    
    // Validate file size (100MB limit)
    const maxSize = 100 * 1024 * 1024; // 100MB
    if (file.size > maxSize) {
      setError('File size too large. Maximum size is 100MB.');
      return;
    }
    
    // Validate file type
    const validTypes = ['video/mp4', 'video/mpeg', 'video/quicktime', 'video/webm', 'video/avi'];
    if (!validTypes.includes(file.type)) {
      setError('Invalid file type. Please select a valid video file.');
      return;
    }
    
    await uploadVideo(file);
  };
  const uploadVideo = async (file: File) => {
    try {
      setUploading(true);
      setUploadProgress(0);
      setError(null);

      const formData = new FormData();
      formData.append('file', file);

      // Create XMLHttpRequest for progress tracking
      const xhr = new XMLHttpRequest();
      
      // Setup progress tracking
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100;
          setUploadProgress(Math.round(percentComplete));
        }
      };

      // Setup completion handler
      xhr.onload = () => {
        if (xhr.status === 200) {
          const result = JSON.parse(xhr.responseText);
          setUploadedVideo(result.videoId);
          onVideoUploaded(result.videoId);
          setUploadProgress(100);
        } else {
          const error = JSON.parse(xhr.responseText);
          setError(`Upload failed: ${error.error || 'Unknown error'}`);
        }
        setUploading(false);
      };

      xhr.onerror = () => {
        setError('Upload failed. Please check your connection and try again.');
        setUploading(false);
      };

      // Start upload
      xhr.open('POST', '/api/videos/upload');
      xhr.send(formData);

    } catch (error) {
      console.error('Upload error:', error);
      setError('Upload failed. Please try again.');
      setUploading(false);
    }
  };

  const removeVideo = async () => {
    if (!uploadedVideo) return;

    try {
      const response = await fetch(`/api/videos/${uploadedVideo}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setUploadedVideo(null);
        onVideoUploaded('');
      } else {
        console.error('Failed to delete video');
      }
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  return (
    <div className="space-y-4">
      {!uploadedVideo && (        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
            dragActive
              ? 'border-blue-500 bg-blue-50 scale-105'
              : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >          {uploading ? (
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <div className="text-center">
                <p className="text-gray-600">Uploading video...</p>
                <div className="w-64 bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-1">{uploadProgress}% complete</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div>
                <p className="text-lg font-medium text-gray-900">Upload Video</p>
                <p className="text-sm text-gray-500">
                  Drag and drop a video file here, or click to select
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Supported formats: MP4, MPEG, QuickTime, WebM, AVI (Max: 100MB)
                </p>
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Select Video
              </button>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="video/mp4,video/mpeg,video/quicktime,video/webm,video/avi"
                onChange={(e) => handleFileSelect(e.target.files)}
              />
            </div>
          )}        </div>
      )}

      {/* Error message display */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <div className="flex items-center">
            <X className="h-5 w-5 mr-2" />
            <span className="text-sm font-medium">{error}</span>
          </div>
        </div>
      )}

      {uploadedVideo && (
        <div className="space-y-4">
          <div className="bg-gray-100 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded">
                  <Play className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Video uploaded successfully</p>
                  <p className="text-sm text-gray-500">Video ID: {uploadedVideo}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={removeVideo}
                className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                title="Remove video"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
            
            {/* Enhanced Video preview */}
            <div className="bg-black rounded-lg overflow-hidden">
              <video
                src={`/api/videos/${uploadedVideo}`}
                controls
                preload="metadata"
                className="w-full h-auto max-h-64 object-contain"
                style={{ aspectRatio: '16/9' }}
                onError={(e) => {
                  console.error('Video playback error:', e);
                  e.currentTarget.style.display = 'none';
                }}
                onLoadStart={() => console.log('Video loading started')}
                onLoadedData={() => console.log('Video data loaded')}
              >
                Your browser does not support the video tag.
              </video>
            </div>
            
            {/* Video info */}
            <div className="mt-3 p-3 bg-gray-50 rounded border text-sm text-gray-600">
              <p><strong>Status:</strong> Ready for use</p>
              <p><strong>Format:</strong> Video file stored in database</p>
              <p><strong>Streaming:</strong> Supports range requests for efficient playback</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
