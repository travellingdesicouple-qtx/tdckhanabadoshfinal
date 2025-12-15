import React from 'react';
import { motion } from 'motion/react';
import { Camera, ArrowRight } from 'lucide-react';
import { galleryImages } from '../data/galleryData';

export function GalleryPreview() {
  const featuredImages = galleryImages.filter(img => img.featured).slice(0, 6);

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-20 dark:from-gray-950 dark:to-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 dark:bg-emerald-900/30">
            <Camera className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <span className="font-['Inter'] font-semibold text-emerald-600 dark:text-emerald-400">
              Photo Gallery
            </span>
          </div>
          <h2 className="mb-4 font-['Inter'] text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            License My Photography
          </h2>
          <p className="font-['Merriweather'] text-xl text-gray-600 dark:text-gray-300">
            High-quality travel photos available for personal and commercial use
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-6">
          {featuredImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl"
            >
              <div className="aspect-square overflow-hidden bg-gray-200 dark:bg-gray-800">
                <img
                  src={image.image}
                  alt={image.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="mb-1 font-['Inter'] text-lg font-bold text-white">
                    {image.title}
                  </h3>
                  <p className="mb-2 font-['Merriweather'] text-sm text-white/80">
                    {image.location}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-['Inter'] text-sm font-semibold text-emerald-400">
                      From ${image.license.personal}
                    </span>
                    <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                      {image.category}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <a
            href="#gallery"
            className="inline-flex items-center gap-2 rounded-full border-2 border-emerald-600 bg-transparent px-8 py-4 font-['Inter'] font-semibold text-emerald-600 transition-all duration-300 hover:scale-105 hover:bg-emerald-600 hover:text-white dark:border-emerald-400 dark:text-emerald-400 dark:hover:bg-emerald-400 dark:hover:text-gray-900"
          >
            Browse Full Gallery
            <ArrowRight className="h-5 w-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
