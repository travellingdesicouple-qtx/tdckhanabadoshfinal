import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Play, Eye, Heart, Share2, X, Facebook, Twitter, Linkedin, Link2, MapPin, Calendar, Clock } from 'lucide-react';
import { reelsData, blogCategories } from '../data/sampleData';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

export function ReelsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedReel, setSelectedReel] = useState<string | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareReelId, setShareReelId] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  const filteredReels = selectedCategory === 'all'
    ? reelsData
    : reelsData.filter(reel => reel.category.toLowerCase() === selectedCategory);

  const handleShare = (reelId: string) => {
    setShareReelId(reelId);
    setShowShareModal(true);
    setCopySuccess(false);
  };

  const handleCopyLink = () => {
    const reel = reelsData.find(r => r.id === shareReelId);
    if (reel) {
      const url = `${window.location.origin}/#reel-${reel.id}`;
      navigator.clipboard.writeText(url);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handleSocialShare = (platform: string) => {
    const reel = reelsData.find(r => r.id === shareReelId);
    if (!reel) return;

    const url = `${window.location.origin}/#reel-${reel.id}`;
    const text = `Check out this travel reel: ${reel.title}`;

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    };

    if (platform in shareUrls) {
      window.open(shareUrls[platform as keyof typeof shareUrls], '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-pink-600 to-purple-800 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="mb-4 font-['Inter'] text-5xl font-bold text-white md:text-6xl">
              Travel Reels & Shorts
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-pink-100 md:text-xl">
              Quick glimpses of our adventures around the world. Bite-sized travel moments.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Categories Filter */}
      <div className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
            {blogCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.slug ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.slug)}
                className={`whitespace-nowrap ${
                  selectedCategory === category.slug
                    ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white'
                    : ''
                }`}
              >
                {category.icon && <span className="mr-1">{category.icon}</span>}
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Reels Grid */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filteredReels.map((reel, index) => (
            <motion.div
              key={reel.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group relative overflow-hidden rounded-xl bg-gray-900 transition-transform hover:scale-105">
                {/* Thumbnail */}
                <div className="relative aspect-[9/16]">
                  <img
                    src={reel.thumbnail}
                    alt={reel.title}
                    className="h-full w-full object-cover"
                  />
                  
                  {/* Duration Badge */}
                  <div className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-xs text-white">
                    {reel.duration}
                  </div>

                  {/* Play Overlay */}
                  <div 
                    className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100"
                    onClick={() => setSelectedReel(reel.id)}
                  >
                    <div className="rounded-full bg-white/90 p-4">
                      <Play className="h-8 w-8 text-gray-900" fill="currentColor" />
                    </div>
                  </div>
                </div>

                {/* Info Section */}
                <div className="p-3">
                  <h3 className="mb-1 line-clamp-2 text-sm font-semibold text-white">
                    {reel.title}
                  </h3>
                  <div className="mb-2 flex items-center gap-1 text-xs text-gray-400">
                    <MapPin className="h-3 w-3" />
                    <span className="line-clamp-1">{reel.location}</span>
                  </div>
                  
                  {/* Stats */}
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {reel.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        {reel.likes}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShare(reel.id);
                      }}
                      className="rounded-full p-1 hover:bg-white/10"
                    >
                      <Share2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredReels.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              No reels found in this category.
            </p>
          </div>
        )}
      </div>

      {/* Video Modal */}
      {selectedReel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <div className="relative w-full max-w-lg">
            <button
              onClick={() => setSelectedReel(null)}
              className="absolute -right-4 -top-4 rounded-full bg-white p-2 text-gray-900 hover:bg-gray-100"
            >
              <X className="h-6 w-6" />
            </button>
            
            {(() => {
              const reel = reelsData.find(r => r.id === selectedReel);
              if (!reel) return null;
              
              return (
                <div className="overflow-hidden rounded-2xl bg-gray-900">
                  <div className="aspect-[9/16]">
                    <iframe
                      src={reel.videoUrl}
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-4 text-white">
                    <h3 className="mb-2 text-xl font-semibold">{reel.title}</h3>
                    <p className="mb-3 text-sm text-gray-300">{reel.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {reel.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          {reel.likes}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleShare(reel.id)}
                        className="border-gray-700 bg-gray-800 hover:bg-gray-700"
                      >
                        <Share2 className="mr-1 h-4 w-4" />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md rounded-2xl bg-white p-6 dark:bg-gray-900"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Share Reel
              </h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {(() => {
              const reel = reelsData.find(r => r.id === shareReelId);
              if (!reel) return null;

              return (
                <>
                  <div className="mb-6">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {reel.title}
                    </p>
                  </div>

                  {/* Social Share Buttons */}
                  <div className="mb-6 space-y-2">
                    <button
                      onClick={() => handleSocialShare('facebook')}
                      className="flex w-full items-center gap-3 rounded-lg border border-gray-200 p-3 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                    >
                      <Facebook className="h-5 w-5 text-blue-600" />
                      <span className="text-gray-900 dark:text-white">Share on Facebook</span>
                    </button>
                    
                    <button
                      onClick={() => handleSocialShare('twitter')}
                      className="flex w-full items-center gap-3 rounded-lg border border-gray-200 p-3 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                    >
                      <Twitter className="h-5 w-5 text-blue-400" />
                      <span className="text-gray-900 dark:text-white">Share on Twitter</span>
                    </button>
                    
                    <button
                      onClick={() => handleSocialShare('linkedin')}
                      className="flex w-full items-center gap-3 rounded-lg border border-gray-200 p-3 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                    >
                      <Linkedin className="h-5 w-5 text-blue-700" />
                      <span className="text-gray-900 dark:text-white">Share on LinkedIn</span>
                    </button>
                  </div>

                  {/* Copy Link */}
                  <div className="rounded-lg border border-gray-200 p-3 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 overflow-hidden">
                        <p className="text-xs text-gray-500">Link</p>
                        <p className="truncate text-sm text-gray-900 dark:text-white">
                          {window.location.origin}/#reel-{reel.id}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        onClick={handleCopyLink}
                        className="ml-2"
                      >
                        <Link2 className="mr-1 h-4 w-4" />
                        {copySuccess ? 'Copied!' : 'Copy'}
                      </Button>
                    </div>
                  </div>
                </>
              );
            })()}
          </motion.div>
        </div>
      )}
    </div>
  );
}
