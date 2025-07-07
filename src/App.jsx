import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/navbar';
import Home from './pages/home/home';
import Cart from './pages/Cart/cart';
import PlaceOrder from './pages/PlaceOrder/placeOrder';
import Footer from './components/footer/footer';
import { useState, useEffect } from 'react';
import Login from './components/login/login';
import MyOrders from './pages/my-orders/My-Orders';

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
          <Route path='/my-orders' element={<MyOrders/>}/>
        </Routes>
      </div>

      <Footer />
    </>
  );
}

export default App;
