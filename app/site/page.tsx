'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Topbar } from '@/components/Topbar';
// import GuessThePlace from '@/components/GuessThePlace';
// import { Globe } from '@/components/Globe';
import { PhotoType, MealType } from '@/types';
import { FoodPanel } from '@/components/FoodPanel/FoodPanel';
import { PhotoPanel } from '@/components/PhotoPanel/PhotoPanel';
const MapItem = dynamic(() => import('../../components/Map'), { ssr: false });
import {} from '../../components/PhotoPanel/PhotoPanel';
import { Box } from '@mantine/core';
import { reverseGeocode } from '../../utils/ReverseGeocoder';

export default function Home() {
  //   const [globeClicked, setGlobeClicked] = useState(false);
  const [activeSwitch, setActiveSwitch] = useState<string | null>('photos');

  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [photos, setPhotos] = useState<PhotoType[]>([]);
  const [meals, setMeals] = useState<MealType[]>([]);
  const [placeName, setPlaceName] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);

  //  fetch photos function
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

  const fetchFoodByCoords = async (lat: number, lng: number) => {
    const placeObject = await reverseGeocode(lat, lng);
    const country = placeObject.country;

    try {
      const res = await fetch(`/api/food?country=${country}`);
      if (!res.ok) {
        console.error('Failed to fetch food', await res.text());
        return { meals: [], country: null };
      }
      const data = await res.json();
      return {
        meals: data.meals,
        country, // include country here
      };
    } catch (err) {
      console.error('Fetch error:', err);
      return { meals: [], country: null };
    }
  };

  // const handleMapClick = async (lat: number, lng: number) => {
  //   setLocation({ lat, lng });

  //   const { photos, placeName, country } = await fetchPhotosByCoords(lat, lng);
  //   setPhotos(photos);
  //   setPlaceName(placeName);
  //   setCountry(country);
  // };
  const handleMapClick = async (lat: number, lng: number) => {
    setLocation({ lat, lng });

    if (activeSwitch === 'photos') {
      const { photos, placeName, country } = await fetchPhotosByCoords(
        lat,
        lng
      );
      setPhotos(photos);
      setPlaceName(placeName);
      setCountry(country);
    } else if (activeSwitch === 'food') {
      const { meals, country } = await fetchFoodByCoords(lat, lng);
      setMeals(meals);
      setCountry(country);
    } else if (activeSwitch === 'news') {
      // ...
    } else if (activeSwitch === 'radio') {
      // ...
    } else {
      setPhotos([]);
      setPlaceName(null);
      setCountry(null);
    }
  };

  // const handleSearch = async (place: string) => {
  //   try {
  //     const res = await fetch(
  //       `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`,
  //       {
  //         headers: {
  //           'User-Agent': 'the-discovery-panel (lizzielerwill@gmail.com)',
  //         },
  //       }
  //     );
  //     const results = await res.json();
  //     if (results.length > 0) {
  //       const { lat, lon } = results[0];
  //       handleMapClick(parseFloat(lat), parseFloat(lon));
  //     } else {
  //       alert('Location not found.');
  //     }
  //   } catch (err) {
  //     console.error('Geocoding failed:', err);
  //   }
  // };

  const handleSearch = async (place: string) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`,
        {
          headers: {
            'User-Agent': 'the-discovery-panel (youremail@example.com)',
          },
        }
      );
      const results = await res.json();

      if (results.length > 0) {
        const { lat, lon } = results[0];
        if (!lat || !lon) {
          alert('Invalid coordinates from geocoding.');
          return;
        }

        await handleMapClick(parseFloat(lat), parseFloat(lon));
      } else {
        alert('Location not found.');
      }
    } catch (err) {
      console.error('Geocoding failed for input:', place, err);
    }
  };

  // Generate random lat/lng on globe click, fetch photos, and show GuessThePlace
  // const handleGlobeClick = async () => {
  //   // Random latitude between -90 and 90
  //   const lat = Math.random() * 180 - 90;
  //   // Random longitude between -180 and 180
  //   const lng = Math.random() * 360 - 180;

  //   console.log('Random coords for GuessThePlace:', { lat, lng });

  //   const { photos, placeName, country } = await fetchPhotosByCoords(lat, lng);
  //   setPhotos(photos);
  //   setPlaceName(placeName);
  //   setCountry(country);

  //   // setGlobeClicked(true);
  // };

  return (
    <Box style={{ position: 'relative', minHeight: '100vh' }}>
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000, // Make sure it's above the map
        }}
      >
        <Topbar
          onSearch={handleSearch}
          activeSwitch={activeSwitch}
          setActiveSwitch={setActiveSwitch}
        />
      </Box>

      {/* <Box onClick={handleGlobeClick} style={{ cursor: 'pointer' }}>
        <Globe />
      </Box> */}
      <MapItem onMapClick={handleMapClick} />
      {/* {globeClicked && photos.length > 0 && placeName && country && (
        <GuessThePlace
          photos={photos}
          placeName={placeName}
          country={country}
          onClose={() => setGlobeClicked(false)}
        />
      )} */}
      {location && activeSwitch === 'photos' && (
        <PhotoPanel
          photos={photos}
          location={location}
          placeName={placeName}
          country={country}
          onClose={() => setLocation(null)}
        />
      )}
      {location && activeSwitch === 'food' && (
        <FoodPanel
          meals={meals}
          country={country}
          visible={true}
          // location={location}
          onClose={() => setLocation(null)}
        />
      )}
    </Box>
  );
}
