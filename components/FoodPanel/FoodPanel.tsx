'use client';

import classes from './FoodPanel.module.scss';
import Button from '../Button/Button';
import Tooltip from '../Tooltip/Tooltip';
import { Modal, Box, Flex, Text, useMantineTheme } from '@mantine/core';
import MealCard from '../MealCard/MealCard';
import { MealType } from '../../types';
import { useSession } from 'next-auth/react';

interface FoodPanelProps {
  readonly meals: MealType[];
  readonly onClose: () => void;
  readonly country?: string | null;
  readonly visible: boolean;
  readonly onSuccess: () => void;
  readonly onError: () => void;
}

export function FoodPanel({
  meals,
  country,
  onClose,
  visible,
  onSuccess,
  onError,
}: FoodPanelProps) {
  const theme = useMantineTheme();
  const { data: session, status } = useSession();

  console.log(meals, 'meals');

  //   if (status === 'loading') return <div>Loading session...</div>;
  //   if (status === 'unauthenticated') return <div>Please log in</div>;

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
        userId,
        country,
        reason: 'Food',
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
      opened={visible}
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
      {meals.length === 0 ? (
        <Text p={16} c={theme.colors.gray[7]}>
          Sorry, we have no recipes for this location, please select another.
        </Text>
      ) : (
        <>
          <Flex gap={25} justify={'center'} pb={'lg'}>
            <Flex direction={'column'}>
              <Text className={classes.heading}>Dishes from {country}</Text>
              <Text>Click images for recipes</Text>
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
}
