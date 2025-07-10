'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Box } from '@mantine/core';
import {
  Topbar,
  Loader,
  Toast,
  FoodPanel,
  PhotoPanel,
  RadioPanel,
} from '@/components';
import { PhotoType, MealType, AlertType } from '@/types';

import {
  fetchPhotosByCoords,
  fetchFoodByCoords,
  fetchRadioByCoords,
} from '@/utils/fetchFunctions';
import classes from './MainPage.module.scss';

const MapItem = dynamic(() => import('@/components/Map/Map'), { ssr: false });

export default function MainPage() {
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
  const [photoPanelOpen, setPhotoPanelOpen] = useState(false);
  const [foodPanelOpen, setFoodPanelOpen] = useState(false);
  const [radioPanelOpen, setRadioPanelOpen] = useState(false);

  const [meals, setMeals] = useState<MealType[]>([]);
  const [radioStations, setRadioStations] = useState<any[]>([]);
  const [placeName, setPlaceName] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);

  const handleMapClick = async (lat: number, lng: number) => {
    setIsLoading(true);
    setLocation({ lat, lng });

    if (activeSwitch === 'photos') {
      const result = await fetchPhotosByCoords(lat, lng);
      setPhotos(result.photos);
      setPlaceName(result.placeName);
      setCountry(result.country);
      setPhotoPanelOpen(true);
    } else if (activeSwitch === 'food') {
      const { meals, country } = await fetchFoodByCoords(lat, lng);
      setMeals(meals);
      setCountry(country);
      setFoodPanelOpen(true);
    } else if (activeSwitch === 'radio') {
      const { radioStations, country } = await fetchRadioByCoords(lat, lng);
      setRadioStations(radioStations);
      setCountry(country);
      setRadioPanelOpen(true);
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

  const successMessage = 'Added to bucket list successfully!';
  const errorMessage = 'Failed to add to bucket list.';

  return (
    <Box className={classes.mainPageContainer}>
      <Box className={classes.topbarContainer}>
        <Topbar
          onSearch={handleSearch}
          activeSwitch={activeSwitch}
          setActiveSwitch={setActiveSwitch}
        />
      </Box>

      <MapItem onMapClick={handleMapClick} />

      {isLoading && <Loader />}
      {photoPanelOpen &&
        activeSwitch === 'photos' &&
        !isLoading &&
        country !== null && (
          <PhotoPanel
            onSuccess={() => showSuccess(successMessage)}
            onError={() => showError(errorMessage)}
            photos={photos}
            location={location}
            opened={photoPanelOpen}
            placeName={placeName}
            country={country}
            onClose={() => setPhotoPanelOpen(false)}
          />
        )}
      {foodPanelOpen &&
        activeSwitch === 'food' &&
        !isLoading &&
        country !== null && (
          <FoodPanel
            onSuccess={() => showSuccess(successMessage)}
            onError={() => showError(errorMessage)}
            meals={meals}
            location={location}
            country={country}
            opened={foodPanelOpen}
            onClose={() => setFoodPanelOpen(false)}
          />
        )}
      {radioPanelOpen &&
        activeSwitch === 'radio' &&
        !isLoading &&
        country !== null && (
          <RadioPanel
            onSuccess={() => showSuccess(successMessage)}
            onError={() => showError(errorMessage)}
            radioStations={radioStations}
            country={country}
            location={location}
            opened={radioPanelOpen}
            onClose={() => setRadioPanelOpen(false)}
          />
        )}
      {alert && <Toast alert={alert} setAlert={setAlert} />}
    </Box>
  );
}
