import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/navbar/navbar'
import Home from './pages/home/home'
import Cart from './pages/home/Cart/cart'
import PlaceOrder from './pages/home/Cart/PlaceOrder/placeOrder'
import Footer from './components/footer/footer'
import { useState } from 'react'
import Login from './components/login/login'
function App() {
  const[showLogin,setShowLogin]=useState(false)
  return (
    <>
    {showLogin?<Login setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<PlaceOrder/>}/>
        {/* <Route path='/menu' element={<Home/>}/> */}
      </Routes>
     
    </div>
     <Footer/>
     </>
  )
}

export default App
