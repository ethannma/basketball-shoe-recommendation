'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api, Shoe, Review } from '@/lib/api';
import { useParams } from 'next/navigation';
import ReviewForm from '@/components/ReviewForm';
import ReviewList from '@/components/ReviewList';

export default function ShoePage() {
  const params = useParams();
  const [shoe, setShoe] = useState<Shoe | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [sortBy, setSortBy] = useState<'top' | 'best' | 'worst' | 'recent'>('top');

  const loadData = async () => {
    const id = parseInt(params.id as string);
    try {
      const [shoeData, reviewsData] = await Promise.all([
        api.getShoe(id),
        api.getShoeReviews(id, sortBy),
      ]);
      setShoe(shoeData);
      setReviews(reviewsData);
    } catch (error) {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [params.id, sortBy]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading...</p>
      </main>
    );
  }

  if (notFound || !shoe) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-4">Shoe not found</p>
          <Link href="/" className="text-blue-600 hover:underline">
            ← Back to all shoes
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link href="/catalog" className="text-blue-600 hover:underline mb-6 inline-block">
          ← Back to catalog
        </Link>

        {/* Shoe Details */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Image */}
            <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
              {shoe.image_url ? (
                <img 
                  src={shoe.image_url} 
                  alt={`${shoe.brand} ${shoe.model}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <span className="text-gray-400">No image</span>
              )}
            </div>

            {/* Details */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {shoe.brand} {shoe.model}
              </h1>
              
              {shoe.price && (
                <p className="text-2xl font-bold text-green-600 mb-4">
                  ${shoe.price.toFixed(2)}
                </p>
              )}

              {shoe.description && (
                <p className="text-gray-700 mb-6">{shoe.description}</p>
              )}

              {/* Foot Characteristics */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3 text-blue-600">Foot Fit</h2>
                <div className="space-y-2">
                  {shoe.toe_box_width && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Toe Box Width</span>
                      <span className="font-medium text-gray-800">{shoe.toe_box_width}/5</span>
                    </div>
                  )}
                  {shoe.midfoot_width && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Midfoot Width</span>
                      <span className="font-medium text-gray-800">{shoe.midfoot_width}/5</span>
                    </div>
                  )}
                  {shoe.arch_support && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Arch Support</span>
                      <span className="font-medium text-gray-800">{shoe.arch_support}/5</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Play Style */}
              <div>
                <h2 className="text-xl font-semibold mb-3 text-purple-600">Performance</h2>
                <div className="space-y-2">
                  {shoe.speed_rating && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Speed</span>
                      <span className="font-medium text-gray-800">{shoe.speed_rating}/5</span>
                    </div>
                  )}
                  {shoe.explosiveness && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Explosiveness</span>
                      <span className="font-medium text-gray-800">{shoe.explosiveness}/5</span>
                    </div>
                  )}
                  {shoe.stability_rating && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Stability</span>
                      <span className="font-medium text-gray-800">{shoe.stability_rating}/5</span>
                    </div>
                  )}
                  {shoe.cushioning && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cushioning</span>
                      <span className="font-medium text-gray-800">{shoe.cushioning}/5</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Reviews ({reviews.length})
          </h2>

          {/* Review Form */}
          <div className="mb-8">
            <ReviewForm shoeId={shoe.id} onReviewAdded={loadData} />
          </div>

          {/* Review List */}
          <ReviewList reviews={reviews} onVote={loadData} />
        </div>
      </div>
    </main>
  );
}