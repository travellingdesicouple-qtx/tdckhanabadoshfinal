# Admin Backend System

## Overview
Complete admin dashboard for managing all website content including blogs, adventures, products, reels, ads, and customer orders.

## Access
Navigate to: `#admin` in your browser
Example: `http://localhost:5173/#admin`

## Features

### 1. **Dashboard** (`#admin`)
- Overview statistics (total blogs, adventures, products, revenue)
- Quick action buttons
- Performance metrics

### 2. **Blog Management** (`#admin-blog-editor`)
**Features:**
- Rich text content editor
- Cover image upload
- Photo gallery upload (multiple images)
- YouTube video integration
- Category selection (Adventure, Food, Culture, Travel Tips, Photography)
- Tags management
- Auto-generated slug from title

**Form Fields:**
- Title (required)
- Author
- Date
- Category
- Excerpt
- Content (markdown supported)
- Cover Image (upload)
- YouTube Video ID
- Tags (comma-separated)
- Gallery Images (multiple upload)

### 3. **Adventure Management** (`#admin-adventure-editor`)
**Features:**
- YouTube video integration (required)
- Cover image upload
- Location tracking
- Difficulty levels
- Duration tracking

**Form Fields:**
- Title (required)
- Location (required)
- Date
- Category
- Duration (e.g., "5 days")
- Difficulty (Easy, Moderate, Challenging, Extreme)
- Description
- Cover Image (upload)
- YouTube Video ID (required)

### 4. **Product Management** (`#admin-product-editor`)
**Features:**
- Digital & physical product support
- Price management
- Feature list
- Download link for digital products
- Image upload

**Form Fields:**
- Product Name (required)
- Price (USD)
- Category (Digital, Physical, Merch)
- Type (Digital Product, E-Book, Preset Pack, T-Shirt, Print, Merchandise)
- Description
- Features (one per line)
- Download Link (for digital products)
- Product Image (upload)

### 5. **Reels/Shorts Management** (`#admin-reel-editor`)
**Features:**
- YouTube Shorts, Instagram Reels, TikTok integration
- Category tagging
- Duration tracking
- View counter

**Form Fields:**
- Title (required)
- Category
- Video URL (required) - supports YouTube, Instagram, TikTok
- Duration

### 6. **Advertisement Management** (`#admin-ad-editor`)
**Features:**
- Multiple ad sizes
- Placement management
- Click tracking
- Image upload

**Form Fields:**
- Ad Title/Name (required)
- Ad Size (Banner 728x90, Square 300x300, Sidebar 160x600, Leaderboard 970x90)
- Placement (Blog Posts, Adventures Page, Shop Page, Homepage)
- Click Destination URL
- Ad Image (upload)

**Ad Size Guidelines:**
- **Banner (728x90):** Best for top/bottom of articles
- **Square (300x300):** Best for in-content placement
- **Sidebar (160x600):** Best for right side column
- **Leaderboard (970x90):** Best for header area

### 7. **Orders Management** (`#admin-orders`)
**Features:**
- Payment verification system
- Transaction proof viewing
- Order status management
- Customer details

**Order States:**
- **Pending:** Awaiting verification
- **Verified:** Payment confirmed, ready to ship
- **Rejected:** Payment issues

**Actions:**
- View transaction proof (full-size image)
- Verify order (approve payment)
- Reject order (payment dispute)
- Send product (after verification)

**Displayed Information:**
- Order ID
- Customer name & email
- Product purchased
- Amount paid
- Payment method used
- Transaction proof screenshot
- Order date
- Status badge

## Image Upload System

### Supported Formats
- PNG
- JPG/JPEG
- GIF (for ads)

### Size Limits
- Regular images: 10MB max
- Ad images: 5MB max

### Upload Process
1. Click "Upload" button
2. Select image from computer
3. Preview shown immediately
4. Image converted to base64 for preview
5. On submit, image file uploaded to server

### Current Implementation
Images are currently stored as **base64 strings** in the form data for preview. 

