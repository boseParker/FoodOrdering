import React, { useState } from 'react'
import './home.css'
import Header from '../../components/header/header'
import Menu from '../../components/menu/menu'
import FoodDisplay from '../../components/foodDisplay/foodDisplay'
import Appdownload from '../../components/appDownload/appdownload'
const Home = () => {
  const[category,setCategory]=useState("All")
  return (
    <div>
        <Header/>
        <Menu category={category} setCategory={setCategory}/>
        <FoodDisplay category={category}/>
        <Appdownload/>
    </div>
  )
}

export default Home
