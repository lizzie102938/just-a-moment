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
  reason: string;
  country: string;
  id: number;
  place_name?: string;
  longitude: number;
  latitude: number;
};

export type RecipeType = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  strIngredient1: string;
};

export type PanelInfoType = {
  opened: boolean;
  country: string;
  reason: string;
  place_name?: string;
  longitude: number;
  latitude: number;
};
export type PhotoPanelInfoType = PanelInfoType & {
  photos: PhotoType[];
};

export type FoodPanelInfoType = PanelInfoType & {
  meals: MealType[];
};

export type RadioPanelInfoType = PanelInfoType & {
  radioStations: any[];
};
