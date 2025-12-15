import React, { useState } from 'react';
import { ArrowLeft, Save, Upload, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { adsApi } from '../../../lib/api';

export function AdEditor() {
  const [formData, setFormData] = useState({
    title: '',
    size: 'banner',
    image: '',
    link: '',
    placement: 'blogs',
  });

  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!uploadedImage) {
      alert('Please upload an image for the advertisement');
      return;
    }

    setIsSubmitting(true);

    try {
      // Save to database with image upload
      const { data, error } = await adsApi.create(
        {
          title: formData.title,
          size: formData.size as 'banner' | 'square' | 'sidebar' | 'leaderboard',
          placement: formData.placement as 'blogs' | 'adventures' | 'shop' | 'homepage',
          image_url: '', // Will be set by API
          link_url: formData.link || undefined,
          active: true,
        },
        uploadedImage
      );

      if (error) {
        throw error;
      }

      alert(`Advertisement created successfully! 🎉\n\nYour ad is now live on ${formData.placement} pages.\nIt will automatically appear wherever ads are shown.`);
      
      // Reset form
      setFormData({
        title: '',
        size: 'banner',
        image: '',
        link: '',
        placement: 'blogs',
      });
      setUploadedImage(null);
      
      // Go back to admin
      window.location.hash = 'adminpanel';
    } catch (error) {
      console.error('Error saving ad:', error);
      alert(`Failed to save advertisement. Error: ${(error as Error).message}\n\nPlease check:\n1. Supabase is configured (.env file)\n2. Database tables are created\n3. Storage buckets are set up`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button onClick={() => window.location.hash = 'adminpanel'} variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Create Advertisement
            </h1>
          </div>
          <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-pink-600 hover:bg-pink-700">
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            {isSubmitting ? 'Saving...' : 'Save Ad'}
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="p-6">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              Ad Configuration
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Ad Title/Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  placeholder="e.g., Spring Sale Banner"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Ad Size *
                  </label>
                  <select
                    required
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  >
                    <option value="banner">Banner (728x90)</option>
                    <option value="square">Square (300x300)</option>
                    <option value="sidebar">Sidebar (160x600)</option>
                    <option value="leaderboard">Leaderboard (970x90)</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Placement *
                  </label>
                  <select
                    required
                    value={formData.placement}
                    onChange={(e) => setFormData({ ...formData, placement: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  >
                    <option value="blogs">Blog Posts</option>
                    <option value="adventures">Adventures Page</option>
                    <option value="shop">Shop Page</option>
                    <option value="homepage">Homepage</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Click Destination URL
                </label>
                <input
                  type="url"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  placeholder="https://example.com/product"
                />
                <p className="mt-1 text-xs text-gray-500">
                  URL where users will be redirected when clicking the ad
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              Ad Image
            </h2>
            
            <div className="space-y-4">
              <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center dark:border-gray-700">
                <ImageIcon className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                <label className="cursor-pointer">
                  <span className="text-pink-600 hover:underline">Upload ad image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                <p className="mt-2 text-sm text-gray-500">PNG, JPG, GIF up to 5MB</p>
                <p className="mt-1 text-xs text-gray-400">
                  Recommended: Match the selected ad size dimensions
                </p>
              </div>

              {formData.image && (
                <div>
                  <p className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Preview:
                  </p>
                  <img
                    src={formData.image}
                    alt="Ad preview"
                    className="max-h-64 rounded-lg border border-gray-300 dark:border-gray-700"
                  />
                </div>
              )}
            </div>
          </Card>

          <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
            <h3 className="mb-2 font-semibold text-blue-900 dark:text-blue-100">
              💡 Ad Size Guidelines:
            </h3>
            <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
              <li>• <strong>Banner:</strong> Best for top/bottom of articles (728x90px)</li>
              <li>• <strong>Square:</strong> Best for in-content placement (300x300px)</li>
              <li>• <strong>Sidebar:</strong> Best for right side column (160x600px)</li>
              <li>• <strong>Leaderboard:</strong> Best for header area (970x90px)</li>
            </ul>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => window.location.hash = 'adminpanel'}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-pink-600 hover:bg-pink-700">
              <Save className="mr-2 h-4 w-4" />
              Save Advertisement
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
