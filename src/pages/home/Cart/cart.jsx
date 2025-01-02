import React, { useContext } from 'react'
import './cart.css'
import { StoreContext } from '../../../context/storeContext'
import { useNavigate } from 'react-router-dom'
const Cart = () => {
  const {cartItems,food_list,removeFromCart,getTotalcartAmount}=useContext(StoreContext)
  const navigate=useNavigate()
 
  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        
        <br />
        <hr/>
        {food_list.map((data,index)=>{
          if(cartItems[data._id]>0){
            return(
              <div>
                  <div className="cart-items-title cart-items-item">
                    <img src={data.image}  />
                    <p>{data.name}</p>
                    <p>${data.price}</p>
                    <p>{cartItems[data._id]}</p>
                    <p>${data.price*cartItems[data._id]}</p>
                    <p className='cross' onClick={()=>removeFromCart(data._id)}>X</p>
                  </div>
                <hr/>
              </div>
            )
          }
        })}
      </div>
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
          <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT </button>
        </div>
        <div className='cart-promocode'>
        <div>
          <p>if you have a promo code, enter it here</p>
          <div className='cart-promocode-input'>
            <input type="text" placeholder='Promo Code' />
            <button>Submit</button>
          </div>
        </div>
      </div>
       
      </div>
     

    </div>
  )
}

export default Cart
