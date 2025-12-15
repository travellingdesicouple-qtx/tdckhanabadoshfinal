import React from 'react';
import { motion } from 'motion/react';
import { AlertTriangle } from 'lucide-react';

export function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <AlertTriangle className="mx-auto mb-6 h-12 w-12 text-emerald-600" />
          <h1 className="mb-8 text-center font-['Inter'] text-4xl font-bold text-gray-900 dark:text-white">
            Disclaimer
          </h1>
          
          <div className="space-y-6 font-['Merriweather'] text-gray-600 dark:text-gray-300">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Last Updated: December 13, 2025
            </p>

            <section>
              <h2 className="mb-3 font-['Inter'] text-2xl font-bold text-gray-900 dark:text-white">
                1. General Information
              </h2>
              <p>
                The information provided by TDC Khanabadosh on this website is for general informational purposes only. All information is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability or completeness of any information on the site.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-['Inter'] text-2xl font-bold text-gray-900 dark:text-white">
                2. Travel Advice
              </h2>
              <p>
                While we strive to provide accurate and up-to-date travel information, circumstances can change rapidly. Always verify travel requirements, safety conditions, and regulations with official sources before making travel plans. We are not responsible for any travel decisions made based on information from this website.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-['Inter'] text-2xl font-bold text-gray-900 dark:text-white">
                3. Affiliate Links
              </h2>
              <p>
                This website contains affiliate links. If you make a purchase through these links, we may earn a commission at no additional cost to you. This helps support our content creation but does not influence our recommendations, which are based on honest opinions and experiences.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-['Inter'] text-2xl font-bold text-gray-900 dark:text-white">
                4. Professional Disclaimer
              </h2>
              <p>
                The content on this website is not intended as professional advice. We are travel enthusiasts sharing our experiences and opinions. For professional advice specific to your situation, please consult with qualified professionals.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-['Inter'] text-2xl font-bold text-gray-900 dark:text-white">
                5. Testimonials and Reviews
              </h2>
              <p>
                Testimonials and reviews on this website represent individual experiences and opinions. Results may vary and we do not guarantee that you will achieve similar results or experiences.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-['Inter'] text-2xl font-bold text-gray-900 dark:text-white">
                6. External Links
              </h2>
              <p>
                Our website contains links to external websites. We have no control over the content and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-['Inter'] text-2xl font-bold text-gray-900 dark:text-white">
                7. Photography and Content
              </h2>
              <p>
                All photographs and content on this website are either original work or properly licensed. Images may be enhanced or edited for artistic purposes and may not represent exact current conditions at locations.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-['Inter'] text-2xl font-bold text-gray-900 dark:text-white">
                8. Limitation of Liability
              </h2>
              <p>
                Under no circumstances shall TDC Khanabadosh be liable for any direct, indirect, special, incidental or consequential damages resulting from the use or inability to use the material on this website.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-['Inter'] text-2xl font-bold text-gray-900 dark:text-white">
                9. Contact
              </h2>
              <p>
                If you have any questions about this disclaimer, please contact us at{' '}
                <a href="mailto:legal@tdckhanabadosh.com" className="text-emerald-600 hover:text-emerald-700">
                  legal@tdckhanabadosh.com
                </a>
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
