import classes from './PhotoPanel.module.scss';
import Badge from '@/components/Badge/Badge';
import { Modal, Box, Flex } from '@mantine/core';
import PhotoCard from '../PhotoCard/PhotoCard';
import { PhotoType } from '../../types';

type PhotoPanelProps = {
  readonly photos: PhotoType[];
  readonly location: { lat: number; lng: number };
  readonly placeName?: string | null;
  readonly country?: string | null;
  readonly onClose: () => void;
};

export function PhotoPanel({
  photos,
  location,
  placeName,
  country,
  onClose,
}: PhotoPanelProps) {
  return (
    <Modal
      opened={!!location}
      onClose={onClose}
      zIndex={1003}
      size={'auto'}
      styles={{
        header: {
          backgroundColor: '#e1e0f9',
        },
        content: {
          backgroundColor: '#e1e0f9',
        },
      }}
    >
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
