import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useUserContext } from "../../context/UserContext";
import { getError } from "../../utils/getError";
import { urlFor } from "../../utils/client";
import axios from "axios";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

import { GrInProgress } from "react-icons/gr";
import { toast } from "react-hot-toast";

const Order = ({ params }) => {
  const { id: orderId } = params;
  const router = useRouter();
  const { userInfo } = useUserContext();

  const [loading, setLoading] = useState(false);
  const [successPay, setSuccessPay] = useState(false);

  const [order, setOrder] = useState({
    shippingAddress: "",
    paymentMethod: "",
    orderItems: [],
    itemsPrice: "",
    shippingPrice: "",
    taxPrice: "",
    orderTotalPrice: "",
    isPaid: "",
    paidAt: "",
    isDelivered: "",
    deliveredAt: "",
  });

  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    shippingPrice,
    taxPrice,
    orderTotalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order;

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const loadPaypalScript = async () => {
    const { data: clientId } = await axios.get("/api/keys/paypal", {
      headers: { authorization: `Bearer ${userInfo.token}` },
    });
    paypalDispatch({
      type: "resetOptions",
      value: {
        "client-id": clientId,
        currency: "USD",
      },
    });
    paypalDispatch({ type: "setLoadingStatus", value: "pending" });
  };

  useEffect(() => {
    if (!userInfo) {
      router.push("/login");
    }

    const fetchOrder = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        setLoading(false);
        setOrder(data);
      } catch (err) {
        setLoading(false);
        toast.error(getError(err));
      }
    };

    if (userInfo) {
      if (!order._id || successPay || (order._id && order._id !== orderId)) {
        if (!successPay) {
          setLoading(false);
          setSuccessPay(false);
        }
        fetchOrder();
      } else {
        loadPaypalScript();
      }
    }
  }, [userInfo, router, order, orderId, successPay]);

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: orderTotalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async function (details) {
      try {
        setLoading(true);
        const { data } = await axios.put(
          `/api/orders/${order._id}/pay`,
          details,
          {
            "Content-type": "application/json",
            headers: { authorization: `Bearer ${userInfo.token}` },
          },
        );
        setLoading(false);
        setSuccessPay(true);
        toast.success(`Order is paid.` || `${data.message}`);
      } catch (err) {
        setLoading(false);
        toast.error(getError(err));
      }
    });
  };

  const onError = (err) => {
    toast.error(getError(err));
  };

  return (
    <div className="order-wrapper">
      {loading ? (
        <GrInProgress size={30} />
      ) : (
        <>
          <div className="order-container">
            <div>
              <h1>Order: {orderId}</h1>

              <div className="info-group">
                <h2>Shipping Address</h2>
                {shippingAddress.fullName}, {shippingAddress.address},{" "}
                {shippingAddress.city}, {shippingAddress.postalCode},{" "}
                {shippingAddress.country}
                <div className="status-wrapper">
                  <p>Status: </p>
                  <p>
                    {isDelivered
                      ? `delivered at ${deliveredAt}`
                      : "not delivered"}
                  </p>
                </div>
              </div>

              <div className="info-group">
                <h2>Payment Method</h2>
                {paymentMethod}
                <div className="status-wrapper">
                  <p>Status: </p>
                  <p>{isPaid ? `paid at ${paidAt}` : "not paid"}</p>
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
                    {orderItems.map((item) => (
                      <tr key={item._key}>
                        <Link href={`/product/${item.slug.current}`}>
                          <td>
                            <Image
                              src={urlFor(item?.image[0]).url()}
                              alt={item.name}
                              width={80}
                              height={80}
                              className="placeorder-item-image"
                            />
                          </td>
                        </Link>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>${item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="info-group pay-summary">
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
                {!isPaid && (
                  <div className="status-wrapper">
                    {isPending ? (
                      <GrInProgress size={30} />
                    ) : (
                      <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}
                      ></PayPalButtons>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export const getServerSideProps = ({ params }) => {
  return { props: { params } };
};

export default dynamic(() => Promise.resolve(Order), { ssr: false });
