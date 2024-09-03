import React from 'react';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';

import RootLayout from './components/RootLayout';
import navItems from './components/navItems';

function App() {
  return (
    <BrowserRouter>
      <RootLayout>
        <Routes>
          {navItems.map(
            (item) => <Route key={item.link} path={item.link} element={item.element} />,
          )}
        </Routes>
      </RootLayout>
    </BrowserRouter>

  );
}

export default App;
