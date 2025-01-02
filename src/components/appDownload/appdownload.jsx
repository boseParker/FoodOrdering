import React from 'react'
import { assets } from '../../assets/assets'
import './appdownload.css'

const Appdownload = () => {
  return (
    <div className='app-download  fs-3 text-center fw-bold'   id='app-download' style={{marginTop:"100px"}}>
      <p>For Better Experince download <br /> Brutus App</p>
      <div className="app-download-platforms d-flex  justify-content-center gap-3  mt-4">
        <img src={assets.play_store} width={"120px"}/>
        <img src={assets.app_store} width={"120px"} />
      </div>
    </div>
  )
}

export default Appdownload
