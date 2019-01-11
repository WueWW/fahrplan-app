import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'
import './App.css';
import 'semantic-ui-css/semantic.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <div><Button primary={true}>Click Here</Button></div>
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
