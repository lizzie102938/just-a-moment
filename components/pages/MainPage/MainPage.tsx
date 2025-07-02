'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Topbar } from '@/components/Topbar';
import Loader from '@/components/Loader/Loader';
// import GuessThePlace from '@/components/GuessThePlace';
// import { Globe } from '@/components/Globe';
import Toast from '@/components/Toast/Toast';
import { PhotoType, MealType, AlertType } from '@/types';
import { FoodPanel } from '@/components/FoodPanel/FoodPanel';
import { PhotoPanel } from '@/components/PhotoPanel/PhotoPanel';
const MapItem = dynamic(() => import('@/components/Map'), { ssr: false });
import { Box } from '@mantine/core';
import { reverseGeocode } from '@/utils/ReverseGeocoder';

export default function MainPage() {
  //   const [globeClicked, setGlobeClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<AlertType | null>(null);
  const showSuccess = (message: string) =>
    setAlert({ type: 'success', message });
  const showError = (message: string) => setAlert({ type: 'error', message });

  const [activeSwitch, setActiveSwitch] = useState<string | null>('photos');

  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [photos, setPhotos] = useState<PhotoType[]>([]);
  const [meals, setMeals] = useState<MealType[]>([]);
  const [placeName, setPlaceName] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);

  const fetchPhotosByCoords = async (lat: number, lng: number) => {
    const placeObject = await reverseGeocode(lat, lng);
    const country = placeObject.country;
    const placeName = placeObject.placeName;

    try {
      const res = await fetch(`/api/photos?lat=${lat}&lng=${lng}`);
      if (!res.ok) {
        console.error('Failed to fetch photos', await res.text());
        return { photos: [], placeName, country };
      }
      const data = await res.json();
      return {
        photos: data.photos,
        placeName: placeName,
        country: country,
      };
    } catch (err) {
      console.error('Fetch error:', err);
      return { photos: [], placeName, country };
    }
  };

  const fetchFoodByCoords = async (lat: number, lng: number) => {
    const placeObject = await reverseGeocode(lat, lng);
    const country = placeObject.country;

    try {
      const res = await fetch(`/api/food?country=${country}`);
      if (!res.ok) {
        console.error('Failed to fetch food', await res.text());
        return { meals: [], country: country };
      }
      const data = await res.json();
      return {
        meals: data.meals,
        country,
      };
    } catch (err) {
      console.error('Fetch error:', err);
      return { meals: [], country };
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
    setIsLoading(true);
    setLocation({ lat, lng });

    if (activeSwitch === 'photos') {
      const result = await fetchPhotosByCoords(lat, lng);
      setPhotos(result.photos);
      setPlaceName(result.placeName);
      setCountry(result.country);
      // const { photos, placeName, country } = await fetchPhotosByCoords(
      //   lat,
      //   lng
      // );
      // setPhotos(photos);
      // setPlaceName(placeName);
      // setCountry(country);
    } else if (activeSwitch === 'food') {
      const { meals, country } = await fetchFoodByCoords(lat, lng);
      setMeals(meals);
      setCountry(country);
    } else if (activeSwitch === 'radio') {
      // ...
    } else {
      setPhotos([]);
      setPlaceName(null);
      setCountry(null);
    }
    setIsLoading(false);
  };

  const handleSearch = async (place: string) => {
    setIsLoading(true);
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
          window.alert('Invalid coordinates from geocoding.');
          return;
        }

        await handleMapClick(parseFloat(lat), parseFloat(lon));
      } else {
        window.alert('Location not found.');
      }
    } catch (err) {
      console.error('Geocoding failed for input:', place, err);
    }
    setIsLoading(false);
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
      {isLoading && <Loader />}
      {location &&
        activeSwitch === 'photos' &&
        !isLoading &&
        country !== null && (
          <PhotoPanel
            onSuccess={() => showSuccess('Added to bucket list successfully!')}
            onError={() => showError('Failed to add to bucket list.')}
            photos={photos}
            location={location}
            placeName={placeName}
            country={country}
            onClose={() => setLocation(null)}
          />
        )}
      {location &&
        activeSwitch === 'food' &&
        !isLoading &&
        country !== null && (
          <FoodPanel
            onSuccess={() => showSuccess('Added to bucket list successfully!')}
            onError={() => showError('Failed to add to bucket list.')}
            meals={meals}
            country={country}
            visible={true}
            onClose={() => setLocation(null)}
          />
        )}
      {alert && <Toast alert={alert} setAlert={setAlert} />}
    </Box>
  );
}
