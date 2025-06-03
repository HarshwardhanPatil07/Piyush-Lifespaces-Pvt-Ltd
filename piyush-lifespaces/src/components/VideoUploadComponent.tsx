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
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    await uploadVideo(file);
  };

  const uploadVideo = async (file: File) => {
    try {
      setUploading(true);

      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/videos/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setUploadedVideo(result.videoId);
        onVideoUploaded(result.videoId);
      } else {
        const error = await response.json();
        alert(`Upload failed: ${error.error}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');
    } finally {
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
      {!uploadedVideo && (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {uploading ? (
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="text-gray-600">Uploading video...</p>
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
          )}
        </div>
      )}

      {uploadedVideo && (
        <div className="space-y-4">
          <div className="bg-gray-100 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded">
                  <Play className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Video uploaded</p>
                  <p className="text-sm text-gray-500">Video ID: {uploadedVideo}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={removeVideo}
                className="p-2 text-red-600 hover:bg-red-50 rounded"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
            
            {/* Video preview */}
            <div className="mt-4">
              <video
                src={`/api/videos/${uploadedVideo}`}
                controls
                className="w-full max-w-md rounded-lg"
                style={{ maxHeight: '200px' }}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
