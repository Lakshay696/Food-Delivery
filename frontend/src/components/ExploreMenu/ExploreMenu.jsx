import React, { useRef } from 'react';
import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';

const ExploreMenu = ({ category, setCategory }) => {
  const scrollContainerRef = useRef(null);

  // Function to scroll left
  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({
      left: -300,
      behavior: 'smooth',
    });
  };

  // Function to scroll right
  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({
      left: 300,
      behavior: 'smooth',
    });
  };

  return (
    <div className='explore-menu' id='explore-menu'>
      {/* Header section with title and arrows */}
      <div className='explore-menu-header'>
        <h1>Explore our Menu</h1>
        
      </div>
      
      <p className='explore-menu-text'>
        Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.
      </p>
      <div className='arrows'>
          <button onClick={scrollLeft} className='arrow1 left-arrow'><b>⇦</b></button>
          <button onClick={scrollRight} className='arrow1 right-arrow'><b>⇨</b></button>
        </div>
      
      {/* Menu list section */}
      <div className='explore-menu-list' ref={scrollContainerRef}>
        {menu_list.map((item, index) => {
          return (
            <div 
              onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} 
              key={index} 
              className='explore-menu-list-item'
            >
              <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt='' />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      
      <hr />
    </div>
  );
}

export default ExploreMenu;
