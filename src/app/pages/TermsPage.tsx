import React from 'react';
import { motion } from 'motion/react';
import { FileText } from 'lucide-react';

export function TermsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <FileText className="mx-auto mb-6 h-12 w-12 text-emerald-600" />
          <h1 className="mb-8 text-center font-['Inter'] text-4xl font-bold text-gray-900 dark:text-white">
            Terms & Conditions
          </h1>
          
          <div className="space-y-6 font-['Merriweather'] text-gray-600 dark:text-gray-300">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Last Updated: December 13, 2025
            </p>

            <section>
              <h2 className="mb-3 font-['Inter'] text-2xl font-bold text-gray-900 dark:text-white">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing and using The Khanabadosh website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-['Inter'] text-2xl font-bold text-gray-900 dark:text-white">
                2. Purchase Terms & Payment
              </h2>
              <p className="mb-3">
                All purchases made through our shop are subject to the following conditions:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Payment must be completed via one of our accepted payment methods: Bank Transfer, Payoneer, Binance, TrustWallet, MetaMask, Easypaisa, or JazzCash</li>
                <li>You must upload a valid transaction proof/screenshot after making payment</li>
                <li>Orders will be processed within 24-48 hours after payment verification</li>
                <li>All prices are listed in USD and are subject to change without notice</li>
                <li>You are responsible for ensuring the accuracy of payment details provided</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 font-['Inter'] text-2xl font-bold text-gray-900 dark:text-white">
                3. Digital Products & Delivery
              </h2>
              <p className="mb-3">
                Our digital products are delivered electronically:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Digital products (presets, guides, e-books) will be delivered via email within 24-48 hours after payment verification</li>
                <li>You will receive download links valid for 7 days</li>
                <li>Physical products will be shipped to the provided address with tracking information</li>
                <li>International shipping may take 7-21 business days depending on location</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 font-['Inter'] text-2xl font-bold text-gray-900 dark:text-white">
                4. Refund Policy
              </h2>
              <p className="mb-3">
                Our refund policy is as follows:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li><strong>Digital Products:</strong> Non-refundable after delivery due to the nature of digital content</li>
                <li><strong>Physical Products:</strong> Returns accepted within 14 days if item is unopened and in original condition</li>
                <li><strong>Damaged Items:</strong> Contact us within 48 hours of delivery with photo evidence for replacement or refund</li>
                <li><strong>Payment Disputes:</strong> If payment is not verified or fraudulent, order will be cancelled and reported</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 font-['Inter'] text-2xl font-bold text-gray-900 dark:text-white">
                5. Use License & Intellectual Property
              </h2>
              <p className="mb-3">
                Permission is granted to use purchased materials under the following conditions:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Personal, non-commercial use only unless otherwise specified</li>
                <li>No redistribution, resale, or sharing of digital products</li>
                <li>Copyright and intellectual property rights remain with The Khanabadosh</li>
                <li>Violation may result in legal action and termination of access</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 font-['Inter'] text-2xl font-bold text-gray-900 dark:text-white">
                6. Payment Verification Process
              </h2>
              <p className="mb-3">
                To ensure secure transactions:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>All payments are manually verified by our team</li>
                <li>You must provide clear transaction proof (screenshot/receipt)</li>
                <li>Verification typically takes 24-48 hours (business days)</li>
                <li>We may contact you for additional verification if needed</li>
                <li>Keep your transaction receipt for at least 30 days</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 font-['Inter'] text-2xl font-bold text-gray-900 dark:text-white">
                7. Disclaimer
              </h2>
              <p>
                The materials on The Khanabadosh's website are provided on an 'as is' basis. The Khanabadosh makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-['Inter'] text-2xl font-bold text-gray-900 dark:text-white">
                8. User Responsibilities
              </h2>
              <p className="mb-3">
                As a customer, you agree to:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Provide accurate contact and payment information</li>
                <li>Not use purchased products for illegal purposes</li>
                <li>Not attempt to reverse-engineer or copy our digital products</li>
                <li>Report any technical issues within 7 days of purchase</li>
                <li>Respect our intellectual property rights</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 font-['Inter'] text-2xl font-bold text-gray-900 dark:text-white">
                9. Limitations of Liability
              </h2>
              <p>
                In no event shall The Khanabadosh or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on The Khanabadosh's website or purchased products.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-['Inter'] text-2xl font-bold text-gray-900 dark:text-white">
                10. Accuracy of Materials
              </h2>
              <p>
                The materials appearing on The Khanabadosh's website could include technical, typographical, or photographic errors. The Khanabadosh does not warrant that any of the materials on its website are accurate, complete or current. We reserve the right to make changes without notice.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-['Inter'] text-2xl font-bold text-gray-900 dark:text-white">
                11. Third-Party Links
              </h2>
              <p>
                The Khanabadosh has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by The Khanabadosh of the site. Use of any linked website is at the user's own risk.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-['Inter'] text-2xl font-bold text-gray-900 dark:text-white">
                12. Modifications to Terms
              </h2>
              <p>
                The Khanabadosh may revise these terms of service for its website at any time without notice. By using this website and making purchases, you are agreeing to be bound by the then current version of these terms of service. We recommend reviewing this page periodically.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-['Inter'] text-2xl font-bold text-gray-900 dark:text-white">
                13. Governing Law
              </h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of Pakistan and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-['Inter'] text-2xl font-bold text-gray-900 dark:text-white">
                14. Contact Information
              </h2>
              <p className="mb-2">
                If you have any questions about these Terms & Conditions, please contact us:
              </p>
              <ul className="list-none space-y-2 pl-0">
                <li>
                  <strong>Email:</strong>{' '}
                  <a href="mailto:support@thekhanabadosh.com" className="text-emerald-600 hover:text-emerald-700">
                    support@thekhanabadosh.com
                  </a>
                </li>
                <li>
                  <strong>Legal Inquiries:</strong>{' '}
                  <a href="mailto:legal@thekhanabadosh.com" className="text-emerald-600 hover:text-emerald-700">
                    legal@thekhanabadosh.com
                  </a>
                </li>
              </ul>
            </section>

            <div className="mt-8 rounded-lg bg-emerald-50 p-4 dark:bg-emerald-900/20">
              <p className="text-sm text-emerald-800 dark:text-emerald-200">
                <strong>Note:</strong> By making a purchase on our website, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
