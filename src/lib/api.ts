import { supabase, Advertisement, Blog, Adventure, Product, Reel, Order, HeroSlide, uploadFile, isSupabaseConfigured } from './supabase'

// Re-export types for use in components
export type { Advertisement, Blog, Adventure, Product, Reel, Order, HeroSlide, Comment }

// =====================================================
// ADVERTISEMENTS API
// =====================================================
export const adsApi = {
  // Get all active ads for a specific placement and size
  async getActive(placement: string, size: string): Promise<Advertisement[]> {
    // Return empty array if Supabase is not configured
    if (!isSupabaseConfigured) {
      return []
    }

    const { data, error } = await supabase
      .from('advertisements')
      .select('*')
      .eq('active', true)
      .eq('placement', placement)
      .eq('size', size)

    if (error) {
      console.error('Error fetching ads:', error)
      return []
    }

    return data || []
  },

  // Get all ads (admin only)
  async getAll(): Promise<Advertisement[]> {
    const { data, error } = await supabase
      .from('advertisements')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching all ads:', error)
      return []
    }

    return data || []
  },

  // Create new ad with image upload
  async create(adData: Omit<Advertisement, 'id' | 'created_at' | 'updated_at'>, imageFile: File): Promise<{ data: Advertisement | null; error: Error | null }> {
    try {
      // Upload image first
      const { url: imageUrl, error: uploadError } = await uploadFile('ADVERTISEMENTS', imageFile)

      if (uploadError) throw uploadError

      // Insert ad data
      const { data, error } = await supabase
        .from('advertisements')
        .insert([{
          ...adData,
          image_url: imageUrl,
        }])
        .select()
        .single()

      if (error) throw error

      return { data, error: null }
    } catch (error) {
      console.error('Error creating ad:', error)
      return { data: null, error: error as Error }
    }
  },

  // Update ad
  async update(id: string, updates: Partial<Advertisement>, newImageFile?: File): Promise<{ error: Error | null }> {
    try {
      let imageUrl = updates.image_url

      // Upload new image if provided
      if (newImageFile) {
        const { url, error: uploadError } = await uploadFile('ADVERTISEMENTS', newImageFile)
        if (uploadError) throw uploadError
        imageUrl = url
      }

      const { error } = await supabase
        .from('advertisements')
        .update({ ...updates, image_url: imageUrl })
        .eq('id', id)

      if (error) throw error
      return { error: null }
    } catch (error) {
      console.error('Error updating ad:', error)
      return { error: error as Error }
    }
  },

  // Delete ad
  async delete(id: string): Promise<{ error: Error | null }> {
    const { error } = await supabase
      .from('advertisements')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting ad:', error)
      return { error }
    }

    return { error: null }
  },

  // Toggle active status
  async toggleActive(id: string, active: boolean): Promise<{ error: Error | null }> {
    const { error } = await supabase
      .from('advertisements')
      .update({ active })
      .eq('id', id)

    if (error) {
      console.error('Error toggling ad status:', error)
      return { error }
    }

    return { error: null }
  },
}

// =====================================================
// BLOGS API
// =====================================================
export const blogsApi = {
  async getAll(): Promise<Blog[]> {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching blogs:', error)
      return []
    }

    return data || []
  },

  async getBySlug(slug: string): Promise<Blog | null> {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) {
      console.error('Error fetching blog:', error)
      return null
    }

    return data
  },

  async create(blogData: Omit<Blog, 'id' | 'created_at' | 'updated_at'>, coverImage: File, galleryImages?: File[]): Promise<{ data: Blog | null; error: Error | null }> {
    try {
      // Upload cover image
      const { url: coverUrl, error: coverError } = await uploadFile('BLOGS', coverImage)
      if (coverError) throw coverError

      // Upload gallery images
      let galleryUrls: string[] = []
      if (galleryImages && galleryImages.length > 0) {
        const uploadPromises = galleryImages.map(file => uploadFile('BLOGS', file))
        const results = await Promise.all(uploadPromises)
        galleryUrls = results.filter(r => !r.error).map(r => r.url)
      }

      // Insert blog
      const { data, error } = await supabase
        .from('blogs')
        .insert([{
          ...blogData,
          cover_image: coverUrl,
          gallery_images: galleryUrls,
        }])
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error creating blog:', error)
      return { data: null, error: error as Error }
    }
  },
}

// =====================================================
// ADVENTURES API
// =====================================================
export const adventuresApi = {
  async getAll(): Promise<Adventure[]> {
    const { data, error } = await supabase
      .from('adventures')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching adventures:', error)
      return []
    }

    return data || []
  },

  async create(adventureData: Omit<Adventure, 'id' | 'created_at' | 'updated_at'>, coverImage: File): Promise<{ data: Adventure | null; error: Error | null }> {
    try {
      const { url: coverUrl, error: uploadError } = await uploadFile('BLOGS', coverImage)
      if (uploadError) throw uploadError

      const { data, error } = await supabase
        .from('adventures')
        .insert([{
          ...adventureData,
          cover_image: coverUrl,
        }])
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error creating adventure:', error)
      return { data: null, error: error as Error }
    }
  },
}

// =====================================================
// PRODUCTS API
// =====================================================
export const productsApi = {
  async getAll(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching products:', error)
      return []
    }

    return data || []
  },

  async create(productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>, coverImage: File): Promise<{ data: Product | null; error: Error | null }> {
    try {
      const { url: coverUrl, error: uploadError } = await uploadFile('PRODUCTS', coverImage)
      if (uploadError) throw uploadError

      const { data, error } = await supabase
        .from('products')
        .insert([{
          ...productData,
          cover_image: coverUrl,
        }])
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error creating product:', error)
      return { data: null, error: error as Error }
    }
  },
}

