import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PlaceOrder.css';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });
  const [paymentMethod, setPaymentMethod] = useState('');

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 20,
      paymentMethod: paymentMethod
    };

    console.log('Order Data:', orderData);

    try {
      let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
      console.log('Response:', response);

      if (response.data.success) {
        if (paymentMethod === 'Cash on Delivery') {
          toast.success('Order placed successfully!');
          navigate('/myorders');
        } else {
          const { session_url } = response.data;
          window.location.replace(session_url);
        }
      } else {
        const errorMessage = response.data.message || 'Error placing order';
        toast.error(errorMessage);
        console.error('Backend Error:', errorMessage);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error placing order';
      toast.error(errorMessage);
      console.error('Error placing order:', errorMessage);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/cart');
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token, getTotalCartAmount, navigate]);

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className='place-order-left'>
        <p className='title'>Delivery Information</p>
        <div className='multi-fields'>
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type='text' placeholder='First Name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type='text' placeholder='Last Name' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type='email' placeholder='Email Address' />
        <input required name='street' onChange={onChangeHandler} value={data.street} type='text' placeholder='Street' />
        <div className='multi-fields'>
          <input required name='city' onChange={onChangeHandler} value={data.city} type='text' placeholder='City' />
          <input required name='state' onChange={onChangeHandler} value={data.state} type='text' placeholder='State' />
        </div>
        <div className='multi-fields'>
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type='text' placeholder='Zip code' />
          <input required name='country' onChange={onChangeHandler} value={data.country} type='text' placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type='text' placeholder='Phone' />
      </div>
      <div className='place-order-right'>
        <div className='cart-total'>
          <h2>Cart Totals</h2>
          <div>
            <div className='cart-total-details'>
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <p>Delivery fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 20}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <b>Total</b>
              <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 20}</b>
            </div>
          </div>
          
          <h3>Payment Methods</h3>
          <div className='payment-options'>
            <label className='option-button'>
              <input type='radio' name='payment' value='Cash on Delivery' onChange={() => setPaymentMethod('Cash on Delivery')} />
              Cash on Delivery
            </label>
            <label className='option-button'>
              <input type='radio' name='payment' value='Payment Online' onChange={() => setPaymentMethod('Payment Online')} />
              Payment Online <p className='payment-online'>Currently Unavailable</p>
            </label>
          </div>
          <button type='submit'>Place Order</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
