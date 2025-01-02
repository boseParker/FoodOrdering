import React, { useContext } from 'react'
import './placeorder.css'
import { StoreContext } from '../../../../context/storeContext'
const PlaceOrder = () => {
  const{getTotalcartAmount}=useContext(StoreContext)
  return (
    <div>
      <form  className="place-order d-flex flex-column flex-sm-row align-items-start justify-content-between gap-5">
        <div className='place-order-left'>
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input type="text" placeholder='First name' required />
          <input type="text" placeholder='Last name' required/>
        </div>
       
        <input type="email" placeholder='Email address' required />
        <input type="text" placeholder='street' required />
      
       
        <div className="multi-fields">
          <input type="text" placeholder='City' required/>
          <input type="text" placeholder='State' required />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder='Zip code' required/>
          <input type="text" placeholder='Country' required/>
        </div>
        <input type="text" placeholder='Phone' required/>
        <div className='Save-button'>
          <button className=' py-2 px-5'>Save</button>
        </div>
        </div>
        

        <div className='place-order-right'>
        <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart totals</h2>
        
          <div className='cart-total-details'>
            <p>Subtotal</p>
            <p>${getTotalcartAmount()}</p>
          </div>
          <div className='cart-total-details'>
            <p>Delivery Fee</p>
            <p>${getTotalcartAmount()==0?0:5}</p>
          </div>
        
          <div className='cart-total-details'>
            <b>Total</b>
            <p>${getTotalcartAmount()==0 ? 0 :getTotalcartAmount()+5}</p>
          </div>
          <button onClick={()=>alert("Your order will be shiped")}>PROCEED TO PAYMENT </button>
        </div>
       
         </div>
        </div>
      </form>    
        
    </div>
  )
}

export default PlaceOrder
