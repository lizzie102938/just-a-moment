'use client';

import React, { useEffect, useState } from 'react';
import { Modal, Text, Loader, Box, useMantineTheme } from '@mantine/core';
import { RecipeType } from '@/types';
import classes from './Recipe.module.scss';

interface RecipeProps {
  readonly recipeId: string;
  readonly onClose: () => void;
  readonly recipeName: string;
  readonly recipeCardOpen: boolean;
}

const Recipe = ({
  recipeId,
  onClose,
  recipeName,
  recipeCardOpen,
}: RecipeProps) => {
  const theme = useMantineTheme();
  const [recipe, setRecipe] = useState<RecipeType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
        );
        const data = await res.json();
        setRecipe(data.meals?.[0] ?? null);
      } catch (err) {
        console.error('Failed to fetch recipe:', err);
        setRecipe(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  const ingredients =
    recipe &&
    Array.from({ length: 20 }, (_, i) => {
      const ingredient = recipe[`strIngredient${i + 1}` as keyof RecipeType];
      const measure = recipe[`strMeasure${i + 1}` as keyof RecipeType];

      if (ingredient?.trim()) {
        return `${measure?.trim() || ''} ${ingredient.trim()}`;
      }
      return null;
    }).filter(Boolean);

  return (
    <Modal
      opened={recipeCardOpen}
      onClose={onClose}
      zIndex={1005}
      title={<Text className={classes.title}>{recipeName}</Text>}
    >
      {loading && <Loader />}
      {!loading && recipe ? (
        <Box>
          <Text fw={500} mb={'sm'}>
            Ingredients:
          </Text>
          <ul>
            {ingredients?.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
          <Text fw={500} mt={'lg'} mb={'xs'}>
            Instructions:
          </Text>
          <Text size="sm">{recipe.strInstructions}</Text>
        </Box>
      ) : (
        !loading && <Text>No recipe found.</Text>
      )}
    </Modal>
  );
};

export default Recipe;