### Backend Integration Required
To persist images, you need to:
1. Set up file storage (AWS S3, Cloudinary, or local server)
2. Upload image files to storage
3. Save image URLs to database
4. Update frontend to use image URLs instead of base64

## Data Storage

### Current Status
All form submissions currently log to browser console. Data is **NOT persisted**.

### Required Backend Setup

#### Option 1: Supabase (Recommended)
```typescript
// supabase/client.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'YOUR_SUPABASE_URL'
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseKey)
```

**Database Tables Needed:**
- `blogs` - blog posts
- `adventures` - adventure content
- `products` - shop products
- `reels` - short videos
- `ads` - advertisements
- `orders` - customer orders
- `images` - uploaded images

#### Option 2: REST API
Create API endpoints:
```
POST /api/blogs
POST /api/adventures
POST /api/products
POST /api/reels
POST /api/ads
GET  /api/orders
PUT  /api/orders/:id/verify
PUT  /api/orders/:id/reject
```

#### Option 3: Firebase
```typescript
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// Configure Firebase
const firebaseConfig = { ... }
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage(app)
```

## Integration Steps

### 1. Install Dependencies
```bash
# For Supabase
npm install @supabase/supabase-js

# For Firebase
npm install firebase

# For image upload (if using Cloudinary)
npm install cloudinary
```

### 2. Create API Service
```typescript
// services/api.ts
export const api = {
  blogs: {
    create: async (data) => {
      // Upload images first
      const coverImageUrl = await uploadImage(data.coverImage)
      const galleryUrls = await Promise.all(data.gallery.map(uploadImage))
      
      // Save blog data
      return await supabase.from('blogs').insert({
        ...data,
        coverImage: coverImageUrl,
        gallery: galleryUrls
      })
    }
  },
  // ... other resources
}
```

### 3. Update Form Handlers
```typescript
// In BlogEditor.tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  try {
    const result = await api.blogs.create(formData)
    alert('Blog published successfully!')
    window.location.hash = 'admin'
  } catch (error) {
    console.error('Error:', error)
    alert('Failed to publish blog')
  }
}
```

### 4. Add Authentication
```typescript
// Protect admin routes
const requireAuth = () => {
  const user = getCurrentUser()
  if (!user) {
    window.location.hash = 'login'
  }
}

// In AdminDashboard
useEffect(() => {
  requireAuth()
}, [])
```

## Security Considerations

1. **Authentication Required**
   - Add login system before deploying
   - Use JWT tokens or session-based auth
   - Protect all admin routes

2. **Authorization**
   - Verify user roles
   - Only admins can access dashboard
   - Log all admin actions

3. **Input Validation**
   - Sanitize user input
   - Validate file types
   - Check file sizes
   - Prevent XSS attacks

4. **Rate Limiting**
   - Limit upload frequency
   - Prevent spam submissions
   - Monitor API usage

## Environment Variables
Create `.env` file:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

## Next Steps

1. **Setup Database**
   - Create Supabase project
   - Create database tables
   - Set up storage buckets

2. **Implement Image Upload**
   - Configure Cloudinary or S3
   - Create upload utility function
   - Update forms to upload images

3. **Connect API**
   - Create API service layer
   - Update all form submissions
   - Add error handling

4. **Add Authentication**
   - Create login page
   - Implement JWT or session auth
   - Protect admin routes

5. **Deploy**
   - Set environment variables
   - Deploy backend API
   - Deploy frontend with admin

## File Structure
```
src/app/pages/admin/
├── AdminDashboard.tsx    # Main dashboard
├── BlogEditor.tsx        # Create/edit blogs
├── AdventureEditor.tsx   # Create/edit adventures
├── ProductEditor.tsx     # Create/edit products
├── ReelEditor.tsx        # Create/edit reels
├── AdEditor.tsx          # Create/edit ads
└── OrdersManagement.tsx  # View/manage orders
```

## Support
For backend integration help, contact your development team or refer to:
- Supabase Docs: https://supabase.com/docs
- Firebase Docs: https://firebase.google.com/docs
- Cloudinary Docs: https://cloudinary.com/documentation
