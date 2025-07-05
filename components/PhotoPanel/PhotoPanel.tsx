'use client';

import { useSession } from 'next-auth/react';
import { Button, Tooltip, PhotoCard } from '@/components';
import { Modal, Box, Flex, Text, useMantineTheme } from '@mantine/core';
import { PhotoType } from '../../types';
import classes from './PhotoPanel.module.scss';

type PhotoPanelProps = {
  readonly photos?: PhotoType[];
  readonly location: { lat?: number; lng?: number } | null;
  readonly placeName?: string | null;
  readonly country?: string | null;
  readonly opened: boolean;
  readonly insideBucketList?: boolean;
  readonly onClose: () => void;
  readonly onSuccess?: () => void;
  readonly onError?: () => void;
};

const PhotoPanel = ({
  photos,
  location,
  placeName,
  country,
  opened,
  insideBucketList,
  onClose,
  onSuccess,
  onError,
}: PhotoPanelProps) => {
  const theme = useMantineTheme();
  const { data: session } = useSession();
  const handleAddToBucketList = (
    country: string | null,
    placeName: string | null,
    location: { lat?: number; lng?: number } | null
  ) => {
    if (!country) {
      ('No country provided');
      return;
    }

    const userId = session?.user.id;

    const lat = location?.lat;

    const lng = location?.lng;

    fetch('/api/bucket-list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        country,
        latitude: lat,
        longitude: lng,
        place_name: placeName ?? '',
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
        onSuccess?.();
        onClose();
      })
      .catch((error) => {
        onError?.();
      });
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      zIndex={1005}
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
      {photos?.length === 0 ? (
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
                <Text className={classes.coordinates}>
                  ({location?.lat?.toFixed(2)}, {location?.lng?.toFixed(2)})
                </Text>
              </Flex>
              <Box className={classes.topInfo}>
                {!insideBucketList && !session?.user.id && (
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
                )}
                {!insideBucketList && session?.user.id && (
                  <Button
                    onClick={() =>
                      handleAddToBucketList(
                        country ?? '',
                        placeName ?? '',
                        location ?? null
                      )
                    }
                    label={'Add to Bucket List'}
                  />
                )}
              </Box>
            </Flex>
          </Flex>

          <Box className={classes.grid} p={'lg'}>
            {photos?.map((photo) => {
              return <PhotoCard key={photo.url} photo={photo} />;
            })}
          </Box>
        </>
      )}
    </Modal>
  );
};

export default PhotoPanel;
