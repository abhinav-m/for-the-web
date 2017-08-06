import React from 'react';

import './App.css';


class RecipeInfo extends React.Component {
  constructor(){
    super();
    this.state = {
      isExpanded : false
    }
    this.toggleExpansion = this.toggleExpansion.bind(this)
    this.delete = this.delete.bind(this)
    this.editRecipe = this.editRecipe.bind(this)
  }

  delete() {
   this.props.deleteFn(this.props.index);
  }

  toggleExpansion(){
    this.setState({
      isExpanded:!this.state.isExpanded
    })
  }

  editRecipe() {
    this.props.editRecipe(this.props.index);
  }

render(){
    if(this.state.isExpanded===false)
       return( <div className="recipeTitle" onClick={this.toggleExpansion}>{this.props.recipeDetails.title}</div>)
    else
      return(<div className="recipeWrapper">
      <div className="recipeTitle" onClick={this.toggleExpansion}>{this.props.recipeDetails.title}</div>
      {this.props.recipeDetails.ingredients.split(",").map((ingred,i) => <div className="ingredientName">{ingred}</div> )}
      <div className="buttonContainer"><div className="button-primary" onClick={this.editRecipe}><i className="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i></div><div className="button-primary deleteButton" onClick={this.delete}><i className="fa fa-trash fa-2x" aria-hidden="true"></i></div></div>
      </div>)
  } 

}

class RecipesSection extends React.Component {
  constructor() {
    super();
    this.state = {
      recipes: [{title:"Butter chicken",ingredients:"Butter,chicken"},{title:"Cake",ingredients:"chocolate,MAGIC!"}],
      recipeIndex:-1,
      newRecipeTitle: "Enter title here",
      newRecipeIngredients: "Enter ingredients seperated by commas eg (butter,sugar,chocolate)"
    }
    this.saveRecipe = this.saveRecipe.bind(this);
    this.toggleMaker = this.toggleMaker.bind(this);
    this.sanitizeRecipe = this.sanitizeRecipe.bind(this);
    this.resetRecipeValues = this.resetRecipeValues.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.titleChanged = this.titleChanged.bind(this);
    this.recipeChanged = this.recipeChanged.bind(this);
    this.editRecipe = this.editRecipe.bind(this);
   
  }

 
  editRecipe(index){
    var title = this.state.recipes[index].title
    var ingred = this.state.recipes[index].ingredients
    this.setState({
      recipeIndex:index,
      newRecipeIngredients:ingred,
      newRecipeTitle: title },
      ()=>{this.toggleMaker();
          })
  }

  toggleMaker() {
    this.setState({
      makingRecipe: !this.state.makingRecipe
    })
  }

  deleteRecipe(index) {
    var newRecipes = this.state.recipes;
    newRecipes.splice(index,1)
    this.setState({
     recipes: newRecipes
    })
  }
  
  sanitizeRecipe() {
    var trimmedIngredients = this.state.newRecipeIngredients.split(",")
    trimmedIngredients.forEach( val => val = val.trim())
    trimmedIngredients =  trimmedIngredients.join(",");
    var trimmedTitle = this.state.newRecipeTitle.trim();
    return {title:trimmedTitle,ingredients:trimmedIngredients}
  }

  saveRecipe() {
    var sanitizedRecipe = this.sanitizeRecipe();
    var existingRecipes = this.state.recipes;
    if(this.state.recipeIndex===-1 && this.state.newRecipeTitle!=="")
      existingRecipes.push(sanitizedRecipe);
    else if(this.state.newRecipeTitle!=="")
      existingRecipes.splice(this.state.recipeIndex,1,sanitizedRecipe);
    this.setState(
      { recipes: existingRecipes,
        recipeIndex: -1},
        () => { this.resetRecipeValues(); 
      })
  }

  resetRecipeValues() {
    this.setState({
      newRecipeTitle:"Enter title here",
      newRecipeIngredients:"Enter ingredients seperated by commas eg (butter,sugar,chocolate)"
      },() =>{this.toggleMaker();}
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
        return(
          <div className="recipeMaker">
            <div className ="textAreaWrapper">
            <textArea className="titleEditor" onChange={this.titleChanged} value={this.state.newRecipeTitle}></textArea>
            </div>
            <div className ="textAreaWrapper">
            <textArea className="ingredientEditor" onChange={this.recipeChanged} value={this.state.newRecipeIngredients}></textArea>
            </div>
            <div className="buttonContainer"><div className="button-primary saveButton" onClick={this.saveRecipe}><i className="fa fa-floppy-o fa-2x" aria-hidden="true"></i></div><div className="button-primary backButton" onClick={this.resetRecipeValues}><i className="fa fa-arrow-left fa-2x" aria-hidden="true"></i></div></div>
          </div> )
      else
        return(
          <div className="recipesSection">
            <div className="buttonContainer" onClick ={this.toggleMaker}><i className="button-primary fa fa-plus-square fa-2x" aria-hidden="true"></i></div>
            {this.state.recipes.map((recipeDetails,i)=> <RecipeInfo key={i} recipeDetails = {recipeDetails} deleteFn={this.deleteRecipe} index={i} editRecipe={this.editRecipe}/>)}
          </div>
        )
    }
}

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>Recipe Box</h1>
       <RecipesSection/>
        <div className="signature">
          <p ><i className="fa fa-heart" aria-hidden="true"></i></p>
          <p ><a href="https://github.com/abhinav-thinktank">Abhinav Mishra</a></p>
          <p ><a href="https://github.com/abhinav-thinktank">अभिनव मिश्रा</a></p>
        </div>
      </div>
    );
  }
}

export default App;
