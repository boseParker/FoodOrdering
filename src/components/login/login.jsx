import React, { useState } from 'react'
import './login.css'
import { assets } from '../../assets/assets'
const Login = ({setShowLogin}) => {
    const[currentstate,setCurrentstate]=useState("login")
  return (
    <div className='login-popup'>
      <form className="login-popup-container d-flex flex-column gap-3">
        <div className='login-popup-title d-flex justify-content-between align-items-center text-dark'>
            <h2>{currentstate}</h2>
            <img src={assets.cross_icon} onClick={()=>setShowLogin(false)} style={{cursor:"pointer"}}/>
        </div>
        <div className="login-popup-inputs d-flex flex-column gap-3">
            {currentstate=="login"?<></>:
            <input type="text" placeholder='Your Name' required />}
            <input type="email" placeholder='Your email' required />
            <input type="password" placeholder='Password' required />
        </div>
        <button>{currentstate=="sign up"?"create account":"login"}</button>
        <div className="login-popup-condition d-flex align-items-start gap-2">
            <input type="checkbox" required />
            <p>By continue ,i agree to the terms of use&privacy policy</p>
        </div>
        {currentstate=='login'?
        <p>Create new Account ?<span onClick={()=>setCurrentstate("sign up")}> Click here</span></p>:
        <p>Already have an account ? <span onClick={()=>setCurrentstate("login")}> Login here</span></p>
    }
        
       
      </form>
    </div>
  )
}

export default Login
