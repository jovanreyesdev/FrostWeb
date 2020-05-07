import React from 'react';
import { Button } from 'semantic-ui-react';
import logo from './logo.svg';
import './app.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit
          {' '}
          <code>src/App.js</code>
          {' '}
          and save to reload.
        </p>
        <Button>Learn React</Button>
      </header>
    </div>
  );
}

export default App;