// =====================================================
// REELS API
// =====================================================
export const reelsApi = {
  async getAll(): Promise<Reel[]> {
    const { data, error } = await supabase
      .from('reels')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching reels:', error)
      return []
    }

    return data || []
  },

  async create(reelData: Omit<Reel, 'id' | 'created_at' | 'updated_at'>): Promise<{ data: Reel | null; error: Error | null }> {
    try {
      const { data, error } = await supabase
        .from('reels')
        .insert([reelData])
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error creating reel:', error)
      return { data: null, error: error as Error }
    }
  },
}

// =====================================================
// ORDERS API
// =====================================================
export const ordersApi = {
  async getAll(): Promise<Order[]> {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching orders:', error)
      return []
    }

    return data || []
  },

  async create(orderData: Omit<Order, 'id' | 'created_at' | 'updated_at'>, transactionProof: File): Promise<{ data: Order | null; error: Error | null }> {
    try {
      const { url: proofUrl, error: uploadError } = await uploadFile('ORDERS', transactionProof)
      if (uploadError) throw uploadError

      const { data, error } = await supabase
        .from('orders')
        .insert([{
          ...orderData,
          transaction_proof_url: proofUrl,
        }])
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error creating order:', error)
      return { data: null, error: error as Error }
    }
  },

  async updateStatus(id: string, status: Order['status'], notes?: string): Promise<{ error: Error | null }> {
    const { error } = await supabase
      .from('orders')
      .update({ status, notes })
      .eq('id', id)

    if (error) {
      console.error('Error updating order:', error)
      return { error }
    }

    return { error: null }
  },
}

// =====================================================
// IMAGE LICENSES API
// =====================================================
export interface ImageLicense {
  id?: string
  image_url: string
  title?: string
  photographer_name?: string
  license_type: 'owned' | 'unsplash' | 'pexels' | 'pixabay' | 'cc0' | 'cc-by' | 'commercial'
  source_url?: string
  attribution_text?: string
  purchased_license?: boolean
  license_details?: any
  used_in?: string
  entity_id?: string
  created_at?: string
  updated_at?: string
}

export const imageLicensesApi = {
  async create(licenseData: Omit<ImageLicense, 'id' | 'created_at' | 'updated_at'>): Promise<{ data: ImageLicense | null; error: Error | null }> {
    try {
      const { data, error } = await supabase
        .from('image_licenses')
        .insert([licenseData])
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error creating image license:', error)
      return { data: null, error: error as Error }
    }
  },

  async getByEntity(entityId: string, usedIn: string): Promise<ImageLicense[]> {
    const { data, error } = await supabase
      .from('image_licenses')
      .select('*')
      .eq('entity_id', entityId)
      .eq('used_in', usedIn)

    if (error) {
      console.error('Error fetching image licenses:', error)
      return []
    }

    return data || []
  },

  async getAll(): Promise<ImageLicense[]> {
    const { data, error } = await supabase
      .from('image_licenses')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching all image licenses:', error)
      return []
    }

    return data || []
  },
}

// =====================================================
// HERO SLIDES API
// =====================================================
export const heroSlidesApi = {
  async getAll(): Promise<HeroSlide[]> {
    const { data, error } = await supabase
      .from('hero_slides')
      .select('*')
      .eq('active', true)
      .order('display_order', { ascending: true })

    if (error) {
      console.error('Error fetching hero slides:', error)
      return []
    }

    return data || []
  },

  async create(slideData: Omit<HeroSlide, 'id' | 'created_at' | 'updated_at'>): Promise<{ data: HeroSlide | null; error: Error | null }> {
    try {
      const { data, error } = await supabase
        .from('hero_slides')
        .insert([slideData])
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error creating hero slide:', error)
      return { data: null, error: error as Error }
    }
  },

  async delete(id: string): Promise<{ error: Error | null }> {
    const { error } = await supabase
      .from('hero_slides')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting hero slide:', error)
      return { error }
    }

    return { error: null }
  },
}

// =====================================================
// COMMENTS API
// =====================================================
export interface Comment {
  id: string
  name: string
  email: string
  content: string
  post_id?: string
  is_read: boolean
  created_at: string
}

export const commentsApi = {
  // Get all comments (sorted by newest, can filter by unread)
  async getAll(): Promise<Comment[]> {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching comments:', error)
      return []
    }

    return data || []
  },

  // Get only unread comments
  async getUnread(): Promise<Comment[]> {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('is_read', false)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching unread comments:', error)
      return []
    }

    return data || []
  },

  async create(commentData: Omit<Comment, 'id' | 'is_read' | 'created_at'>): Promise<{ data: Comment | null; error: Error | null }> {
    try {
      const { data, error } = await supabase
        .from('comments')
        .insert([{ ...commentData, is_read: false }])
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error creating comment:', error)
      return { data: null, error: error as Error }
    }
  },

  async markAsRead(id: string): Promise<{ error: Error | null }> {
    const { error } = await supabase
      .from('comments')
      .update({ is_read: true })
      .eq('id', id)

    if (error) {
      console.error('Error marking comment as read:', error)
      return { error }
    }
    return { error: null }
  },

  async delete(id: string): Promise<{ error: Error | null }> {
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting comment:', error)
      return { error }
    }
    return { error: null }
  }
}
