import React, { useEffect, useState } from 'react';
import { Modal, Text, Loader, Box } from '@mantine/core';

interface RecipeProps {
  readonly recipeId: string;
  readonly onClose: () => void;
  readonly recipeName: string;
}

const Recipe = ({ recipeId, onClose, recipeName }: RecipeProps) => {
  const [recipe, setRecipe] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
        );
        const data = await res.json();
        setRecipe(data.meals?.[0] || null);
      } catch (err) {
        console.error('Failed to fetch recipe:', err);
        setRecipe(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  return (
    <Modal opened onClose={onClose} zIndex={1003} title={recipeName}>
      {loading && <Loader />}
      {!loading && recipe ? (
        <Box>
          <Text size="sm" mt="xs">
            {recipe.strInstructions}
          </Text>
        </Box>
      ) : (
        !loading && <Text>No recipe found.</Text>
      )}
    </Modal>
  );
};

export default Recipe;
