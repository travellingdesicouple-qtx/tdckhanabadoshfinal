# TDC Khanabadosh - Complete Feature List

## 🎯 Website Structure

### **Homepage** (#home)
Main landing page jahan visitors sabse pehle aayenge

#### Sections:
1. **Hero Section** - Full-screen video background with CTAs
2. **Popular Adventures** - Featured blog posts (maximum 6)
3. **Interactive World Map** - Visited countries visualization
4. **Gallery Preview** - Featured photography (6 images)
5. **Featured Shop Products** - Bestsellers (3 products)
6. **About Section** - Brand story and mission

---

## 📄 Separate Pages

### 1. **Adventures Page** (#all-adventures)
- Complete list of ALL blog posts
- Search functionality by title/description
- Filter by category (Adventure, Food, etc.)
- Shows post count
- Individual post cards with:
  - Cover image with hover effects
  - Title, excerpt, category
  - Date and read time
  - Featured badge
  - "Read More" link

**Navigation:** Navbar → Adventures OR Homepage → "View All Adventures" button

---

### 2. **Gallery Page** (#gallery)
**Photo Licensing Platform**
- Browse ALL photography
- Filter by category (Landscapes, Mountains, Cityscapes, etc.)
- Click image to open licensing modal

#### Licensing Modal Features:
- Large image preview
- Three license types:
  1. **Personal License** - $25-45
     - Personal use only
     - Social media posting
     - Prints up to 24x36"
     - Digital wallpapers
  
  2. **Commercial License** - $89-180
     - Commercial use allowed
     - Marketing materials
     - Website/blog use
     - Up to 500K impressions
  
  3. **Exclusive Rights** - $449-899
     - Full exclusive ownership
     - Original RAW file
     - Unlimited use
     - Image removed from sale

**Navigation:** Navbar → Gallery OR Homepage → "Browse Full Gallery" button

---

### 3. **Shop Page** (#shop-page)
**Complete Digital Store**

#### Product Categories:
1. **Courses** (Photography, Drone, Mobile)
2. **Books** (Digital Nomad guides, Budget travel)
3. **Itineraries** (Southeast Asia, Europe, Japan)
4. **Presets** (Lightroom presets)

#### Product Cards Include:
- Product image with hover zoom
- Featured/Bestseller badges
- Star ratings and review count
- Duration (for courses)
- "What's Included" list
- Original price (if discounted)
- Current price
- "Buy Now" button

#### Trust Section:
- Expert-Led Content
- 30-Day Money-Back Guarantee
- Lifetime Access

**Navigation:** Navbar → Shop OR Homepage → "Browse All Products" button

---

## 🎨 Component Architecture

### Homepage Components:
```
Homepage
├── Hero.tsx (Full-screen video hero)
├── Adventures.tsx (Featured posts only)
├── WorldMap.tsx (Interactive map)
├── GalleryPreview.tsx (6 featured images)
├── ShopShowcase.tsx (3 featured products)
└── About.tsx (Brand story)
```

### Separate Pages:
```
Pages
├── AdventuresPage.tsx (All blog posts)
├── GalleryPage.tsx (All images + licensing)
└── ShopPage.tsx (All products)
```

### Shared Components:
```
Shared
├── Navbar.tsx (Sticky navigation)
├── BlogPostLayout.tsx (Blog post detail view)
└── Footer.tsx (Site footer)
```

---

## 🎯 User Journeys

### Journey 1: Reading Blog Posts
1. Land on homepage → See featured adventures
2. Click "View All Adventures" OR Navbar → Adventures
3. Search/Filter posts by category
4. Click "Read More" → Full blog post with sticky sidebar

### Journey 2: Licensing Photos
1. Land on homepage → See gallery preview
2. Click "Browse Full Gallery" OR Navbar → Gallery
3. Filter by category (Landscapes, Mountains, etc.)
4. Click image → Licensing modal opens
5. Choose license type (Personal/Commercial/Exclusive)
6. Click "Purchase License"

