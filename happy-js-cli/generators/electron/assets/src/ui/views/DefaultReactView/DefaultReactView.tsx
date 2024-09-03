import React from 'react';
import './DefaultReactView.css';
import { Link } from 'react-router-dom';
import { useLog } from '../../contexts/LogContext';
import Logo from './components/Logo';

function DefaultReactView() {
  const { log } = useLog();
  log('testing');

  return (
    <div className="App">
      <Link to="/">See Table View</Link>

      <header className="App-header">
        <Logo />
        <p>
          Edit
          {' '}
          <code>src/ui/views/DefaultReactView/DefaultReactView.tsx</code>
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

export default DefaultReactView;
