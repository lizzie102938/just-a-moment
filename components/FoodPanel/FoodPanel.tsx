'use client';

import classes from './FoodPanel.module.scss';
import Button from '../Button/Button';
import Tooltip from '../Tooltip/Tooltip';
import { Modal, Box, Flex } from '@mantine/core';
import MealCard from '../MealCard/MealCard';
import { MealType } from '../../types';
import { useSession } from 'next-auth/react';

interface FoodPanelProps {
  readonly meals: MealType[];
  readonly onClose: () => void;
  readonly country?: string | null;
  readonly visible: boolean;
}

export function FoodPanel({
  meals,
  country,
  onClose,
  visible,
}: FoodPanelProps) {
  const { data: session } = useSession();
  console.log(session, 'check session');

  const handleAddToBucketList = (country: string) => {
    if (!session) {
      console.log('User not logged in');
      return;
    }

    const userId = session.user.id; // Assuming session.user.id contains the user ID
    // const mealNames = meals.map((meal) => meal.strMeal).join(', ');

    fetch('/api/bucket-list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        country,
        reason: 'Food',
        // meals: mealNames,
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
        onClose(); // Close the panel after adding
      })
      .catch((error) => {
        console.error('Error adding country to bucket list:', error);
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
      <Box className={classes.panel}>
        <Flex align="center" gap={25}>
          <h2 className={classes.heading}>Photos of food from {country}</h2>
          {session == null ? (
            <Tooltip label={'Log in to add meals to your bucket list'}>
              <Button
                disabled
                onClick={() => ''}
                label={'Add to Bucket List'}
              />
            </Tooltip>
          ) : (
            <Button
              onClick={() => handleAddToBucketList(country ?? '')}
              label={'Add to Bucket List'}
            />
          )}
        </Flex>

        <Box className={classes.grid}>
          {meals?.map((meal) => {
            return <MealCard key={meal.strMeal} meal={meal} />;
          })}
        </Box>
      </Box>
    </Modal>
  );
}
