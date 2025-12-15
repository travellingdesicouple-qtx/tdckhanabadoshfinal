// Image Gallery Data with Licensing Options

export interface GalleryImage {
  id: string;
  title: string;
  location: string;
  image: string;
  category: string;
  featured: boolean;
  description: string;
  license: {
    personal: number;
    commercial: number;
    exclusive: number;
  };
  tags: string[];
}

export const galleryImages: GalleryImage[] = [
  {
    id: "1",
    title: "Golden Hour in Santorini",
    location: "Santorini, Greece",
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800",
    category: "Landscapes",
    featured: true,
    description: "Stunning sunset view over the white buildings of Santorini",
    license: {
      personal: 29,
      commercial: 99,
      exclusive: 499,
    },
    tags: ["sunset", "greece", "architecture", "ocean"],
  },
  {
    id: "2",
    title: "Himalayan Peaks",
    location: "Nepal",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
    category: "Mountains",
    featured: true,
    description: "Majestic snow-capped mountains at dawn",
    license: {
      personal: 35,
      commercial: 120,
      exclusive: 599,
    },
    tags: ["mountains", "nepal", "himalaya", "snow"],
  },
  {
    id: "3",
    title: "Tokyo Nights",
    location: "Tokyo, Japan",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
    category: "Cityscapes",
    featured: true,
    description: "Vibrant neon lights of Tokyo's streets",
    license: {
      personal: 25,
      commercial: 89,
      exclusive: 449,
    },
    tags: ["city", "japan", "neon", "nightlife"],
  },
  {
    id: "4",
    title: "Safari Sunset",
    location: "Serengeti, Tanzania",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800",
    category: "Wildlife",
    featured: false,
    description: "Elephants silhouetted against African sunset",
    license: {
      personal: 40,
      commercial: 150,
      exclusive: 699,
    },
    tags: ["wildlife", "africa", "safari", "elephants"],
  },
  {
    id: "5",
    title: "Northern Lights",
    location: "Iceland",
    image: "https://images.unsplash.com/photo-1579033461380-adb47c3eb938?w=800",
    category: "Nature",
    featured: true,
    description: "Aurora Borealis dancing over the mountains",
    license: {
      personal: 45,
      commercial: 180,
      exclusive: 899,
    },
    tags: ["aurora", "iceland", "night", "nature"],
  },
  {
    id: "6",
    title: "Tropical Paradise",
    location: "Maldives",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800",
    category: "Beaches",
    featured: false,
    description: "Crystal clear waters and white sand beaches",
    license: {
      personal: 30,
      commercial: 110,
      exclusive: 549,
    },
    tags: ["beach", "maldives", "tropical", "ocean"],
  },
  {
    id: "7",
    title: "Ancient Temples",
    location: "Angkor Wat, Cambodia",
    image: "https://images.unsplash.com/photo-1570366583862-f91883984fde?w=800",
    category: "Architecture",
    featured: true,
    description: "Historic temple complex at sunrise",
    license: {
      personal: 35,
      commercial: 125,
      exclusive: 599,
    },
    tags: ["temple", "cambodia", "architecture", "history"],
  },
  {
    id: "8",
    title: "Desert Dunes",
    location: "Sahara, Morocco",
    image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800",
    category: "Deserts",
    featured: false,
    description: "Golden sand dunes stretching to the horizon",
    license: {
      personal: 32,
      commercial: 115,
      exclusive: 569,
    },
    tags: ["desert", "morocco", "sahara", "dunes"],
  },
];

export const licenseTypes = [
  {
    id: "personal",
    name: "Personal License",
    description: "For personal projects, social media, and non-commercial use",
    features: [
      "Personal use only",
      "Social media posting",
      "Prints up to 24x36 inches",
      "Digital wallpapers",
    ],
  },
  {
    id: "commercial",
    name: "Commercial License",
    description: "For business use, marketing, and commercial projects",
    features: [
      "Everything in Personal",
      "Commercial use allowed",
      "Marketing materials",
      "Website and blog use",
      "Up to 500,000 impressions",
    ],
  },
  {
    id: "exclusive",
    name: "Exclusive Rights",
    description: "Full exclusive rights to the image",
    features: [
      "Everything in Commercial",
      "Exclusive ownership",
      "Original RAW file included",
      "Unlimited use",
      "Image removed from sale",
    ],
  },
];
