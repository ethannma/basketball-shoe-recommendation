// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
//       <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={100}
//           height={20}
//           priority
//         />
//         <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
//           <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
//             To get started, edit the page.tsx file.
//           </h1>
//           <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
//             Looking for a starting point or more instructions? Head over to{" "}
//             <a
//               href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Templates
//             </a>{" "}
//             or the{" "}
//             <a
//               href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Learning
//             </a>{" "}
//             center.
//           </p>
//         </div>
//         <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
//           <a
//             className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={16}
//               height={16}
//             />
//             Deploy Now
//           </a>
//           <a
//             className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Documentation
//           </a>
//         </div>
//       </main>
//     </div>
//   );
// }

import Link from 'next/link';
import { api } from '@/lib/api';

export default async function Home() {
  const shoes = await api.getShoes();

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Basketball Shoe Optimizer
        </h1>

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