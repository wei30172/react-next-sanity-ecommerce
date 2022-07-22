import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useUserContext } from "../context/UserContext";
import { useStateContext } from "../context/StateContext";
import { getError } from "../utils/getError";
import { urlFor } from "../utils/client";
import axios from "axios";

import { GrInProgress } from "react-icons/gr";
import { CheckoutWizard, EmptyCart } from "../components";
import { toast } from "react-hot-toast";

const Placeorder = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { userInfo, shippingAddress, paymentMethod } = useUserContext();
  const { cartItems, itemsPrice, clearCart } = useStateContext();

  const getRound2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const taxPrice = getRound2(itemsPrice * 0.08);
  const orderTotalPrice = getRound2(itemsPrice + shippingPrice + taxPrice);

  useEffect(() => {
    if (!paymentMethod) {
      router.push("/payment");
    }
  }, [paymentMethod, router]);

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "/api/orders",
        {
          orderItems: cartItems.map((item) => ({
            _key: item._id,
            slug: item.slug,
            image: item.image,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
          shippingAddress,
          paymentMethod,
          shippingPrice,
          taxPrice,
          itemsPrice,
          orderTotalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        },
      );
      clearCart();
      setLoading(false);
      router.push(`/order/${data}`);
    } catch (err) {
      setLoading(false);
      toast.error(getError(err));
    }
  };

  return (
    <div className="placeorder-wrapper">
      {cartItems.length < 1 && <EmptyCart showEmpty={true} />}
      {loading && <GrInProgress size={30} />}
      {cartItems.length >= 1 && (
        <>
          <CheckoutWizard activeStep={3}></CheckoutWizard>
          <div className="placeorder-container">
            <div>
              <h1>Place Order</h1>

              <div className="info-group">
                <h2>Shipping Address</h2>
                {shippingAddress.fullName}, {shippingAddress.address},{" "}
                {shippingAddress.city}, {shippingAddress.postalCode},{" "}
                {shippingAddress.country}
                <div className="btn-wrapper">
                  <button
                    className="btn"
                    onClick={() => router.push("/shipping")}
                  >
                    Edit
                  </button>
                </div>
              </div>

              <div className="info-group">
                <h2>Payment Method</h2>
                {paymentMethod}
                <div className="btn-wrapper">
                  <button
                    className="btn"
                    onClick={() => router.push("/payment")}
                  >
                    Edit
                  </button>
                </div>
              </div>

              <div className="info-group">
                <h2>Order Items</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item._id}>
                        <td>
                          <Link href={`/product/${item.slug.current}`}>
                            <a>
                              <Image
                                src={urlFor(item?.image[0]).url()}
                                alt={item.name}
                                width={80}
                                height={80}
                                className="placeorder-item-image"
                              />
                            </a>
                          </Link>
                        </td>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>${item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="info-group total">
                <div className="confirm">
                  <div className="confirm-info">
                    <h2>Total:</h2>
                    <p>${orderTotalPrice}</p>
                  </div>
                  <button className="btn" onClick={handlePlaceOrder}>
                    Place Order
                  </button>
                </div>
              </div>
            </div>
            <div className="info-group summary">
              <h2>Order Summary</h2>
              <div className="confirm">
                <div className="confirm-info">
                  <p>Items:</p>
                  <p>${itemsPrice}</p>
                </div>
                <div className="confirm-info">
                  <p>Shipping:</p>
                  <p>${shippingPrice}</p>
                </div>
                <div className="confirm-info">
                  <p>Tax:</p>
                  <p>${taxPrice}</p>
                </div>
                <div className="confirm-info">
                  <h2>Total:</h2>
                  <p>${orderTotalPrice}</p>
                </div>
                <button className="btn" onClick={handlePlaceOrder}>
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(Placeorder), { ssr: false });
