# TDC Khanabadosh - Travel Vlogging & Digital Product Website

## 🎨 Design Inspiration
This website is heavily inspired by **BucketListly.blog** with:
- Clean, magazine-style layout
- Heavy focus on whitespace
- Sticky navigation and sidebar elements
- Smooth parallax scrolling effects
- Modern card-based design

## 📁 Project Structure

```
/src
├── /app
│   ├── /components
│   │   ├── Hero.tsx              # Full-screen video hero with CTAs
│   │   ├── Navbar.tsx            # Sticky transparent navbar (turns solid on scroll)
│   │   ├── WorldMap.tsx          # Interactive visited countries map
│   │   ├── Adventures.tsx        # Masonry grid blog posts
│   │   ├── ShopShowcase.tsx      # Digital products showcase
│   │   ├── BlogPostLayout.tsx    # Blog post with sticky sidebar (CRITICAL)
│   │   └── Footer.tsx            # Footer with social links
│   ├── /data
│   │   └── sampleData.ts         # Sample data (posts, products, gear, countries)
│   └── App.tsx                   # Main app component with routing logic
├── /styles
│   ├── fonts.css                 # Google Fonts imports (Inter + Merriweather)
│   ├── theme.css                 # Theme variables and typography
│   ├── tailwind.css              # Tailwind imports
│   └── index.css                 # Main CSS entry point
```

## 🚀 Tech Stack

### Core
- **React 18** with TypeScript
- **Tailwind CSS v4** (with Typography plugin)
- **Motion (Framer Motion)** for smooth animations
- **Lucide React** for icons

### Key Libraries
- **react-simple-maps** - Interactive world map visualization
- **react-responsive-masonry** - Masonry grid layout for blog posts
- **@tailwindcss/typography** - Beautiful prose styling for blog content

### Backend
- **Supabase** - Database for blog posts, products, and gear items

## 🎯 Core Features

### 1. **Global UI/Theme**
- ✅ Sticky transparent header that becomes solid on scroll
- ✅ Dark/Light mode toggle
- ✅ Inter font for headings (Bold/Heavy)
- ✅ Merriweather font for blog content (readability)
- ✅ Smooth scroll animations with Motion

### 2. **Homepage Sections**

#### Hero Section
- Full-screen video background (muted, loop)
- Centered title with gradient overlay
- Two CTA buttons: "Start Learning" & "Watch Vlogs"
- Smooth scroll indicator

#### Interactive Map Section
- Vector map using react-simple-maps
- Highlighted visited countries (green fill)
- Hover effects showing country names
- Red markers for travel highlights
- Legend with visit count

#### Recent Adventures (Masonry Grid)
- Mixed grid of blog posts
- Card hover effects (scale up on hover)
- Category badges
- Featured post indicators
- Read time and date metadata

#### Shop Showcase
- Grid of 3 digital products
- Product cards with images
- Pricing and CTA buttons
- Product types: Presets, Courses, Books

### 3. **Blog Post Layout** (CRITICAL FEATURE)

#### Two-Column Layout:
- **Left Column (70%)**: Main content
  - Rich text with HTML/Markdown support
  - Beautiful typography with @tailwindcss/typography
  - Images and formatted text
  
- **Right Column (30%)**: Sticky Sidebar
  - **Table of Contents**
    - Auto-generated from H2/H3 tags
    - Active section highlighting
    - Smooth scroll to sections
  - **Share This Post**
    - Facebook, Twitter share buttons
    - Copy link functionality
  - **Recommended Gear**
    - Affiliate product cards
    - Images and category labels
    - External links to Amazon

### 4. **Navigation & UX**
- Hash-based routing for blog posts
- Smooth scrolling between sections
- Mobile-responsive design
- Animated page transitions

## 🗃️ Data Models (TypeScript Interfaces)

### Post
```typescript
{
  id: string
  title: string
  slug: string
  content: string (HTML/Markdown)
  coverImage: string
  category: string
  visitedLocation: string
  isFeatured: boolean
  date: string
  readTime: string
  excerpt: string
}
```

### Product
```typescript
{
  id: string
  title: string
  price: number
  type: "Course" | "Preset" | "Book"
  lemonSqueezyUrl: string
  image: string
  description: string
}
```

### Gear
```typescript
{
  id: string
  name: string
  affiliateLink: string
  image: string
  category: string
}
```

### Visited Country
```typescript
{
  iso: string
  name: string
  coordinates: [number, number]
}
```

## 🎨 Color Palette

- **Primary**: Emerald Green (#10b981) - Adventure/CTA
- **Background**: White/Dark Gray
- **Text**: Gray-900/White
- **Accents**: Blue (social), Red (markers)

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**:
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px

## ⚡ Performance Features

- Lazy loading images
- Optimized animations with Motion
- Minimal JavaScript bundle
- CSS-in-Tailwind approach

## 🔧 Key Component Logic

### Navbar Scroll Effect
```typescript
// Detects scroll position and changes navbar background
const [scrolled, setScrolled] = useState(false);
useEffect(() => {
  const handleScroll = () => setScrolled(window.scrollY > 50);
  window.addEventListener('scroll', handleScroll);
}, []);
```

### Blog Post Sticky Sidebar
```typescript
// Sidebar stays fixed while scrolling content
<div className="sticky top-24 space-y-6">
  {/* Table of Contents */}
  {/* Share Buttons */}
  {/* Recommended Gear */}
</div>
```

### Interactive Map Hover
```typescript
// Shows country name on hover
const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
<Geography
  onMouseEnter={() => setHoveredCountry(country.name)}
  onMouseLeave={() => setHoveredCountry(null)}
/>
```

## 🚀 Getting Started

1. All dependencies are pre-installed
2. The app uses Supabase for data persistence
3. Navigate between pages using hash-based routing
4. Click on blog posts to see the sticky sidebar in action

## 📝 Usage Examples

### Adding a New Blog Post
```typescript
// Add to /src/app/data/sampleData.ts
export const blogPosts = [
  {
    id: "4",
    title: "New Adventure",
    slug: "new-adventure",
    // ... other fields
  }
];
```

### Customizing Theme Colors
```css
/* Update in /src/styles/theme.css */
:root {
  --primary: #your-color;
}
```

## 🎯 Future Enhancements

- Add search functionality
- Implement comments system
- Add newsletter subscription
- Create admin dashboard for content management
- Add more interactive map features
- Integrate with actual Supabase database

## 📄 License

This project is built for demonstration purposes.

---

**Built with ❤️ using React, Tailwind CSS, and Motion**
