// components/PhotoPanel.tsx
import styles from './PhotoPanel.module.scss';
import { format } from 'date-fns';
import { Modal, NavLink, Text, Box } from '@mantine/core';
import { theme } from '@/lib/theme'; // Adjust the import path as needed

type Photo = {
  url: string;
  title: string;
  date: string;
};

type PhotoPanelProps = {
  readonly photos: Photo[];
  readonly location: { lat: number; lng: number };
  readonly placeName?: string | null;
  readonly onClose: () => void;
};

const formatDate = (date: string, output: string = 'dd.MM.yy') => {
  const parsed = new Date(date);
  if (isNaN(parsed.getTime())) return 'Invalid date';
  return format(parsed, output);
};

export function PhotoPanel({
  photos,
  location,
  placeName,
  onClose,
}: PhotoPanelProps) {
  return (
    <Modal opened={!!location} onClose={onClose} zIndex={1000} size={'auto'}>
      <div className={styles.panel}>
        <h2 className={styles.heading}>
          Photos of ({location.lat.toFixed(2)}, {location.lng.toFixed(2)})
          {placeName ? ` – ${placeName}` : ''}
        </h2>
        <Box className={styles.grid}>
          {photos.map((photo) => {
            console.log('Photo date:', photo.date);
            return (
              <Box
                key={photo.url + photo.title}
                className={styles.card}
                bg={theme.primaryColor}
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  className={styles.image}
                />
                {/* <Text className={styles.caption}>{photo.title}</Text> */}
                <Text ta={'center'} size={'sm'} c={''} pt={4}>
                  {' '}
                  {formatDate(photo.date)}
                </Text>

                <NavLink
                  ta={'center'}
                  href={photo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  label="View on Unsplash"
                />
              </Box>
            );
          })}
        </Box>
      </div>
    </Modal>
  );
}
