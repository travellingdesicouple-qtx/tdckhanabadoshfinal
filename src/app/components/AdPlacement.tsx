import React, { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { adsApi, Advertisement } from '../../lib/api';

interface AdPlacementProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  link?: string;
  size?: 'banner' | 'square' | 'sidebar';
  placement?: 'blogs' | 'adventures' | 'shop' | 'homepage';
}

export function AdPlacement({ 
  title = "Advertisement", 
  description = "Your Ad Here",
  imageUrl,
  link,
  size = 'banner',
  placement = 'blogs'
}: AdPlacementProps) {
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAds();
  }, [size, placement]);

  const loadAds = async () => {
    try {
      const data = await adsApi.getActive(placement, size);
      setAds(data);
    } catch (error) {
      console.error('Failed to load ads:', error);
    } finally {
      setLoading(false);
    }
  };

  // Pick a random ad from matching ads
  const randomAd = ads.length > 0 
    ? ads[Math.floor(Math.random() * ads.length)]
    : null;
  
  // Use provided props or fallback to data from ads
  const finalImageUrl = imageUrl || randomAd?.image_url;
  const finalLink = link || randomAd?.link_url;
  const finalTitle = title || randomAd?.title || "Advertisement";
  const sizeClasses = {
    banner: 'aspect-[728/90] md:aspect-[970/90]',
    square: 'aspect-square',
    sidebar: 'aspect-[300/600]',
  };

  const content = (
    <div className={`group relative overflow-hidden rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition-all hover:border-emerald-500 dark:border-gray-700 dark:bg-gray-800 ${sizeClasses[size]}`}>
      {finalImageUrl ? (
        <>
          <img 
            src={finalImageUrl} 
            alt={finalTitle}
            className="h-full w-full object-cover"
          />
          <div className="absolute left-2 top-2 rounded bg-black/60 px-2 py-1 text-xs text-white">
            Sponsored
          </div>
        </>
      ) : (
        <div className="flex h-full flex-col items-center justify-center p-4 text-center">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Sponsored Content
          </div>
          <div className="mb-1 font-semibold text-gray-600 dark:text-gray-400">
            {finalTitle}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-500">
            {description}
          </div>
          {finalLink && (
            <ExternalLink className="mt-2 h-5 w-5 text-gray-400" />
          )}
        </div>
      )}
    </div>
  );

  if (finalLink) {
    return (
      <a 
        href={finalLink} 
        target="_blank" 
        rel="noopener noreferrer sponsored"
        className="block"
      >
        {content}
      </a>
    );
  }

  return content;
}
