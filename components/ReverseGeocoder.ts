export async function reverseGeocode(
  lat: number,
  lng: number
): Promise<string | null> {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;
  console.log('Reverse geocoding URL:', url);
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'just-one-moment (lizzielerwill@gmail.com)',
    },
  });

  if (!response.ok) return null;

  const data = await response.json();

  const address = data.address;

  return address.city ?? address.town ?? address.village ?? null;
}
