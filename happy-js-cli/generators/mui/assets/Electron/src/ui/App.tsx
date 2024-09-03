import React from 'react';
import {
  MemoryRouter, Routes, Route,
} from 'react-router-dom';

import RootLayout from './components/RootLayout';
import navItems from './components/navItems';

function App() {
  return (
    <MemoryRouter>
      <RootLayout>
        <Routes>
          {navItems.map(
            (item) => <Route key={item.link} path={item.link} element={item.element} />,
          )}
        </Routes>
      </RootLayout>
    </MemoryRouter>
  );
}

export default App;
