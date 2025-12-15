import React from 'react';
import { motion } from 'motion/react';
import { Cookie } from 'lucide-react';

export function CookiesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Cookie className="mx-auto mb-6 h-12 w-12 text-emerald-600" />
          <h1 className="mb-8 text-center font-['Inter'] text-4xl font-bold text-gray-900 dark:text-white">
            Cookie Policy
          </h1>
          
          <div className="space-y-6 font-['Merriweather'] text-gray-600 dark:text-gray-300">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Last Updated: December 13, 2025
            </p>

            <section>
              <h2 className="mb-3 font-['Inter'] text-2xl font-bold text-gray-900 dark:text-white">
                1. What Are Cookies?
              </h2>
              <p>
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-['Inter'] text-2xl font-bold text-gray-900 dark:text-white">
                2. How We Use Cookies
              </h2>
              <p className="mb-2">
                We use cookies for the following purposes:
              </p>
              <ul className="ml-6 list-disc space-y-1">
                <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our website</li>
                <li><strong>Functionality Cookies:</strong> Remember your preferences and settings</li>
                <li><strong>Marketing Cookies:</strong> Track your browsing to show relevant ads</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 font-['Inter'] text-2xl font-bold text-gray-900 dark:text-white">
                3. Types of Cookies We Use
              </h2>
              
              <div className="mt-4 space-y-4">
                <div>
                  <h3 className="mb-2 font-['Inter'] text-lg font-semibold text-gray-900 dark:text-white">
                    Session Cookies
                  </h3>
                  <p>
                    Temporary cookies that expire when you close your browser. These help us maintain your session as you navigate through our website.
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 font-['Inter'] text-lg font-semibold text-gray-900 dark:text-white">
                    Persistent Cookies
                  </h3>
                  <p>
                    Cookies that remain on your device until they expire or you delete them. These help us remember your preferences across visits.
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 font-['Inter'] text-lg font-semibold text-gray-900 dark:text-white">
                    Third-Party Cookies
                  </h3>
                  <p>
                    Set by third-party services we use, such as Google Analytics, social media platforms, and advertising networks.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="mb-3 font-['Inter'] text-2xl font-bold text-gray-900 dark:text-white">
                4. Specific Cookies We Use
              </h2>
              <ul className="ml-6 list-disc space-y-2">
                <li><strong>Google Analytics:</strong> Tracks website usage and visitor behavior</li>
                <li><strong>YouTube:</strong> Embeds videos and tracks video views</li>
                <li><strong>Social Media:</strong> Enables social sharing and embedded content</li>
                <li><strong>Payment Processors:</strong> Facilitates secure payment transactions</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 font-['Inter'] text-2xl font-bold text-gray-900 dark:text-white">
                5. Managing Cookies
              </h2>
              <p className="mb-2">
                You can control and manage cookies in several ways:
              </p>
              <ul className="ml-6 list-disc space-y-1">
                <li>Most browsers allow you to refuse or accept cookies</li>
                <li>You can delete cookies already stored on your device</li>
                <li>You can set your browser to notify you when cookies are sent</li>
                <li>Use browser plugins to manage cookie preferences</li>
              </ul>
              <p className="mt-3">
                Note: Blocking all cookies may impact your experience on our website and prevent you from using certain features.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-['Inter'] text-2xl font-bold text-gray-900 dark:text-white">
                6. Browser Settings
              </h2>
              <p className="mb-2">
                To manage cookies in your browser:
              </p>
              <ul className="ml-6 list-disc space-y-1">
                <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies</li>
                <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies</li>
                <li><strong>Safari:</strong> Preferences → Privacy → Cookies</li>
                <li><strong>Edge:</strong> Settings → Cookies and site permissions</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 font-['Inter'] text-2xl font-bold text-gray-900 dark:text-white">
                7. Updates to This Policy
              </h2>
              <p>
                We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-['Inter'] text-2xl font-bold text-gray-900 dark:text-white">
                8. Contact Us
              </h2>
              <p>
                If you have questions about our use of cookies, please contact us at{' '}
                <a href="mailto:privacy@tdckhanabadosh.com" className="text-emerald-600 hover:text-emerald-700">
                  privacy@tdckhanabadosh.com
                </a>
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
