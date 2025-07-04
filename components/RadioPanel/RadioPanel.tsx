'use client';

import { useSession } from 'next-auth/react';
import { Modal, Box, Flex, Text, useMantineTheme } from '@mantine/core';

import { Tooltip, Button } from '@/components';

import classes from './RadioPanel.module.scss';

interface FoodPanelProps {
  readonly country?: string | null;
  readonly opened: boolean;
  readonly radioStations: any[];
  readonly insideBucketList?: boolean;
  readonly location?: { lat?: number; lng?: number } | null;
  readonly onSuccess?: () => void;
  readonly onError?: () => void;
  readonly onClose: () => void;
}

const FoodPanel = ({
  country,
  opened,
  radioStations,
  insideBucketList,
  location,
  onSuccess,
  onError,
  onClose,
}: FoodPanelProps) => {
  const theme = useMantineTheme();
  const { data: session } = useSession();

  const handleAddToBucketList = (country: string) => {
    if (!session) {
      console.log('User not logged in');
      return;
    }

    const userId = session?.user?.id;

    fetch('/api/bucket-list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        country,
        reason: 'Radio',
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
        onSuccess?.();
        onClose();
      })
      .catch((error) => {
        console.error('Error adding country to bucket list:', error);
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
          backgroundColor: '#e1e0f9',
        },
        content: {
          backgroundColor: '#e1e0f9',
        },
      }}
    >
      {radioStations.length === 0 ? (
        <Text p={16} c={theme.colors.gray[7]}>
          Sorry, we have no radio stations for this location or the external
          Radio Browser API this site relies on is down
        </Text>
      ) : (
        <>
          <Flex gap={25} justify={'center'} pb={'lg'}>
            <Text className={classes.heading}>Radio from {country}</Text>

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
                  onClick={() => handleAddToBucketList(country ?? '')}
                  label={'Add to Bucket List'}
                />
              )}
            </Box>
          </Flex>
          <Box className={classes.grid} p={'lg'}>
            {radioStations.map((station, index) => (
              <Flex
                key={station.name}
                bg={'white'}
                p={'md'}
                gap={'md'}
                align={'center'}
                className={classes.stationCard}
              >
                <Flex align={'center'} gap={'sm'}>
                  {station.favicon ? (
                    <img src={station.favicon ?? ''} alt="" width={40} />
                  ) : (
                    ''
                  )}
                  <Text>{station.name}</Text>
                </Flex>
                <audio
                  controls
                  src={station.url}
                  onPlay={(e) => {
                    const audios = document.querySelectorAll('audio');
                    audios.forEach((audioEl) => {
                      if (audioEl !== e.currentTarget) {
                        audioEl.pause();
                      }
                    });
                  }}
                >
                  <track
                    kind="captions"
                    src={station.captionsUrl ?? ''}
                    srcLang="en"
                    label="English captions"
                  />
                  Your browser does not support the audio element.
                </audio>
              </Flex>
            ))}
          </Box>
        </>
      )}
    </Modal>
  );
};
export default FoodPanel;
