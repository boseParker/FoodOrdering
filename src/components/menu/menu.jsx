import React from 'react'
import './menu.css'
import { menu_list } from '../../assets/assets'
const Menu = ({category,setCategory}) => {
  console.log(category)
  return (
    <div className='menu d-flex flex-column gap-3' id="menu">
      <h1 className=''>Explore our menu</h1>
      <p className='menu-text 'style={{color:"#808080"}}>Choose from adiverse menu featuring a declareble array of dishes crafted either finest ingrediants and culinary expertise.Satisfy your cravings and elevate your dining experience,one fdelicious meal at a time.</p>
      <div className='explore-menu-list d-flex  justify-content-between align-items-center gap-5 text-center my-2 'style={{overflowX:"scroll"}}>
        {menu_list.map((data,index)=>{
          return(
          <div key={index}  onClick={()=>setCategory(prev=>prev==data.menu_name?"All":data.menu_name)} className='menu-list-item'>
            <img src={data.menu_image}  className={category==data.menu_name?"active":""} 
            style={{width:"7.5vw",cursor:"pointer",transition:"0.2s",borderRadius:"50%"}}/>
            <p className='mt-2 fs-5' style={{color:"#808080",cursor:"pointer"}}>{data.menu_name}</p>
          </div>
        )
        })}
      </div>
    </div>
  )
}

export default Menu
