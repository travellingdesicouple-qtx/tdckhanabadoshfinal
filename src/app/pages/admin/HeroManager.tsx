import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Plus, Trash2, Save, Image as ImageIcon, Loader, Move } from 'lucide-react';
import { heroSlidesApi, HeroSlide } from '../../../lib/api';
import { Card } from '../../components/ui/card';

export function HeroManager() {
    const [slides, setSlides] = useState<HeroSlide[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);

    // New slide form state
    const [newImageUrl, setNewImageUrl] = useState('');
    const [newTitle, setNewTitle] = useState('');
    const [newLocation, setNewLocation] = useState('');
    const [newSeason, setNewSeason] = useState('');

    useEffect(() => {
        loadSlides();
    }, []);

    const loadSlides = async () => {
        try {
            setIsLoading(true);
            const data = await heroSlidesApi.getAll();
            setSlides(data);
        } catch (error) {
            console.error('Failed to load slides', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddSlide = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newImageUrl) return;

        try {
            setIsUploading(true);
            const { data, error } = await heroSlidesApi.create(
                {
                    title: newTitle,
                    location: newLocation,
                    season: newSeason,
                    display_order: slides.length,
                    active: true,
                    image_url: newImageUrl
                }
            );

            if (error) throw error;
            if (data) {
                setSlides([...slides, data]);
                // Reset form
                setNewImageUrl('');
                setNewTitle('');
                setNewLocation('');
                setNewSeason('');
            }
        } catch (error) {
            console.error('Error adding slide:', error);
            alert('Failed to add slide');
        } finally {
            setIsUploading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this slide?')) return;

        try {
            await heroSlidesApi.delete(id);
            setSlides(slides.filter(s => s.id !== id));
        } catch (error) {
            console.error('Error deleting slide:', error);
        }
    };

    if (isLoading) return <div className="p-8 text-center">Loading slides...</div>;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="font-['Merriweather'] text-3xl font-bold text-gray-900 dark:text-white">
                    Hero Slider Manager
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Manage the images and captions displayed on the homepage slider.
                </p>
            </div>

            {/* Add New Slide */}
            <Card className="p-6">
                <h2 className="mb-4 text-lg font-semibold">Add New Slide</h2>
                <form onSubmit={handleAddSlide} className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-medium">Image URL</label>
                            <input
                                type="text"
                                value={newImageUrl}
                                onChange={(e) => setNewImageUrl(e.target.value)}
                                placeholder="Paste image link here"
                                className="w-full rounded-md border p-2 mb-4 dark:bg-gray-800"
                                required
                            />

                            <div className="flex items-center justify-center w-full h-48 border-2 border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-600 overflow-hidden">
                                {newImageUrl ? (
                                    <img
                                        src={newImageUrl}
                                        alt="Preview"
                                        className="h-full w-full object-cover"
                                        onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Invalid+URL')}
                                    />
                                ) : (
                                    <div className="flex flex-col items-center justify-center text-gray-400">
                                        <ImageIcon className="w-8 h-8 mb-2" />
                                        <span className="text-sm">Image Preview</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium">Caption / Month & Weather</label>
                                <input
                                    type="text"
                                    value={newSeason}
                                    onChange={(e) => setNewSeason(e.target.value)}
                                    placeholder="e.g. Winters in Skardu"
                                    className="w-full rounded-md border p-2 dark:bg-gray-800"
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium">Location</label>
                                <input
                                    type="text"
                                    value={newLocation}
                                    onChange={(e) => setNewLocation(e.target.value)}
                                    placeholder="e.g. Skardu, Pakistan"
                                    className="w-full rounded-md border p-2 dark:bg-gray-800"
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium">Extra Title (Optional)</label>
                                <input
                                    type="text"
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    placeholder="Additional title text"
                                    className="w-full rounded-md border p-2 dark:bg-gray-800"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={isUploading}
                            className="flex items-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700 disabled:opacity-50"
                        >
                            {isUploading ? <Loader className="animate-spin h-4 w-4" /> : <Save className="h-4 w-4" />}
                            {isUploading ? 'Saving...' : 'Save Slide'}
                        </button>
                    </div>
                </form>
            </Card>

            {/* Existing Slides List */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {slides.map((slide) => (
                    <motion.div
                        key={slide.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900"
                    >
                        <div className="aspect-video relative">
                            <img src={slide.image_url} alt={slide.title} className="h-full w-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center gap-4">
                                <button
                                    onClick={() => handleDelete(slide.id)}
                                    className="rounded-full bg-red-500 p-2 text-white hover:bg-red-600"
                                >
                                    <Trash2 className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                        <div className="p-4">
                            {slide.season && (
                                <div className="mb-1 text-xs font-bold uppercase tracking-wider text-emerald-600">
                                    {slide.season}
                                </div>
                            )}
                            <h3 className="font-bold text-gray-900 dark:text-white">{slide.location || 'Unknown Location'}</h3>
                            {slide.title && <p className="text-sm text-gray-500">{slide.title}</p>}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
