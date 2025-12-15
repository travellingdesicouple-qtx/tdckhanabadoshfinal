import React from 'react';
import { ExternalLink } from 'lucide-react';

interface AffiliateProductBoxProps {
  title: string;
  description: string;
  image: string;
  price: string;
  features?: string[];
  affiliateLink: string;
  badge?: string;
}

/**
 * Reusable Affiliate Product Box Component
 * Easy to insert in blog posts for product recommendations
 * 
 * Usage in blog content:
 * Simply add this component wherever you want to promote a product
 */
export function AffiliateProductBox({
  title,
  description,
  image,
  price,
  features = [],
  affiliateLink,
  badge = "Recommended",
}: AffiliateProductBoxProps) {
  return (
    <div className="my-8 overflow-hidden rounded-2xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-white shadow-lg dark:border-emerald-800 dark:from-emerald-950 dark:to-gray-900">
      <div className="p-6">
        {/* Badge */}
        <div className="mb-3 inline-block rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
          {badge}
        </div>

        <div className="grid gap-6 md:grid-cols-[200px_1fr]">
          {/* Product Image */}
          <div className="overflow-hidden rounded-lg bg-white dark:bg-gray-800">
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div>
            <h3 className="mb-2 font-['Inter'] text-xl font-bold text-gray-900 dark:text-white">
              {title}
            </h3>

            <p className="mb-4 font-['Merriweather'] text-sm text-gray-600 dark:text-gray-300">
              {description}
            </p>

            {/* Features */}
            {features.length > 0 && (
              <ul className="mb-4 space-y-2">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <span className="mt-0.5 text-emerald-500">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Price and CTA */}
            <div className="flex items-center gap-4 border-t border-emerald-100 pt-4 dark:border-emerald-900">
              <div className="font-['Inter'] text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {price}
              </div>
              <a
                href={affiliateLink}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-2.5 font-['Inter'] text-sm font-semibold text-white transition-all hover:bg-emerald-700 hover:shadow-lg"
              >
                Check Price
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Affiliate Disclosure */}
        <p className="mt-4 rounded-lg bg-amber-50 p-3 text-xs text-amber-800 dark:bg-amber-950 dark:text-amber-200">
          <strong>Disclosure:</strong> This post contains affiliate links. We may earn a commission at no extra cost to you if you make a purchase through these links.
        </p>
      </div>
    </div>
  );
}

/**
 * Compact Sidebar Affiliate Box
 * Perfect for sidebar recommendations
 */
export function CompactAffiliateBox({
  title,
  image,
  price,
  affiliateLink,
}: Pick<AffiliateProductBoxProps, 'title' | 'image' | 'price' | 'affiliateLink'>) {
  return (
    <a
      href={affiliateLink}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="block overflow-hidden rounded-lg border border-gray-200 bg-white transition-all hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
    >
      <img
        src={image}
        alt={title}
        className="h-40 w-full object-cover"
      />
      <div className="p-4">
        <h4 className="mb-2 font-['Inter'] text-sm font-semibold text-gray-900 dark:text-white">
          {title}
        </h4>
        <div className="flex items-center justify-between">
          <span className="font-['Inter'] text-lg font-bold text-emerald-600 dark:text-emerald-400">
            {price}
          </span>
          <span className="text-xs text-emerald-600 dark:text-emerald-400">
            View Deal →
          </span>
        </div>
      </div>
    </a>
  );
}
