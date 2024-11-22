import React from 'react'
import { NavLink } from 'react-router-dom'
import "./HomeHealthNavbar.css"
function HomeHealthNavbar() {
  return (
    <div className='homehealthnavbar'>
        <NavLink className={`homehealthnav-link`} to={"/homehealthcare/patientregistration"}>Patient Registration</NavLink>
    </div>  
    )
}

export default HomeHealthNavbar
