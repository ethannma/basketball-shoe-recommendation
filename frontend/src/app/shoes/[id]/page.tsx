'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api, Shoe } from '@/lib/api';
import { useParams } from 'next/navigation';

export default function ShoePage() {
  const params = useParams();
  const [shoe, setShoe] = useState<Shoe | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const id = parseInt(params.id as string);
    api.getShoe(id)
      .then(setShoe)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [params.id]);

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
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/" className="text-blue-600 hover:underline mb-6 inline-block">
          ← Back to all shoes
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-8">
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
                <h2 className="text-xl font-semibold mb-3 text-gray-800">Foot Fit</h2>
                <div className="space-y-2">
                  {shoe.toe_box_width && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Toe Box Width</span>
                      <span className="font-medium">{shoe.toe_box_width}/5</span>
                    </div>
                  )}
                  {shoe.midfoot_width && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Midfoot Width</span>
                      <span className="font-medium">{shoe.midfoot_width}/5</span>
                    </div>
                  )}
                  {shoe.arch_support && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Arch Support</span>
                      <span className="font-medium">{shoe.arch_support}/5</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Play Style */}
              <div>
                <h2 className="text-xl font-semibold mb-3 text-gray-800">Performance</h2>
                <div className="space-y-2">
                  {shoe.speed_rating && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Speed</span>
                      <span className="font-medium">{shoe.speed_rating}/5</span>
                    </div>
                  )}
                  {shoe.explosiveness && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Explosiveness</span>
                      <span className="font-medium">{shoe.explosiveness}/5</span>
                    </div>
                  )}
                  {shoe.stability_rating && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Stability</span>
                      <span className="font-medium">{shoe.stability_rating}/5</span>
                    </div>
                  )}
                  {shoe.cushioning && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cushioning</span>
                      <span className="font-medium">{shoe.cushioning}/5</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}