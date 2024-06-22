import React, { useEffect, useState } from 'react';
import './HomePageComponent.css';
import { imageData } from './imageData';
import { IoFilterSharp } from "react-icons/io5";

const HomePageComponent = () => {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [filterOption, setFilterOption] = useState("Following"); // Default filter option
  const [selectedCategory, setSelectedCategory] = useState("discover"); // Default category

  useEffect(() => {
    // Set initial images from imageData
    setImages(imageData);
    setFilteredImages(imageData); // Initially, show all images
  }, []);

  // Handle filter option change (Following, Popular, New & Noteworthy)
  const handleFilterChange = (event) => {
    const selectedOption = event.target.value;
    setFilterOption(selectedOption);

    // Apply filters based on selected option
    filterImages(selectedCategory, selectedOption);
  };

  // Handle category filter change (discover, animation, branding, ...)
  const handleCategoryFilterChange = (category) => {
    setSelectedCategory(category);

    // Apply filters based on selected category and current filter option
    filterImages(category, filterOption);
  };

  // Function to filter images based on selected category and option
  const filterImages = (category, option) => {
    let filteredData = images;

    // Apply category filter
    if (category !== "discover") {
      filteredData = filteredData.filter(image => image.categories.includes(category));
    }

    // Apply option filter (Popular, New, Following)
    switch (option) {
      case "Popular":
        filteredData.sort((a, b) => b.likes - a.likes); // Sort by likes descending
        break;
      case "New":
        filteredData.sort((a, b) => b.views - a.views); // Sort by views descending
        break;
      default:
        // No additional sorting needed for Following
        break;
    }

    // Update filtered images state
    setFilteredImages(filteredData);
  };

  return (
    <div className="container">
      <div className='container-item'> 
        <div className="dropdown">
          <select value={filterOption} onChange={handleFilterChange}>
            <option value="Following">Following</option>
            <option value="Popular">Popular</option>
            <option value="New">New & Noteworthy</option>
          </select>
          <div className="arrow"></div> {/* This will be the arrow */}
        </div>
        <ul className="menu">
          <li onClick={() => handleCategoryFilterChange("discover")}>Discover</li>
          <li onClick={() => handleCategoryFilterChange("animation")}>Animation</li>
          <li onClick={() => handleCategoryFilterChange("branding")}>Branding</li>
          <li onClick={() => handleCategoryFilterChange("illustration")}>Illustration</li>
          <li onClick={() => handleCategoryFilterChange("mobile")}>Mobile</li>
          <li onClick={() => handleCategoryFilterChange("print")}>Print</li>
          <li onClick={() => handleCategoryFilterChange("product design")}>Product Design</li>
          <li onClick={() => handleCategoryFilterChange("typography")}>Typography</li>
          <li onClick={() => handleCategoryFilterChange("web design")}>Web Design</li>
        </ul>
        <button className="filters">
          <IoFilterSharp /> Filters
        </button>
      </div>

      <div className="image-gallery">
        {filteredImages.map((image) => (
          <div key={image.id} className="image-item">
            <img src={`${image.src}.jpg`} alt={image.alt} className="gallery-image" />
            <div className="image-details">
              <h3>{image.designName}</h3>
              <p>By {image.designerName}</p>
              <p>Likes: {image.likes}</p>
              <p>Views: {image.views}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePageComponent;
