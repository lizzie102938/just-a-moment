import classes from './PhotoPanel.module.scss';
import Badge from '@/components/Badge';
import { Modal, Box, Flex } from '@mantine/core';
import PhotoCard from './PhotoCard';
import { Photo } from './types';

type PhotoPanelProps = {
  photos: Photo[];
  location: { lat: number; lng: number };
  placeName?: string | null;
  country?: string | null;
  onClose: () => void;
};

export function PhotoPanel({
  photos,
  location,
  placeName,
  country,
  onClose,
}: PhotoPanelProps) {
  console.log(country, 'country in PhotoPanel');
  return (
    <Modal opened={!!location} onClose={onClose} zIndex={1000} size={'auto'}>
      <Box className={classes.panel}>
        <Flex align="center" gap={25}>
          <h2 className={classes.heading}>
            Photos of ({location.lat.toFixed(2)}, {location.lng.toFixed(2)})
            {placeName ? ` – ${placeName}` : ''},{country ? `${country}` : ''}
          </h2>

          <Badge label={'Add to Bucket List'} type={'simple'} />
        </Flex>

        <Box className={classes.grid}>
          {photos.map((photo) => {
            return <PhotoCard key={photo.url} photo={photo} />;
          })}
        </Box>
      </Box>
    </Modal>
  );
}
