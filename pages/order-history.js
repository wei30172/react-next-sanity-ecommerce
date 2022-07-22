import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Link from "next/link";
import { useUserContext } from "../context/UserContext";
import { getError } from "../utils/getError";
import axios from "axios";

import { GrInProgress } from "react-icons/gr";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { toast } from "react-hot-toast";

const OrderHistory = () => {
  const router = useRouter();
  const { userInfo } = useUserContext();

  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!userInfo) {
      router.push("/login");
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/orders/history", {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        setLoading(false);
        setOrders(data);
      } catch (err) {
        setLoading(false);
        toast.error(getError(err));
      }
    };
    if (userInfo) {
      fetchOrders();
    }
  }, [router, userInfo]);

  return (
    <div className="orders-wrapper">
      {loading ? (
        <GrInProgress size={30} />
      ) : (
        <>
          <div className="orders-container">
            <div>
              <h1>Order History</h1>
              {orders.length < 1 ? (
                <div className="empty-orders">
                  <AiOutlineShoppingCart size={150} />
                  <h3>Your order histor is empty</h3>
                  <Link href="/products">
                    <button type="button" className="btn">
                      {`Let's Shopping!`}
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="orders-list">
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order._id}>
                          <td>
                            <p>ID:</p>
                            <p>{order._id}</p>
                          </td>
                          <td>
                            <p>DATE:</p>
                            <p>{order.createdAt}</p>
                          </td>
                          <td>
                            <p>TOTAL:</p>
                            <p>${order.orderTotalPrice}</p>
                          </td>
                          <td>
                            <p>PAID:</p>
                            <p>
                              {order.isPaid
                                ? `paid at ${order.paidAt}`
                                : "not paid"}
                            </p>
                          </td>
                          <td>
                            <Link href={`/order/${order._id}`}>
                              <button className="btn">Details</button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(OrderHistory), { ssr: false });
