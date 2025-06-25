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
      minZoom={3.5} // 👈 Prevents zooming out too far
      maxZoom={12} // Optional: caps the max zoom
      maxBounds={[
        [-60, -180],
        [85, 180],
      ]}
      // Near-global vertical and horizontal
      maxBoundsViscosity={0.05} // Very soft boundaries
      worldCopyJump={true}
      style={{ height: '100vh', width: '100%' }}
    >
      {/* <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      /> */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='© <a href="https://carto.com/">Carto</a>'
      />

      {/* <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='© <a href="https://carto.com/">Carto</a>'
      /> */}

      <MapClickHandler />
    </MapContainer>
  );
}
