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
    <MapContainer
      center={[20, 0]}
      zoom={2}
      minZoom={3.5}
      maxZoom={12}
      maxBounds={[
        [-60, -180],
        [85, 180],
      ]}
      maxBoundsViscosity={0.05}
      worldCopyJump={true}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='© <a href="https://carto.com/">Carto</a>'
      />

      <MapClickHandler />
    </MapContainer>
  );
}
