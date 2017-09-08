import React from 'react';
import './App.css';

var marked = require('marked')



class TextComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = { text: setInitialState() };
    this.update = this.update.bind(this);
  }

  update(e) {
    this.setState({
      text: e.target.value

    })
  }

  render() {
    return (
      <div className="wrapper">
        <div className="previewDiv" dangerouslySetInnerHTML={sanitise(this.state.text)} >
        </div>
        <textarea className="writeArea" onChange={this.update}>
          {this.state.text}
        </textarea>
      </div >
    );
  }



}

function sanitise(text) {
  var raw = marked(text, { sanitise: true });
  return { __html: raw }
}


function App() {

  return (
    <div className="content">
      <TextComponent />
    </div>
  );

}

function setInitialState() {
  return ("** Bold ** *Italic *  [link to google](www.google.com) ~~Struck - through - my - heart~~ `Inlining` \n\n # HEADING 1 \n\n ## Heading 2 \n\n  > This is a quote \n\n  \n\nList \n\n* 1\n* 2\n* 3\n* 4\n");
}


export default App;