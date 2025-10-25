'use client';

import { useState } from 'react';
import { Review, api } from '@/lib/api';

interface ReviewListProps {
  reviews: Review[];
  onVote: () => void;
}

export default function ReviewList({ reviews, onVote }: ReviewListProps) {
  const [sortBy, setSortBy] = useState<'top' | 'best' | 'worst' | 'recent'>('top');
  const [votingId, setVotingId] = useState<number | null>(null);

  const handleVote = async (reviewId: number, type: 'up' | 'down') => {
    setVotingId(reviewId);
    try {
      if (type === 'up') {
        await api.upvoteReview(reviewId);
      } else {
        await api.downvoteReview(reviewId);
      }
      onVote();
    } catch (error) {
      console.error('Failed to vote:', error);
    } finally {
      setVotingId(null);
    }
  };

//   const renderStars = (rating: number) => {
//     return '★'.repeat(rating) + '☆'.repeat(5 - rating);
//   };

  if (reviews.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No reviews yet. Be the first to review!</p>
      </div>
    );
  }

  return (
    <div>
      {/* Sort Controls */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setSortBy('top')}
          className={`px-4 py-2 rounded-md font-medium ${
            sortBy === 'top'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Most Upvoted
        </button>
        <button
          onClick={() => setSortBy('best')}
          className={`px-4 py-2 rounded-md font-medium ${
            sortBy === 'best'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Best
        </button>
        <button
          onClick={() => setSortBy('worst')}
          className={`px-4 py-2 rounded-md font-medium ${
            sortBy === 'worst'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Worst
        </button>
        <button
          onClick={() => setSortBy('recent')}
          className={`px-4 py-2 rounded-md font-medium ${
            sortBy === 'recent'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Recent
        </button>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => {
          const netVotes = review.upvotes - review.downvotes;
          
          return (
            <div key={review.id} className="bg-white border border-gray-200 rounded-lg p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900">{review.user_name}</h4>
                  <p className="text-sm text-gray-500">
                    {review.foot_type} • {review.play_style}
                  </p>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(review.created_at).toLocaleDateString()}
                </div>
              </div>

              {/* Ratings */}
              <div className="flex gap-4 mb-3 text-sm">
                <span className="text-yellow-600">
                  Overall: ({review.overall_rating}/5)
                </span>
                <span className="text-yellow-600">
                  Comfort: ({review.comfort_rating}/5)
                </span>
                <span className="text-yellow-600">
                  Performance: ({review.performance_rating}/5)
                </span>
              </div>

              {/* Review Text */}
              <p className="text-gray-700 mb-4">{review.review_text}</p>

              {/* Voting */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleVote(review.id, 'up')}
                  disabled={votingId === review.id}
                  className="flex items-center gap-1 px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
                >
                  <span className="text-lg">👍</span>
                  <span className="text-sm font-medium text-gray-700">{review.upvotes}</span>
                </button>
                
                <button
                  onClick={() => handleVote(review.id, 'down')}
                  disabled={votingId === review.id}
                  className="flex items-center gap-1 px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
                >
                  <span className="text-lg">👎</span>
                  <span className="text-sm font-medium text-gray-700">{review.downvotes}</span>
                </button>

                <span className={`ml-2 font-medium ${netVotes > 0 ? 'text-green-600' : netVotes < 0 ? 'text-red-600' : 'text-gray-500'}`}>
                  {netVotes > 0 ? '+' : ''}{netVotes}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}