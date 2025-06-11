// components/PhotoPanel.tsx

type Photo = {
  url: string;
  title: string;
};

type PhotoPanelProps = Readonly<{
  photos: Photo[];
  location: Readonly<{ lat: number; lng: number }>;
  placeName?: string | null;
}>;

export function PhotoPanel({ photos, location, placeName }: PhotoPanelProps) {
  return (
    <div>
      <h2>
        Photos for ({location.lat.toFixed(2)}, {location.lng.toFixed(2)}),{' '}
        {placeName}
      </h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {photos.map((photo) => (
          <div key={photo.url + photo.title}>
            <img src={photo.url} alt={photo.title} width={200} height={150} />
            <p>{photo.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
