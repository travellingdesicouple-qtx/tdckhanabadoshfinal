import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { blogCategories } from '../data/sampleData'; // Keep categories static for now or fetch if needed
import { Calendar, Clock, ArrowRight, TrendingUp, Loader } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { blogsApi, Blog } from '../../lib/api';

export function BlogsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      setIsLoading(true);
      const data = await blogsApi.getAll();

      // Map API data to UI format
      const formattedPosts = data.map(post => ({
        ...post,
        coverImage: post.cover_image,
        date: post.created_at,
        readTime: post.read_time || '5 min read',
        isFeatured: post.featured,
        // visitedLocation property is missing in DB schema currently
        visitedLocation: 'World',
      }));

      setPosts(formattedPosts);
    } catch (error) {
      console.error('Failed to load blogs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPosts = selectedCategory === 'all'
    ? posts
    : posts.filter(post => post.category.toLowerCase() === selectedCategory);

  // Separate posts for layout
  const featuredPost = posts.find(post => post.isFeatured) || posts[0];
  // Sort by date for proper ordering
  const sortedPosts = [...posts].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const trendingPosts = sortedPosts.slice(0, 3);
  const latestPosts = sortedPosts.slice(0, 4);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-950">
        <Loader className="h-12 w-12 animate-spin text-emerald-600" />
      </div>
    );
  }

  // If no posts in DB yet
  if (posts.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-gray-950 pt-20">
        <h2 className="font-['Merriweather'] text-2xl font-bold text-gray-900 dark:text-white">
          No stories published yet.
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Check back later or add content via Admin Panel.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Magazine Header */}
      <div className="border-b-4 border-emerald-600 bg-gray-50 pt-20 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="mb-2 text-sm font-bold uppercase tracking-widest text-emerald-600">
              Travel Magazine
            </div>
            <h1 className="font-['Merriweather'] text-6xl font-black italic text-gray-900 dark:text-white md:text-7xl">
              The Khanabadosh
            </h1>
            <div className="mt-3 flex items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span>Issue #{new Date().getMonth() + 1}</span>
              <span>•</span>
              <span>{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
              <span>•</span>
              <span>{posts.length} Stories</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Category Tabs - Magazine Style */}
      <div className="sticky top-20 z-40 border-b border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-4">
            {blogCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.slug)}
                className={`whitespace-nowrap border-b-2 px-4 py-2 font-['Inter'] text-sm font-semibold uppercase tracking-wide transition-all ${selectedCategory === category.slug
                    ? 'border-emerald-600 text-emerald-600'
                    : 'border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                  }`}
              >
                {category.icon && <span className="mr-1">{category.icon}</span>}
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Featured Story - Full Width Hero */}
        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <div className="relative h-[70vh] min-h-[500px] overflow-hidden rounded-none bg-gray-900">
              <img
                src={featuredPost.coverImage}
                alt={featuredPost.title}
                className="h-full w-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-8 text-white md:p-12">
                <Badge className="mb-4 bg-emerald-600 text-white">Featured Story</Badge>
                <h2
                  className="mb-4 font-['Merriweather'] text-4xl font-bold leading-tight md:text-6xl lg:max-w-4xl cursor-pointer hover:text-emerald-400 transition-colors"
                  onClick={() => window.location.hash = featuredPost.slug}
                >
                  {featuredPost.title}
                </h2>
                <p className="mb-6 text-lg text-gray-200 md:text-xl lg:max-w-3xl">
                  {featuredPost.excerpt}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(featuredPost.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {featuredPost.readTime}
                  </div>
                  <button
                    onClick={() => window.location.hash = featuredPost.slug}
                    className="ml-auto flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 font-semibold transition-all hover:bg-emerald-700"
                  >
                    Read Story
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Trending Section */}
        <div className="mb-16 border-t-2 border-gray-900 pt-8 dark:border-white">
          <div className="mb-6 flex items-center gap-3">
            <TrendingUp className="h-6 w-6 text-emerald-600" />
            <h3 className="font-['Merriweather'] text-3xl font-bold text-gray-900 dark:text-white">
              Trending Now
            </h3>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {trendingPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className="group cursor-pointer overflow-hidden border-2 border-gray-200 transition-all hover:border-emerald-600 dark:border-gray-800"
                  onClick={() => window.location.hash = post.slug}
                >
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute left-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 font-bold text-white">
                      {index + 1}
                    </div>
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-5">
                    <Badge variant="outline" className="mb-2 border-emerald-600 text-emerald-600">
                      {post.category}
                    </Badge>
                    <h4 className="mb-2 line-clamp-2 font-['Merriweather'] text-xl font-bold text-gray-900 dark:text-white">
                      {post.title}
                    </h4>
                    <p className="mb-3 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Latest Stories - Magazine Grid */}
        <div className="mb-16">
          <h3 className="mb-8 border-b-2 border-gray-900 pb-3 font-['Merriweather'] text-3xl font-bold text-gray-900 dark:border-white dark:text-white">
            Latest Stories
          </h3>

          <div className="grid gap-8 lg:grid-cols-2">
            {latestPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer border-b border-gray-200 pb-8 dark:border-gray-800"
                onClick={() => window.location.hash = post.slug}
              >
                <div className="grid gap-6 md:grid-cols-5">
                  <div className="relative overflow-hidden md:col-span-2">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="md:col-span-3">
                    <Badge variant="outline" className="mb-3 border-emerald-600 text-emerald-600">
                      {post.category}
                    </Badge>
                    <h4 className="mb-3 font-['Merriweather'] text-2xl font-bold text-gray-900 transition-colors group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400">
                      {post.title}
                    </h4>
                    <p className="mb-4 text-gray-600 dark:text-gray-400">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* All Posts - Filtered by Category */}
        {selectedCategory !== 'all' && (
          <div>
            <h3 className="mb-8 border-b-2 border-gray-900 pb-3 font-['Merriweather'] text-3xl font-bold text-gray-900 dark:border-white dark:text-white">
              {blogCategories.find(c => c.slug === selectedCategory)?.name} Stories
            </h3>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className="group cursor-pointer overflow-hidden border border-gray-200 transition-all hover:shadow-xl dark:border-gray-800"
                    onClick={() => window.location.hash = post.slug}
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      <Badge variant="outline" className="mb-3 border-emerald-600 text-emerald-600">
                        {post.category}
                      </Badge>
                      <h4 className="mb-2 line-clamp-2 font-['Merriweather'] text-xl font-bold text-gray-900 dark:text-white">
                        {post.title}
                      </h4>
                      <p className="mb-4 line-clamp-3 text-sm text-gray-600 dark:text-gray-400">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {filteredPosts.length === 0 && selectedCategory !== 'all' && (
          <div className="py-12 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              No posts found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
