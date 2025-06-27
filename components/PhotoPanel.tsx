import styles from './PhotoPanel.module.scss';
import Badge from '@/components/Badge';
import { Modal, Box, Flex } from '@mantine/core';
import PhotoCard from './PhotoCard';

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

export function PhotoPanel({
  photos,
  location,
  placeName,
  onClose,
}: PhotoPanelProps) {
  return (
    <Modal opened={!!location} onClose={onClose} zIndex={1000} size={'auto'}>
      <div className={styles.panel}>
        <Flex align="center" gap={25}>
          <h2 className={styles.heading}>
            Photos of ({location.lat.toFixed(2)}, {location.lng.toFixed(2)})
            {placeName ? ` – ${placeName}` : ''}
          </h2>
          <Badge label={'Add to my Bucket List'} type={'simple'} />
        </Flex>

        <Box className={styles.grid}>
          {photos.map((photo) => {
            console.log('Photo date:', photo.date);
            return <PhotoCard key={photo.url} photo={photo} />;
          })}
        </Box>
      </div>
    </Modal>
  );
}
