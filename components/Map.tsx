// components/Map.tsx
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  onMapClick: (lat: number, lng: number) => void;
};

export default function Map({ onMapClick }: MapProps) {
  function MapClickHandler() {
    useMapEvents({
      click(e) {
        onMapClick(e.latlng.lat, e.latlng.lng);
      },
    });
    return null;
  }

  return (
    <MapContainer center={[20, 0]} zoom={2} style={{ height: '60vh', width: '100%' }}>
     <TileLayer
  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  attribution='© OpenStreetMap contributors'
/>

      <MapClickHandler />
    </MapContainer>
  );
}
