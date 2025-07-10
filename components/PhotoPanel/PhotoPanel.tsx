'use client';

import { PanelTopInfo, PhotoCard } from '@/components';
import { Modal, Box, Flex, Text, useMantineTheme } from '@mantine/core';
import { PhotoType } from '../../types';
import classes from './PhotoPanel.module.scss';

type PhotoPanelProps = {
  readonly photos?: PhotoType[];
  readonly location: { lat?: number; lng?: number } | null;
  readonly placeName?: string | null;
  readonly country?: string | null;
  readonly opened: boolean;
  readonly onClose: () => void;
  readonly onSuccess?: () => void;
  readonly onError?: () => void;
};

export default function PhotoPanel({
  photos,
  location,
  placeName,
  country,
  opened,
  onClose,
  onSuccess,
  onError,
}: PhotoPanelProps) {
  const theme = useMantineTheme();

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
                  Photos from {placeName ? ` ${placeName},` : ''}
                  {country ? ` ${country}` : ''}
                </Text>
                <Text className={classes.coordinates}>
                  ({location?.lat?.toFixed(2)}, {location?.lng?.toFixed(2)})
                </Text>
              </Flex>
              <PanelTopInfo
                reason={'Photos'}
                country={country ?? ''}
                placeName={placeName}
                location={location}
                onClose={onClose}
                onSuccess={onSuccess}
                onError={onError}
              />
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
}
