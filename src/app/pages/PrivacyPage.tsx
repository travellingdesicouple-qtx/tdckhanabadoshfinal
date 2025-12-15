import React from 'react';
import { motion } from 'motion/react';
import { Shield } from 'lucide-react';

export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Shield className="mx-auto mb-6 h-12 w-12 text-emerald-600" />
          <h1 className="mb-8 text-center font-['Inter'] text-4xl font-bold text-gray-900 dark:text-white">
            Privacy Policy
          </h1>
          
          <div className="space-y-6 font-['Merriweather'] text-gray-600 dark:text-gray-300">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Last Updated: December 13, 2025
            </p>

            <section>
              <h2 className="mb-3 font-['Inter'] text-2xl font-bold text-gray-900 dark:text-white">
                1. Information We Collect
              </h2>
              <p className="mb-2">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="ml-6 list-disc space-y-1">
                <li>Name and email address when you subscribe to our newsletter</li>
                <li>Payment information when you purchase products</li>
                <li>Comments and feedback you provide</li>
                <li>Correspondence with us</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 font-['Inter'] text-2xl font-bold text-gray-900 dark:text-white">
                2. How We Use Your Information
              </h2>
              <p className="mb-2">
                We use the information we collect to:
              </p>
              <ul className="ml-6 list-disc space-y-1">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send you technical notices and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Send you marketing communications (with your consent)</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 font-['Inter'] text-2xl font-bold text-gray-900 dark:text-white">
                3. Information Sharing
              </h2>
              <p>
                We do not share your personal information with third parties except as described in this policy. We may share information with service providers who perform services on our behalf, such as payment processing and email delivery.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-['Inter'] text-2xl font-bold text-gray-900 dark:text-white">
                4. Cookies and Tracking
              </h2>
              <p>
                We use cookies and similar tracking technologies to collect information about your browsing activities. You can control cookies through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-['Inter'] text-2xl font-bold text-gray-900 dark:text-white">
                5. Data Security
              </h2>
              <p>
                We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, no internet transmission is ever fully secure or error-free.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-['Inter'] text-2xl font-bold text-gray-900 dark:text-white">
                6. Your Rights
              </h2>
              <p className="mb-2">
                You have the right to:
              </p>
              <ul className="ml-6 list-disc space-y-1">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 font-['Inter'] text-2xl font-bold text-gray-900 dark:text-white">
                7. Children's Privacy
              </h2>
              <p>
                Our services are not directed to children under 13. We do not knowingly collect personal information from children under 13.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-['Inter'] text-2xl font-bold text-gray-900 dark:text-white">
                8. Changes to This Policy
              </h2>
              <p>
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-['Inter'] text-2xl font-bold text-gray-900 dark:text-white">
                9. Contact Us
              </h2>
              <p>
                If you have questions about this privacy policy, please contact us at{' '}
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
