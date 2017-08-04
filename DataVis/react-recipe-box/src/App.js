import React from 'react';

import './App.css';


class RecipeInfo extends React.Component {
  constructor(){
    super();
   
    this.toggleExpansion = this.toggleExpansion.bind(this)
    this.state = {
      isExpanded : false
    }
  }

  toggleExpansion(){
    this.setState({
      isExpanded:!this.state.isExpanded
    })
  }

render(){
      if(this.state.isExpanded===false)
  return( <div className="recipeTitle" onClick={this.toggleExpansion}>{this.props.recipeDetails.title}</div>
        )
    else
      return(<div className="recipeWrapper">
      <div className="recipeTitle" onClick={this.toggleExpansion}>{this.props.recipeDetails.title}</div>
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
      makingRecipe: false,
      newRecipeTitle: "",
      newRecipeIngredients: ""
    }
    this.saveRecipe = this.saveRecipe.bind(this);
    this.toggleMaker = this.toggleMaker.bind(this);
    this.sanitizeIngredients = this.sanitizeIngredients.bind(this);
    this.resetRecipeValues = this.resetRecipeValues.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.titleChanged = this.titleChanged.bind(this);
    this.recipeChanged = this.recipeChanged.bind(this);
  }

  toggleMaker(){
    this.setState({
      makingRecipe: !this.state.makingRecipe
    })
  }

  deleteRecipe(index){
  this.setState({
    recipes: this.state.recipes.slice(index,1)
  })
  }
  
  sanitizeIngredients() {
   var trimmedIngredients = this.state.newRecipeIngredients.split(",")
    trimmedIngredients.forEach( val => val = val.trim())
    trimmedIngredients =  trimmedIngredients.join(",");
    return trimmedIngredients;
  }

  saveRecipe() {
    var ingredients = this.sanitizeIngredients();
    var newRecipes = this.state.recipes;
    newRecipes.push({title:this.state.newRecipeTitle,ingredients:ingredients});
    this.setState({
      recipes: newRecipes},
      () => { this.resetRecipeValues();
              this.toggleMaker(); 
            }
     )
   
  }


  resetRecipeValues() {
    this.setState({
      newRecipeTitle:"",
      newRecipeIngredients:""
      },
    )
  }

  

  titleChanged(e) {
    var val = e.target.value;
    val = val.trim();
    this.setState({
      newRecipeTitle:val
    })
  }

  recipeChanged(e) {
     var val = e.target.value;
    this.setState({
      newRecipeIngredients: val
    })
  }

    render(){
      if(this.state.makingRecipe)
        return(<div className="recipeMaker">
                 <h1 className="center">Recipe Maker</h1>
                 <h2 className="center">Title:</h2>
                 <textArea className="titleEditor" onChange={this.titleChanged}></textArea>
                 <h3 className="center"> Ingredients:</h3>
                 <div className ="ingredientPlace">
                 <textArea className="ingredientEditor" onChange={this.recipeChanged}></textArea>
                 </div>
                 <div className="buttonContainer"><div className="button-primary saveButton" onClick={this.saveRecipe}>Save</div><div className="button-primary backButton">  Back</div></div>
               </div> )
        else
      return(
          <div className="recipesSection">
            <div className="button-primary" onClick ={this.toggleMaker}>Add</div>
            {this.state.recipes.map((recipeDetails,i)=> <RecipeInfo  recipeDetails = {recipeDetails} deleteFn={this.deleteRecipe} />)}
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
