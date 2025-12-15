import React, { useState } from 'react';
import { ArrowLeft, Save, Video } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';

export function ReelEditor() {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Adventure',
    videoUrl: '',
    duration: '',
    views: '0',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const reelData = {
      ...formData,
      createdAt: new Date().toISOString(),
    };

    console.log('Reel Data:', reelData);
    alert('Reel saved successfully!');
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
              Add New Reel
            </h1>
          </div>
          <Button onClick={handleSubmit} className="bg-purple-600 hover:bg-purple-700">
            <Save className="mr-2 h-4 w-4" />
            Publish Reel
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="p-6">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              Reel Details
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Reel Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  placeholder="e.g., Sunset at Hunza Valley"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
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
                    Duration
                  </label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    placeholder="e.g., 0:45"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <Video className="h-4 w-4" />
                  Video URL (YouTube, Instagram, TikTok) *
                </label>
                <input
                  type="url"
                  required
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  placeholder="https://youtube.com/shorts/..."
                />
                <p className="mt-1 text-xs text-gray-500">
                  Paste the full URL of your reel/short video
                </p>
              </div>
            </div>
          </Card>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => window.location.hash = 'adminpanel'}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
              <Save className="mr-2 h-4 w-4" />
              Publish Reel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
