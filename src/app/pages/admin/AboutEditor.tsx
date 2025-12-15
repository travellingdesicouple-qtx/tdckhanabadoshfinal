import React, { useState, useEffect } from 'react';
import { Camera, Save, Loader2 } from 'lucide-react';
import { supabase, uploadFile, AboutInfo } from '../../../lib/supabase';
import { Button } from '../../components/ui/button';

const AboutEditor: React.FC = () => {
  const [form, setForm] = useState<Partial<AboutInfo>>({
    years_of_travel: 0,
    images_taken: 0,
    countries_visited: 0,
    subscribers: 0,
    about_text: '',
    main_image: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchAboutInfo();
  }, []);

  const fetchAboutInfo = async () => {
    try {
      const { data, error } = await supabase
        .from('about_info')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') { // Ignore 'no rows' error
        console.error('Error fetching about info:', error);
      }

      if (data) {
        setForm(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: ['years_of_travel', 'images_taken', 'countries_visited', 'subscribers'].includes(name)
        ? Number(value)
        : value
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    setUploading(true);
    const file = e.target.files[0];

    try {
      const { url, error } = await uploadFile('ABOUT', file);
      if (error) throw error;

      setForm(prev => ({ ...prev, main_image: url }));
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Check if row exists to decide insert vs update - though .upsert handles both if ID provided, 
      // but here we might not have ID for first time.
      // Easiest is to upsert with a fixed ID or assume single row logic.
      // Let's check if we have an ID

      const payload = {
        ...form,
        updated_at: new Date().toISOString(),
      };

      // Ensure we have a row. If id exists, it updates. If not, it inserts.
      // For a singleton table, we should probably stick to one ID.
      // Let's try to get existing one first (fetched on mount).

      const { error } = await supabase
        .from('about_info')
        .upsert(payload)
        .select()
        .single();

      if (error) throw error;

      alert('About section updated successfully!');
    } catch (error) {
      console.error('Error saving about info:', error);
      alert('Failed to save changes.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-10"><Loader2 className="animate-spin h-8 w-8 mx-auto text-emerald-600" /></div>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-lg shadow flex flex-col gap-6"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2">Statistics</h3>
          <div className="grid grid-cols-2 gap-4">
            <label className="font-medium text-sm">Years of Travel
              <input
                type="number"
                name="years_of_travel"
                value={form.years_of_travel}
                onChange={handleChange}
                min={0}
                className="mt-1 w-full rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2"
              />
            </label>
            <label className="font-medium text-sm">Countries Visited
              <input
                type="number"
                name="countries_visited"
                value={form.countries_visited}
                onChange={handleChange}
                min={0}
                className="mt-1 w-full rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2"
              />
            </label>
            <label className="font-medium text-sm">Photos Captured
              <input
                type="number"
                name="images_taken"
                value={form.images_taken}
                onChange={handleChange}
                min={0}
                className="mt-1 w-full rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2"
              />
            </label>
            <label className="font-medium text-sm">Subscribers
              <input
                type="number"
                name="subscribers"
                value={form.subscribers}
                onChange={handleChange}
                min={0}
                className="mt-1 w-full rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2"
              />
            </label>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2 mt-4">Content</h3>
          <label className="font-medium block">About Description
            <textarea
              name="about_text"
              value={form.about_text}
              onChange={handleChange}
              rows={8}
              className="mt-1 w-full rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2"
              placeholder="Tell your story..."
            />
          </label>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2">Main Image</h3>

          <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center">
            {form.main_image ? (
              <div className="relative mb-4">
                <img
                  src={form.main_image}
                  alt="About Main"
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
                <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                  Current Image
                </div>
              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-lg mb-4">
                <Camera className="h-12 w-12 mb-2" />
                <p>No image selected</p>
              </div>
            )}

            <label className="cursor-pointer inline-flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors">
              {uploading ? <Loader2 className="animate-spin h-4 w-4" /> : <Camera className="h-4 w-4" />}
              <span>{uploading ? 'Uploading...' : 'Change Image'}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
            <p className="text-xs text-gray-500 mt-2">Recommended size: 800x1200px</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-800">
        <Button
          type="submit"
          disabled={saving || uploading}
          className="bg-emerald-600 hover:bg-emerald-700 w-full md:w-auto"
        >
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default AboutEditor;
