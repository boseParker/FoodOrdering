import React, { useContext } from 'react'
import './foodDisplay.css'
import { StoreContext } from '../../context/storeContext'
import FoodItem from '../fooditem/fooditem'
const FoodDisplay = ({category}) => {
    const {food_list}=useContext(StoreContext)
  return (
    <div className='food-display mt-3' id='food-display'>
      <h2 className='fs-4 fw-bold'>Top dishes near you</h2>
      <div className='food-display-list'>

        {food_list.map((data,index)=>{
            if(category=="All" || category===data.category)  {
                return(
                    <FoodItem key={index} id={data._id} name={data.name} description={data.description} price={data.price} img={data.image} />
                )
            }
           
        })}
      </div>
    </div>
  )
}

export default FoodDisplay
