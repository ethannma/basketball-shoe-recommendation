'use client';

import { useState } from 'react';
import { api } from '@/lib/api';

interface ReviewFormProps {
  shoeId: number;
  onReviewAdded: () => void;
}

export default function ReviewForm({ shoeId, onReviewAdded }: ReviewFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    user_name: '',
    foot_type: '',
    play_style: '',
    overall_rating: 5,
    comfort_rating: 5,
    performance_rating: 5,
    review_text: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.createReview({ ...formData, shoe_id: shoeId });
      setFormData({
        user_name: '',
        foot_type: 'normal',
        play_style: 'balanced',
        overall_rating: 5,
        comfort_rating: 5,
        performance_rating: 5,
        review_text: '',
      });
      setIsOpen(false);
      onReviewAdded();
    } catch (error) {
      console.error('Failed to submit review:', error);
      alert('Failed to submit review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
      >
        Write a Review
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 border border-gray-200 rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-700">Write Your Review</h3>

      <div className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Name
          </label>
          <input
            type="text"
            required
            value={formData.user_name}
            onChange={(e) => setFormData({ ...formData, user_name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent caret-gray-900 text-gray-700"
          />
        </div>

        {/* Foot Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Foot Type
          </label>
          <select
            value={formData.foot_type}
            onChange={(e) => setFormData({ ...formData, foot_type: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-400"
          >
            <option value="" disabled>Select</option>
            <option value="wide">Wide</option>
            <option value="normal">Normal</option>
            <option value="narrow">Narrow</option>
            <option value="flat">Flat (Low Arch)</option>
            <option value="high_arch">High Arch</option>
          </select>
        </div>

        {/* Play Style */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Play Style
          </label>
          <select
            value={formData.play_style}
            onChange={(e) => setFormData({ ...formData, play_style: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-400"
          >
            <option value="" disabled>Select</option>
            <option value="explosive">Explosive / High Jumper</option>
            <option value="shifty">Shifty / Quick Cuts</option>
            <option value="fast">Fast / Speed-based</option>
            <option value="balanced">Balanced / All-around</option>
            <option value="power">Power / Post Player</option>
          </select>
        </div>

        {/* Ratings */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Overall (Out of 5)
            </label>
            <select
              value={formData.overall_rating}
              onChange={(e) => setFormData({ ...formData, overall_rating: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-400"
            >
              {[1, 2, 3, 4, 5].map(n => (
                <option key={n} value={n}>{n} ★</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Comfort
            </label>
            <select
              value={formData.comfort_rating}
              onChange={(e) => setFormData({ ...formData, comfort_rating: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-400"
            >
              {[1, 2, 3, 4, 5].map(n => (
                <option key={n} value={n}>{n} ★</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Performance
            </label>
            <select
              value={formData.performance_rating}
              onChange={(e) => setFormData({ ...formData, performance_rating: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-400"
            >
              {[1, 2, 3, 4, 5].map(n => (
                <option key={n} value={n}>{n} ★</option>
              ))}
            </select>
          </div>
        </div>

        {/* Review Text */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Review
          </label>
          <textarea
            required
            rows={4}
            value={formData.review_text}
            onChange={(e) => setFormData({ ...formData, review_text: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
            placeholder="Share your thoughts..."
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? 'Submitting...' : 'Submit Review'}
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="px-6 py-2 border border-gray-600 rounded-md hover:bg-gray-50 text-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}