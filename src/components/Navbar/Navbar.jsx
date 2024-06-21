import React, { useState } from 'react'
import './Navbar.css'
import search_icon from '../../assets/images/search.jpg'
import logo from '../../assets/images/logo.png'
import { CgProfile } from "react-icons/cg";


const Navbar = () => {
  
    
  return (
    <div className='container'>
        <div className='navbar'>
        <img src={logo} alt="" className='logo' />
    
            <ul className="main-menu">
              <li className="dropdown-container">Find designers<span className="dropdown-arrow">&#9662;</span>
              <ul className="dropdown-menu">
            <li>Designer search</li>
            <li>Post a job</li>
          </ul>
              </li>
              <li>Inspiration</li>
              <li className="dropdown-container">
              Courses
          <span className="dropdown-arrow">&#9662;</span>
          <ul className="dropdown-menu">
            <li>UX Diploma</li>
            <li>UI Certificate</li>
           
            <li>Live interactive workshops</li>
          </ul>
        </li>
              <li>Jobs</li>
              <li>Go Pro</li>
            </ul>

            

            <div className='search-box'>
                <img src={search_icon} alt=""  className='search'/>
                <input type="text" className="serach_box" placeholder="Search..."/>
                
            </div>
       </div>

     
      <div className="profile">
        <CgProfile className="profile-icon" />
      </div>
    </div>
  )
}

export default Navbar