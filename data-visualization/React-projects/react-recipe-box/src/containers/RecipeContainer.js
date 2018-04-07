import React, { Component } from 'react';

import RecipeEditor from '../components/RecipeEditor';
import RecipeSection from '../components/RecipeSection';

class RecipesContainer extends Component {
  constructor() {
    super();

    this.state = {
      recipes:
        typeof localStorage['recipeMakerTTabhinav'] != 'undefined'
          ? JSON.parse(localStorage['recipeMakerTTabhinav'])
          : [
              {
                title: 'Butter chicken',
                ingredients: 'Butter,chicken',
                isExpanded: true
              },
              {
                title: 'Cake',
                ingredients: 'chocolate,MAGIC!',
                isExpanded: false
              }
            ],
      index: -1,
      makingRecipe: false
    };

    this.saveRecipe = this.saveRecipe.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.discardRecipe = this.discardRecipe.bind(this);
    this.editRecipe = this.editRecipe.bind(this);
    this.makeRecipe = this.makeRecipe.bind(this);
    this.updateLocalStorage = this.updateLocalStorage.bind(this);
    this.toggleExpansion = this.toggleExpansion.bind(this);
  }

  updateLocalStorage() {
    localStorage.setItem(
      'recipeMakerTTabhinav',
      JSON.stringify(this.state.recipes)
    );
  }

  makeRecipe() {
    this.setState({
      makingRecipe: true,
      index: -1
    });
  }

  saveRecipe(index, recipe) {
    let newRecipes;
    if (index !== -1) {
      newRecipes = this.state.recipes.map((r, i) => (i === index ? recipe : r));
    } else {
      newRecipes = this.state.recipes.concat(recipe);
    }

    this.setState(
      {
        recipes: newRecipes,
        makingRecipe: false,
        index: -1
      },
      () => {
        this.updateLocalStorage();
      }
    );
  }

  editRecipe(index) {
    this.setState({
      index: index,
      makingRecipe: true
    });
  }

  deleteRecipe(index) {
    let newRecipes = this.state.recipes.filter((_, i) => i !== index);
    this.setState(
      {
        recipes: newRecipes
      },
      () => {
        this.updateLocalStorage();
      }
    );
  }

  renderRecipeEditor(index) {
    let title = index === -1 ? '' : this.state.recipes[index].title;
    let ingredients = index === -1 ? '' : this.state.recipes[index].ingredients;

    return (
      <RecipeEditor
        title={title}
        ingredients={ingredients}
        index={index}
        saveRecipe={this.saveRecipe}
        discardRecipe={this.discardRecipe}
      />
    );
  }

  discardRecipe() {
    this.setState({
      makingRecipe: false
    });
  }

  toggleExpansion(index) {
    let changedRecipe = this.state.recipes[index];
    changedRecipe.isExpanded = !changedRecipe.isExpanded;

    let recipes = this.state.recipes.map(
      (r, i) => (index === i ? changedRecipe : r)
    );

    this.setState({
      recipes: recipes
    });
  }

  render() {
    if (this.state.makingRecipe) {
      return this.renderRecipeEditor(this.state.index);
    } else
      return (
        <RecipeSection
          makeRecipe={this.makeRecipe}
          data={this.state.recipes}
          toggleExpansion={this.toggleExpansion}
          delete={this.deleteRecipe}
          editRecipe={this.editRecipe}
        />
      );
  }
}

export default RecipesContainer;
