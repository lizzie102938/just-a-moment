import { reverseGeocode } from '@/utils/ReverseGeocoder';

export const fetchPhotosByCoords = async (lat: number, lng: number) => {
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

export const fetchFoodByCoords = async (lat: number, lng: number) => {
  const placeObject = await reverseGeocode(lat, lng);
  const country = placeObject.country;

  if (!country) {
    console.error('No country found from coordinates');
    return { meals: [], country: '' };
  }

  try {
    const res = await fetch(`/api/food?country=${country}`);
    if (!res.ok) {
      console.error('Failed to fetch food', await res.text());
      return { meals: [], country: country };
    }
    const data = await res.json();

    console.log('Food API response:', data);

    return {
      meals: data.meals,
      country,
    };
  } catch (err) {
    console.error('Fetch error:', err);
    return { meals: [], country };
  }
};

export const fetchRadioByCoords = async (lat: number, lng: number) => {
  const placeObject = await reverseGeocode(lat, lng);
  const country = placeObject.country;

  if (!country) {
    console.error('No country found from coordinates');
    return { meals: [], country: '' };
  }

  try {
    const res = await fetch(`/api/radio?country=${country}`);
    if (!res.ok) {
      console.error('Failed to fetch radio stations', await res.text());
      return { radioStations: [], country: country };
    }
    const data = await res.json();
    return {
      radioStations: data,
      country,
    };
  } catch (err) {
    console.error('Fetch error:', err);
    return { radioStations: [], country };
  }
};

export const fetchBucketList = async () => {
  try {
    const response = await fetch('/api/bucket-list');
    if (!response.ok) {
      throw new Error('Failed to fetch bucket list');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching bucket list:', error);
    return [];
  }
};

export const deleteBucketListItem = async (id: number) => {
  try {
    const response = await fetch('/api/bucket-list', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      throw new Error('Failed to delete bucket list item');
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting bucket list item:', error);
  }
};
