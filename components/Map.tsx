'use client';

import {
  MapContainer,
  TileLayer,
  useMapEvents,
  ZoomControl,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  readonly onMapClick: (lat: number, lng: number) => void;
};

export default function MapFunction({ onMapClick }: MapProps) {
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
      center={[50, 50]}
      zoom={4}
      minZoom={3.5}
      maxZoom={12}
      maxBounds={[
        [-60, -180],
        [85, 180],
      ]}
      maxBoundsViscosity={0.05}
      worldCopyJump={true}
      zoomControl={false}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='© <a href="https://carto.com/">Carto</a>'
      />
      <ZoomControl position="bottomleft" /> {/* add zoom control explicitly */}
      <MapClickHandler />
    </MapContainer>
  );
}
