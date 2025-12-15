import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, Search, MapPin, BookOpen, Loader } from 'lucide-react';
import { blogCategories } from '../data/sampleData';
import { Badge } from '../components/ui/badge';
import { adventuresApi } from '../../lib/api';

export function AdventuresPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Check for category parameter in URL
  useEffect(() => {
    const hash = window.location.hash;
    const urlParams = new URLSearchParams(hash.split('?')[1]);
    const categoryParam = urlParams.get('category');

    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, []);

  useEffect(() => {
    loadAdventures();
  }, []);

  const loadAdventures = async () => {
    try {
      setIsLoading(true);
      const data = await adventuresApi.getAll();

      const formattedPosts = data.map(post => ({
        ...post,
        coverImage: post.cover_image,
        date: post.created_at,
        visitedLocation: post.location,
        excerpt: post.description,
        readTime: post.duration || 'Video',
        isFeatured: true, // Adventures are usually featured
      }));

      setPosts(formattedPosts);
    } catch (error) {
      console.error('Failed to load adventures:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (post.visitedLocation && post.visitedLocation.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || post.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Magazine layout - first post as hero, then grid
  const [heroPost, ...restPosts] = filteredPosts;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-950">
        <Loader className="h-12 w-12 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Magazine Masthead */}
      <div className="border-b-4 border-emerald-600 bg-gray-50 pt-20 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="mb-2 text-xs font-bold uppercase tracking-widest text-emerald-600">
              Travel Chronicles
            </div>
            <h1 className="font-['Merriweather'] text-5xl font-black italic text-gray-900 dark:text-white md:text-6xl">
              Adventures
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Stories from the Road • {posts.length} Destinations
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="relative mx-auto max-w-2xl">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by destination, story, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border-2 border-gray-200 bg-white py-3 pl-12 pr-4 font-['Inter'] text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="sticky top-20 z-40 border-b border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-3">
            {blogCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.slug)}
                className={`whitespace-nowrap border-b-2 px-4 py-2 font-['Inter'] text-xs font-bold uppercase tracking-wider transition-all ${selectedCategory === category.slug
                    ? 'border-emerald-600 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-900 dark:text-gray-400'
                  }`}
              >
                {category.icon && <span className="mr-1">{category.icon}</span>}
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Results Count */}
        <div className="mb-6 font-['Inter'] text-sm uppercase tracking-wide text-gray-500">
          {filteredPosts.length} {filteredPosts.length === 1 ? 'Story' : 'Stories'} Found
        </div>

        {filteredPosts.length > 0 ? (
          <>
            {/* Hero Story - Magazine Style */}
            {heroPost && (
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 cursor-pointer border-b-2 border-gray-900 pb-8 dark:border-white"
                onClick={() => window.location.hash = heroPost.slug}
              >
                <div className="grid gap-8 lg:grid-cols-2">
                  {/* Hero Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={heroPost.coverImage}
                      alt={heroPost.title}
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    {heroPost.isFeatured && (
                      <Badge className="absolute left-4 top-4 bg-emerald-600 text-white">
                        Featured
                      </Badge>
                    )}
                  </div>

                  {/* Hero Content */}
                  <div className="flex flex-col justify-center">
                    <Badge variant="outline" className="mb-4 w-fit border-emerald-600 text-emerald-600">
                      {heroPost.category}
                    </Badge>
                    <h2 className="mb-4 font-['Merriweather'] text-4xl font-bold leading-tight text-gray-900 transition-colors hover:text-emerald-600 dark:text-white dark:hover:text-emerald-400 md:text-5xl">
                      {heroPost.title}
                    </h2>
                    <p className="mb-6 text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                      {heroPost.excerpt}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 border-t border-gray-200 pt-4 text-sm text-gray-500 dark:border-gray-700">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {heroPost.visitedLocation}
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(heroPost.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {heroPost.readTime}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            )}

            {/* Grid of Stories */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {restPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group cursor-pointer border-b border-gray-200 pb-6 transition-all hover:border-emerald-600 dark:border-gray-800"
                  onClick={() => window.location.hash = post.slug}
                >
                  {/* Image */}
                  <div className="relative mb-4 overflow-hidden">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {post.isFeatured && (
                      <Badge className="absolute left-3 top-3 bg-emerald-600 text-white">
                        Featured
                      </Badge>
                    )}
                  </div>

                  {/* Content */}
                  <Badge variant="outline" className="mb-3 border-emerald-600 text-emerald-600">
                    {post.category}
                  </Badge>

                  <h3 className="mb-3 font-['Merriweather'] text-2xl font-bold text-gray-900 transition-colors group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400">
                    {post.title}
                  </h3>

                  <p className="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {post.visitedLocation}
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </>
        ) : (
          /* No Results */
          <div className="py-20 text-center">
            <BookOpen className="mx-auto mb-4 h-12 w-12 text-gray-300" />
            <p className="font-['Inter'] text-gray-500 dark:text-gray-400">
              No adventures found. Try adjusting your search or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
