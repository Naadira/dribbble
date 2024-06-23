import React, { useEffect, useState } from 'react';
import './HomePageComponent.css';
import { imageData } from './imageData';
import { IoFilterSharp, IoEyeSharp } from "react-icons/io5"; // Import eye icon
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"; // Import heart icons
import { ToastContainer, toast } from 'react-toastify';
import logo from '../../assets/images/logo.png';
import { FaSkype, FaFacebook, FaInstagram, FaPinterest } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';

const HomePageComponent = () => {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [filterOption, setFilterOption] = useState("Following"); // Default filter option
  const [selectedCategory, setSelectedCategory] = useState("discover"); // Default category
  const [likedImages, setLikedImages] = useState({}); // State to track liked images
  const [selectedTags, setSelectedTags] = useState([]); // State to track selected tags
  const [selectedColors, setSelectedColors] = useState([]); // State to track selected colors
  const [showFilters, setShowFilters] = useState(false); // State to control visibility of filters

  useEffect(() => {
    // Set initial images from imageData
    setImages(imageData);
    setFilteredImages(imageData); // Initially, show all images
    toast.success("Images loaded successfully!"); // Toast notification for initial load
  }, []);

  // Function to check if a tag represents a color
  const isColor = (tag) => {
    const colors = ['red', 'blue', 'green', 'yellow']; // Example list of colors
    return colors.includes(tag.toLowerCase());
  };

  // Handle filter option change (Following, Popular, New & Noteworthy)
  const handleFilterChange = (event) => {
    const selectedOption = event.target.value;
    setFilterOption(selectedOption);

    // Apply filters based on selected option
    filterImages(selectedCategory, selectedOption, selectedTags, selectedColors);

    // Specific toast notifications for each filter option
    if (selectedOption === "Popular") {
      toast.info("Filter changed to Popular");
    } else if (selectedOption === "New") {
      toast.info("Filter changed to New & Noteworthy");
    } else if (selectedOption === "Following") {
      toast.info("Filter changed to Following");
    }
  };

  // Handle category filter change (discover, animation, branding, ...)
  const handleCategoryFilterChange = (category) => {
    setSelectedCategory(category);

    // Apply filters based on selected category and current filter option
    filterImages(category, filterOption, selectedTags, selectedColors);
  };

  // Handle tag filter change
  const handleTagFilterChange = (tags) => {
    setSelectedTags(tags);
    const colors = tags.filter(tag => isColor(tag)); // Filter tags to get only colors
    setSelectedColors(colors);
    filterImages(selectedCategory, filterOption, tags, colors);
  };

  // Handle color filter change
  const handleColorFilterChange = (colors) => {
    setSelectedColors(colors);

    // Apply filters based on selected colors and current filter option
    filterImages(selectedCategory, filterOption, selectedTags, colors);
  };

  // Function to filter images based on selected category, option, tags, and colors
  const filterImages = (category, option, tags, colors) => {
    let filteredData = images.slice(); // Create a copy to avoid mutating state directly

    // Applying category filter
    if (category !== "discover") {
      filteredData = filteredData.filter(image => image.categories.includes(category));
    }

    // Applying tag filter
    if (tags.length > 0) {
      filteredData = filteredData.filter(image => tags.every(tag => image.tags.includes(tag)));
    }

    // Applying color filter
    if (colors.length > 0) {
      filteredData = filteredData.filter(image => {
        const imageColors = image.tags.filter(tag => isColor(tag));
        return colors.some(color => imageColors.includes(color));
      });
    }

    // Applying filter option
    switch (option) {
      case "Popular":
        // Sort by likes descending, then by views descending
        filteredData.sort((a, b) => (b.likes - a.likes) || (b.views - a.views));
        break;
      case "New":
        // Sort by views ascending
        filteredData.sort((a, b) => b.views - a.views);
        break;
      default:
        // For "Following" option, no sorting required
        break;
    }

    // Update filtered images state
    setFilteredImages(filteredData);
  };

  // Handle like button click
  const handleLikeClick = (id) => {
    const updatedImages = images.map(image => {
      if (image.id === id) {
        const isLiked = likedImages[id];
        const updatedLikes = isLiked ? image.likes - 1 : image.likes + 1;
        toast(isLiked ? 'Unliked the image!' : 'Liked the image!');
        return { ...image, likes: updatedLikes };
      }
      return image;
    });

    setImages(updatedImages);
    setFilteredImages(updatedImages);
    setLikedImages(prevLikedImages => ({
      ...prevLikedImages,
      [id]: !prevLikedImages[id]
    }));
  };

  return (
    <div className="container">
      <ToastContainer /> {/* Toast container */}
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
        <button className={`filters ${showFilters ? 'expanded' : ''}`} onClick={() => setShowFilters(!showFilters)}>
          <IoFilterSharp /> Filters
        </button>
      </div>

      {showFilters && (
        <div className="filter-panel">
          <div className="tag-color-row">
            <div className="tag-filters">
              <label>Tags:</label>
              <input type="text" onChange={(e) => handleTagFilterChange(e.target.value.split(','))} placeholder="Enter tags separated by comma" />
            </div>
            <div className="color-filters">
              <label>Colors:</label>
              <input type="text" onChange={(e) => handleColorFilterChange(e.target.value.split(','))} placeholder="Enter colors separated by comma" />
            </div>
          </div>
        </div>
      )}

      <div className="image-gallery">
        {filteredImages.map((image) => (
          <div key={image.id} className="image-item">
            <img src={`${image.src}.jpg`} alt={image.alt} className="gallery-image" />
            <div className="design-name-hover">
              <h3>{image.designName}</h3>
            </div>
            <div className="image-details">
              <div className="designer-info">
                <div className="avatar">
                  <img src={`${image.avatar}.jpg`} alt={image.designerName} className="avatar-img" />
                </div>
                <p>{image.designerName}</p>
              </div>
              <div className="pro-button">PRO</div>
              <div className="like-and-views">
                <div className="like-button" onClick={() => handleLikeClick(image.id)}>
                  {likedImages[image.id] ? <AiFillHeart /> : <AiOutlineHeart />}
                  <span>{image.likes}</span>
                </div>
                <div className="views">
                  <IoEyeSharp />
                  <span>{image.views}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='footer'>
      <img src={logo} alt="Logo" className='logo' />
      <ul>
        <li>Find designers</li>
        <li>Hire talent</li>
        <li>Inspiration</li>
        <li>Advertising</li>
        <li>Blog</li>
        <li>About</li>
        <li>Careers</li>
        <li>Support</li>
      </ul>
  
    <div className='right-section'>
        <FaSkype className='icon' />
        <FaFacebook className='icon' />
        <FaInstagram className='icon' />
        <FaPinterest className='icon' />
      </div>
      </div>

      <div class="copyright">
  <ul>
    <li>&copy; 2024 Dribbble</li>
    <li>Terms</li>
    <li>Priacy</li>
    <li>Cookies</li>
    <li class="space-between"></li>
    <li>Jobs</li>
    <li>Designers</li>
    <li>Freelancers</li>
    <li>Tags</li>
    <li>Places</li>
    <li>Resources</li>
  </ul>
</div>

    </div>
  );
};

export default HomePageComponent;
