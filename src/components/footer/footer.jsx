import React from 'react'
import { assets } from '../../assets/assets'
import './footer.css'

const Footer = () => {
  return (
    <div className='footer d-flex flex-column flex-wrap gap-2 p-3  ' id='footer' style={{backgroundColor:"#323232",color:"white"}}>
      <div className="footer-content d-flex  flex-column  flex-sm-row justify-content-around " >
        <div className="footer-content-left d-flex flex-column align-items-start gap-3 "style={{width:'30vw'}}>
            <img src={assets.logo} width={"100px"}/>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus illum dolore dicta, harum iste provident quae est repellat itaque accusamus odit! Quisquam nostrum eum vel et magni officiis voluptates exercitationem!4</p>
            <div className="social-icons d-flex gap-3">
                <img src={assets.facebook_icon}   />
                <img src={assets.linkedin_icon}   />
                <img src={assets.twitter_icon}   />
            </div>
        </div>
        <div className="footer-content-center d-flex flex-column align-items-start gap-3">
            <h2>Company</h2>
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Delivery</li>
                <li>privacy policy</li>
            </ul>
        </div>
        <div className="footer-content-right d-flex flex-column align-items-start gap-3">
            <h2>Get In Touch</h2>
            <ul>
                <li>+1-234-5678</li>
                <li>conatct@brutus.com</li>
            </ul>
        </div>
       
      </div>
      <hr/>
      <p className='footer-copyright'>Copyright 2024 c brutus.com -All right Reserved. </p>
    </div>
  )
}

export default Footer
