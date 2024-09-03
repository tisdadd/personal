import React from 'react';
import Logo from './components/Logo';

function App() {
  return (
    <div className="text-center">
      <header className="min-h-screen flex flex-col items-center justify-center text-lg bg-gray-800 text-white">
        <Logo />
        <p>
          Edit
          {' '}
          <code>src/views/[FTName]View/[FTName]View.tsx</code>
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
