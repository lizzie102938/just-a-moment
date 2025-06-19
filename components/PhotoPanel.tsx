// components/PhotoPanel.tsx
import styles from './PhotoPanel.module.scss';

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
    <div className={styles.panel}>
      <h2 className={styles.heading}>
        Photos for ({location.lat.toFixed(2)}, {location.lng.toFixed(2)})
        {placeName ? ` – ${placeName}` : ''}
      </h2>
      <div className={styles.grid}>
        {photos.map((photo) => (
          <div key={photo.url + photo.title} className={styles.card}>
            <img src={photo.url} alt={photo.title} className={styles.image} />
            <p className={styles.caption}>{photo.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
