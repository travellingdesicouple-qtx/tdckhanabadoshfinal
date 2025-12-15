import React, { useState, useEffect } from 'react';
import { aboutData, AboutData } from '../../data/aboutData';

const AboutEditor: React.FC = () => {
  const [form, setForm] = useState<AboutData>(aboutData);

  // Placeholder: In real app, fetch/save from backend or local storage
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === 'yearsOfTravel' || name === 'imagesTaken' || name === 'countriesVisited' ? Number(value) : value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
      setForm((prev) => ({ ...prev, images: files }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Save logic (API call or local storage)
    alert('About section updated! (Demo only)');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto bg-white dark:bg-gray-900 p-8 rounded-lg shadow flex flex-col gap-5"
    >
      <h2 className="text-2xl font-bold mb-2 text-center">Edit About Section</h2>
      <div className="flex flex-col gap-2">
        <label className="font-medium">Years of Travel:
          <input
            type="number"
            name="yearsOfTravel"
            value={form.yearsOfTravel}
            onChange={handleChange}
            min={0}
            className="mt-1 w-full rounded border px-3 py-2"
          />
        </label>
        <label className="font-medium">Images Taken:
          <input
            type="number"
            name="imagesTaken"
            value={form.imagesTaken}
            onChange={handleChange}
            min={0}
            className="mt-1 w-full rounded border px-3 py-2"
          />
        </label>
        <label className="font-medium">Countries Visited:
          <input
            type="number"
            name="countriesVisited"
            value={form.countriesVisited}
            onChange={handleChange}
            min={0}
            className="mt-1 w-full rounded border px-3 py-2"
          />
        </label>
        <label className="font-medium">About Text:
          <textarea
            name="aboutText"
            value={form.aboutText}
            onChange={handleChange}
            rows={5}
            className="mt-1 w-full rounded border px-3 py-2"
          />
        </label>
        <label className="font-medium">Images:
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1"
          />
        </label>
        <div className="flex gap-2 mt-2 flex-wrap">
          {form.images.map((img, idx) => (
            <img key={idx} src={img} alt="about" className="w-16 h-16 object-cover rounded border" />
          ))}
        </div>
      </div>
      <button
        type="submit"
        className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded"
      >
        Save
      </button>
    </form>
  );
};

export default AboutEditor;
