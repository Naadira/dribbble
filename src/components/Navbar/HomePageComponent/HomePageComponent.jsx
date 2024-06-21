import React from 'react'
import './HomePageComponent.css'

const HomePageComponent = () => {
  return (
    <div className="container">
      <div className="dropdown">
        <select>
          <option value="Following">Following</option>
          <option value="Popular">Popular</option>
          <option value="New">New & Noteworthy</option>
        </select>
        <div className="arrow"></div> {/* This will be the arrow */}
      </div>
      <ul className="menu">
        <li>Discover</li>
        <li>Animation</li>
        <li>Branding</li>
        <li>Illustration</li>
        <li>Mobile</li>
        <li>Print</li>
        <li>Product Design</li>
        <li>Typography</li>
        <li>Web Design</li>
      </ul>
    </div>
  )
}

export default HomePageComponent