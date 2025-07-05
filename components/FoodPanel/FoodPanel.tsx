'use client';

import { useSession } from 'next-auth/react';
import { Modal, Box, Flex, Text, useMantineTheme } from '@mantine/core';

import { MealCard, Tooltip, Button } from '@/components';
import { MealType } from '@/types';
import classes from './FoodPanel.module.scss';

interface FoodPanelProps {
  readonly meals: MealType[];
  readonly country?: string | null;
  readonly opened: boolean;
  readonly insideBucketList?: boolean;
  readonly location?: { lat?: number; lng?: number } | null;
  readonly onClose: () => void;
  readonly onSuccess?: () => void;
  readonly onError?: () => void;
}

const FoodPanel = ({
  meals,
  country,
  opened,
  insideBucketList,
  location,
  onClose,
  onSuccess,
  onError,
}: FoodPanelProps) => {
  const theme = useMantineTheme();
  const { data: session } = useSession();

  const handleAddToBucketList = (country: string) => {
    if (!session) {
      return;
    }

    const userId = session?.user?.id;
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
        reason: 'Food',
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
          backgroundColor: '#e1e0f9',
        },
        content: {
          backgroundColor: '#e1e0f9',
        },
      }}
    >
      {meals.length === 0 ? (
        <Text p={16} c={theme.colors.gray[7]}>
          Sorry, we have no recipes for this location, please select another.
        </Text>
      ) : (
        <>
          <Flex gap={25} justify={'center'} pb={'lg'}>
            <Flex direction={'column'} className={classes.heading}>
              <Text className={classes.heading}>Dishes from {country}</Text>
              <Text>Click images for recipes</Text>
            </Flex>
            <Box className={classes.topInfo}>
              {!insideBucketList && !session?.user.id && (
                <Tooltip
                  label={
                    'You must be logged in to add to your bucket list. Please create user or login.'
                  }
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
            {meals?.map((meal) => {
              return <MealCard key={meal.strMeal} meal={meal} />;
            })}
          </Box>
        </>
      )}
    </Modal>
  );
};
export default FoodPanel;
