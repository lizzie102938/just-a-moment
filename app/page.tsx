'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import GuessThePlace from '@/components/GuessThePlace';
import { FloatingObject } from '@/components/FloatingObject';
import classes from './page.module.scss';
const MapItem = dynamic(() => import('../components/Map'), { ssr: false });

import { Box } from '@mantine/core';

export default function Home() {
  const [globeClicked, setGlobeClicked] = useState(false);

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
    <Box className={classes.homePage}>
      <Box onClick={handleGlobeClick} style={{ cursor: 'pointer' }}>
        <FloatingObject />
      </Box>
      <Link href="/site" passHref>
        {globeClicked && photos.length > 0 && placeName && country && (
          <GuessThePlace
            photos={photos}
            placeName={placeName}
            country={country}
            onClose={() => setGlobeClicked(false)}
          />
        )}
      </Link>
      {/* <Link href="/site" passHref>
        Site
      </Link> */}
    </Box>
  );
}
