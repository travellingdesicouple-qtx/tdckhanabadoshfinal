import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Play, MapPin } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from './ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { heroSlidesApi, HeroSlide } from '../../lib/api';

const defaultSlides = [
  {
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&q=80',
    alt: 'Travel Adventure 1',
    title: 'Experience the Unknown',
    location: 'Gilgit-Baltistan',
    season: 'Summer'
  },
  {
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=80',
    alt: 'Travel Adventure 2',
    title: 'Roads Less Traveled',
    location: 'Karakoram Highway',
    season: 'Autumn'
  },
  {
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80',
    alt: 'Travel Adventure 3',
    title: 'In To The Wild',
    location: 'Deosai Plains',
    season: 'Spring'
  }
];

export function Hero() {
  const [slides, setSlides] = useState<any[]>(defaultSlides);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  );

  useEffect(() => {
    loadSlides();
  }, []);

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const loadSlides = async () => {
    try {
      const data = await heroSlidesApi.getAll();
      if (data && data.length > 0) {
        setSlides(data.map((s: HeroSlide) => ({
          image: s.image_url,
          alt: s.title || 'Hero Image',
          title: s.title,
          location: s.location,
          season: s.season
        })));
      }
    } catch (error) {
      console.error('Failed to load hero slides', error);
    }
  };

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  const currentSlide = slides[current] || slides[0];

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Image Carousel Background */}
      <div className="absolute inset-0 z-0">
        <Carousel
          setApi={setApi}
          plugins={[plugin.current]}
          className="h-full w-full"
          opts={{
            align: 'start',
            loop: true,
          }}
        >
          <CarouselContent className="h-screen m-0">
            {slides.map((slide, index) => (
              <CarouselItem key={index} className="h-screen p-0">
                <div className="relative h-full w-full">
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    className="h-full w-full object-cover"
                  />
                  {/* Slide Info Overlay */}
                  {(slide.location || slide.season) && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      key={index} // Remount on slide change
                      className="absolute bottom-32 right-8 md:bottom-12 md:right-12 text-right hidden md:block"
                    >
                      <div className="backdrop-blur-sm bg-black/20 p-4 rounded-xl border border-white/10">
                        {slide.season && (
                          <p className="text-emerald-400 font-bold tracking-widest uppercase text-sm mb-1">{slide.season}</p>
                        )}
                        {slide.location && (
                          <div className="flex items-center justify-end gap-2 text-white font-['Merriweather'] text-lg">
                            <span>{slide.location}</span>
                            <MapPin className="h-4 w-4 text-emerald-400" />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-4">
        <div className="max-w-5xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 font-['Inter'] font-bold tracking-tight text-white"
          >
            <span className="block text-4xl md:text-5xl lg:text-7xl">TDC KHANABADOSH</span>
            <span className="block mt-2 text-2xl md:text-3xl lg:text-5xl whitespace-nowrap">Wanderlust & Digital Nomad Life</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-10 font-['Merriweather'] text-xl text-white/90 md:text-2xl"
          >
            Exploring the world one adventure at a time. Join me on epic journeys,
            learn photography, and discover hidden gems across the globe.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <button
              onClick={scrollToContent}
              className="group flex items-center gap-2 rounded-full bg-white px-8 py-4 font-['Inter'] font-semibold text-black transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              Start Learning
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <button
              onClick={scrollToContent}
              className="group flex items-center gap-2 rounded-full border-2 border-white/80 bg-transparent px-8 py-4 font-['Inter'] font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white hover:bg-white/10"
            >
              <Play className="h-5 w-5" />
              Watch Vlogs
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="h-12 w-8 rounded-full border-2 border-white/50">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="mx-auto mt-2 h-2 w-2 rounded-full bg-white"
          ></motion.div>
        </div>
      </motion.div>
    </section>
  );
}
