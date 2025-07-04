'use client';

import React, { useState } from 'react';
import { Box, useMantineTheme, Text } from '@mantine/core';
import { Recipe } from '@/components';
import { MealType } from '@/types';
import classes from './MealCard.module.scss';

type MealCardProps = {
  meal: MealType;
};

const MealCard = ({ meal }: MealCardProps) => {
  const theme = useMantineTheme();

  const [recipeCardOpen, setRecipeCardOpen] = useState(false);

  return (
    <>
      <Box
        key={meal.strMealThumb + meal.strMeal}
        className={classes.card}
        w={200}
        bg={'white'}
        onClick={() => setRecipeCardOpen(true)}
      >
        <Text ta={'center'} c={theme.colors.gray[7]}>
          {meal.strMeal}
        </Text>
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className={classes.image}
        />
      </Box>

      <Recipe
        recipeCardOpen={recipeCardOpen}
        recipeId={meal.idMeal}
        onClose={() => setRecipeCardOpen(false)}
        recipeName={meal.strMeal}
      />
    </>
  );
};

export default MealCard;
