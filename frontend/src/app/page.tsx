import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Basketball Shoe Finder
          </h1>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="max-w-3xl">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Find shoes that match your game
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Search by foot type, play style, and real player reviews. 
            Make informed decisions based on detailed specs and community feedback.
          </p>
          <div className="flex gap-4">
            <Link 
              href="/catalog"
              className="bg-black text-white px-8 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors"
            >
              Browse Catalog
            </Link>
            <Link 
              href="/recommendations"
              className="border border-gray-300 text-gray-900 px-8 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors"
            >
              Get Recommendations
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-gray-900 mb-12">
            How it works
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                Browse the catalog
              </h4>
              <p className="text-gray-600">
                View detailed specs for every shoe including fit measurements and performance ratings.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                Filter by your needs
              </h4>
              <p className="text-gray-600">
                Match shoes to your foot type (wide, narrow, high arch) and play style (speed, power, agility).
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                Read real reviews
              </h4>
              <p className="text-gray-600">
                Learn from other players' experiences with different foot types and playing styles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-gray-900 mb-12">
          Shop by category
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Link 
            href="/catalog"
            className="group relative h-64 bg-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 group-hover:from-blue-500/30 group-hover:to-blue-600/30 transition-colors" />
            <div className="relative h-full flex flex-col justify-end p-8">
              <h4 className="text-2xl font-bold text-gray-900 mb-2">
                Speed & Agility
              </h4>
              <p className="text-gray-700">
                Lightweight shoes for guards and quick players
              </p>
            </div>
          </Link>

          <Link 
            href="/catalog"
            className="group relative h-64 bg-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-purple-600/20 group-hover:from-purple-500/30 group-hover:to-purple-600/30 transition-colors" />
            <div className="relative h-full flex flex-col justify-end p-8">
              <h4 className="text-2xl font-bold text-gray-900 mb-2">
                Power & Support
              </h4>
              <p className="text-gray-700">
                Maximum cushioning and stability for big players
              </p>
            </div>
          </Link>
        </div>
      </section>
  {/*
      <footer className="border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-gray-500 text-sm">
            © 2025 Basketball Shoe Finder. Find your perfect fit.
          </p>
        </div>
      </footer>
  */}
    </main>
  );
}