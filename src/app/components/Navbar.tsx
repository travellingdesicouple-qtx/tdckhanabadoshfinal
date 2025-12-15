import React, { useEffect, useState } from 'react';
import { Menu, X, Sun, Moon, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { CartDrawer } from './CartDrawer';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isHomePage, setIsHomePage] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const checkHomePage = () => {
      const hash = window.location.hash;
      setIsHomePage(!hash || hash === '#' || hash === '#home' || hash.startsWith('#about') || hash.startsWith('#map') || hash.startsWith('#adventures') || hash.startsWith('#shop'));
    };

    checkHomePage();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('hashchange', checkHomePage);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', checkHomePage);
    };
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Blogs', href: '#blogs' },
    { name: 'Adventures', href: '#all-adventures' },
    { name: 'Reels', href: '#reels' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Shop', href: '#shop-page' },
    { name: 'About', href: '#about' },
    { name: 'Work With Us', href: '#work-with-us' },
  ];

  const shouldShowBackground = !isHomePage || scrolled;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${shouldShowBackground
          ? 'bg-black/90 shadow-md backdrop-blur-md'
          : 'bg-transparent'
          }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-28 items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a
                href="#home"
                className="flex items-center"
              >
                <img
                  src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiIdXCxraUTHB6f2IPjTRkT98lGLTZE-Hc8mbD5Rx_cHM-tE8R8VaNHABNPGNZBckX7JsjsYjhJ4LtCc2s-1boUQ0Bc8d8betq71g8PL_Q9RlrJ8bUvqpb2HO-cIsZQoYe8T8589MouLa1eBC1HDVLu-13jJ-h5Mvo3tEtEeCqihJCgKQp2PDCZFNvPZlK-/s320/TDC%20Khanabadosh%20(Travelling%20Desi%20Couple)%20Logo%202.png"
                  alt="TDC Khanabadosh"
                  className="h-24 w-auto object-contain"
                />
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="font-['Inter'] font-medium text-white transition-colors duration-300 hover:opacity-70"
                >
                  {link.name}
                </a>
              ))}

              {/* Cart Button */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative rounded-full p-2 text-white transition-colors duration-300 hover:bg-white/20"
                aria-label="Shopping cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Theme Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="rounded-full p-2 text-white transition-colors duration-300 hover:bg-white/20"
                aria-label="Toggle theme"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed left-0 right-0 top-20 z-40 bg-white shadow-lg dark:bg-gray-900 md:hidden"
          >
            <div className="space-y-1 px-4 pb-4 pt-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 font-['Inter'] font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={() => {
                  setCartOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 font-['Inter'] font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                <ShoppingCart className="h-5 w-5" />
                Cart {cartCount > 0 && `(${cartCount})`}
              </button>
              <button
                onClick={() => {
                  setDarkMode(!darkMode);
                  setMobileMenuOpen(false);
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 font-['Inter'] font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={() => window.location.hash = 'checkout'}
      />
    </>
  );
}