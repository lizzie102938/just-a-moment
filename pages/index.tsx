import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Topbar } from '@/components/Layout';
import GuessThePlace from '@/components/GuessThePlace';
import { FloatingObject } from '@/components/FloatingObject';
import { PhotoPanel } from '@/components/PhotoPanel';
const MapItem = dynamic(() => import('../components/Map'), { ssr: false });
import {} from '../components/PhotoPanel';
import { Box } from '@mantine/core';

export default function Home() {
  const [globeClicked, setGlobeClicked] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [photos, setPhotos] = useState<any[]>([]);
  const [placeName, setPlaceName] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);

  // Reusable fetch function
  const fetchPhotosByCoords = async (lat: number, lng: number) => {
    console.log(lat, lng);
    try {
      const res = await fetch(`/api/photos?lat=${lat}&lng=${lng}`);
      if (!res.ok) {
        console.error('Failed to fetch photos', await res.text());
        return { photos: [], placeName: null, country: null };
      }
      const data = await res.json();
      return {
        photos: data.photos,
        placeName: data.placeName,
        country: data.country,
      };
    } catch (err) {
      console.error('Fetch error:', err);
      return { photos: [], placeName: null, country: null };
    }
  };

  const handleMapClick = async (lat: number, lng: number) => {
    setLocation({ lat, lng });

    const { photos, placeName, country } = await fetchPhotosByCoords(lat, lng);
    setPhotos(photos);
    setPlaceName(placeName);
    setCountry(country);
  };

  const handleSearch = async (place: string) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`,
        {
          headers: {
            'User-Agent': 'just-one-moment (lizzielerwill@gmail.com)',
          },
        }
      );
      const results = await res.json();
      if (results.length > 0) {
        const { lat, lon } = results[0];
        handleMapClick(parseFloat(lat), parseFloat(lon));
      } else {
        alert('Location not found.');
      }
    } catch (err) {
      console.error('Geocoding failed:', err);
    }
  };

  // Generate random lat/lng on globe click, fetch photos, and show GuessThePlace
  const handleGlobeClick = async () => {
    // Random latitude between -90 and 90
    const lat = Math.random() * 180 - 90;
    // Random longitude between -180 and 180
    const lng = Math.random() * 360 - 180;

    console.log('Random coords for GuessThePlace:', { lat, lng });

    const { photos, placeName, country } = await fetchPhotosByCoords(lat, lng);
    setPhotos(photos);
    setPlaceName(placeName);
    setCountry(country);

    setGlobeClicked(true);
  };

  return (
    <Box style={{ position: 'relative', minHeight: '100vh' }}>
      <Topbar onSearch={handleSearch} />
      <Box onClick={handleGlobeClick} style={{ cursor: 'pointer' }}>
        <FloatingObject />
      </Box>
      <MapItem onMapClick={handleMapClick} />
      {globeClicked && photos.length > 0 && placeName && country && (
        <GuessThePlace
          photos={photos}
          placeName={placeName}
          country={country}
          onClose={() => setGlobeClicked(false)}
        />
      )}
      {location && (
        <PhotoPanel
          photos={photos}
          location={location}
          placeName={placeName}
          country={country}
          onClose={() => setLocation(null)}
        />
      )}
    </Box>
  );
}
