import React,{useState} from 'react'
import { NavLink } from 'react-router-dom'



const Navbar = ({containerStyles}) => {


  return (
    <nav className={`${containerStyles}`}>
        
        <NavLink to={'/'} className={({isActive})=>isActive ? "relative after:w-2/3 after:h-[2px] after:rounded-full after:bg-black after:absolute after:-bottom-2 after:left-0 py-1" :"py-1"} >
        Contact
        </NavLink>
        <NavLink to={'/AddPropertyModal'}  className={({isActive})=>isActive ? "relative after:w-2/3 after:h-[2px] after:rounded-full after:bg-black after:absolute after:-bottom-2 after:left-0 py-1" :"py-1" } >
        Add Property
        </NavLink>
        <NavLink to={'/Delete_Property'} className={({isActive})=>isActive ? "relative after:w-2/3 after:h-[2px] after:rounded-full after:bg-black after:absolute after:-bottom-2 after:left-0 py-1" :"py-1"}  >
        Delete Property
         </NavLink>
        <NavLink to={'/Bookings'} className={({isActive})=>isActive ? "relative after:w-2/3 after:h-[2px] after:rounded-full after:bg-black after:absolute after:-bottom-2 after:left-0 py-1" :"py-1"}  >
        Bookings
        </NavLink>
   
    </nav>
  )
}

export default Navbar
