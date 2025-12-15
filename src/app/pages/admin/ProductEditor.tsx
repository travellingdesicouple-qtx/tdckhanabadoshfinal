import React, { useState } from 'react';
import { ArrowLeft, Save, Upload, DollarSign, Package, Loader } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { productsApi } from '../../../lib/api';
import { toast } from 'sonner';

export function ProductEditor() {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: 'Digital',
    description: '',
    type: 'Digital Product',
    coverImage: '',
    features: '',
    licenseType: 'owned' as 'owned' | 'unsplash' | 'pexels' | 'pixabay' | 'cc0' | 'cc-by' | 'commercial',
    photographerName: '',
    sourceUrl: '',
  });

  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, coverImage: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!uploadedImage) {
      toast.error('Please upload a product image');
      return;
    }

    setIsLoading(true);
    
    try {
      const slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const productData = {
        title: formData.title,
        slug,
        price: parseFloat(formData.price),
        category: formData.category,
        product_type: formData.type,
        description: formData.description,
        features: formData.features.split('\n').filter(f => f.trim()),
        cover_image: '', // Will be set by API
        download_link: null,
        in_stock: true,
        published: true,
      };

      const { data, error } = await productsApi.create(productData as any, uploadedImage);
      
      if (error) throw error;
      
      // Save image license information
      if (data && formData.licenseType) {
        // TODO: Save to image_licenses table
        console.log('License Info:', {
          imageUrl: data.cover_image,
          licenseType: formData.licenseType,
          photographerName: formData.photographerName,
          sourceUrl: formData.sourceUrl,
          usedIn: 'product',
          entityId: data.id,
        });
      }

      toast.success('Product published successfully!');
      setTimeout(() => {
        window.location.hash = 'adminpanel';
      }, 1500);
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error('Failed to publish product. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button onClick={() => window.location.hash = 'adminpanel'} variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Add New Product
            </h1>
          </div>
          <Button onClick={handleSubmit} className="bg-indigo-600 hover:bg-indigo-700">
            <Save className="mr-2 h-4 w-4" />
            Publish Product
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="p-6">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              Product Information
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  placeholder="e.g., Lightroom Presets Pack"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <DollarSign className="h-4 w-4" />
                    Price (USD) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    placeholder="29.99"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  >
                    <option>Digital</option>
                    <option>Physical</option>
                    <option>Merch</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  >
                    <option>Digital Product</option>
                    <option>E-Book</option>
                    <option>Preset Pack</option>
                    <option>T-Shirt</option>
                    <option>Print</option>
                    <option>Merchandise</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Description
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={5}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  placeholder="Describe your product..."
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Features (one per line)
                </label>
                <textarea
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  rows={5}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  placeholder="High-quality presets&#10;Compatible with Lightroom CC&#10;Easy to install&#10;Works on mobile and desktop"
                />
              </div>
            </div>
          </Card>

          {/* Note about download links */}
          <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4 dark:bg-blue-900/20">
            <div className="flex">
              <div className="flex-shrink-0">
                <Package className="h-5 w-5 text-blue-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  <strong>Note for Digital Products:</strong> Download links will be provided through the Orders Management panel after payment verification.
                </p>
              </div>
            </div>
          </div>

          <Card className="p-6">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              Product Image
            </h2>
            
            <div className="space-y-4">
              <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center dark:border-gray-700">
                <Upload className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                <label className="cursor-pointer">
                  <span className="text-indigo-600 hover:underline">Upload product image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                <p className="mt-2 text-sm text-gray-500">PNG, JPG up to 10MB</p>
              </div>

              {formData.coverImage && (
                <img
                  src={formData.coverImage}
                  alt="Product preview"
                  className="h-64 w-full rounded-lg object-cover"
                />
              )}
            </div>
          </Card>

          {/* Image Licensing */}
          <Card className="p-6">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              Image Licensing
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  License Type *
                </label>
                <select
                  value={formData.licenseType}
                  onChange={(e) => setFormData({ ...formData, licenseType: e.target.value as any })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                >
                  <option value="owned">Owned (Original Photo)</option>
                  <option value="unsplash">Unsplash</option>
                  <option value="pexels">Pexels</option>
                  <option value="pixabay">Pixabay</option>
                  <option value="cc0">CC0 (Public Domain)</option>
                  <option value="cc-by">CC-BY</option>
                  <option value="commercial">Commercial License</option>
                </select>
              </div>

              {formData.licenseType !== 'owned' && (
                <>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Photographer Name
                    </label>
                    <input
                      type="text"
                      value={formData.photographerName}
                      onChange={(e) => setFormData({ ...formData, photographerName: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                      placeholder="Photographer's name"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Source URL
                    </label>
                    <input
                      type="url"
                      value={formData.sourceUrl}
                      onChange={(e) => setFormData({ ...formData, sourceUrl: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                      placeholder="https://..."
                    />
                  </div>
                </>
              )}
            </div>
          </Card>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => window.location.hash = 'adminpanel'}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Publish Product
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
