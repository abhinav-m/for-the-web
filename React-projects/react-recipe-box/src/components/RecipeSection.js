import React from 'react';

import RecipeInfo from './RecipeInfo';

const RecipeSection = props => {
  const { data, toggleExpansion, deleteRecipe, editRecipe } = props;
  return (
    <div className="recipesSection">
      <div className="buttonContainer" onClick={props.makeRecipe}>
        <i
          className="button-primary fa fa-plus-square fa-1.5x line-height-50"
          aria-hidden="true"
        />
      </div>
      <RecipeData
        data={data}
        toggleExpansion={toggleExpansion}
        deleteRecipe={deleteRecipe}
        editRecipe={editRecipe}
      />
    </div>
  );
};

const RecipeData = props => (
  <div>
    {props.data.map((recipe, i) => (
      <RecipeInfo
        key={i}
        isExpanded={recipe.isExpanded}
        toggleExpansion={props.toggleExpansion}
        recipe={recipe}
        deleteRecipe={props.deleteRecipe}
        index={i}
        editRecipe={props.editRecipe}
      />
    ))}
  </div>
);

export default RecipeSection;
