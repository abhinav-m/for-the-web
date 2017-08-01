import React from 'react';

import './App.css';

class Recipes extends React.Component {
  constructor() {
    super();
    this.state = {
      recipes: []
    }
  }

  deleteRecipe(index){
  this.setState({
    recipes: recipes.slice(index,1)
  })
  }
    render(){
      return(
        <div className="recipesSection">
          <div className="addButton">Add</div>
        <RecipeInfo isExpanded={false} recipeDetails = {recipeDetails} click={this.deleteRecipe(i)} />
        </div>
      )
    }
}


class App extends React.Component {
  

  
  render() {
    return (
      <div className="App">
       <Recipes/>
      </div>
    );
  }
}

export default App;
