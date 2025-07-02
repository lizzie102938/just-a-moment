import classes from './PhotoPanel.module.scss';
import Button from '@/components/Button/Button';
import { Modal, Box, Flex, Text, useMantineTheme } from '@mantine/core';
import Tooltip from '@/components/Tooltip/Tooltip';
import PhotoCard from '../PhotoCard/PhotoCard';
import { PhotoType } from '../../types';
import { useSession } from 'next-auth/react';

type PhotoPanelProps = {
  readonly photos: PhotoType[];
  readonly location: { lat: number; lng: number };
  readonly placeName?: string | null;
  readonly country?: string | null;
  readonly onClose: () => void;
  readonly onSuccess: () => void;
  readonly onError: () => void;
};

export function PhotoPanel({
  photos,
  location,
  placeName,
  country,
  onClose,
  onSuccess,
  onError,
}: PhotoPanelProps) {
  const theme = useMantineTheme();
  const { data: session } = useSession();
  const handleAddToBucketList = (
    country: string | null,
    placeName: string | null
  ) => {
    if (!country) {
      console.log('No country provided');
      return;
    }

    const userId = session?.user.id;

    fetch('/api/bucket-list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        country,
        place_name: placeName ?? '',
        reason: 'Photos',
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add country to bucket list');
        }
        onError();
        return response.json();
      })
      .then((data) => {
        console.log('Country added to bucket list', data);
        onClose();
        onSuccess();
      })
      .catch((error) => {
        console.error('Error adding country to bucket list:', error);
        onError();
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
          backgroundColor: `${theme.colors.indigo[1]}`,
        },
        content: {
          backgroundColor: `${theme.colors.indigo[1]}`,
        },
      }}
    >
      {photos.length === 0 ? (
        <Text p={16} c={theme.colors.gray[7]}>
          Sorry, we have no photos for this area, please try somewhere else
        </Text>
      ) : (
        <>
          <Flex justify={'center'} gap={25} pb={'lg'}>
            <Flex gap={'lg'}>
              <Flex direction={'column'}>
                <Text className={classes.heading}>
                  Photos from {placeName ? ` ${placeName}` : ''},
                  {country ? ` ${country}` : ''}
                </Text>
                <Text>
                  ({location.lat.toFixed(2)}, {location.lng.toFixed(2)})
                </Text>
              </Flex>
              <Box className={classes.topInfo}>
                {!session?.user.id ? (
                  <Tooltip
                    label={'You must be logged in to add to your bucket list'}
                  >
                    <Box>
                      <Button
                        disabled
                        onClick={() => ''}
                        label={'Add to Bucket List'}
                      />
                    </Box>
                  </Tooltip>
                ) : (
                  <Button
                    onClick={() =>
                      handleAddToBucketList(country ?? '', placeName ?? '')
                    }
                    label={'Add to Bucket List'}
                  />
                )}
                {/* <Button
                  label={'Add to Bucket List'}
                  onClick={() =>
                    handleAddToBucketList(country ?? '', placeName ?? '')
                  }
                /> */}
              </Box>
            </Flex>
          </Flex>

          <Box className={classes.grid} p={'lg'}>
            {photos.map((photo) => {
              return <PhotoCard key={photo.url} photo={photo} />;
            })}
          </Box>
        </>
      )}
    </Modal>
  );
}
