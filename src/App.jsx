import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import AddProduct from './Components/AddProduct';
import MyProducts from './Components/MyProduct';
import Wishlist from './Components/Wishlist';

function App() {
  const user = localStorage.getItem("token");

  return (
    <div className="w-full overflow-hidden">
      <Routes>
        <Route path='/' element={<Home />} />
        {user && <Route path='/add-product' element={<AddProduct />} />}
        <Route path='/my-product' element={<MyProducts />} />
        {user && <Route path='/wishlist' element={<Wishlist />} />}
      </Routes>

    </div>
  );
}

export default App;
