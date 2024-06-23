import React, { useState } from 'react';
import './Navbar.css';
import { FaSearch } from 'react-icons/fa';
import logo from '../../assets/images/logo.png';
import { CgProfile } from "react-icons/cg";

const Navbar = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchInput(value);
    onSearch(value);
  };

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
        <div className={`search-box ${searchInput ? 'search-active' : ''}`}>
          <FaSearch className='search-icon' />
          <input 
            type="text" 
            className="search_input" 
            placeholder="Search..." 
            value={searchInput} 
            onChange={handleSearchChange} 
          />
        </div>
        <div className="profile">
          <CgProfile className="profile-icon" />
          <ul className="profile-dropdown">
            <li className="profile-header">
              <CgProfile className="profile-icon-dropdown" />
              <span className="user-name">NAADIRA SAHAR N</span>
            </li>
            <li>Upload design work</li>
            <li>Work preferences</li>
            <li>Settings</li>
            <hr />
            <li>Sign out</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
