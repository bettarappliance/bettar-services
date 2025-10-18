import { NextResponse } from "next/server";

type Review = {
  author_name: string;
  profile_photo_url?: string;
  rating: number;
  text: string;
  relative_time_description?: string;
  author_url?: string;
  time: number;
};

const FIELDS = [
  "name",
  "rating",
  "user_ratings_total",
  "reviews",                  // includes author_name, rating, text, time, etc.
].join(",");

export async function GET() {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  
  // Debug: Check if environment variables are set
  if (!key || !placeId) {
    console.error("Missing environment variables:", { key: !!key, placeId: !!placeId });
    return NextResponse.json({ 
      error: "Missing API credentials", 
      details: "GOOGLE_PLACES_API_KEY or GOOGLE_PLACE_ID not set" 
    }, { status: 500 });
  }

  const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
  url.searchParams.set("place_id", placeId);
  url.searchParams.set("fields", FIELDS);
  url.searchParams.set("key", key);

  console.log("Making API request to:", url.toString());

  // Google returns at most ~5 "most relevant" reviews per call.
  const res = await fetch(url.toString(), { cache: "no-store" });
  const data = await res.json();

  console.log("API Response:", { status: data.status, error_message: data.error_message });

  if (data.status !== "OK") {
    return NextResponse.json({ error: data.status, details: data.error_message }, { status: 500 });
  }

  const place = data.result || {};
          const all = Array.isArray(place.reviews) ? place.reviews : [];

          console.log("Raw reviews from API:", all.length);
          console.log("All ratings:", all.map((r: Review) => r.rating));

          // Filter: only 4★ and 5★
          const filtered = all.filter((r: Review) => Number(r.rating) >= 4);

          console.log("Filtered 4-5 star reviews:", filtered.length);
          console.log("Filtered ratings:", filtered.map((r: Review) => r.rating));

          // Sort by newest first
          filtered.sort((a: Review, b: Review) => Number(b.time) - Number(a.time));

          // Return all filtered reviews (no limit)
          const reviews = filtered.map((r: Review) => ({
    author_name: r.author_name,
    profile_photo_url: r.profile_photo_url,
    rating: r.rating,
    text: r.text,
    relative_time: r.relative_time_description,
    author_url: r.author_url,
  }));

  console.log("Final reviews count:", reviews.length);

  return NextResponse.json({
    business: place.name,
    rating: place.rating,
    total: place.user_ratings_total,
    reviews: reviews,
    sourceUrl: `https://www.google.com/maps/place/?q=place_id:${placeId}`,
  });
}
