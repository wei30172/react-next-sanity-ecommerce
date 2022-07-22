import React from "react";
import Link from "next/link";
import { useStateContext } from "../context/StateContext";
import { AiOutlineShopping } from "react-icons/ai";

const EmptyCart = ({ showEmpty = false }) => {
  const { setShowCart } = useStateContext();
  return (
    <div className="empty-cart">
      <AiOutlineShopping size={150} />
      {showEmpty && <h3>Your shopping cart is empty</h3>}
      <Link href="/products">
        <button
          type="button"
          className="btn"
          onClick={() => setShowCart(false)}
        >
          Continue Shopping
        </button>
      </Link>
    </div>
  );
};

export default EmptyCart;
