import React, { Component } from 'react';

//TODO: Add validaton for saving recipe.
class RecipeEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      ingredients: props.ingredients
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  render() {
    return (
      <div className="recipeMaker">
        <div className="textAreaWrapper">
          <textArea
            id="title"
            className="titleEditor"
            onChange={this.handleChange}
            value={this.state.title}
          />
        </div>
        <div className="textAreaWrapper">
          <textArea
            id="ingredients"
            className="ingredientEditor"
            onChange={this.handleChange}
            value={this.state.ingredients}
          />
        </div>
        <div className="buttonContainer">
          <div className="button-primary saveButton" onClick={props.saveRecipe}>
            <i className="fa fa-floppy-o fa-2x" aria-hidden="true" />
          </div>
          <div
            className="button-primary backButton"
            onClick={props.discardRecipe}
          >
            <i className="fa fa-arrow-left fa-2x" aria-hidden="true" />
          </div>
        </div>
      </div>
    );
  }
}

export default RecipeEditor;
