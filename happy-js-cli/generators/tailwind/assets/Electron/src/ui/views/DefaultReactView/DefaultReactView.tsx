import React from 'react';
import { Link } from 'react-router-dom';
import { useLog } from '../../contexts/LogContext';
import Logo from './components/Logo';

function App() {
  const { log } = useLog();
  log('testing');

  return (
    <div className="text-center">
      <Link to="/">See Table View</Link>

      <header className="min-h-screen flex flex-col items-center justify-center text-lg bg-gray-800 text-white">
        <Logo />
        <p>
          Edit
          {' '}
          <code>src/views/DefaultReactView/DefaultReactView.tsx</code>
          {' '}
          and save to reload.
        </p>
        <a
          className="text-blue-400"
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
