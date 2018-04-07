import React, { Component } from 'react';

class RecipeEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      ingredients: props.ingredients,
      index: props.index
    };
    this.handleChange = this.handleChange.bind(this);
    this.sanitizeRecipe = this.sanitizeRecipe.bind(this);
    this.saveRecipe = this.saveRecipe.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  sanitizeRecipe() {
    let trimmedIngredients = this.state.ingredients
      .split(',')
      .map(
        (val, i) => (val.length > 50 ? val.slice(0, 50).trim() : val.trim())
      );

    trimmedIngredients = trimmedIngredients.join(',');
    let trimmedTitle = this.state.title.trim();
    return { title: trimmedTitle, ingredients: trimmedIngredients };
  }

  saveRecipe() {
    let recipe = this.sanitizeRecipe();
    this.props.saveRecipe(this.state.index, recipe);
  }

  render() {
    return (
      <div className="recipeMaker">
        <div className="textAreaWrapper">
          <textArea
            id="title"
            className="titleEditor"
            placeholder="Enter title"
            onChange={this.handleChange}
            value={this.state.title}
          />
        </div>
        <div className="textAreaWrapper">
          <textArea
            id="ingredients"
            className="ingredientEditor"
            placeholder="Enter ingredients seperated by commas eg, Bread,Butter,Fish"
            onChange={this.handleChange}
            value={this.state.ingredients}
          />
        </div>
        <div className="buttonContainer">
          <div className="button-primary saveButton" onClick={this.saveRecipe}>
            <i className="fa fa-floppy-o fa-2x" aria-hidden="true" />
          </div>
          <div
            className="button-primary backButton"
            onClick={this.props.discardRecipe}
          >
            <i className="fa fa-arrow-left fa-2x" aria-hidden="true" />
          </div>
        </div>
      </div>
    );
  }
}

export default RecipeEditor;
