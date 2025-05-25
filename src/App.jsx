import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/navbar';
import Home from './pages/home/home';
import Cart from './pages/home/Cart/cart';
import PlaceOrder from './pages/home/Cart/PlaceOrder/placeOrder';
import Footer from './components/footer/footer';
import { useState, useEffect } from 'react';
import Login from './components/login/login';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login state on mount
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token); // true if token exists
  }, []);

  return (
    <>
      {showLogin && (
        <Login
          setShowLogin={setShowLogin}
          setIsLoggedIn={setIsLoggedIn} 
        />
      )}

      <div className='app'>
        <Navbar
          setShowLogin={setShowLogin}
          isLoggedIn={isLoggedIn}       
          setIsLoggedIn={setIsLoggedIn} 
        />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
}

export default App;
