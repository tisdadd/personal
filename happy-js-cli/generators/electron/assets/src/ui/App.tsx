import React from 'react';
import {
  MemoryRouter, Routes, Route,
} from 'react-router-dom';

import RootLayout from './components/RootLayout';
import DefaultReactView from './views/DefaultReactView';
import TableView from './views/TableView';

function App() {
  return (
    <RootLayout>
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<TableView />} />
          <Route path="/react-default" element={<DefaultReactView />} />
        </Routes>
      </MemoryRouter>
    </RootLayout>
  );
}

export default App;
