// Shop data for courses, books, and itineraries

export interface ShopItem {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  price: number;
  originalPrice?: number;
  type: "Course" | "Book" | "Itinerary" | "Preset";
  image: string;
  featured: boolean;
  bestseller: boolean;
  rating: number;
  reviews: number;
  duration?: string;
  includes: string[];
  purchaseUrl: string;
}

export const shopItems: ShopItem[] = [
  // Courses
  {
    id: "course-1",
    title: "Travel Photography Masterclass",
    description: "Complete guide to capturing stunning travel photos",
    longDescription: "Learn professional travel photography techniques from composition to editing. This comprehensive course covers everything from camera settings to storytelling through images.",
    price: 99.99,
    originalPrice: 149.99,
    type: "Course",
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=600",
    featured: true,
    bestseller: true,
    rating: 4.9,
    reviews: 1247,
    duration: "8 hours",
    includes: [
      "20+ video lessons",
      "Downloadable resources",
      "Certificate of completion",
      "Lifetime access",
      "Private community access",
    ],
    purchaseUrl: "#",
  },
  {
    id: "course-2",
    title: "Drone Photography for Travelers",
    description: "Master aerial photography and videography",
    longDescription: "From basic flight techniques to cinematic shots, learn everything about drone photography for travel content creation.",
    price: 79.99,
    originalPrice: 119.99,
    type: "Course",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600",
    featured: true,
    bestseller: false,
    rating: 4.7,
    reviews: 856,
    duration: "6 hours",
    includes: [
      "15+ video tutorials",
      "Safety guidelines PDF",
      "Shot list templates",
      "Editing presets",
      "Q&A sessions",
    ],
    purchaseUrl: "#",
  },
  {
    id: "course-3",
    title: "Mobile Photography Workshop",
    description: "Create amazing photos with just your smartphone",
    longDescription: "No expensive camera needed! Learn how to take professional-quality photos using just your smartphone.",
    price: 49.99,
    type: "Course",
    image: "https://images.unsplash.com/photo-1512941675424-1c7c8b78d19e?w=600",
    featured: false,
    bestseller: true,
    rating: 4.8,
    reviews: 2134,
    duration: "4 hours",
    includes: [
      "12 video lessons",
      "Mobile editing apps guide",
      "Composition templates",
      "Lighting techniques",
    ],
    purchaseUrl: "#",
  },

  // Books
  {
    id: "book-1",
    title: "The Digital Nomad's Handbook",
    description: "Your complete guide to location-independent living",
    longDescription: "Everything you need to know about becoming a successful digital nomad, from finding remote work to managing finances on the road.",
    price: 24.99,
    type: "Book",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600",
    featured: true,
    bestseller: true,
    rating: 4.9,
    reviews: 3421,
    includes: [
      "300+ pages",
      "Downloadable PDF",
      "Bonus resource pack",
      "Country guides",
      "Budget templates",
    ],
    purchaseUrl: "#",
  },
  {
    id: "book-2",
    title: "Budget Travel Secrets",
    description: "Travel more while spending less",
    longDescription: "Insider tips and tricks to travel the world on a budget without compromising on experiences.",
    price: 19.99,
    type: "Book",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600",
    featured: false,
    bestseller: true,
    rating: 4.7,
    reviews: 1876,
    includes: [
      "250+ pages",
      "PDF + ePub formats",
      "Money-saving worksheets",
      "Packing lists",
    ],
    purchaseUrl: "#",
  },

  // Itineraries
  {
    id: "itinerary-1",
    title: "Southeast Asia - 30 Days",
    description: "Complete itinerary for Thailand, Vietnam, and Cambodia",
    longDescription: "A carefully crafted 30-day journey through Southeast Asia's most beautiful destinations, including accommodation recommendations, transportation tips, and must-see attractions.",
    price: 39.99,
    type: "Itinerary",
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600",
    featured: true,
    bestseller: false,
    rating: 4.8,
    reviews: 567,
    includes: [
      "Day-by-day plan",
      "Hotel recommendations",
      "Restaurant guide",
      "Transportation tips",
      "Google Maps integration",
      "Budget breakdown",
    ],
    purchaseUrl: "#",
  },
  {
    id: "itinerary-2",
    title: "Europe Backpacking - 2 Weeks",
    description: "The ultimate European adventure itinerary",
    longDescription: "Explore the best of Western Europe in 14 days with this optimized travel route covering iconic cities and hidden gems.",
    price: 29.99,
    type: "Itinerary",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600",
    featured: false,
    bestseller: true,
    rating: 4.9,
    reviews: 923,
    includes: [
      "14-day detailed plan",
      "Train booking tips",
      "Hostel recommendations",
      "City walking tours",
      "Money-saving hacks",
    ],
    purchaseUrl: "#",
  },
  {
    id: "itinerary-3",
    title: "Japan Culture Tour - 10 Days",
    description: "Experience authentic Japan",
    longDescription: "An immersive journey through Japan's culture, temples, food, and modern cities with local insights.",
    price: 34.99,
    type: "Itinerary",
    image: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=600",
    featured: true,
    bestseller: false,
    rating: 5.0,
    reviews: 412,
    includes: [
      "10-day itinerary",
      "JR Pass guide",
      "Cultural etiquette tips",
      "Food recommendations",
      "Temple visiting guide",
    ],
    purchaseUrl: "#",
  },

  // Presets
  {
    id: "preset-1",
    title: "Wanderlust Lightroom Presets",
    description: "Professional presets for travel photos",
    longDescription: "A collection of 30 handcrafted Lightroom presets designed specifically for travel photography, giving your photos that cinematic, warm look.",
    price: 29.99,
    type: "Preset",
    image: "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=600",
    featured: true,
    bestseller: true,
    rating: 4.8,
    reviews: 2156,
    includes: [
      "30 Lightroom presets",
      "Desktop + Mobile versions",
      "Installation guide",
      "Before/after examples",
      "Free updates",
    ],
    purchaseUrl: "#",
  },
];

export const categories = [
  { id: "all", name: "All Products", count: shopItems.length },
  { id: "courses", name: "Courses", count: shopItems.filter(i => i.type === "Course").length },
  { id: "books", name: "Books", count: shopItems.filter(i => i.type === "Book").length },
  { id: "itineraries", name: "Itineraries", count: shopItems.filter(i => i.type === "Itinerary").length },
  { id: "presets", name: "Presets", count: shopItems.filter(i => i.type === "Preset").length },
];
