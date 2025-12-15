// Sample data for the travel vlogging website

export const visitedCountries = [
  { iso: "PAK", name: "Pakistan", coordinates: [69.3451, 30.3753] },
  { iso: "THA", name: "Thailand", coordinates: [100.9925, 15.87] },
  { iso: "KHM", name: "Cambodia", coordinates: [104.9910, 12.5657] },
  { iso: "MYS", name: "Malaysia", coordinates: [101.9758, 4.2105] },
  { iso: "SGP", name: "Singapore", coordinates: [103.8198, 1.3521] },
  { iso: "LKA", name: "Sri Lanka", coordinates: [80.7718, 7.8731] },
  { iso: "AZE", name: "Azerbaijan", coordinates: [47.5769, 40.1431] },
];

export const blogPosts = [
  {
    id: "1",
    title: "Exploring the Temples of Angkor Wat",
    slug: "temples-angkor-wat",
    excerpt: "A journey through Cambodia's ancient temple complex and the stories they tell.",
    coverImage: "https://images.unsplash.com/photo-1570366583862-f91883984fde?w=800",
    category: "Adventure",
    visitedLocation: "Cambodia",
    isFeatured: true,
    date: "2024-11-15",
    readTime: "8 min read",
    youtubeVideoId: "dQw4w9WgXcQ", // Adventure - has video
    gallery: [
      "https://images.unsplash.com/photo-1570366583862-f91883984fde?w=800",
      "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800",
      "https://images.unsplash.com/photo-1563640214-ed2c6d5ff56b?w=800",
      "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800",
    ],
    content: `
      <h2 id="introduction">Introduction to Angkor Wat</h2>
      <p>Angkor Wat is not just a temple; it's a masterpiece of Khmer architecture and a testament to human ingenuity. Built in the 12th century, this UNESCO World Heritage site continues to amaze visitors with its intricate carvings and massive scale.</p>
      
      <h2 id="sunrise">The Magical Sunrise</h2>
      <p>Waking up at 4 AM might sound challenging, but the reward is unparalleled. Watching the sun rise behind the iconic towers of Angkor Wat, reflected in the pools in front, is a moment that stays with you forever.</p>
      
      <h3 id="photography-tips">Photography Tips</h3>
      <p>For photographers, arrive early to secure your spot. Bring a wide-angle lens and a tripod. The golden hour light creates stunning silhouettes against the temple backdrop.</p>
      
      <h2 id="exploring-complex">Exploring the Complex</h2>
      <p>The Angkor Archaeological Park spans over 400 square kilometers. Beyond Angkor Wat, don't miss Bayon Temple with its enigmatic stone faces and Ta Prohm, where nature and architecture merge in a breathtaking dance.</p>
      
      <h3 id="best-time">Best Time to Visit</h3>
      <p>The dry season (November to March) offers the most comfortable weather. However, visiting during the rainy season has its own charm with fewer crowds and lush green surroundings.</p>
    `,
  },
  {
    id: "2",
    title: "Street Food Adventures in Bangkok",
    slug: "bangkok-street-food",
    excerpt: "Discovering the incredible flavors of Thai street food culture.",
    coverImage: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
    category: "Food",
    visitedLocation: "Thailand",
    isFeatured: false,
    date: "2024-10-28",
    readTime: "6 min read",
    // No youtubeVideoId - this is a blog
    gallery: [
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
      "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=800",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
    ],
    content: `
      <h2 id="intro">The Soul of Bangkok</h2>
      <p>Bangkok's street food scene is legendary. From sizzling woks to aromatic curries, every corner offers a new culinary adventure.</p>
      
      <h2 id="must-try">Must-Try Dishes</h2>
      <p>Pad Thai, Som Tam, and Mango Sticky Rice are just the beginning. Venture into local markets to discover authentic flavors.</p>
    `,
  },
  {
    id: "3",
    title: "Hiking the Inca Trail to Machu Picchu",
    slug: "inca-trail-machu-picchu",
    excerpt: "Four days of trekking through the Andes to reach the Lost City.",
    coverImage: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800",
    category: "Adventure",
    visitedLocation: "Peru",
    isFeatured: true,
    date: "2024-09-12",
    readTime: "10 min read",
    youtubeVideoId: "dQw4w9WgXcQ", // Adventure - has video
    gallery: [
      "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800",
      "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800",
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800",
      "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800",
    ],
    content: `
      <h2 id="preparation">Preparing for the Trek</h2>
      <p>The Inca Trail requires advance booking and proper preparation. Acclimatization is crucial at high altitudes.</p>
      
      <h2 id="day-by-day">Day by Day Journey</h2>
      <p>Each day brings new challenges and rewards, from crossing mountain passes to exploring ancient Inca ruins along the way.</p>
    `,
  },
];

