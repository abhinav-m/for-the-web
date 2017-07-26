import React from 'react';
import './App.css';

class TextComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = { text: setInitialState() };
  }

  render() {
    return (
      <div className="wrapper">
        <div className="previewDiv">
          {sanitise(this.state.text)}
        </div>
        <textarea className="writeArea">
          {this.state.text}
        </textarea>
      </div>
    );
  }

}

function sanitise(text) {
  return text + " test";
}


function App() {

  return (
    <div className="content">
      <TextComponent />
    </div>
  );

}

function setInitialState() {
  return ("My name is abhinav");
}


export default App;