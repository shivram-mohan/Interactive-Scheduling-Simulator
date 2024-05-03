import React from 'react'
import navBarSass from "./sass/NavBar.module.scss"

function Navbar({ isLoggedIn, onLogout }) {

  return (
    <div className={navBarSass.navBar}>
      <div className={navBarSass.textDiv} style={{display:"flex", flexDirection:"row", justifyContent:"flex-end"}}>
        <p className={navBarSass.text}>
            Welcome to Interactive Scheduling Simulator!           
        </p>
        <img src="download.png" alt="OS IMAGE" style={{width:"100px", height:"80px", paddingLeft:"850px"}} />
      </div>
      <div className={navBarSass.buttonDiv}>
      </div>
    </div>
  )
}

export default Navbar