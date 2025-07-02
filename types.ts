export type PhotoType = {
  url: string;
  title: string;
  date: string;
};

export type MealType = {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
};

export type AlertType = {
  type: 'success' | 'error';
  message: string;
};

export type BucketListType = {
  country: string;
  reason: string;
  id: number;
  place_name?: string;
};

export type RecipeType = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
};
