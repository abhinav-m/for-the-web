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
      makingRecipe: false,
      newRecipe: {title:"",ingredients:""} ,
      newRecipeTitle: "",
      newRecipeIngredients: ""
    }
    this.addRecipe = this.addRecipe.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.toggleMaker = this.toggleMaker.bind(this);
    this.sanitizeNewRecipe = this.sanitizeNewRecipe.bind(this);
    this.resetNewRecipe = this.resetNewRecipe.bind(this);
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

  addRecipe(){
    this.toggleMaker();
    this.sanitizeNewRecipe();
    var newRecipes = this.state.recipes;
    newRecipes.push(this.state.newRecipe);
    this.setState({
      recipes: newRecipes
    })
    this.state.recipes;
  //  this.resetNewRecipe();
    this.toggleMaker();
  }

  resetNewRecipe() {
    this.setState({
      newRecipe:{title:"",ingredients:""}
      })
  }

  sanitizeNewRecipe(value){
    var trimmedIngredients = this.state.newRecipeIngredients.split(",")
    trimmedIngredients =  trimmedIngredients.join(",");
    var existingRecipe = this.state.newRecipe;
   
    
    this.setState(
     { newRecipe : {title:this.state.newRecipeTitle,ingredients:trimmedIngredients}},
     ()=>console.log(this.state.newRecipe.title+""+this.state.newRecipe.ingredients)
      )
  
  }
  titleChanged(e) {
    var val = e.target.value;
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
                 <div className="buttonContainer"><div className="button-primary saveButton" onClick={this.addRecipe}>Save</div><div className="button-primary backButton">  Back</div></div>
               </div> )
        else
      return(
          <div className="recipesSection">
            <div className="button-primary" onClick ={this.toggleMaker}>Add</div>
            {this.state.recipes.map((recipeDetails,i)=> <RecipeInfo isExpanded={true} recipeDetails = {recipeDetails} deleteFn={this.deleteRecipe} />)}
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
