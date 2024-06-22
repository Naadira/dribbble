import React from 'react'
import './Navbar.css'
import { FaSearch } from 'react-icons/fa'
import logo from '../../assets/images/logo.png'
import { CgProfile } from "react-icons/cg";
import { imageData } from '../HomePageComponent/imageData';

const Navbar = () => {
  
  return (
    
    <div className='container'>
      <div className='navbar'>
        <img src={logo} alt="Logo" className='logo' />
        <ul className="main-menu">
          <li className="dropdown-container">Find designers<span className="dropdown-arrow">&#9662;</span>
            <ul className="dropdown-menu">
              <li>Designer search</li>
              <li>Post a job</li>
            </ul>
          </li>
          <li>Inspiration</li>
          <li className="dropdown-container">Courses
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
          <FaSearch className='search-icon' />
          <input type="text" className="search_input" placeholder="Search..." />
        </div>
        <div className="profile">
          <CgProfile className="profile-icon" />
        </div>
      </div>
    </div>
  )
}

export default Navbar
