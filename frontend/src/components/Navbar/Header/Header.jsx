import React, { useState, useEffect} from 'react';
import './Header.css';
import { assets } from '../../../assets/assets';
import ExploreMenu from '../../ExploreMenu/ExploreMenu';

const images = [
  assets.header_img,
  assets.header_img2,
  assets.header_img3,
  assets.header_img4,
  assets.header_img5
];

const Header = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const nextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(()=>{
    const interval = setInterval(nextCard,3000);

    return () => clearInterval(interval);
  },[]);
  return (
    <div className="header">
      <button className="arrow arrow-left" onClick={prevCard}>‹</button>
      <div className="cards" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <div key={index} className="card" style={{ backgroundImage: `url(${image})` }} />
        ))}
      </div>
      <button className="arrow arrow-right" onClick={nextCard}>›</button>
      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>
          Choose from a diverse menu featuring a delectable array of dishes crafted
          with the finest ingredients and culinary expertise. Our menu satisfies your
          cravings and elevates your dining experience, one delicious meal at a time.
        </p>
        <a href='#explore-menu'><button>View Menu</button></a>
      </div>
    </div>
  );
};

export default Header;



// import React from 'react'
// import './Header.css'
// const Header = () => {
// return (
// <div className='header'>
// <div className='header-contents'>
// <h2>Order your favourite food here</h2>
// <p>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our menu satisfy your cravings and elevate your dining experience, one delicious meal at a time. </p>
// <button>View Menu</button>
// </div>
// </div>
// )
// }

// export default Header
