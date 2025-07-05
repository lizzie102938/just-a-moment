import { NextRequest, NextResponse } from 'next/server';
import { reverseGeocode } from '@/utils/ReverseGeocoder';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const unsplashApiKey = process.env.UNSPLASH_API_KEY;

  if (!lat || !lng || !unsplashApiKey) {
    return NextResponse.json(
      { error: 'Missing required parameters or API key' },
      { status: 400 }
    );
  }

  const latitude = parseFloat(lat);
  const longitude = parseFloat(lng);

  if (isNaN(latitude) || isNaN(longitude)) {
    return NextResponse.json(
      { error: 'Invalid latitude or longitude' },
      { status: 400 }
    );
  }

  try {
    const { placeName, country } = await reverseGeocode(latitude, longitude);

    if (!placeName) {
      return NextResponse.json(
        { error: 'Could not find place name for these coordinates' },
        { status: 400 }
      );
    }

    const unsplashUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
      placeName
    )}&per_page=10&order_by=relevant`;

    const response = await fetch(unsplashUrl, {
      headers: {
        Authorization: `Client-ID ${unsplashApiKey}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch photos from Unsplash' },
        { status: response.status }
      );
    }

    const data = await response.json();

    if (!data.results) {
      return NextResponse.json(
        { error: 'Malformed response from Unsplash API' },
        { status: 500 }
      );
    }

    const photos = data.results.map((photo: any) => ({
      url: photo.urls.small,
      date: photo.created_at,
    }));

    return NextResponse.json({ photos, placeName, country });
  } catch (error) {
    console.error('API handler error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
