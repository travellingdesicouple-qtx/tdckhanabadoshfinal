import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
import { motion } from 'motion/react';
import { visitedCountries } from '../data/sampleData';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export function WorldMap() {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  const visitedCountryCodes = new Set(visitedCountries.map(c => c.iso));

  return (
    <section id="map" className="bg-gray-50 py-20 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 font-['Inter'] text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            Where I've Been
          </h2>
          <p className="font-['Merriweather'] text-xl text-gray-600 dark:text-gray-300">
            Explore the countries I've visited and the adventures I've had
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-gray-800"
        >
          <div className="relative">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                scale: 140,
              }}
              className="h-[500px] w-full md:h-[600px]"
            >
              <ZoomableGroup>
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const isVisited = visitedCountryCodes.has(geo.id);
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={
                            isVisited
                              ? '#10b981'
                              : '#e5e7eb'
                          }
                          stroke="#ffffff"
                          strokeWidth={0.5}
                          style={{
                            default: {
                              outline: 'none',
                            },
                            hover: {
                              fill: isVisited ? '#059669' : '#d1d5db',
                              outline: 'none',
                              cursor: isVisited ? 'pointer' : 'default',
                            },
                            pressed: {
                              outline: 'none',
                            },
                          }}
                          onMouseEnter={() => {
                            if (isVisited) {
                              const country = visitedCountries.find(c => c.iso === geo.id);
                              setHoveredCountry(country?.name || null);
                            }
                          }}
                          onMouseLeave={() => {
                            setHoveredCountry(null);
                          }}
                        />
                      );
                    })
                  }
                </Geographies>

                {/* Markers for visited countries */}
                {visitedCountries.map((country) => (
                  <Marker key={country.iso} coordinates={country.coordinates as [number, number]}>
                    <circle r={4} fill="#ef4444" stroke="#ffffff" strokeWidth={2} />
                  </Marker>
                ))}
              </ZoomableGroup>
            </ComposableMap>

            {/* Tooltip */}
            {hoveredCountry && (
              <div className="pointer-events-none absolute left-1/2 top-8 -translate-x-1/2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-lg">
                {hoveredCountry}
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="border-t border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-700 dark:bg-gray-800/50">
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-sm bg-green-500"></div>
                <span className="font-['Inter'] text-gray-700 dark:text-gray-300">Visited Countries</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-red-500"></div>
                <span className="font-['Inter'] text-gray-700 dark:text-gray-300">Travel Highlights</span>
              </div>
              <div className="font-['Inter'] font-semibold text-gray-900 dark:text-white">
                {visitedCountries.length} Countries Explored
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
