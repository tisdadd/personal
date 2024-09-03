import React from 'react';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';

import RootLayout from './components/RootLayout';
import DefaultReactView from './views/DefaultReactView';

function App() {
  return (
    <RootLayout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DefaultReactView />}></Route>
          </Routes>
      </BrowserRouter>
    </RootLayout>
  );
}

export default App;
