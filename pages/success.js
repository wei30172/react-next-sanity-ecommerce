import React, { useEffect } from "react";
import Link from "next/link";
import { useStateContext } from "../context/StateContext";

import { BsBagCheckFill } from "react-icons/bs";
import { runFireworks } from "../utils/runFireworks";

const Success = () => {
  const { clearCart } = useStateContext();

  useEffect(() => {
    clearCart();
    runFireworks();
  }, [clearCart]);

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className="email-msg">Check your email inbox for the receipt.</p>
        <p className="description">
          If you have any questions, please email
          <a className="email" href="mailto:order@example.com">
            order@example.com
          </a>
        </p>
        <Link href="/products">
          <button type="button" width="300px" className="btn">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
