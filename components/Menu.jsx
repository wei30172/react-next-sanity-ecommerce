import React from "react";
import Link from "next/link";
import { useStateContext } from "../context/StateContext";
import { useUserContext } from "../context/UserContext";

const Menu = ({ auth }) => {
  const { setShowCMenu } = useStateContext();
  const { userLogout } = useUserContext();
  return (
    <div className="menu-wrapper">
      <div className="menu-container">
        <ul>
          {auth && (
            <Link href="/dashboard">
              <li onClick={() => setShowCMenu(false)}>Dashboard</li>
            </Link>
          )}
          <Link href="/profile">
            <li onClick={() => setShowCMenu(false)}>Profile</li>
          </Link>
          <Link href="/order-history">
            <li onClick={() => setShowCMenu(false)}>Order History</li>
          </Link>
          <li onClick={userLogout}>Logout</li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
