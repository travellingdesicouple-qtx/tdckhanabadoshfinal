import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Play } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';

// Country playlist data with images
const countryPlaylists = [
  {
    id: '1',
    country: 'Thailand',
    flag: '🇹🇭',
    image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=600&q=80',
    vlogCount: 8,
    description: 'Street food, temples & beaches'
  },
  {
    id: '2',
    country: 'Japan',
    flag: '🇯🇵',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80',
    vlogCount: 12,
    description: 'Culture, cities & nature'
  },
  {
    id: '3',
    country: 'India',
    flag: '🇮🇳',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=80',
    vlogCount: 15,
    description: 'Heritage, colors & diversity'
  },
  {
    id: '4',
    country: 'Italy',
    flag: '🇮🇹',
    image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600&q=80',
    vlogCount: 10,
    description: 'Art, food & architecture'
  },
  {
    id: '5',
    country: 'USA',
    flag: '🇺🇸',
    image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&q=80',
    vlogCount: 9,
    description: 'National parks & cities'
  },
  {
    id: '6',
    country: 'France',
    flag: '🇫🇷',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80',
    vlogCount: 7,
    description: 'Paris, countryside & culture'
  },
  {
    id: '7',
    country: 'Spain',
    flag: '🇪🇸',
    image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=600&q=80',
    vlogCount: 6,
    description: 'Beaches, cities & festivals'
  },
  {
    id: '8',
    country: 'Australia',
    flag: '🇦🇺',
    image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=600&q=80',
    vlogCount: 11,
    description: 'Wildlife, coast & outback'
  },
  {
    id: '9',
    country: 'Indonesia',
    flag: '🇮🇩',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80',
    vlogCount: 9,
    description: 'Islands, temples & nature'
  },
  {
    id: '10',
    country: 'Peru',
    flag: '🇵🇪',
    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=600&q=80',
    vlogCount: 5,
    description: 'Machu Picchu & Andes'
  }
];

export function CountryPlaylists() {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-20 dark:from-gray-950 dark:to-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 font-['Inter'] text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            Explore by Country
          </h2>
          <p className="font-['Merriweather'] text-xl text-gray-600 dark:text-gray-300">
            Watch all vlogs from your favorite destinations
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {countryPlaylists.map((playlist) => (
                <CarouselItem key={playlist.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl">
                    {/* Country Image */}
                    <div className="relative h-[320px] overflow-hidden">
                      <img
                        src={playlist.image}
                        alt={playlist.country}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                      
                      {/* Flag Badge */}
                      <div className="absolute right-4 top-4 rounded-full bg-white/20 px-4 py-2 text-3xl backdrop-blur-md">
                        {playlist.flag}
                      </div>

                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="rounded-full bg-white/30 p-6 backdrop-blur-sm">
                          <Play className="h-12 w-12 fill-white text-white" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="mb-2 flex items-center gap-2">
                          <MapPin className="h-5 w-5 text-white" />
                          <h3 className="font-['Inter'] text-2xl font-bold text-white">
                            {playlist.country}
                          </h3>
                        </div>
                        
                        <p className="mb-3 font-['Merriweather'] text-sm text-white/90">
                          {playlist.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <span className="rounded-full bg-emerald-500 px-3 py-1 text-sm font-semibold text-white">
                            {playlist.vlogCount} Vlogs
                          </span>
                          
                          <button className="group/btn flex items-center gap-2 font-['Inter'] text-sm font-semibold text-white transition-all duration-300 hover:gap-3">
                            Watch All
                            <Play className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </motion.div>

        {/* View All Countries Link */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <a
            href="#all-adventures"
            className="inline-flex items-center gap-2 font-['Inter'] text-lg font-semibold text-emerald-600 transition-colors hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
          >
            View All Countries
            <MapPin className="h-5 w-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
