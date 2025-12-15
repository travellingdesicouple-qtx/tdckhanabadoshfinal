/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js'

// Supabase configuration
// Replace these with your actual Supabase project credentials
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// Create Supabase client (dummy client if not configured)
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder-key'
)

// Check if Supabase is properly configured
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey && supabaseUrl !== '' && supabaseAnonKey !== '')

// Database types
export interface Advertisement {
  id: string
  title: string
  size: 'banner' | 'square' | 'sidebar' | 'leaderboard'
  placement: 'blogs' | 'adventures' | 'shop' | 'homepage'
  image_url: string
  link_url?: string
  active: boolean
  created_at: string
  updated_at: string
}

export interface Blog {
  id: string
  title: string
  slug: string
  excerpt?: string
  content: string
  cover_image: string
  author: string
  category: string
  tags?: string[]
  youtube_video_id?: string
  gallery_images?: string[]
  read_time?: string
  featured: boolean
  published: boolean
  created_at: string
  updated_at: string
}

export interface Adventure {
  id: string
  title: string
  slug: string
  location: string
  description: string
  cover_image: string
  category: string
  youtube_video_id: string
  duration?: string
  difficulty?: 'Easy' | 'Moderate' | 'Challenging' | 'Extreme'
  published: boolean
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  title: string
  slug: string
  price: number
  category: string
  product_type: string
  description: string
  features?: string[]
  cover_image: string
  download_link?: string
  in_stock: boolean
  published: boolean
  created_at: string
  updated_at: string
}

export interface Reel {
  id: string
  title: string
  category: string
  video_url: string
  duration?: string
  views: number
  published: boolean
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  order_number: string
  customer_name: string
  customer_email: string
  customer_country?: string
  product_id?: string
  product_title: string
  amount: number
  payment_method: string
  transaction_proof_url: string
  payment_details?: any
  status: 'pending' | 'verified' | 'rejected' | 'delivered'
  notes?: string
  created_at: string
  updated_at: string
}

// Storage buckets
export const STORAGE_BUCKETS = {
  ADVERTISEMENTS: 'advertisements',
  BLOGS: 'blogs',
  PRODUCTS: 'products',
  ORDERS: 'orders',
} as const

// Upload file to Supabase Storage
export async function uploadFile(
  bucket: keyof typeof STORAGE_BUCKETS,
  file: File,
  path?: string
): Promise<{ url: string; error: Error | null }> {
  try {
    const fileName = path || `${Date.now()}-${file.name}`
    const bucketName = STORAGE_BUCKETS[bucket]

    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (error) throw error

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(fileName)

    return { url: urlData.publicUrl, error: null }
  } catch (error) {
    console.error('Upload error:', error)
    return { url: '', error: error as Error }
  }
}

// Delete file from Supabase Storage
export async function deleteFile(
  bucket: keyof typeof STORAGE_BUCKETS,
  path: string
): Promise<{ error: Error | null }> {
  try {
    const bucketName = STORAGE_BUCKETS[bucket]
    const { error } = await supabase.storage.from(bucketName).remove([path])

    if (error) throw error
    return { error: null }
  } catch (error) {
    console.error('Delete error:', error)
    return { error: error as Error }
  }
}
