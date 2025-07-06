'use client';

import { Modal, Box, Flex, Text, useMantineTheme } from '@mantine/core';
import { MealCard, PanelTopInfo } from '@/components';

import { MealType } from '@/types';
import classes from './FoodPanel.module.scss';

interface FoodPanelProps {
  readonly meals: MealType[];
  readonly country?: string | null;
  readonly opened: boolean;
  readonly location: { lat?: number; lng?: number } | null;
  readonly onClose: () => void;
  readonly onSuccess?: () => void;
  readonly onError?: () => void;
}

const FoodPanel = ({
  meals,
  country,
  opened,
  location,
  onClose,
  onSuccess,
  onError,
}: FoodPanelProps) => {
  const theme = useMantineTheme();

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

            <PanelTopInfo
              reason={'Food'}
              country={country ?? ''}
              location={location}
              onClose={onClose}
              onSuccess={onSuccess}
              onError={onError}
            />
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
