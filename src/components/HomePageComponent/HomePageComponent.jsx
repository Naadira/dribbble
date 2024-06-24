import React, { useEffect, useState } from 'react';
import './HomePageComponent.css';
import { imageData } from './imageData';
import { IoFilterSharp, IoEyeSharp } from "react-icons/io5";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import logo from '../../assets/images/logo.png';
import { FaSkype, FaFacebook, FaInstagram, FaPinterest } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';

const HomePageComponent = ({search}) => {
  console.log("search:",search)
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [filterOption, setFilterOption] = useState("Following");
  const [selectedCategory, setSelectedCategory] = useState("discover");
  const [likedImages, setLikedImages] = useState({});
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [showFilters, setShowFilters] = useState(false);


  const handleSearchFilterChange = (search) => {
    console.log("Called..")
    const filterArray = imageData.filter((data) => {
      if(
        data.designName.toLowerCase().includes(search.toLowerCase())||
        data.designerName.toLowerCase().includes(search.toLowerCase())||
        data.tags.includes(search.toLowerCase())
      ) return data;
    })
    console.log(filterArray);
    setFilteredImages(filterArray)
  }
  useEffect(()=> {
    if(search){
      handleSearchFilterChange(search);
    }
  },[search]);
  useEffect(() => {
    setImages(imageData);
    setFilteredImages(imageData);
    toast.success("Images loaded successfully!");
    
   
  }, []);

  const isColor = (tag) => {
    const colors = ['red', 'blue', 'green', 'yellow','brown'];
    return colors.includes(tag.toLowerCase());
  };

  const handleFilterChange = (event) => {
    const selectedOption = event.target.value;
    setFilterOption(selectedOption);
    filterImages(selectedCategory, selectedOption, selectedTags, selectedColors);
    notifyFilterChange(selectedOption);
  };

  const handleCategoryFilterChange = (category) => {
    setSelectedCategory(category);
    filterImages(category, filterOption, selectedTags, selectedColors);
  };

  const handleTagFilterChange = (tagsString) => {
    const tags = tagsString.split(',').map(tag => tag.trim().toLowerCase());
    setSelectedTags(tags);
    const colors = tags.filter(tag => isColor(tag));
    setSelectedColors(colors);
    filterImages(selectedCategory, filterOption, tags, colors);
  };

  const handleColorFilterChange = (colorsString) => {
    const colors = colorsString.split(',').map(color => color.trim().toLowerCase());
    setSelectedColors(colors);
    filterImages(selectedCategory, filterOption, selectedTags, colors);
  };

  const filterImages = (category, option, tags, colors) => {
    let filteredData = images.slice();

    if (category !== "discover") {
      filteredData = filteredData.filter(image => image.categories.includes(category));
    }

    if (tags.length > 0) {
      filteredData = filteredData.filter(image => tags.every(tag => image.tags.includes(tag)));
    }

    if (colors.length > 0) {
      filteredData = filteredData.filter(image => {
        const imageColors = image.tags.filter(tag => isColor(tag));
        return colors.some(color => imageColors.includes(color));
      });
    }

    switch (option) {
      case "Popular":
        filteredData.sort((a, b) => (b.likes - a.likes) || (b.views - a.views));
        break;
      case "New":
        filteredData.sort((a, b) => b.views - a.views);
        break;
      default:
        break;
    }

    setFilteredImages(filteredData);
  };

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

  const notifyFilterChange = (option) => {
    if (option === "Popular") {
      toast.info("Filter changed to Popular");
    } else if (option === "New") {
      toast.info("Filter changed to New & Noteworthy");
    } else if (option === "Following") {
      toast.info("Filter changed to Following");
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <div className='container-item'>
        <div className="dropdown">
          <select value={filterOption} onChange={handleFilterChange}>
            <option value="Following">Following</option>
            <option value="Popular">Popular</option>
            <option value="New">New & Noteworthy</option>
          </select>
          <div className="arrow"></div>
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
              <input type="text" onChange={(e) => handleTagFilterChange(e.target.value)} placeholder="Enter tags separated by comma" />
            </div>
            <div className="color-filters">
              <label>Colors:</label>
              <input type="text" onChange={(e) => handleColorFilterChange(e.target.value)} placeholder="Enter colors separated by comma" />
            </div>
          </div>
        </div>
      )}

      <div className="image-gallery">
        {filteredImages.length > 0 ? (
          filteredImages.map((image) => (
            <div key={image.id} className="image-item">
              <img src={image.src} alt={image.alt} className="gallery-image" />
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
          ))
        ) : (
          <div className="no-results">No results found</div>
        )}
      </div>
      <div className='notfound'>
      {
        filterImages.length<1 &&
       ( <div className='notfound'>
            <p>No Result Found</p>
        </div>)
      }
      </div>

      <div className="footer">
        <img src={logo} alt="Logo" className="logo" />
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
        <div className="right-section">
          <FaSkype className="icon" />
          <FaFacebook className="icon" />
          <FaInstagram className="icon" />
          <FaPinterest className="icon" />
        </div>
      </div>

      <div className="copyright">
        <ul>
          <li >&copy; 2024 Dribbble</li>
          <li >Terms</li>
          <li >Privacy</li>
          <li >Cookies</li>
          <li className="list-item space-between"></li>
          <li >Jobs</li>
          <li >Designers</li>
          <li >Freelancers</li>
          <li >Tags</li>
          <li >Places</li>
          <li >Resources</li>
        </ul>
      </div>
    </div>
  );
};

export default HomePageComponent;
