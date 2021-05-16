import * as model from './model';

import recipeView from './views/recipeView';
import searchView from './views/searchView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { state } from './model';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    //# Render the spinner while we fetch data
    recipeView.renderSpinner();

    //0 Resolve View to mark selected search result
    resultsView.update(model.getSearchResultsPage());

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

    //Render results
    resultsView.render(model.getSearchResultsPage());

    //Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (e) {
    console.log(e.message);
  }
};

const controlPagination = function (goToPage) {
  //Render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));

  //Render NEW pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //Update the recipe servings ( in state)
  model.updateServings(newServings);

  //update the view
  //recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const init = function () {
  searchView.addHandlerSearch(controlSearchResults);
  recipeView.addHandlerRender(controlRecipes);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerUpdateServings(controlServings);
};
init();
