import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useStateContext } from "../context/StateContext";
import { urlFor } from "../utils/client";

import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { EmptyCart } from "../components";

const Cart = () => {
  const {
    itemsPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    updateCartItemQuanitity,
    removeFromCart,
  } = useStateContext();

  return (
    <div className="cart-wrapper">
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && <EmptyCart showEmpty={true} />}

        <div className="product-container">
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div className="product" key={item._id}>
                <Link href={`/product/${item.slug.current}`}>
                  <a>
                    <Image
                      src={urlFor(item?.image[0]).url()}
                      alt={item.name}
                      width={150}
                      height={150}
                      className="cart-product-image"
                    />
                  </a>
                </Link>
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.name}</h5>
                    <h4>${item.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span
                          className="minus"
                          onClick={() =>
                            updateCartItemQuanitity(item._id, "dec")
                          }
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className="num">{item.quantity}</span>
                        <span
                          className="plus"
                          onClick={() =>
                            updateCartItemQuanitity(item._id, "inc")
                          }
                        >
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
              <h3>${itemsPrice}</h3>
            </div>
            <div className="btn-container">
              <Link href="/shipping">
                <button type="button" className="btn">
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
