import React, { Component } from 'react';
import RecipeEditor from './RecipeEditor';

class RecipesSection extends Component {
  constructor() {
    super();
    this.state = {
      recipes:
        typeof localStorage['thinkTankRecipes'] != 'undefined'
          ? JSON.parse(localStorage['thinkTankRecipes'])
          : [
              { title: 'Butter chicken', ingredients: 'Butter,chicken' },
              { title: 'Cake', ingredients: 'chocolate,MAGIC!' }
            ],
      recipeIndex: -1,
      newRecipeTitle: 'Enter title here',
      newRecipeIngredients:
        'Enter ingredients seperated by commas eg (butter,sugar,chocolate)'
    };
    this.saveRecipe = this.saveRecipe.bind(this);
    this.toggleMaker = this.toggleMaker.bind(this);
    this.sanitizeRecipe = this.sanitizeRecipe.bind(this);
    this.resetRecipeValues = this.resetRecipeValues.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.titleChanged = this.titleChanged.bind(this);
    this.recipeChanged = this.recipeChanged.bind(this);
    this.editRecipe = this.editRecipe.bind(this);
    this.updateLocalStorage = this.updateLocalStorage.bind(this);
  }

  updateLocalStorage() {
    localStorage.setItem(
      'thinkTankRecipes',
      JSON.stringify(this.state.recipes)
    );
  }

  editRecipe(index) {
    var title = this.state.recipes[index].title;
    var ingred = this.state.recipes[index].ingredients;
    this.setState(
      {
        recipeIndex: index,
        newRecipeIngredients: ingred,
        newRecipeTitle: title
      },
      () => {
        this.toggleMaker();
      }
    );
  }

  toggleMaker() {
    this.setState({
      makingRecipe: !this.state.makingRecipe
    });
  }

  deleteRecipe(index) {
    var newRecipes = this.state.recipes;
    newRecipes.splice(index, 1);
    this.setState(
      {
        recipes: newRecipes
      },
      () => {
        this.updateLocalStorage();
      }
    );
  }

  sanitizeRecipe() {
    var trimmedIngredients = this.state.newRecipeIngredients.split(',');
    trimmedIngredients.forEach(
      (val, i) =>
        (trimmedIngredients[i] =
          val.length > 50 ? val.slice(0, 50).trim() : val.trim())
    );
    trimmedIngredients = trimmedIngredients.join(',');
    var trimmedTitle = this.state.newRecipeTitle.trim();
    return { title: trimmedTitle, ingredients: trimmedIngredients };
  }

  saveRecipe() {
    var sanitizedRecipe = this.sanitizeRecipe();
    var existingRecipes = this.state.recipes;
    if (this.state.recipeIndex === -1 && this.state.newRecipeTitle !== '')
      existingRecipes.push(sanitizedRecipe);
    else if (this.state.newRecipeTitle !== '')
      existingRecipes.splice(this.state.recipeIndex, 1, sanitizedRecipe);
    this.setState(
      {
        recipes: existingRecipes,
        recipeIndex: -1
      },
      () => {
        this.resetRecipeValues();
        this.updateLocalStorage();
      }
    );
  }

  resetRecipeValues() {
    this.setState(
      {
        newRecipeTitle: 'Enter title here',
        newRecipeIngredients:
          'Enter ingredients seperated by commas eg (butter,sugar,chocolate)'
      },
      () => {
        this.toggleMaker();
      }
    );
  }

  titleChanged(e) {
    var val = e.target.value;
    this.setState({
      newRecipeTitle: val.length > 80 ? val.slice(0, 50) : val
    });
  }

  recipeChanged(e) {
    var val = e.target.value;
    this.setState({
      newRecipeIngredients: val
    });
  }

  render() {
    if (this.state.makingRecipe)
      return (
        <RecipeEditor
          title={this.state.title}
          ingredients={this.state.ingredients}
          saveRecipe={this.saveRecipe}
          discardRecipe={this.discardRecipe}
        />
      );
    else
      return (
        <div className="recipesSection">
          <div className="buttonContainer" onClick={this.toggleMaker}>
            <i
              className="button-primary fa fa-plus-square fa-2x"
              aria-hidden="true"
            />
          </div>
          {this.state.recipes.map((recipeDetails, i) => (
            <RecipeInfo
              key={i}
              recipeDetails={recipeDetails}
              deleteFn={this.deleteRecipe}
              index={i}
              editRecipe={this.editRecipe}
            />
          ))}
        </div>
      );
  }
}
