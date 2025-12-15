-- Supabase Database Schema for The Khanabadosh Website
-- Run this SQL in your Supabase SQL Editor

-- =====================================================
-- ADVERTISEMENTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS advertisements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  size VARCHAR(20) NOT NULL CHECK (size IN ('banner', 'square', 'sidebar', 'leaderboard')),
  placement VARCHAR(20) NOT NULL CHECK (placement IN ('blogs', 'adventures', 'shop', 'homepage')),
  image_url TEXT NOT NULL,
  link_url TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX idx_ads_active_placement_size ON advertisements(active, placement, size);

-- =====================================================
-- BLOGS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image TEXT NOT NULL,
  author VARCHAR(255) DEFAULT 'The Khanabadosh',
  category VARCHAR(50) NOT NULL,
  tags TEXT[],
  youtube_video_id VARCHAR(50),
  gallery_images TEXT[],
  read_time VARCHAR(20),
  featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for slug lookups
CREATE INDEX idx_blogs_slug ON blogs(slug);
CREATE INDEX idx_blogs_category ON blogs(category);
CREATE INDEX idx_blogs_published ON blogs(published);

-- =====================================================
-- ADVENTURES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS adventures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  location VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  cover_image TEXT NOT NULL,
  category VARCHAR(50) NOT NULL,
  youtube_video_id VARCHAR(50) NOT NULL,
  duration VARCHAR(50),
  difficulty VARCHAR(20) CHECK (difficulty IN ('Easy', 'Moderate', 'Challenging', 'Extreme')),
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_adventures_slug ON adventures(slug);
CREATE INDEX idx_adventures_published ON adventures(published);

-- =====================================================
-- PRODUCTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  category VARCHAR(50) NOT NULL,
  product_type VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  features TEXT[],
  cover_image TEXT NOT NULL,
  download_link TEXT,
  in_stock BOOLEAN DEFAULT true,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_published ON products(published);

-- =====================================================
-- REELS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS reels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500) NOT NULL,
  category VARCHAR(50) NOT NULL,
  video_url TEXT NOT NULL,
  duration VARCHAR(20),
  views INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_reels_published ON reels(published);

-- =====================================================
-- ORDERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number VARCHAR(50) UNIQUE NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_country VARCHAR(100),
  product_id UUID REFERENCES products(id),
  product_title VARCHAR(500) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  transaction_proof_url TEXT NOT NULL,
  payment_details JSONB,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'rejected', 'delivered')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_customer_email ON orders(customer_email);

-- =====================================================
-- ENABLE ROW LEVEL SECURITY
-- =====================================================
ALTER TABLE advertisements ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE adventures ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE reels ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- POLICIES FOR PUBLIC READ ACCESS
-- =====================================================

-- Public can read published content
CREATE POLICY "Public can view active ads" ON advertisements
  FOR SELECT USING (active = true);

CREATE POLICY "Public can view published blogs" ON blogs
  FOR SELECT USING (published = true);

CREATE POLICY "Public can view published adventures" ON adventures
  FOR SELECT USING (published = true);

CREATE POLICY "Public can view published products" ON products
  FOR SELECT USING (published = true);

CREATE POLICY "Public can view published reels" ON reels
  FOR SELECT USING (published = true);

-- =====================================================
-- POLICIES FOR AUTHENTICATED USERS (ADMIN)
-- =====================================================

-- Admins can do everything with ads
CREATE POLICY "Authenticated users can insert ads" ON advertisements
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update ads" ON advertisements
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete ads" ON advertisements
  FOR DELETE USING (auth.role() = 'authenticated');

-- Admins can manage blogs
CREATE POLICY "Authenticated users can insert blogs" ON blogs
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update blogs" ON blogs
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete blogs" ON blogs
  FOR DELETE USING (auth.role() = 'authenticated');

-- Admins can manage adventures
CREATE POLICY "Authenticated users can insert adventures" ON adventures
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update adventures" ON adventures
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete adventures" ON adventures
  FOR DELETE USING (auth.role() = 'authenticated');

-- Admins can manage products
CREATE POLICY "Authenticated users can insert products" ON products
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update products" ON products
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete products" ON products
  FOR DELETE USING (auth.role() = 'authenticated');

-- Admins can manage reels
CREATE POLICY "Authenticated users can insert reels" ON reels
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update reels" ON reels
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete reels" ON reels
  FOR DELETE USING (auth.role() = 'authenticated');

-- Admins can view and manage all orders
CREATE POLICY "Authenticated users can view all orders" ON orders
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update orders" ON orders
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Public can create orders
CREATE POLICY "Anyone can create orders" ON orders
  FOR INSERT WITH CHECK (true);

-- =====================================================
-- FUNCTIONS FOR AUTO-UPDATING TIMESTAMPS
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for all tables
CREATE TRIGGER update_advertisements_updated_at BEFORE UPDATE ON advertisements
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blogs_updated_at BEFORE UPDATE ON blogs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_adventures_updated_at BEFORE UPDATE ON adventures
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reels_updated_at BEFORE UPDATE ON reels
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- IMAGE LICENSING TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS image_licenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  title VARCHAR(255),
  photographer_name VARCHAR(255),
  license_type VARCHAR(50) NOT NULL CHECK (license_type IN ('owned', 'unsplash', 'pexels', 'pixabay', 'cc0', 'cc-by', 'commercial')),
  source_url TEXT,
  attribution_text TEXT,
  purchased_license BOOLEAN DEFAULT false,
  license_details JSONB,
  used_in VARCHAR(100), -- 'blog', 'adventure', 'product', 'about'
  entity_id UUID, -- Reference to the blog/adventure/product ID
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_image_licenses_entity ON image_licenses(entity_id);
CREATE INDEX idx_image_licenses_url ON image_licenses(image_url);

ALTER TABLE image_licenses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view image licenses" ON image_licenses
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage image licenses" ON image_licenses
  FOR ALL USING (auth.role() = 'authenticated');

CREATE TRIGGER update_image_licenses_updated_at BEFORE UPDATE ON image_licenses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- STORAGE BUCKETS
-- =====================================================
-- Run these in Supabase Storage section:
-- 1. Create bucket: 'advertisements'
-- 2. Create bucket: 'blogs'
-- 3. Create bucket: 'products'
-- 4. Create bucket: 'orders'
-- Make them public or use signed URLs
