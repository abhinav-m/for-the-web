import React from 'react';

const RecipeInfo = props => {
  if (!props.isExpanded) {
    return (
      <RecipeTitle
        toggleExpansion={props.toggleExpansion}
        index={props.index}
        title={props.recipe.title}
      />
    );
  } else {
    return (
      <div className="recipeWrapper">
        <RecipeTitle
          toggleExpansion={props.toggleExpansion}
          index={props.index}
          title={props.recipe.title}
        />
        <Ingredients data={props.recipe.ingredients} />
        <RecipeButtons index={props.index} editRecipe={props.editRecipe} />
      </div>
    );
  }
};

const RecipeTitle = props => (
  <div
    className="recipeTitle"
    onClick={() => props.toggleExpansion(props.index)}
  >
    {props.title}
  </div>
);

const Ingredients = props => (
  <React.Fragment>
    {props.data
      .split(',')
      .map((ingred, i) => <div className="ingredientName">{ingred}</div>)}
  </React.Fragment>
);

const RecipeButtons = props => (
  <div className="buttonContainer">
    <div
      className="button-primary"
      onClick={() => props.editRecipe(props.index)}
    >
      <i className="fa fa-pencil-square-o fa-2x" aria-hidden="true" />
    </div>
    <div
      className="button-primary deleteButton"
      onClick={() => props.delete(props.index)}
    >
      <i className="fa fa-trash fa-2x" aria-hidden="true" />
    </div>
  </div>
);

export default RecipeInfo;
