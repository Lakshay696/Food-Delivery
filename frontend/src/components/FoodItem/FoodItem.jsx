import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
  const navigate = useNavigate();

  const goToCart = () => {
    navigate('/cart', { state: { scrollToTotal: true } });
  };

  return (
    <div className='food-item'>
      <div className='food-item-img-container'>
        <img className='food-item-image' src={url + "/images/" + image} alt='' />
        <div className='food-item-counter'>
          <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt='' />
          <p>{cartItems[id] || 0}</p>
          <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt='' />
        </div>
      </div>
      <div className='food-item-info'>
        <div className='food-item-name-rating'>
          <h5>{name}</h5>
          <p>✪4.5</p>
        </div>
        <p className='food-item-desc'>{description}</p>
        <p className='food-item-price'>₹{price}</p>
      </div>
      {cartItems[id] > 0 && (
        <button className='cart-button' onClick={goToCart}>Go to Cart</button>
      )}
    </div>
  );
}

export default FoodItem;
