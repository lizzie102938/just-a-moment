import type { NextApiRequest, NextApiResponse } from 'next';
import { reverseGeocode } from '@/components/ReverseGeocoder';

// async function reverseGeocode(
//   lat: number,
//   lng: number
// ): Promise<string | null> {
//   const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;
//   console.log('Reverse geocoding URL:', url);
//   const response = await fetch(url, {
//     headers: {
//       'User-Agent': 'just-one-moment (lizzielerwill@gmail.com)',
//     },
//   });

//   if (!response.ok) return null;

//   const data = await response.json();

//   const address = data.address;

//   return address.city ?? address.town ?? address.village ?? null;
// }
//
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { lat, lng } = req.query;
  const unsplashApiKey = process.env.UNSPLASH_API_KEY;

  if (!lat || !lng || !unsplashApiKey) {
    return res
      .status(400)
      .json({ error: 'Missing required parameters or API key' });
  }

  const latitude = parseFloat(lat as string);
  const longitude = parseFloat(lng as string);

  if (isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({ error: 'Invalid latitude or longitude' });
  }

  // Get place name from coordinates
  const placeName = await reverseGeocode(latitude, longitude);
  console.log('Place name:', placeName);

  if (!placeName) {
    return res
      .status(400)
      .json({ error: 'Could not find place name for these coordinates' });
  }

  const unsplashUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
    placeName
  )}&per_page=10&order_by=relevant`;

  try {
    const response = await fetch(unsplashUrl, {
      headers: {
        Authorization: `Client-ID ${unsplashApiKey}`,
      },
    });

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: 'Failed to fetch photos from Unsplash' });
    }

    const data = await response.json();

    if (!data.results) {
      return res
        .status(500)
        .json({ error: 'Malformed response from Unsplash API' });
    }

    const photos = data.results.map((photo: any) => ({
      title: photo.alt_description || 'Untitled',
      url: photo.urls.small,
      photographer: photo.user.name,
      link: photo.links.html,
    }));

    res.status(200).json({ photos, placeName });
  } catch (error) {
    console.error('API handler error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
