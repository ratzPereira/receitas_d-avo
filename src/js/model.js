import { async } from 'regenerator-runtime';
import { API_URL } from './config';
import { getJson } from './helpers';

export const state = {
  recipe: {},
};

export const loadRecipe = async id => {
  try {
    const data = await getJson(`${API_URL}/${id}`);

    const { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (err) {
    console.error(err.message);
  }
  console.log(state.recipe);
};
