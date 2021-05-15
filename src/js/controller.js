import * as model from './model';

import recipeView from './views/recipeView';
import searchView from './views/searchView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { state } from './model';
import resultsView from './views/resultsView';

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    //# Render the spinner while we fetch data
    recipeView.renderSpinner();

    // 1) Load the recipe
    await model.loadRecipe(id);

    // 2) Rendering the recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query);

    resultsView.render(model.state.search.results);
  } catch (e) {
    console.log(e.message);
  }
};

const init = function () {
  searchView.addHandlerSearch(controlSearchResults);
  recipeView.addHandlerRender(controlRecipes);
};
init();
