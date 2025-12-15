import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Save, Upload, Image as ImageIcon, Tag, Calendar, Loader } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { blogsApi } from '../../../lib/api';
import { toast } from 'sonner';

export function BlogEditor() {
  const [formData, setFormData] = useState({
    title: '',
    author: 'The Khanabadosh',
    date: new Date().toISOString().split('T')[0],
    category: 'Adventure',
    excerpt: '',
    content: '',
    coverImage: '',
    tags: '',
    contentImages: [] as string[],
    youtubeVideoId: '',
    licenseType: 'owned' as 'owned' | 'unsplash' | 'pexels' | 'pixabay' | 'cc0' | 'cc-by' | 'commercial',
    photographerName: '',
    sourceUrl: '',
  });

  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'cover' | 'contentImages') => {
    const files = e.target.files;
    if (!files) return;

    if (type === 'cover') {
      setUploadedImage(files[0]);
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, coverImage: reader.result as string });
      };
      reader.readAsDataURL(files[0]);
    } else {
      // Limit to 4 images total
      const remainingSlots = 4 - formData.contentImages.length;
      if (remainingSlots <= 0) {
        alert('Maximum 4 content images allowed!');
        return;
      }
      
      const newImages = Array.from(files).slice(0, remainingSlots);
      setGalleryImages([...galleryImages, ...newImages]);
      
      // Create preview URLs
      newImages.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData(prev => ({
            ...prev,
            contentImages: [...prev.contentImages, reader.result as string]
          }));
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!uploadedImage) {
      toast.error('Please upload a cover image');
      return;
    }

    setIsLoading(true);
    
    try {
      const slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const blogData = {
        title: formData.title,
        slug,
        excerpt: formData.excerpt,
        content: formData.content,
        cover_image: '', // Will be set by API
        author: formData.author,
        category: formData.category,
        tags: formData.tags.split(',').map(t => t.trim()),
        youtube_video_id: formData.youtubeVideoId || null,
        gallery_images: [], // Will be set by API
        read_time: `${Math.ceil(formData.content.split(' ').length / 200)} min read`,
        featured: false,
        published: true,
      };

      const { data, error } = await blogsApi.create(blogData as any, uploadedImage, galleryImages);
      
      if (error) throw error;

      toast.success('Blog published successfully!');
      setTimeout(() => {
        window.location.hash = 'adminpanel';
      }, 1500);
    } catch (error) {
      console.error('Error creating blog:', error);
      toast.error('Failed to publish blog. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto max-w-5xl px-4 py-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => window.location.hash = 'adminpanel'}
              variant="outline"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Create New Blog
            </h1>
          </div>
          <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Publishing...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Publish Blog
              </>
            )}
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <Card className="p-6">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              Basic Information
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Blog Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  placeholder="Enter blog title"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Author
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Category *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  >
                    <option>Adventure</option>
                    <option>Food</option>
                    <option>Culture</option>
                    <option>Travel Tips</option>
                    <option>Photography</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Excerpt (Short Description)
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={2}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  placeholder="Brief description for preview cards..."
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  placeholder="travel, pakistan, mountains, adventure"
                />
              </div>
            </div>
          </Card>

          {/* Cover Image */}
          <Card className="p-6">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              Cover Image
            </h2>
            
            <div className="space-y-4">
              <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center dark:border-gray-700">
                <ImageIcon className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                <label className="cursor-pointer">
                  <span className="text-blue-600 hover:underline">Upload cover image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'cover')}
                    className="hidden"
                  />
                </label>
                <p className="mt-2 text-sm text-gray-500">PNG, JPG up to 10MB</p>
              </div>

              {formData.coverImage && (
                <img
                  src={formData.coverImage}
                  alt="Cover preview"
                  className="h-64 w-full rounded-lg object-cover"
                />
              )}
            </div>
          </Card>

          {/* Content */}
          <Card className="p-6">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              Blog Content
            </h2>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              Use the toolbar to format your content. You can add headings, bold, italic, lists, links, etc.
            </p>
            
            <div className="rounded-lg border border-gray-300 dark:border-gray-700">
              <ReactQuill
                theme="snow"
                value={formData.content}
                onChange={(value) => setFormData({ ...formData, content: value })}
                modules={{
                  toolbar: [
                    [{ 'header': [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    [{ 'color': [] }, { 'background': [] }],
                    [{ 'align': [] }],
                    ['link'],
                    ['clean']
                  ]
                }}
                formats={[
                  'header',
                  'bold', 'italic', 'underline', 'strike',
                  'list', 'bullet',
                  'color', 'background',
                  'align',
                  'link'
                ]}
                placeholder="Write your blog content here..."
                className="bg-white dark:bg-gray-800"
                style={{ minHeight: '300px' }}
              />
            </div>
          </Card>

          {/* Content Images */}
          <Card className="p-6">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              Content Images (Max 4)
            </h2>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              These images will appear between content sections in the blog post.
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center dark:border-gray-700">
                <Upload className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                <label className="cursor-pointer">
                  <span className="text-blue-600 hover:underline">Upload content images</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleImageUpload(e, 'contentImages')}
                    className="hidden"
                    disabled={formData.contentImages.length >= 4}
                  />
                </label>
                <p className="mt-2 text-sm text-gray-500">
                  {formData.contentImages.length}/4 images uploaded
                </p>
              </div>

              {formData.contentImages.length > 0 && (
                <div className="grid grid-cols-3 gap-4">
                  {formData.contentImages.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Gallery ${idx + 1}`}
                      className="h-32 w-full rounded-lg object-cover"
                    />
                  ))}
                </div>
              )}
            </div>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => window.location.hash = 'adminpanel'}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Publish Blog
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
