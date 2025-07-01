import classes from './PhotoPanel.module.scss';
import Button from '@/components/Button/Button';
import { Modal, Box, Flex, Text } from '@mantine/core';
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
  const handleAddToBucketList = (country: string | null) => {
    if (!country) {
      console.log('No country provided');
      return;
    }
    fetch('/api/bucket-list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        country,
        reason: 'Photos',
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add country to bucket list');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Country added to bucket list', data);
        onClose();
      })
      .catch((error) => {
        console.error('Error adding country to bucket list:', error);
      });
  };

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
          <Flex direction={'column'}>
            <Flex align={'center'} gap={'md'}>
              <Text className={classes.heading}>
                Photos of {placeName ? ` ${placeName}` : ''},
                {country ? ` ${country}` : ''}
              </Text>
              <Button
                label={'Add to Bucket List'}
                onClick={() => handleAddToBucketList(country ?? '')}
              />
            </Flex>
            <Text>
              ({location.lat.toFixed(2)}, {location.lng.toFixed(2)})
            </Text>
          </Flex>
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
