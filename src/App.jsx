import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar.jsx'
import HomePageComponent from './components/HomePageComponent/HomePageComponent.jsx'
import { FaSearch } from 'react-icons/fa';

const App = () => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchInput(value);
    // onSearch(value);
    // console.log(event.target.value)
  };
  return (
    <div>
      <div className='search'>
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
      </div>
      <Navbar/>
      <HomePageComponent search={searchInput}/>
    </div>
  )
}

export default App