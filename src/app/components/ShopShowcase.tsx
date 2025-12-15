import React from 'react';
import { motion } from 'motion/react';
import { Download, ArrowRight, Star } from 'lucide-react';
import { shopItems } from '../data/shopData';

export function ShopShowcase() {
  // Show only digital products for simplicity (limit to 3)
  const digitalProducts = shopItems.filter(item => item.type === 'Digital Product').slice(0, 3);

  return (
    <section id="shop" className="bg-gradient-to-b from-gray-50 to-white py-20 dark:from-gray-900 dark:to-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 font-['Inter'] text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            Digital Downloads
          </h2>
          <p className="font-['Merriweather'] text-xl text-gray-600 dark:text-gray-300">
            Instant access to travel guides, presets, and resources
          </p>
        </motion.div>

        {/* Simplified Digital Product Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {digitalProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl dark:bg-gray-900"
            >
              {/* Simplified Image with Download Icon */}
              <div className="relative h-56 overflow-hidden bg-gradient-to-br from-emerald-500 to-emerald-600">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-cover opacity-20 transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full bg-white/20 p-6 backdrop-blur-sm">
                    <Download className="h-12 w-12 text-white" />
                  </div>
                </div>
                <div className="absolute right-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-600">
                  Digital Download
                </div>
              </div>

              {/* Simplified Product Info */}
              <div className="p-6">
                <h3 className="mb-2 font-['Inter'] text-xl font-bold text-gray-900 dark:text-white">
                  {product.title}
                </h3>
                <p className="mb-4 font-['Merriweather'] text-sm text-gray-600 dark:text-gray-300">
                  {product.description}
                </p>

                {/* Simple Rating Display */}
                <div className="mb-4 flex items-center gap-2">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {product.rating}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    ({product.reviews} reviews)
                  </span>
                </div>

                {/* Simple Price and CTA */}
                <div className="flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
                  <div className="font-['Inter'] text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                    ${product.price}
                  </div>
                  <a
                    href="#shop-page"
                    className="flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 font-['Inter'] text-sm font-semibold text-white transition-all hover:bg-emerald-700"
                  >
                    Get Now
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>

                {/* Instant Download Notice */}
                <p className="mt-3 text-xs text-center text-gray-500 dark:text-gray-400">
                  ⚡ Instant download after purchase
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Shop CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <a
            href="#shop-page"
            className="inline-flex items-center gap-2 rounded-full border-2 border-emerald-600 bg-transparent px-8 py-4 font-['Inter'] font-semibold text-emerald-600 transition-all duration-300 hover:scale-105 hover:bg-emerald-600 hover:text-white dark:border-emerald-400 dark:text-emerald-400 dark:hover:bg-emerald-400 dark:hover:text-gray-900"
          >
            Browse All Products
            <ArrowRight className="h-5 w-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
