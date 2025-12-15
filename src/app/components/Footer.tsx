import React from 'react';
import { Instagram, Youtube, Facebook } from 'lucide-react';

// TikTok icon as SVG since it's not in lucide-react
const TikTokIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <img
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiIdXCxraUTHB6f2IPjTRkT98lGLTZE-Hc8mbD5Rx_cHM-tE8R8VaNHABNPGNZBckX7JsjsYjhJ4LtCc2s-1boUQ0Bc8d8betq71g8PL_Q9RlrJ8bUvqpb2HO-cIsZQoYe8T8589MouLa1eBC1HDVLu-13jJ-h5Mvo3tEtEeCqihJCgKQp2PDCZFNvPZlK-/s320/TDC%20Khanabadosh%20(Travelling%20Desi%20Couple)%20Logo%202.png"
                alt="TDC Khanabadosh"
                className="h-20 w-auto object-contain brightness-0 invert dark:brightness-100 dark:invert-0"
              />
            </div>
            <p className="font-['Merriweather'] text-gray-400">
              Documenting adventures, sharing travel tips, and inspiring wanderlust one story at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-['Inter'] font-semibold">Quick Links</h4>
            <ul className="space-y-2 font-['Merriweather'] text-gray-400">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#all-adventures" className="hover:text-white transition-colors">All Adventures</a></li>
              <li><a href="#gallery" className="hover:text-white transition-colors">Photo Gallery</a></li>
              <li><a href="#shop-page" className="hover:text-white transition-colors">Shop</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
            </ul>
          </div>

          {/* Collaborate */}
          <div>
            <h4 className="mb-4 font-['Inter'] font-semibold">Collaborate</h4>
            <ul className="space-y-2 font-['Merriweather'] text-gray-400">
              <li><a href="#work-with-us" className="hover:text-white transition-colors">Work With Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Media Kit</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Partnerships</a></li>
              <li><a href="mailto:partnerships@tdckhanabadosh.com" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="mb-4 font-['Inter'] font-semibold">Connect</h4>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/tdc.khanabadosh/" target="_blank" rel="noopener noreferrer" className="rounded-full bg-white/10 p-3 transition-colors hover:bg-white/20">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.youtube.com/@tdc.khanabadosh" target="_blank" rel="noopener noreferrer" className="rounded-full bg-white/10 p-3 transition-colors hover:bg-white/20">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="https://tiktok.com/@tdckhanabadosh" target="_blank" rel="noopener noreferrer" className="rounded-full bg-white/10 p-3 transition-colors hover:bg-white/20">
                <TikTokIcon />
              </a>
              <a href="https://www.facebook.com/tdckhanabadosh" target="_blank" rel="noopener noreferrer" className="rounded-full bg-white/10 p-3 transition-colors hover:bg-white/20">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Legal Links */}
        <div className="mt-8 border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="font-['Merriweather'] text-sm text-gray-400">
              &copy; {new Date().getFullYear()} TDC Khanabadosh. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 font-['Merriweather'] text-sm text-gray-400">
              <a href="#terms" className="hover:text-white transition-colors">Terms & Conditions</a>
              <span>•</span>
              <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              <span>•</span>
              <a href="#disclaimer" className="hover:text-white transition-colors">Disclaimer</a>
              <span>•</span>
              <a href="#cookies" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}