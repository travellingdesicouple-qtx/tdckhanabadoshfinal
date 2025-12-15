import React from 'react';
import { motion } from 'motion/react';
import { blogCategories, blogPosts } from '../data/sampleData';
import { Card } from '../components/ui/card';
import { ArrowRight } from 'lucide-react';

export function BlogCategoriesPage() {
  const getCategoryPostCount = (categorySlug: string) => {
    if (categorySlug === 'all') return blogPosts.length;
    return blogPosts.filter(post => 
      post.category.toLowerCase() === categorySlug
    ).length;
  };

  const handleCategoryClick = (categorySlug: string) => {
    window.location.hash = `all-adventures?category=${categorySlug}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-indigo-600 to-purple-800 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="mb-4 font-['Inter'] text-5xl font-bold text-white md:text-6xl">
              Blog Categories
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-indigo-100 md:text-xl">
              Explore our travel stories by category. Find exactly what you're looking for.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogCategories
            .filter(cat => cat.id !== 'all')
            .map((category, index) => {
              const postCount = getCategoryPostCount(category.slug);
              
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card
                    className="group cursor-pointer overflow-hidden transition-all hover:shadow-xl"
                    onClick={() => handleCategoryClick(category.slug)}
                  >
                    <div className={`bg-gradient-to-br from-${category.color}-500 to-${category.color}-700 p-8`}>
                      <div className="mb-4 text-5xl">{category.icon}</div>
                      <h2 className="mb-2 text-2xl font-bold text-white">
                        {category.name}
                      </h2>
                      <p className="text-sm text-white/80">
                        {postCount} {postCount === 1 ? 'post' : 'posts'}
                      </p>
                    </div>
                    
                    <div className="p-6">
                      <p className="mb-4 text-gray-600 dark:text-gray-400">
                        {category.description}
                      </p>
                      
                      <div className="flex items-center text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                        <span>Explore {category.name.toLowerCase()}</span>
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
        </div>

        {/* Category Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-900"
        >
          <h3 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
            Category Overview
          </h3>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {blogCategories
              .filter(cat => cat.id !== 'all')
              .map(category => {
                const postCount = getCategoryPostCount(category.slug);
                const percentage = ((postCount / blogPosts.length) * 100).toFixed(1);
                
                return (
                  <div
                    key={category.id}
                    className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{category.icon}</span>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {category.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {postCount} posts ({percentage}%)
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </motion.div>

        {/* Recent Posts by Category */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-12"
        >
          <h3 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
            Latest Posts by Category
          </h3>
          
          {blogCategories
            .filter(cat => cat.id !== 'all')
            .map(category => {
              const categoryPosts = blogPosts
                .filter(post => post.category.toLowerCase() === category.slug)
                .slice(0, 2);
              
              if (categoryPosts.length === 0) return null;
              
              return (
                <div key={category.id} className="mb-8">
                  <div className="mb-4 flex items-center gap-2">
                    <span className="text-2xl">{category.icon}</span>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {category.name}
                    </h4>
                  </div>
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    {categoryPosts.map(post => (
                      <Card
                        key={post.id}
                        className="group cursor-pointer overflow-hidden transition-all hover:shadow-lg"
                        onClick={() => window.location.hash = post.slug}
                      >
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="h-full w-full object-cover transition-transform group-hover:scale-110"
                          />
                        </div>
                        <div className="p-4">
                          <h5 className="mb-2 line-clamp-2 font-semibold text-gray-900 dark:text-white">
                            {post.title}
                          </h5>
                          <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                            {post.excerpt}
                          </p>
                          <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                            <span>{post.date}</span>
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
        </motion.div>
      </div>
    </div>
  );
}
