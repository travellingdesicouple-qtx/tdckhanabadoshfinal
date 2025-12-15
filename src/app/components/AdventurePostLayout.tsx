import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Share2, Facebook, Twitter, Link as LinkIcon, Calendar, Clock, Play } from 'lucide-react';
import { gearItems } from '../data/sampleData';
import { AdPlacement } from './AdPlacement';

interface AdventurePostLayoutProps {
  title: string;
  date: string;
  readTime: string;
  coverImage: string;
  content: string;
  category: string;
  youtubeVideoId?: string;
  contentImages?: string[];
}

export function AdventurePostLayout({
  title,
  date,
  readTime,
  coverImage,
  content,
  category,
  youtubeVideoId,
  contentImages = [],
}: AdventurePostLayoutProps) {
  const [activeSection, setActiveSection] = useState<string>('');
  const [tableOfContents, setTableOfContents] = useState<Array<{ id: string; text: string; level: number }>>([]);

  // Generate Table of Contents from content
  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const headings = Array.from(doc.querySelectorAll('h2, h3'));
    
    const toc = headings.map((heading) => ({
      id: heading.id,
      text: heading.textContent || '',
      level: parseInt(heading.tagName.charAt(1)),
    }));

    setTableOfContents(toc);
  }, [content]);

  // Track active section on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    const headings = document.querySelectorAll('h2[id], h3[id]');
    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, [content]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const shareUrl = window.location.href;
  const shareTitle = title;

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`, '_blank');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    alert('Link copied to clipboard!');
  };

  return (
    <article className="bg-white dark:bg-gray-950">
      {/* Hero Image */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <img
          src={coverImage}
          alt={title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-4 text-white">
                <span className="rounded-full bg-emerald-500 px-4 py-1 text-sm font-semibold">
                  {category}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {date}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {readTime}
                </span>
              </div>
              <h1 className="font-['Inter'] text-5xl font-bold text-white">
                {title}
              </h1>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content Section with Sticky Sidebar */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_300px]">
          {/* Main Content (70%) */}
          <div className="space-y-8">
            {/* Ad Placement - Top */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <AdPlacement size="banner" placement="adventures" />
            </motion.div>

            {/* Main Article Content with Interspersed Images */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-8"
            >
              {/* Split content into paragraphs and insert images between them */}
              {(() => {
                const paragraphs = content.split('</p>').filter(p => p.trim());
                const totalParagraphs = paragraphs.length;
                
                // Distribute images evenly through content
                const insertPoints = contentImages.map((_, idx) => 
                  Math.floor((totalParagraphs / (contentImages.length + 1)) * (idx + 1))
                );

                return paragraphs.map((paragraph, index) => (
                  <React.Fragment key={index}>
                    <div 
                      className="prose prose-lg dark:prose-invert max-w-none font-['Merriweather']"
                      dangerouslySetInnerHTML={{ __html: paragraph + '</p>' }}
                    />
                    {insertPoints.includes(index + 1) && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="my-8 overflow-hidden rounded-2xl shadow-lg"
                      >
                        <img
                          src={contentImages[insertPoints.indexOf(index + 1)]}
                          alt={`${title} - Image ${insertPoints.indexOf(index + 1) + 1}`}
                          className="w-full object-cover"
                        />
                      </motion.div>
                    )}
                  </React.Fragment>
                ));
              })()}
            </motion.div>

            {/* YouTube Video at the End */}
            {youtubeVideoId && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="overflow-hidden rounded-2xl bg-gray-900 shadow-xl"
              >
                <div className="mb-4 flex items-center gap-2 px-4 pt-4">
                  <Play className="h-5 w-5 text-emerald-500" />
                  <h3 className="font-['Inter'] text-lg font-semibold text-white">
                    Watch the Full Adventure
                  </h3>
                </div>
                <div className="aspect-video w-full">
                  <iframe
                    src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                  />
                </div>
              </motion.div>
            )}

            {/* Ad Placement - Bottom */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <AdPlacement size="banner" placement="adventures" />
            </motion.div>
          </div>

          {/* Sticky Sidebar (30%) */}
          <div className="lg:block">
            <div className="sticky top-24 space-y-6">
              {/* Table of Contents */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900"
              >
                <h3 className="mb-4 font-['Inter'] text-lg font-bold text-gray-900 dark:text-white">
                  Table of Contents
                </h3>
                <nav className="space-y-2">
                  {tableOfContents.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`block w-full text-left transition-colors ${
                        item.level === 3 ? 'pl-4 text-sm' : 'font-medium'
                      } ${
                        activeSection === item.id
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                      }`}
                    >
                      {item.text}
                    </button>
                  ))}
                </nav>
              </motion.div>

              {/* Sidebar Ad */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
              >
                <AdPlacement size="square" placement="adventures" />
              </motion.div>

              {/* Share This Post */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900"
              >
                <h3 className="mb-4 flex items-center gap-2 font-['Inter'] text-lg font-bold text-gray-900 dark:text-white">
                  <Share2 className="h-5 w-5" />
                  Share This Adventure
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={shareOnFacebook}
                    className="flex w-full items-center gap-3 rounded-lg bg-blue-600 px-4 py-2.5 font-['Inter'] font-medium text-white transition-all hover:bg-blue-700"
                  >
                    <Facebook className="h-5 w-5" />
                    Facebook
                  </button>
                  <button
                    onClick={shareOnTwitter}
                    className="flex w-full items-center gap-3 rounded-lg bg-sky-500 px-4 py-2.5 font-['Inter'] font-medium text-white transition-all hover:bg-sky-600"
                  >
                    <Twitter className="h-5 w-5" />
                    Twitter
                  </button>
                  <button
                    onClick={copyLink}
                    className="flex w-full items-center gap-3 rounded-lg bg-gray-200 px-4 py-2.5 font-['Inter'] font-medium text-gray-900 transition-all hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                  >
                    <LinkIcon className="h-5 w-5" />
                    Copy Link
                  </button>
                </div>
              </motion.div>

              {/* Recommended Gear */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900"
              >
                <h3 className="mb-4 font-['Inter'] text-lg font-bold text-gray-900 dark:text-white">
                  Recommended Gear
                </h3>
                <div className="space-y-4">
                  {gearItems.map((item) => (
                    <a
                      key={item.id}
                      href={item.affiliateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-lg bg-white p-3 transition-all hover:shadow-md dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="font-['Inter'] text-sm font-semibold text-gray-900 dark:text-white">
                          {item.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {item.category}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-gray-50 py-16 dark:bg-gray-900">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-950"
          >
            <h2 className="mb-8 font-['Inter'] text-3xl font-bold text-gray-900 dark:text-white">
              Comments & Reviews
            </h2>
            
            {/* Comment Form */}
            <div className="mb-8">
              <textarea
                rows={4}
                placeholder="Share your thoughts or ask questions..."
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
              <div className="mt-4 flex items-center justify-between">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-1/2 rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
                <button className="rounded-lg bg-emerald-600 px-6 py-2 font-semibold text-white transition-colors hover:bg-emerald-700">
                  Post Comment
                </button>
              </div>
            </div>

            {/* Sample Comments */}
            <div className="space-y-6">
              <div className="border-t border-gray-200 pt-6 dark:border-gray-700">
                <div className="mb-2 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 font-semibold text-emerald-600 dark:bg-emerald-900 dark:text-emerald-300">
                    S
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Sample User</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">2 days ago</div>
                  </div>
                </div>
                <p className="ml-13 text-gray-700 dark:text-gray-300">
                  Amazing adventure! Your video really captured the essence of the journey. Looking forward to more content like this.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </article>
  );
}
