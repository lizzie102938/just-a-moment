import classes from './FoodPanel.module.scss';
import Badge from '@/components/Badge/Badge';
import { Modal, Box, Flex } from '@mantine/core';
import MealCard from '../MealCard/MealCard';
import { MealType } from '../../types';
import { useEffect } from 'react';
// import { countryAdjectiveMapping } from '../../utils/countryAdjectiveMapping';

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
  // add useEffect to update meals and country when they change

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

          <Badge label={'Add to Bucket List'} type={'simple'} />
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
