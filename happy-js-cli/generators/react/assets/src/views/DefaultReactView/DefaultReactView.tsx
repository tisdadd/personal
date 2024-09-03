import React from 'react';
import './DefaultReactView.css';
import Logo from './components/Logo'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Logo />
        <p>
          Edit
          {' '}
          <code>src/views/DefaultReactView/DefaultReactView.tsx</code>
          {' '}
          and save to reload.
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

export default App;
