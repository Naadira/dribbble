import React from 'react'
import './Navbar.css'
import search_icon from '../../assets/images/search.jpg'
import logo from '../../assets/images/logo.png'
const Navbar = () => {
  return (
    <div className='container'>
        <div className='navbar'>
        <img src={logo} alt="" className='logo' />
    
            <ul>
              <li>Find designers</li>
              <li>Inspiration</li>
              <li>Courses</li>
              <li>Jobs</li>
              <li>Go Pro</li>
            </ul>

            

            <div className='search-box'>
                <input type="text" className="serach_box" placeholder="Search..."/>
                <img src={search_icon} alt=""  className='search'/>
            </div>


        </div>
    </div>
  )
}

export default Navbar