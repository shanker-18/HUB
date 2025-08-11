import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import CategoryPage from './components/CategoryPage';
import Categories from './components/Categories';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/category/:categoryName" element={<CategoryPage />} />
    </Routes>
  );
}

export default App;