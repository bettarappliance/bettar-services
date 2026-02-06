"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

// Client-side only component to prevent hydration issues
function ClientOnly({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
}

type Review = {
  author_name: string;
  profile_photo_url?: string;
  rating: number;
  text: string;
  relative_time?: string;
  author_url?: string;
};

// No fallback reviews - use only real Google Reviews API data

function GoogleReviewsContent() {
  const [state, setState] = useState<{
    business?: string;
    rating?: number;
    total?: number;
    reviews: Review[];
    sourceUrl?: string;
    error?: string;
  }>({ reviews: [] });

  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  useEffect(() => {
    fetch("/api/google-reviews")
      .then(r => r.json())
      .then(setState)
      .catch(() => setState({ reviews: [], error: "Failed to load reviews" }));
  }, []);

  // Use only API reviews - no fallbacks
  const reviews = state.reviews || [];

  // Filter for highest ratings (4-5 stars)
  const highRatedReviews = reviews.filter(review => review.rating >= 4);
  
  // Debug: Log the number of reviews
  console.log("Total reviews from API:", reviews.length);
  console.log("All ratings:", reviews.map(r => r.rating));
  console.log("High-rated reviews (4-5 stars):", highRatedReviews.length);
  console.log("High-rated ratings:", highRatedReviews.map(r => r.rating));

  const goToPrevious = () => {
    setCurrentReviewIndex((prevIndex) => {
      const newIndex = prevIndex - 3;
      const finalIndex = newIndex < 0 ? Math.max(0, highRatedReviews.length - 3) : newIndex;
      console.log("Previous: from", prevIndex, "to", finalIndex, "total reviews:", highRatedReviews.length);
      return finalIndex;
    });
  };

  const goToNext = () => {
    setCurrentReviewIndex((prevIndex) => {
      const newIndex = prevIndex + 3;
      const finalIndex = newIndex >= highRatedReviews.length ? 0 : newIndex;
      console.log("Next: from", prevIndex, "to", finalIndex, "total reviews:", highRatedReviews.length);
      return finalIndex;
    });
  };

  // const goToReview = (index: number) => {
  //   setCurrentReviewIndex(index);
  // };

  // Show loading state
  if (state.reviews.length === 0 && !state.error) {
    return (
      <section className="py-20 bg-[#F0F5FF]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-bold text-center text-[#dc2626] mb-16">
            What Our Customers Say
          </h2>
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-500">Loading reviews...</div>
          </div>
        </div>
      </section>
    );
  }

  // Show error state if no reviews available
  if (highRatedReviews.length === 0) {
    return (
      <section className="py-20 bg-[#F0F5FF]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-bold text-center text-[#dc2626] mb-16">
            What Our Customers Say
          </h2>
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-500">No reviews available at the moment.</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-[#F0F5FF]" suppressHydrationWarning={true}>
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-5xl md:text-6xl font-bold text-center text-[#dc2626] mb-16">
          What Our Customers Say
        </h2>
        
        <div className="relative overflow-x-hidden w-full">
          <div className="flex items-center justify-center gap-4 md:gap-8 overflow-x-auto overflow-y-visible pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent" style={{ scrollbarWidth: 'thin' }}>
            {/* Show three reviews at a time */}
            {highRatedReviews.slice(currentReviewIndex, currentReviewIndex + 3).map((review, index) => (
              <div key={index} className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-[280px] min-w-[280px] sm:w-72 sm:min-w-[18rem] md:w-80 md:min-w-[20rem] lg:w-96 lg:min-w-[24rem] h-80 md:h-96 flex flex-col flex-shrink-0">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-500">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" /></svg>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" /></svg>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" /></svg>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" /></svg>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" /></svg>
                  </div>
                  <svg className="w-4 h-4 flex items-center justify-center ml-auto" viewBox="0 0 24 24" fill="none">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                </div>
                <p className="text-gray-700 mb-4 flex-grow overflow-y-auto text-sm md:text-base line-clamp-5">
                  {review.text}
                </p>
                <div className="mt-auto flex items-center">
                  <div className="h-10 w-10 rounded-full bg-[#1e3a8a] flex items-center justify-center mr-3">
                    {review.profile_photo_url ? (
                      <Image
                        src={review.profile_photo_url}
                        alt={review.author_name}
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-white font-bold text-sm">
                        {review.author_name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-[#1e3a8a]">{review.author_name}</p>
                    <p className="text-sm text-gray-500">{review.relative_time}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Google Review Card - Always show */}
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-[280px] min-w-[280px] sm:w-72 sm:min-w-[18rem] md:w-80 md:min-w-[20rem] lg:w-96 lg:min-w-[24rem] h-80 md:h-96 flex flex-col flex-shrink-0">
              <div className="text-center flex-1 flex flex-col justify-between">
                {/* Business Icon */}
                <div className="w-16 h-16 bg-[#002D72] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Image src="/bettarlogo.png" alt="Bettar Logo" width={40} height={40} />
                </div>
                
                {/* Business Name */}
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {state.business || "Bettar Appliance Service"}
                </h3>
                
                {/* Powered by Google */}
                <div className="mb-6">
                  <span className="text-gray-400 text-sm">powered by </span>
                  <span className="text-sm font-medium" style={{color: '#4285F4'}}>G</span>
                  <span className="text-sm font-medium" style={{color: '#EA4335'}}>o</span>
                  <span className="text-sm font-medium" style={{color: '#FBBC05'}}>o</span>
                  <span className="text-sm font-medium" style={{color: '#4285F4'}}>g</span>
                  <span className="text-sm font-medium" style={{color: '#34A853'}}>l</span>
                  <span className="text-sm font-medium" style={{color: '#EA4335'}}>e</span>
                </div>
                
                {/* Review Button */}
                <a
                  href={state.sourceUrl || "https://www.google.com/maps"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#002D72] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1e3a8a] transition-colors flex items-center justify-center"
                >
                  <span>review us on</span>
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center ml-2">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  </div>
                </a>
              </div>
            </div>
          </div>
          
          {/* Navigation Arrows */}
          {highRatedReviews.length > 3 && (
            <>
              <button 
                onClick={goToPrevious}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-200 transition-colors z-10"
              >
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button 
                onClick={goToNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-200 transition-colors z-10"
              >
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </>
          )}

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: Math.ceil(highRatedReviews.length / 3) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentReviewIndex(index * 3)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  Math.floor(currentReviewIndex / 3) === index
                    ? 'bg-[#dc2626] scale-125' 
                    : 'bg-gray-400 hover:bg-gray-600'
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {state.sourceUrl && (
        <p className="mt-6 text-xs opacity-70">
          Reviews sourced from Google.{" "}
          <a
            href={state.sourceUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="underline"
          >
            See all on Google
          </a>
        </p>
      )}
    </section>
  );
}

export default function GoogleReviews() {
  return (
    <ClientOnly>
      <GoogleReviewsContent />
    </ClientOnly>
  );
}
