import React, { useContext, useState } from 'react'
import './fooditem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/storeContext'
const FoodItem = ({id,name,description,price,img}) => {
    
   const {cartItems,addToCart,removeFromCart}=useContext(StoreContext);


  return (
    <div className='food-item m-auto 'style={{width:"100%",borderRadius:"15px",boxShadow:"0px 0px 5px ",animation:"fadeIn 2s"}}>
      <div className='food-item-img-container '>
        <img className='food-item-image rounded'style={{width:"100%" }} src={img}/>
        {
            !cartItems[id]?<img  src={assets.add_icon_white} className='add' onClick={()=>addToCart(id)}/>:
            <div className='food-item-counter d-flex align-items-center gap-3 p-2 rounded'>
                <img src={assets.remove_icon_red} width={"30px"} onClick={()=>removeFromCart(id)}/>
                <p className='pt-3'>{cartItems[id]}</p>
                <img src={assets.add_icon_green} width={"30px"} onClick={()=>addToCart(id)}/>
            </div>
        }
      </div>
      <div className="food-item-info p-2">
        <div className="food-item-name-rating d-flex justify-content-between align-items-center ">
            <p className='fs-5 mt-3'>{name}</p>
            <img src={assets.rating_starts} className='' width={"70px"} />
        </div>
        <p className='food-item-desc'>{description}</p>
        <p className="food-item-price  text-warning fs-4">${price}</p>
      </div>
    </div>
  )
}

export default FoodItem
