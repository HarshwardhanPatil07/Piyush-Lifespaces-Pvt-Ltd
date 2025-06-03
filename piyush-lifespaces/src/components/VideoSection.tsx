'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';

interface VideoContent {
  _id: string;
  title: string;
  description: string;
  videoId?: string;
  videoUrl?: string; // For backward compatibility
  thumbnailImageId?: string;
  thumbnailUrl?: string; // For backward compatibility
  isActive: boolean;
}

export default function VideoSection() {
  const [videoContent, setVideoContent] = useState<VideoContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);

  useEffect(() => {
    const fetchVideoContent = async () => {
      try {
        const response = await fetch('/api/home/video');
        const data = await response.json();
        
        if (data.success && data.data) {
          setVideoContent(data.data);
        }
      } catch (error) {
        console.error('Error fetching video content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoContent();
  }, []);  const handlePlayPause = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      // Wait for any pending play promise to resolve
      if (playPromiseRef.current) {
        await playPromiseRef.current;
      }

      if (isPlaying) {
        video.pause();
        setIsPlaying(false);
      } else {
        // Store the play promise to handle interruptions
        playPromiseRef.current = video.play();
        await playPromiseRef.current;
        playPromiseRef.current = null;
        setIsPlaying(true);
      }
    } catch (error) {
      // Handle the interrupted play error gracefully
      console.log('Video play/pause interrupted:', error);
      playPromiseRef.current = null;
      // Update state based on actual video state
      setIsPlaying(!video.paused);
    }
  };

  const handleMuteToggle = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    const video = videoRef.current;
    if (video && video.requestFullscreen) {
      video.requestFullscreen();
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading video content...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!videoContent) {
    // No video content to display
    return null;
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {videoContent.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {videoContent.description}
            </p>
          </motion.div>
        </div>

        {/* Video Player */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl group">            <video
              ref={videoRef}
              className="w-full h-auto"
              poster={videoContent.thumbnailUrl}
              muted={isMuted}
              controls={false}
              preload="metadata"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
              onError={(e) => {
                console.log('Video error:', e);
                setIsPlaying(false);
                playPromiseRef.current = null;
              }}
              onLoadedData={() => {
                const video = videoRef.current;
                if (video) {
                  video.muted = isMuted;
                  // Sync initial state
                  setIsPlaying(!video.paused);
                }              }}            >
              <source src={videoContent.videoId ? `/api/videos/${videoContent.videoId}` : videoContent.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Video Controls Overlay */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="flex items-center space-x-4">
                {/* Play/Pause Button */}
                <button
                  onClick={handlePlayPause}
                  className="bg-white/20 backdrop-blur-sm text-white p-4 rounded-full hover:bg-white/30 transition-all duration-300 transform hover:scale-110"
                >
                  {isPlaying ? <Pause size={32} /> : <Play size={32} />}
                </button>

                {/* Mute/Unmute Button */}
                <button
                  onClick={handleMuteToggle}
                  className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300"
                >
                  {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                </button>

                {/* Fullscreen Button */}
                <button
                  onClick={handleFullscreen}
                  className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300"
                >
                  <Maximize size={24} />
                </button>
              </div>
            </div>

            {/* Play Button Overlay (when paused) */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={handlePlayPause}
                  className="bg-blue-600/80 backdrop-blur-sm text-white p-6 rounded-full hover:bg-blue-600 transition-all duration-300 transform hover:scale-110 shadow-2xl"
                >
                  <Play size={48} className="ml-1" />
                </button>
              </div>
            )}
          </div>

          {/* Video Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Experience Excellence
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Discover the craftsmanship, attention to detail, and innovative design 
                that makes Piyush Lifespaces properties truly exceptional. From conception 
                to completion, we ensure every aspect meets the highest standards of quality.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.location.href = '/projects'}
              className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors duration-300"
            >
              Explore Projects
            </button>
            <button 
              onClick={() => window.location.href = '/contact'}
              className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full font-medium hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              Schedule a Visit
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
