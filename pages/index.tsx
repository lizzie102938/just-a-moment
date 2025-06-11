import { useState } from 'react';
import dynamic from 'next/dynamic';
import styles from '../styles/Home.module.css';

const Map = dynamic(() => import('../components/Map'), { ssr: false });
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

  return (
    <div className={styles.container}>
      <h1>Just a Moment</h1>
      <Map onMapClick={handleMapClick} />
      {location && (
        <PhotoPanel photos={photos} location={location} placeName={placeName} />
      )}
    </div>
  );
}
