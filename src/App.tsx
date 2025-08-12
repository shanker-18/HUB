import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import CategoryPage from './components/CategoryPage';
import Categories from './components/Categories';
import Login from './components/Login';
import Register from './components/Register';
import OrderDetails from './components/OrderDetails';
import OrderSummary from './components/OrderSummary';
import Navbar from './components/Navbar';
import { DemoProvider } from './contexts/DemoContext';

function App() {
  return (
    <DemoProvider>
      <Navbar />
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/order-details" element={<OrderDetails />} />
          <Route path="/order-summary" element={<OrderSummary />} />
        </Routes>
      </div>
    </DemoProvider>
  );
}

export default App;