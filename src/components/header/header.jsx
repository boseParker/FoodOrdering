import React from 'react'
import './header.css'
const Header = () => {
  return (
    <div className='header'>
      <div className="header-contents d-flex flex-column align-items-start gap-1">
    <h2 className='fw-bold text-light ' >Order your Favouirte food here</h2>
    <p className='text-light fs-5'>Choose from adiverse menu featuring a declareble array of dishes crafted either finest ingrediants and culinary expertise.Satisfy your cravings and elevate your dining experience,one fdelicious meal at a time</p>
    <a href="#menu"><button className='border-none fw-bold p-1 py-sm-2 px-sm-3 rounded-pill'>View Menu</button></a>
      </div>
    </div>
  )
}

export default Header
