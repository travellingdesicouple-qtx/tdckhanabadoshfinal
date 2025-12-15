
import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Camera, Plane, MapPin, Award, Users, Heart, Video } from 'lucide-react';
import { aboutData } from '../data/aboutData'; // Fallback
import { supabase, AboutInfo } from 'lib/supabase';

export function About() {
  const [data, setData] = useState<AboutInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAbout() {
      try {
        const { data: aboutInfo, error } = await supabase
          .from('about_info')
          .select('*')
          .single();

        if (aboutInfo) {
          setData(aboutInfo);
        }
      } catch (error) {
        console.error('Error fetching about info:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchAbout();
  }, []);

  // Use dynamic data if available, otherwise fallback to static data (or defaults)
  const displayData = {
    countriesVisited: data?.countries_visited ?? 0, // Fallback to 0 if nothing in DB
    imagesTaken: data?.images_taken ?? 0,
    vlogsCreated: aboutData.vlogsCreated, // Keep this static or add to DB later if needed
    subscribers: data?.subscribers ?? 0,
    aboutText: data?.about_text ?? "Welcome to TDC Khanabadosh! We are currently updating our story. Check back soon!",
    mainImage: data?.main_image ?? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
    yearsOfTravel: data?.years_of_travel ?? 0
  };

  const stats = [
    { icon: MapPin, value: `${displayData.countriesVisited}+`, label: "Countries Visited" },
    { icon: Camera, value: `${displayData.imagesTaken}+`, label: "Photos Captured" },
    // { icon: Video, value: `${displayData.vlogsCreated}+`, label: "Vlogs Created" }, // Removed as per request to focus on main editable stats? Or keep static? Let's keep visually consistent but maybe static for now unless we add it to DB. user asked for specific updates.
    { icon: Users, value: `${(displayData.subscribers / 1000).toFixed(0)}k+`, label: "Subscribers" },
  ];

  return (
    <section id="about" className="bg-white py-20 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 font-['Inter'] text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            About TDC Khanabadosh
          </h2>
          <p className="font-['Merriweather'] text-xl text-gray-600 dark:text-gray-300">
            Your Gateway to Desi Travel • Pakistan & Beyond
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl cursor-pointer group"
              onClick={() => window.open(displayData.mainImage, '_blank')}>
              <img
                src={displayData.mainImage}
                alt="Travel Photographer"
                className="h-[500px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-sm font-semibold">
                  Click to view full image
                </div>
              </div>
              {/* Floating Badge */}
              <div className="absolute bottom-4 right-4 rounded-2xl bg-emerald-500 p-6 shadow-xl">
                <div className="text-center text-white">
                  <div className="mb-1 font-['Inter'] text-3xl font-bold">{displayData.yearsOfTravel}+</div>
                  <div className="font-['Merriweather'] text-sm">Years Traveling</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Story */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <Heart className="h-5 w-5" />
              <span className="font-['Inter'] font-semibold">Meet Shahla & Noor</span>
            </div>

            <h3 className="mb-4 font-['Inter'] text-3xl font-bold text-gray-900 dark:text-white">
              Your Desi Travel Companions
            </h3>

            <div className="space-y-4 font-['Merriweather'] text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
              <p>{displayData.aboutText}</p>
            </div>

            {/* What We Offer */}
            <div className="mt-8 rounded-xl bg-emerald-50 p-6 dark:bg-emerald-900/20">
              <div className="mb-3 flex items-center gap-2">
                <Plane className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                <h4 className="font-['Inter'] text-lg font-bold text-gray-900 dark:text-white">
                  Join the TDC Khanabadosh Family!
                </h4>
              </div>
              <p className="font-['Merriweather'] text-gray-700 dark:text-gray-300">
                Get inspired by our travelogues, captivating photos, and informative videos. Find valuable tips, must-see attractions, off-the-beaten-path experiences, and recommendations for desi travellers on a budget. Immerse yourself in cultural nuances, pick up travel hacks, and discover hidden gems along the way.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20 grid grid-cols-2 gap-6 md:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="rounded-2xl bg-gradient-to-br from-emerald-50 to-white p-6 text-center shadow-lg dark:from-emerald-900/20 dark:to-gray-900"
            >
              <stat.icon className="mx-auto mb-3 h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              <div className="mb-1 font-['Inter'] text-3xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </div>
              <div className="font-['Merriweather'] text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <a
            href="#adventures"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-8 py-4 font-['Inter'] font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-emerald-700 hover:shadow-xl"
          >
            Explore My Adventures
            <Plane className="h-5 w-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
