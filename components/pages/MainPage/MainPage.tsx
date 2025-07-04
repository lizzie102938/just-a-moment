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
// import { reverseGeocode } from '@/utils/ReverseGeocoder';
import {
  fetchPhotosByCoords,
  fetchFoodByCoords,
  fetchRadioByCoords,
} from '@/utils/fetchFunctions';
import classes from './MainPage.module.scss';

const MapItem = dynamic(() => import('@/components/Map'), { ssr: false });

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

  // const fetchPhotosByCoords = async (lat: number, lng: number) => {
  //   const placeObject = await reverseGeocode(lat, lng);
  //   const country = placeObject.country;
  //   const placeName = placeObject.placeName;

  //   try {
  //     const res = await fetch(`/api/photos?lat=${lat}&lng=${lng}`);
  //     if (!res.ok) {
  //       console.error('Failed to fetch photos', await res.text());
  //       return { photos: [], placeName, country };
  //     }
  //     const data = await res.json();
  //     return {
  //       photos: data.photos,
  //       placeName: placeName,
  //       country: country,
  //     };
  //   } catch (err) {
  //     console.error('Fetch error:', err);
  //     return { photos: [], placeName, country };
  //   }
  // };

  // const fetchFoodByCoords = async (lat: number, lng: number) => {
  //   const placeObject = await reverseGeocode(lat, lng);
  //   const country = placeObject.country;

  //   try {
  //     const res = await fetch(`/api/food?country=${country}`);
  //     if (!res.ok) {
  //       console.error('Failed to fetch food', await res.text());
  //       return { meals: [], country: country };
  //     }
  //     const data = await res.json();
  //     return {
  //       meals: data.meals,
  //       country,
  //     };
  //   } catch (err) {
  //     console.error('Fetch error:', err);
  //     return { meals: [], country };
  //   }
  // };

  // const fetchRadioByCoords = async (lat: number, lng: number) => {
  //   const placeObject = await reverseGeocode(lat, lng);
  //   const country = placeObject.country;

  //   try {
  //     const res = await fetch(`/api/radio?country=${country}`);
  //     if (!res.ok) {
  //       console.error('Failed to fetch radio stations', await res.text());
  //       return { radioStations: [], country: country };
  //     }
  //     const data = await res.json();
  //     return {
  //       radioStations: data,
  //       country,
  //     };
  //   } catch (err) {
  //     console.error('Fetch error:', err);
  //     return { radioStations: [], country };
  //   }
  // };

  const handleMapClick = async (lat: number, lng: number) => {
    setIsLoading(true);
    setLocation({ lat, lng });

    if (activeSwitch === 'photos') {
      const result = await fetchPhotosByCoords(lat, lng);
      setPhotos(result.photos);
      setPlaceName(result.placeName);
      setCountry(result.country);
      // setLocation({ lat, lng });
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

  // const handleMapClick = async (lat: number, lng: number) => {
  //   setIsLoading(true);
  //   setLocation({ lat, lng });

  //   try {
  //     const result = await fetchByCoords(activeSwitch, lat, lng);

  //     switch (activeSwitch) {
  //       case 'photos':
  //         setPhotos(result.photos ?? []);
  //         setPlaceName(result.placeName ?? '');
  //         setCountry(result.country ?? '');
  //         setPhotoPanelOpen(true);
  //         break;

  //       case 'food':
  //         setMeals(result.meals ?? []);
  //         setCountry(result.country ?? '');
  //         setFoodPanelOpen(true);
  //         break;

  //       case 'radio':
  //         setRadioStations(result.radioStations ?? []);
  //         setCountry(result.country ?? '');
  //         setRadioPanelOpen(true);
  //         break;

  //       default:
  //         setPhotos([]);
  //         setPlaceName(null);
  //         setCountry(null);
  //     }
  //   } catch (error) {
  //     console.error('Error in handleMapClick:', error);
  //     // Optional: show error alert to user
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

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
            onSuccess={() => showSuccess('Added to bucket list successfully!')}
            onError={() => showError('Failed to add to bucket list.')}
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
            onSuccess={() => showSuccess('Added to bucket list successfully!')}
            onError={() => showError('Failed to add to bucket list.')}
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
            onSuccess={() => showSuccess('Added to bucket list successfully!')}
            onError={() => showError('Failed to add to bucket list.')}
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
