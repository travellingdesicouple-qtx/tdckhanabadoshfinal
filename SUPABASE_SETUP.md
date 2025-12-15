# Supabase Setup Guide 🚀

Complete guide to set up your backend database and storage for the Travel Vlogging Website.

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign in / Create account
3. Click **"New Project"**
4. Fill in:
   - **Project Name**: Travel Vlog Website
   - **Database Password**: (create a strong password and save it)
   - **Region**: Choose closest to your users
5. Click **"Create new project"** (takes 1-2 minutes)

## Step 2: Get API Credentials

1. In your Supabase dashboard, go to **Settings** (gear icon)
2. Click **API** in the sidebar
3. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (under "Project API keys")

## Step 3: Configure Environment Variables

1. Create a file named `.env` in your project root:
   ```
   F:\Travel Vlogging Website Design\.env
   ```

2. Add these lines (replace with your actual values):
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

3. Save the file

## Step 4: Create Database Tables

1. In Supabase dashboard, click **SQL Editor** in the sidebar
2. Click **"New Query"**
3. Open the file `supabase/database/schema.sql` from your project
4. Copy ALL the content from that file
5. Paste it into the SQL Editor
6. Click **"Run"** (bottom right)
7. You should see: ✅ Success. No rows returned

## Step 5: Create Storage Buckets

1. In Supabase dashboard, click **Storage** in the sidebar
2. Click **"Create a new bucket"**
3. Create these 5 buckets (one by one):

   **Bucket 1: advertisements**
   - Name: `advertisements`
   - Public bucket: ✅ YES
   - Click "Create bucket"

   **Bucket 2: blogs**
   - Name: `blogs`
   - Public bucket: ✅ YES
   - Click "Create bucket"

   **Bucket 3: adventures**
   - Name: `adventures`
   - Public bucket: ✅ YES
   - Click "Create bucket"

   **Bucket 4: products**
   - Name: `products`
   - Public bucket: ✅ YES
   - Click "Create bucket"

   **Bucket 5: orders**
   - Name: `orders`
   - Public bucket: ✅ YES
   - Click "Create bucket"

## Step 5.1: Create Comments Table (New Feature)

Run this SQL in the **SQL Editor** to enable the comments feature:

```sql
create table public.comments (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  content text not null,
  post_id uuid, -- Optional: link to blog/adventure id
  is_read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS (Row Level Security) if needed, or leave open for now
alter table public.comments enable row level security;

-- Policy: Allow public to insert (post comments)
create policy "Allow public insert" on public.comments
  for insert with check (true);

-- Policy: Allow authenticated (admin) to view/update/delete
create policy "Allow admin all" on public.comments
  for all using (auth.role() = 'authenticated');
```

## Step 6: Verify Setup

1. Go to **Table Editor** in Supabase
2. You should see these tables:
   - ✅ advertisements
   - ✅ blogs
   - ✅ adventures
   - ✅ products
   - ✅ reels
   - ✅ orders

3. Go to **Storage** in Supabase
4. You should see these buckets:
   - ✅ advertisements
   - ✅ blogs
   - ✅ adventures
   - ✅ products
   - ✅ orders

## Step 7: Test Your Setup

1. Run your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the admin panel:
   ```
   http://localhost:5173/#adminpanel
   ```

3. Click **"Ad Manager"** → **"Create Advertisement"**
4. Fill in the form:
   - Title: Test Ad
   - Size: Banner
   - Placement: Homepage
   - Upload an image
   - Add a link (optional)
5. Click **"Save Ad"**
6. You should see: ✅ "Advertisement created successfully!"

7. Check in Supabase:
   - Go to **Table Editor** → **advertisements**
   - You should see your test ad!
   - Go to **Storage** → **advertisements**
   - You should see your uploaded image!

## Step 8: View Live Ads

1. Navigate to your homepage:
   ```
   http://localhost:5173/
   ```

2. Your test ad should now appear automatically! 🎉

## Troubleshooting

### Error: "Invalid API key"
- Double-check your `.env` file
- Make sure you copied the **anon public** key (not the service role key)
- Restart your dev server after changing `.env`

### Error: "Failed to create bucket"
- Make sure all bucket names are lowercase
- Check that you marked them as "Public"

### Error: "No rows returned" when running SQL
- This is actually SUCCESS! It means the SQL ran without errors
- Go to Table Editor to verify tables were created

### Images not uploading
- Check Storage buckets exist
- Verify buckets are marked as "Public"
- Check browser console for errors

### Ads not showing on website
- Check that ad is marked as "active" in database
- Verify the placement matches (e.g., homepage, blogs)
- Check browser console for API errors

## Next Steps

Now you can:
- ✅ Add advertisements through admin panel
- ✅ Create blog posts with images
- ✅ Upload adventure vlogs
- ✅ Add products to shop
- ✅ Manage orders

Everything saves to the database automatically! No code editing needed! 🚀

## Security Notes

⚠️ **Important**: 
- Never commit `.env` file to Git
- The `.env` file is already in `.gitignore`
- For production, set environment variables in your hosting platform (Vercel/Netlify/etc.)

## Need Help?

If you encounter issues:
1. Check the browser console (F12) for errors
2. Check Supabase logs in the dashboard
3. Verify all environment variables are set correctly
4. Make sure SQL schema ran successfully
