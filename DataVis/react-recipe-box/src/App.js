import React from 'react';

import './App.css';


class RecipeInfo extends React.Component {
  
render(){
      if(this.props.isExpanded===false)
  return( <div className="recipeTitle">{this.props.recipeDetails.title}</div>
        )
    else
      return(<div className="recipeWrapper">
      <div className="recipeTitle">{this.props.recipeDetails.title}</div>
      {this.props.recipeDetails.ingredients.split(",").map((ingred,i) => <div className="ingredientName">{ingred}</div> )}
      </div>
  )
}

}

class RecipesSection extends React.Component {
  constructor() {
    super();
    this.state = {
      recipes: [{title:"bc",ingredients:"b,c"},{title:"cake",ingredients:"chocolate,cream,puff"}],
      makingRecipe: false
    }
    this.addRecipe = this.addRecipe.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
  }

  deleteRecipe(index){
  this.setState({
    recipes: this.state.recipes.slice(index,1)
  })
  }

  addRecipe(){
    var newRecipes =this.state.recipes;
    newRecipes.push({title:"cake",ingredients:"chocolate,cream"});
    this.setState({
     makingRecipe: true
    })
  }

    render(){
      if(this.state.makingRecipe)
        return<div className="recipeMaker">
      

              <h1>Recipe Maker</h1>
              <h2>Title:</h2>
   
          <textArea className="titleEditor"></textArea>
          <br/>
         <h3> Ingredients:</h3>
       
          <div className ="ingredientPlace">
          <textArea className="ingredientEditor"></textArea>
          </div>
      <div className="buttonContainer"><div className="button-primary saveButton">Save</div><div className="button-primary backButton">  Back</div></div>
        </div>
        else
      return(
        <div className="recipesSection">
          <div className="addButton" onClick ={this.addRecipe}>Add</div>
       { this.state.recipes.map((recipeDetails,i)=> <RecipeInfo isExpanded={true} recipeDetails = {recipeDetails} deleteFn={this.deleteRecipe}  />)}
        </div>
      )
    }
}


class App extends React.Component {
  

  
  render() {
    return (
      <div className="App">
       <RecipesSection/>
      </div>
    );
  }
}

export default App;
