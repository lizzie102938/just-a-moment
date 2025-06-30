import React, { useState } from 'react';
import classes from './MealCard.module.scss';
import { format } from 'date-fns';
import {
  Box,
  useMantineTheme,
  Text,
  Badge as MantineBadge,
} from '@mantine/core';
import Recipe from '../Recipe/Recipe';

import { MealType } from '../../types'; // Adjust the import path as necessary

type MealCardProps = {
  meal: MealType;
};

const MealCard = ({ meal }: MealCardProps) => {
  const theme = useMantineTheme();
  const [hovered, setHovered] = useState(false);
  const [recipeCardOpen, setRecipeCardOpen] = useState(false);

  return (
    <Box
      key={meal.strMealThumb + meal.strMeal}
      className={classes.card}
      w={200}
      bg={theme.colors.indigo[1]}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Text ta={'center'} c={theme.colors.gray[7]}>
        {meal.strMeal}
      </Text>
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className={classes.image}
      />
      {/* <Badge label={'See recipe'} type="simple" /> */}
      {hovered && (
        <MantineBadge
          className={classes.badge}
          color={theme.colors.indigo[3]}
          variant={'filled'}
          onClick={() => setRecipeCardOpen(true)}
          // label={'See recipe'}
          // type={'simple'}
        >
          See recipe
        </MantineBadge>
      )}
      {recipeCardOpen && (
        <Recipe
          recipeId={meal.idMeal}
          onClose={() => setRecipeCardOpen(false)}
          recipeName={meal.strMeal}
        />
      )}
    </Box>
  );
};

export default MealCard;
