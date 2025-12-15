import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Star, Clock, CheckCircle, TrendingUp, Loader } from 'lucide-react';
import { categories } from '../data/shopData';
import { useCart } from '../context/CartContext';
import { productsApi } from '../../lib/api';

export function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { addToCart } = useCart();
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const data = await productsApi.getAll();

      const formattedItems = data.map(product => ({
        ...product,
        image: product.cover_image,
        type: product.product_type, // "Preset" | "Course" | "Book"
        includes: product.features || [],
        rating: 5.0, // Mock rating as DB doesn't have it yet
        reviews: 0,
        bestseller: false,
        duration: product.product_type === 'Course' ? '2h 30m' : undefined,
      }));

      setItems(formattedItems);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredItems = selectedCategory === 'all'
    ? items
    : items.filter(item => item.type.toLowerCase() === selectedCategory);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-950">
        <Loader className="h-12 w-12 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
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
              Digital Shop
            </h1>
            <p className="font-['Merriweather'] text-xl text-emerald-100">
              Courses, books, itineraries, and presets to enhance your travel journey
            </p>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12 flex flex-wrap justify-center gap-3"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`group flex items-center gap-2 rounded-full px-6 py-3 font-['Inter'] font-medium transition-all ${selectedCategory === category.id
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800'
                }`}
            >
              <span>{category.name}</span>
              <span className={`rounded-full px-2 py-0.5 text-xs ${selectedCategory === category.id
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                }`}>
                {category.id === 'all' ? items.length : items.filter(i => i.type.toLowerCase() === category.id).length}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl dark:bg-gray-900"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Badges */}
                <div className="absolute left-4 top-4 flex flex-col gap-2">
                  {item.featured && (
                    <div className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white">
                      Featured
                    </div>
                  )}
                  {item.bestseller && (
                    <div className="flex items-center gap-1 rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-white">
                      <TrendingUp className="h-3 w-3" />
                      Bestseller
                    </div>
                  )}
                </div>

                <div className="absolute bottom-4 right-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-900 backdrop-blur-sm dark:bg-gray-900/90 dark:text-white">
                  {item.type}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="mb-2 font-['Inter'] text-xl font-bold text-gray-900 dark:text-white">
                  {item.title}
                </h3>

                <p className="mb-4 font-['Merriweather'] text-sm text-gray-600 dark:text-gray-300">
                  {item.description}
                </p>

                {/* Rating & Duration */}
                <div className="mb-4 flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="font-semibold text-gray-900 dark:text-white">{item.rating}</span>
                    <span className="text-gray-500 dark:text-gray-400">({item.reviews})</span>
                  </div>
                  {item.duration && (
                    <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                      <Clock className="h-4 w-4" />
                      <span>{item.duration}</span>
                    </div>
                  )}
                </div>

                {/* Includes */}
                <div className="mb-4 space-y-2">
                  {item.includes.slice(0, 3).map((feature: any, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle className="h-4 w-4 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
                      <span>{feature}</span>
                    </div>
                  ))}
                  {item.includes.length > 3 && (
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      +{item.includes.length - 3} more
                    </div>
                  )}
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-700">
                  <div>
                    <div className="font-['Inter'] text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                      ${item.price}
                    </div>
                    {item.originalPrice && (
                      <div className="text-sm text-gray-500 line-through dark:text-gray-400">
                        ${item.originalPrice}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      addToCart({
                        id: item.id,
                        title: item.title,
                        price: item.price,
                        image: item.image,
                        type: item.type,
                      });
                    }}
                    className="flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 font-['Inter'] font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-emerald-700 hover:shadow-lg"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="py-20 text-center">
            <p className="font-['Merriweather'] text-xl text-gray-500 dark:text-gray-400">
              No products found in this category.
            </p>
          </div>
        )}
      </div>

      {/* Trust Section */}
      <div className="border-t border-gray-200 bg-white py-12 dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-3 text-4xl">🎓</div>
              <h3 className="mb-2 font-['Inter'] font-bold text-gray-900 dark:text-white">
                Expert-Led Content
              </h3>
              <p className="font-['Merriweather'] text-sm text-gray-600 dark:text-gray-400">
                Created from years of travel experience
              </p>
            </div>
            <div className="text-center">
              <div className="mb-3 text-4xl">💯</div>
              <h3 className="mb-2 font-['Inter'] font-bold text-gray-900 dark:text-white">
                Money-Back Guarantee
              </h3>
              <p className="font-['Merriweather'] text-sm text-gray-600 dark:text-gray-400">
                30-day refund policy, no questions asked
              </p>
            </div>
            <div className="text-center">
              <div className="mb-3 text-4xl">♾️</div>
              <h3 className="mb-2 font-['Inter'] font-bold text-gray-900 dark:text-white">
                Lifetime Access
              </h3>
              <p className="font-['Merriweather'] text-sm text-gray-600 dark:text-gray-400">
                Access your purchases forever, including updates
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
