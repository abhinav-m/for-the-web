import React from 'react';

const RecipeInfo = props => {
  if (!props.isExpanded) {
    return (
      <RecipeTitle
        toggleExpansion={props.toggleExpansion}
        index={props.index}
        title={props.recipe.title}
        class={'recipeTitle grow'}
      />
    );
  } else {
    return (
      <div className="recipeWrapper">
        <RecipeTitle
          toggleExpansion={props.toggleExpansion}
          index={props.index}
          title={props.recipe.title}
          class={'recipeTitle shrink'}
        />
        <Ingredients data={props.recipe.ingredients} />
        <RecipeButtons
          index={props.index}
          editRecipe={props.editRecipe}
          deleteRecipe={props.deleteRecipe}
        />
      </div>
    );
  }
};

const RecipeTitle = props => (
  <div
    className={props.class}
    onClick={() => props.toggleExpansion(props.index)}
  >
    {props.title}
  </div>
);

const Ingredients = props => (
  <div>
    {props.data.split(',').map((ingred, i) => (
      <div className="ingredientName" key={i}>
        {ingred}
      </div>
    ))}
  </div>
);

const RecipeButtons = props => (
  <div className="buttonContainer">
    <div
      className="button-primary"
      onClick={() => props.editRecipe(props.index)}
    >
      <i
        className="fa fa-pencil-square-o  fa-2x line-height-50"
        aria-hidden="true"
      />
    </div>
    <div
      className="button-primary deleteButton "
      onClick={() => props.deleteRecipe(props.index)}
    >
      <i className="fa fa-trash  fa-2x line-height-50" aria-hidden="true" />
    </div>
  </div>
);

export default RecipeInfo;
