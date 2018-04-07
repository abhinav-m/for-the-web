import React from 'react';

import RecipeInfo from './RecipeInfo';

const RecipeSection = props => {
  return (
    <div className="recipesSection">
      <div className="buttonContainer" onClick={props.makeRecipe}>
        <i
          className="button-primary fa fa-plus-square fa-2x"
          aria-hidden="true"
        />
      </div>
      {props.data.map((recipe, i) => (
        <RecipeInfo
          key={i}
          isExpanded={recipe.isExpanded}
          toggleExpansion={props.toggleExpansion}
          recipe={recipe}
          delete={props.deleteRecipe}
          index={i}
          editRecipe={props.editRecipe}
        />
      ))}
    </div>
  );
};

export default RecipeSection;
