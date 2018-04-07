import React from 'react';

const RecipeInfo = props => {
  if (!props.isExpanded) {
    return (
      <div
        className="recipeTitle"
        onClick={() => props.toggleExpansion(props.index)}
      >
        {props.recipeDetails.title}
      </div>
    );
  } else {
    return (
      <div className="recipeWrapper">
        <div
          className="recipeTitle"
          onClick={() => props.toggleExpansion(props.index)}
        >
          {props.recipeDetails.title}
        </div>
        {props.recipeDetails.ingredients
          .split(',')
          .map((ingred, i) => <div className="ingredientName">{ingred}</div>)}
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
      </div>
    );
  }
};

export default RecipeInfo;
