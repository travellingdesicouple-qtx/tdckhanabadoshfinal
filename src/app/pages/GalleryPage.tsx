import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingCart, Check } from 'lucide-react';
import { galleryImages, licenseTypes, GalleryImage } from '../data/galleryData';

export function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedLicense, setSelectedLicense] = useState<'personal' | 'commercial' | 'exclusive'>('personal');

  const categories = ['All', ...new Set(galleryImages.map(img => img.category))];

  const filteredImages = selectedCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-emerald-600 to-emerald-800 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="mb-4 font-['Inter'] text-5xl font-bold text-white md:text-6xl">
              Photo Gallery
            </h1>
            <p className="font-['Merriweather'] text-xl text-emerald-100">
              License high-quality travel photography for your projects
            </p>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12 flex flex-wrap justify-center gap-3"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-6 py-3 font-['Inter'] font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              onClick={() => setSelectedImage(image)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-900"
            >
              <div className="aspect-square">
                <img
                  src={image.image}
                  alt={image.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="mb-1 font-['Inter'] font-bold text-white">
                    {image.title}
                  </h3>
                  <p className="mb-2 font-['Merriweather'] text-sm text-white/80">
                    {image.location}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-['Inter'] text-sm font-semibold text-emerald-400">
                      From ${image.license.personal}
                    </span>
                    <span className="rounded-full bg-white/20 px-3 py-1 text-xs text-white backdrop-blur-sm">
                      {image.category}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* License Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-6xl overflow-auto rounded-3xl bg-white dark:bg-gray-900"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 text-gray-900 transition-colors hover:bg-white dark:bg-gray-800/90 dark:text-white dark:hover:bg-gray-800"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="grid lg:grid-cols-2">
                {/* Image */}
                <div className="relative h-96 lg:h-auto">
                  <img
                    src={selectedImage.image}
                    alt={selectedImage.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Licensing Options */}
                <div className="p-8">
                  <h2 className="mb-2 font-['Inter'] text-3xl font-bold text-gray-900 dark:text-white">
                    {selectedImage.title}
                  </h2>
                  <p className="mb-6 font-['Merriweather'] text-gray-600 dark:text-gray-400">
                    {selectedImage.location} • {selectedImage.category}
                  </p>

                  <p className="mb-8 font-['Merriweather'] text-gray-700 dark:text-gray-300">
                    {selectedImage.description}
                  </p>

                  {/* License Types */}
                  <div className="mb-8 space-y-4">
                    <h3 className="font-['Inter'] text-lg font-bold text-gray-900 dark:text-white">
                      Choose License Type
                    </h3>

                    {licenseTypes.map((license) => (
                      <div
                        key={license.id}
                        onClick={() => setSelectedLicense(license.id as any)}
                        className={`cursor-pointer rounded-2xl border-2 p-6 transition-all ${
                          selectedLicense === license.id
                            ? 'border-emerald-600 bg-emerald-50 dark:border-emerald-400 dark:bg-emerald-900/20'
                            : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
                        }`}
                      >
                        <div className="mb-3 flex items-center justify-between">
                          <h4 className="font-['Inter'] text-lg font-bold text-gray-900 dark:text-white">
                            {license.name}
                          </h4>
                          <span className="font-['Inter'] text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                            ${selectedImage.license[license.id as keyof typeof selectedImage.license]}
                          </span>
                        </div>

                        <p className="mb-4 font-['Merriweather'] text-sm text-gray-600 dark:text-gray-400">
                          {license.description}
                        </p>

                        <ul className="space-y-2">
                          {license.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                              <Check className="h-4 w-4 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Purchase Button */}
                  <button className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 py-4 font-['Inter'] text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-emerald-700 hover:shadow-xl">
                    <ShoppingCart className="h-5 w-5" />
                    Purchase License - ${selectedImage.license[selectedLicense]}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
