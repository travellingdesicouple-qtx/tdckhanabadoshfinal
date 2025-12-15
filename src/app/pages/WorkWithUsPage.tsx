import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, Mail, Users, Target, TrendingUp, Award, Send } from 'lucide-react';

export function WorkWithUsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 to-teal-700 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Briefcase className="mx-auto mb-6 h-16 w-16" />
            <h1 className="mb-6 font-['Inter'] text-5xl font-bold md:text-6xl">
              Work With Us
            </h1>
            <p className="mx-auto max-w-3xl font-['Merriweather'] text-xl text-white/90">
              Partner with TDC Khanabadosh to reach millions of travel enthusiasts worldwide. 
              Let's create authentic content that inspires wanderlust.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Partner Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 font-['Inter'] text-4xl font-bold text-gray-900 dark:text-white">
              Why Partner With Us?
            </h2>
            <p className="mx-auto max-w-2xl font-['Merriweather'] text-lg text-gray-600 dark:text-gray-300">
              We create authentic, engaging content that resonates with our passionate community of travelers
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: <Users className="h-12 w-12" />,
                title: 'Engaged Audience',
                description: '500K+ followers across platforms who trust our recommendations'
              },
              {
                icon: <Target className="h-12 w-12" />,
                title: 'Targeted Reach',
                description: 'Connect with adventure seekers, digital nomads, and travel enthusiasts'
              },
              {
                icon: <TrendingUp className="h-12 w-12" />,
                title: 'Proven Results',
                description: 'Track record of successful brand campaigns with measurable ROI'
              },
              {
                icon: <Award className="h-12 w-12" />,
                title: 'Quality Content',
                description: 'Professional photography, videography, and storytelling'
              },
              {
                icon: <Mail className="h-12 w-12" />,
                title: 'Authentic Voice',
                description: 'Genuine reviews and recommendations your audience will trust'
              },
              {
                icon: <Briefcase className="h-12 w-12" />,
                title: 'Flexible Packages',
                description: 'Custom collaboration options to fit your brand goals'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="rounded-2xl bg-gray-50 p-8 transition-all duration-300 hover:shadow-xl dark:bg-gray-900"
              >
                <div className="mb-4 text-emerald-600 dark:text-emerald-400">
                  {item.icon}
                </div>
                <h3 className="mb-3 font-['Inter'] text-xl font-bold text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="font-['Merriweather'] text-gray-600 dark:text-gray-300">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gray-50 py-20 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 font-['Inter'] text-4xl font-bold text-gray-900 dark:text-white">
              Collaboration Opportunities
            </h2>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                title: 'Sponsored Content',
                items: ['Dedicated YouTube videos', 'Instagram posts & stories', 'Blog articles & reviews', 'Social media campaigns']
              },
              {
                title: 'Brand Ambassadorships',
                items: ['Long-term partnerships', 'Product placement', 'Event coverage', 'Brand representation']
              },
              {
                title: 'Destination Marketing',
                items: ['Tourism board collaborations', 'Hotel & resort features', 'Experience showcases', 'Destination guides']
              },
              {
                title: 'Product Reviews',
                items: ['Travel gear testing', 'Tech product reviews', 'Honest recommendations', 'Unboxing videos']
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-800"
              >
                <h3 className="mb-4 font-['Inter'] text-2xl font-bold text-gray-900 dark:text-white">
                  {service.title}
                </h3>
                <ul className="space-y-2">
                  {service.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 font-['Merriweather'] text-gray-600 dark:text-gray-300">
                      <span className="mt-1 text-emerald-600 dark:text-emerald-400">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="mb-4 font-['Inter'] text-4xl font-bold text-gray-900 dark:text-white">
              Let's Collaborate
            </h2>
            <p className="mb-12 font-['Merriweather'] text-lg text-gray-600 dark:text-gray-300">
              Fill out the form below and we'll get back to you within 24-48 hours
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 rounded-2xl bg-gray-50 p-8 dark:bg-gray-900 md:p-12"
          >
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block font-['Inter'] font-semibold text-gray-900 dark:text-white">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 font-['Merriweather'] focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="mb-2 block font-['Inter'] font-semibold text-gray-900 dark:text-white">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 font-['Merriweather'] focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  placeholder="john@company.com"
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block font-['Inter'] font-semibold text-gray-900 dark:text-white">
                  Company Name *
                </label>
                <input
                  type="text"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 font-['Merriweather'] focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  placeholder="Your Company"
                />
              </div>

              <div>
                <label className="mb-2 block font-['Inter'] font-semibold text-gray-900 dark:text-white">
                  Budget Range
                </label>
                <select className="w-full rounded-lg border border-gray-300 px-4 py-3 font-['Merriweather'] focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                  <option>$1,000 - $5,000</option>
                  <option>$5,000 - $10,000</option>
                  <option>$10,000 - $25,000</option>
                  <option>$25,000+</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-2 block font-['Inter'] font-semibold text-gray-900 dark:text-white">
                Collaboration Type *
              </label>
              <select 
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 font-['Merriweather'] focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              >
                <option value="">Select an option</option>
                <option>Sponsored Content</option>
                <option>Brand Ambassador</option>
                <option>Destination Marketing</option>
                <option>Product Review</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block font-['Inter'] font-semibold text-gray-900 dark:text-white">
                Project Details *
              </label>
              <textarea
                required
                rows={6}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 font-['Merriweather'] focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="group flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-8 py-4 font-['Inter'] text-lg font-semibold text-white transition-all duration-300 hover:bg-emerald-700 hover:shadow-lg"
            >
              Send Proposal
              <Send className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 text-center"
          >
            <p className="font-['Merriweather'] text-gray-600 dark:text-gray-300">
              Or email us directly at{' '}
              <a href="mailto:partnerships@tdckhanabadosh.com" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400">
                partnerships@tdckhanabadosh.com
              </a>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Past Collaborations */}
      <section className="bg-gray-50 py-20 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="mb-4 font-['Inter'] text-4xl font-bold text-gray-900 dark:text-white">
              Trusted by Leading Brands
            </h2>
            <p className="mb-12 font-['Merriweather'] text-lg text-gray-600 dark:text-gray-300">
              We've partnered with tourism boards, hotels, gear brands, and tech companies worldwide
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
              <div className="text-2xl font-bold text-gray-400">Brand Logo 1</div>
              <div className="text-2xl font-bold text-gray-400">Brand Logo 2</div>
              <div className="text-2xl font-bold text-gray-400">Brand Logo 3</div>
              <div className="text-2xl font-bold text-gray-400">Brand Logo 4</div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