### Journey 3: Buying Digital Products
1. Land on homepage → See featured products
2. Click "Browse All Products" OR Navbar → Shop
3. Filter by category (Courses, Books, Itineraries, Presets)
4. See ratings, reviews, and what's included
5. Click "Buy Now"

---

## 🔥 Key Features

### ✅ Homepage Features:
- **Smart Content Filtering:**
  - Only featured/bestseller adventures show
  - Only featured gallery images show
  - Only featured/bestseller products show
- **CTAs everywhere** to drive traffic to full pages
- **Smooth animations** using Motion (Framer Motion)
- **Responsive design** - Mobile, Tablet, Desktop

### ✅ Navigation:
- **Hash-based routing** - No page reloads
- **Sticky navbar** - Transparent on hero, solid on scroll
- **Dark/Light mode** toggle
- **Mobile responsive** menu

### ✅ Adventures Page:
- **Real-time search** by title/excerpt
- **Category filtering** with count badges
- **Results counter**
- **No results state**

### ✅ Gallery Page:
- **Category filtering**
- **Image licensing** system
- **Three license tiers** with different pricing
- **Modal with image preview**
- **Feature comparison** for licenses

### ✅ Shop Page:
- **Multi-category filtering**
- **Product count badges**
- **Featured/Bestseller labels**
- **Rating system** (stars + review count)
- **Trust indicators** at bottom

---

## 💾 Data Structure

### Blog Posts (`sampleData.ts`)
```typescript
{
  id, title, slug, excerpt, content,
  coverImage, category, visitedLocation,
  isFeatured, date, readTime
}
```

### Gallery Images (`galleryData.ts`)
```typescript
{
  id, title, location, image, category,
  featured, description,
  license: { personal, commercial, exclusive },
  tags
}
```

### Shop Items (`shopData.ts`)
```typescript
{
  id, title, description, longDescription,
  price, originalPrice, type,
  image, featured, bestseller,
  rating, reviews, duration,
  includes[], purchaseUrl
}
```

---

## 🚀 Tech Stack

- **React 18** with TypeScript
- **Tailwind CSS v4** + Typography plugin
- **Motion** (Framer Motion) for animations
- **react-simple-maps** for world map
- **react-responsive-masonry** for grid layouts
- **Lucide React** for icons
- **Supabase** for data persistence

---

## 🎨 Design System

### Fonts:
- **Headings:** Inter (Bold/Heavy)
- **Body:** Merriweather (Readability)

### Colors:
- **Primary:** Emerald Green (#10b981)
- **Secondary:** Amber for badges
- **Neutral:** Gray scales
- **Dark Mode:** Full support

### Components:
- **Cards:** Rounded corners (rounded-2xl)
- **Buttons:** Pill-shaped (rounded-full)
- **Shadows:** Layered depth
- **Hover Effects:** Scale + shadow
- **Transitions:** 300ms duration

---

## 📱 Responsive Breakpoints

- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px

---

## 🔗 URL Structure

- `#home` → Homepage
- `#all-adventures` → Adventures page
- `#gallery` → Gallery page
- `#shop-page` → Shop page
- `#about` → About section (on homepage)
- `#map` → Map section (on homepage)
- `#{post-slug}` → Individual blog post

---

## 🎯 Future Enhancements

1. **Supabase Integration:**
   - Real database for posts/products/images
   - Admin panel for content management
   - User authentication for purchases

2. **Payment Integration:**
   - Stripe/PayPal for shop
   - Automated license delivery
   - Order management

3. **Advanced Features:**
   - Newsletter subscription
   - Comments on blog posts
   - Social media sharing
   - SEO optimization
   - Analytics integration

---

**Yeh complete travel vlogging & digital product website hai jismein:**
- ✅ Separate page har section ke liye
- ✅ Homepage par sirf popular/featured content
- ✅ Image licensing system with 3 price tiers
- ✅ Complete shop with courses, books, itineraries
- ✅ About section with brand story
- ✅ Smooth navigation aur animations
- ✅ Mobile responsive design
- ✅ Dark/Light mode support

**Ready for content aur Supabase integration!** 🚀
