import React, { useRef } from 'react';
import Link from 'next/link';
import { useStateContext } from '../context/StateContext';
import { urlFor } from '../utils/client';
import getStripe from '../utils/getStripe';

import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';

const Cart = () => {
  const cartRef = useRef();
  const { totalPrice, totalQuantities, cartItems, setShowCart, updateCartItemQuanitity, removeFromCart } = useStateContext();

  // const handleCheckout = async () => {
  //   const stripe = await getStripe();

  //   const response = await fetch('/api/stripe', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(cartItems),
  //   });

  //   if(response.statusCode === 500) return;
    
  //   const data = await response.json();
  //   toast.loading('Redirecting...');
  //   stripe.redirectToCheckout({ sessionId: data.id });
  // }

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
          type='button'
          className="cart-heading"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping cart is empty</h3>
            <Link href="/">
              <button
                type="button"
                className="btn"
                onClick={() => setShowCart(false)}
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
        {cartItems.length >= 1 && cartItems.map((item) => (
          <div className="product" key={item._id}>
          <Link href={`/product/${item.slug.current}`}><img src={urlFor(item?.image[0])} className="cart-product-image" /></Link>
            <div className="item-desc">
              <div className="flex top">
                <h5>{item.name}</h5>
                <h4>${item.price}</h4>
              </div>
              <div className="flex bottom">
                <div>
                  <p className="quantity-desc">
                    <span className="minus" onClick={() => updateCartItemQuanitity(item._id, 'dec')}>
                      <AiOutlineMinus />
                    </span>
                    <span className="num">{item.quantity}</span>
                    <span className="plus" onClick={() => updateCartItemQuanitity(item._id, 'inc')}>
                      <AiOutlinePlus />
                    </span>
                  </p>
                </div>
                <button
                  type="button"
                  className="remove-item"
                  onClick={() => removeFromCart(item)}
                >
                  <TiDeleteOutline />
                </button>
              </div>
            </div>
          </div>
        ))}
        </div>

        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Total before Shipping & Tax:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              <Link href="/shipping"><button type="button" className="btn">
                Checkout
              </button></Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart