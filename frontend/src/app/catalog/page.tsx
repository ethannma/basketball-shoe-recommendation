'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api, Shoe } from '@/lib/api';

export default function CatalogPage() {
  const [shoes, setShoes] = useState<Shoe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getShoes()
      .then(setShoes)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Shoe Catalog
          </h1>
          <Link 
            href="/" 
            className="text-blue-600 hover:underline"
          >
            ← Back to Home
          </Link>
        </div>

        {shoes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No shoes found. Add some via the API!</p>
            <a 
              href="http://localhost:8000/docs" 
              target="_blank"
              className="text-blue-600 hover:underline mt-2 inline-block"
            >
              Go to API docs to add shoes
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shoes.map((shoe) => (
              <Link
                key={shoe.id}
                href={`/shoes/${shoe.id}`}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6"
              >
                <div className="aspect-square bg-gray-200 rounded-md mb-4 flex items-center justify-center">
                  {shoe.image_url ? (
                    <img 
                      src={shoe.image_url} 
                      alt={`${shoe.brand} ${shoe.model}`}
                      className="w-full h-full object-cover rounded-md"
                    />
                  ) : (
                    <span className="text-gray-400">No image</span>
                  )}
                </div>
                
                <h2 className="text-xl font-semibold text-gray-900">
                  {shoe.brand} {shoe.model}
                </h2>
                
                {shoe.price && (
                  <p className="text-lg font-bold text-green-600 mt-2">
                    ${shoe.price.toFixed(2)}
                  </p>
                )}

                {shoe.description && (
                  <p className="text-gray-600 mt-2 line-clamp-2">
                    {shoe.description}
                  </p>
                )}

                <div className="mt-4 flex gap-2 flex-wrap">
                  {shoe.speed_rating && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      Speed: {shoe.speed_rating}/5
                    </span>
                  )}
                  {shoe.cushioning && (
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                      Cushion: {shoe.cushioning}/5
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}