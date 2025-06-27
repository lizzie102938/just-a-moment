import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Topbar } from '@/components/Layout';

const MapItem = dynamic(() => import('../components/Map'), { ssr: false });
import { PhotoPanel } from '../components/PhotoPanel';

export default function Home() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [photos, setPhotos] = useState<any[]>([]);
  const [placeName, setPlaceName] = useState<string | null>(null);

  const handleMapClick = async (lat: number, lng: number) => {
    setLocation({ lat, lng });

    try {
      const res = await fetch(`/api/photos?lat=${lat}&lng=${lng}`);
      if (!res.ok) {
        console.error('Failed to fetch photos', await res.text());
        return;
      }
      const data = await res.json();
      setPhotos(data.photos);
      setPlaceName(data.placeName);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };
  console.log('Photos passed to PhotoPanel:', photos);

  const handleSearch = async (place: string) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          place
        )}`,
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

  return (
    // pass the correct toggles here in props and render acccordingly
    <div>
      <Topbar onSearch={handleSearch} />
      <MapItem onMapClick={handleMapClick} />
      {location && (
        <PhotoPanel
          photos={photos}
          location={location}
          placeName={placeName}
          onClose={() => setLocation(null)}
        />
      )}
    </div>
  );
}