export const products = [
  {
    id: "1",
    title: "Lightroom Presets Bundle",
    price: 29.99,
    type: "Preset",
    lemonSqueezyUrl: "https://example.com/presets",
    image: "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=400",
    description: "Professional travel photography presets for warm, cinematic looks",
  },
  {
    id: "2",
    title: "Travel Photography Masterclass",
    price: 99.99,
    type: "Course",
    lemonSqueezyUrl: "https://example.com/course",
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400",
    description: "Complete guide to capturing stunning travel photos",
  },
  {
    id: "3",
    title: "Ultimate Travel Guide eBook",
    price: 19.99,
    type: "Book",
    lemonSqueezyUrl: "https://example.com/ebook",
    image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=400",
    description: "Tips, tricks, and insider secrets for budget travelers",
  },
];

export const gearItems = [
  {
    id: "1",
    name: "Sony A7 IV Camera",
    affiliateLink: "https://amazon.com/sony-a7iv",
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=200",
    category: "Camera",
  },
  {
    id: "2",
    name: "Peak Design Travel Backpack",
    affiliateLink: "https://amazon.com/peak-design",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200",
    category: "Gear",
  },
  {
    id: "3",
    name: "DJI Mini 3 Pro Drone",
    affiliateLink: "https://amazon.com/dji-mini",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=200",
    category: "Drone",
  },
];

// Reels/Shorts data
export const reelsData = [
  {
    id: "1",
    title: "Sunrise at Angkor Wat",
    thumbnail: "https://images.unsplash.com/photo-1570366583862-f91883984fde?w=400",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category: "Adventure",
    location: "Cambodia",
    views: "125K",
    likes: "12K",
    duration: "0:45",
    date: "2024-11-20",
    description: "Witnessing the magical sunrise at Angkor Wat temple complex",
  },
  {
    id: "2",
    title: "Thai Street Food Tour",
    thumbnail: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category: "Food",
    location: "Bangkok, Thailand",
    views: "98K",
    likes: "9.5K",
    duration: "1:00",
    date: "2024-11-15",
    description: "Exploring the vibrant street food scene in Bangkok",
  },
  {
    id: "3",
    title: "Machu Picchu First View",
    thumbnail: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=400",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category: "Adventure",
    location: "Peru",
    views: "200K",
    likes: "18K",
    duration: "0:55",
    date: "2024-11-10",
    description: "First glimpse of Machu Picchu after hiking the Inca Trail",
  },
  {
    id: "4",
    title: "Tokyo Neon Nights",
    thumbnail: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category: "Culture",
    location: "Tokyo, Japan",
    views: "156K",
    likes: "14K",
    duration: "0:50",
    date: "2024-11-05",
    description: "Walking through Tokyo's vibrant neon-lit streets at night",
  },
  {
    id: "5",
    title: "Santorini Sunset",
    thumbnail: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=400",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category: "Travel Tips",
    location: "Santorini, Greece",
    views: "180K",
    likes: "16K",
    duration: "0:40",
    date: "2024-11-01",
    description: "Capturing the famous Santorini sunset in Oia",
  },
  {
    id: "6",
    title: "Safari Wildlife",
    thumbnail: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category: "Adventure",
    location: "Kenya",
    views: "220K",
    likes: "21K",
    duration: "1:05",
    date: "2024-10-28",
    description: "Close encounter with wildlife on an African safari",
  },
];

// Blog categories with descriptions
export const blogCategories = [
  {
    id: "all",
    name: "All",
    slug: "all",
    description: "All blog posts",
    color: "gray",
  },
  {
    id: "adventure",
    name: "Adventure",
    slug: "adventure",
    description: "Thrilling adventures and outdoor experiences",
    color: "emerald",
    icon: "🏔️",
  },
  {
    id: "food",
    name: "Food",
    slug: "food",
    description: "Culinary journeys and local cuisines",
    color: "orange",
    icon: "🍜",
  },
  {
    id: "culture",
    name: "Culture",
    slug: "culture",
    description: "Cultural experiences and local traditions",
    color: "purple",
    icon: "🎭",
  },
  {
    id: "travel-tips",
    name: "Travel Tips",
    slug: "travel-tips",
    description: "Practical advice for travelers",
    color: "blue",
    icon: "✈️",
  },
  {
    id: "photography",
    name: "Photography",
    slug: "photography",
    description: "Photography tips and visual stories",
    color: "pink",
    icon: "📸",
  },
];

// Advertisements data
export interface Advertisement {
  id: string;
  title: string;
  size: 'banner' | 'square' | 'sidebar' | 'leaderboard';
  placement: 'blogs' | 'adventures' | 'shop' | 'homepage';
  image: string;
  link?: string;
  active: boolean;
}

export const advertisements: Advertisement[] = [
  {
    id: "ad-1",
    title: "Travel Gear Sale",
    size: "banner",
    placement: "blogs",
    image: "https://images.unsplash.com/photo-1622260614153-03223fb72052?w=1200&h=150&fit=crop",
    link: "https://example.com/travel-gear",
    active: true,
  },
  {
    id: "ad-2",
    title: "Photography Workshop",
    size: "square",
    placement: "blogs",
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&h=600&fit=crop",
    link: "https://example.com/workshop",
    active: true,
  },
  {
    id: "ad-3",
    title: "Adventure Tours",
    size: "banner",
    placement: "adventures",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=150&fit=crop",
    link: "https://example.com/tours",
    active: true,
  },
];
