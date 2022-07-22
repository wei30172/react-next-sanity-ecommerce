import React from "react";
import Link from "next/link";
import { useStateContext } from "../context/StateContext";
import { useUserContext } from "../context/UserContext";
// import { useAuthContext } from '../context/useAuthContext';

import { AiOutlineShopping, AiFillHome } from "react-icons/ai";
import { BsMoonFill, BsSunFill } from "react-icons/bs";

import Cart from "./Cart";
import Menu from "./Menu";

const Navbar = () => {
  const {
    showCart,
    setShowCart,
    showMenu,
    setShowCMenu,
    totalQuantities,
    darkMode,
    setDarkMode,
  } = useStateContext();
  const { userInfo } = useUserContext();
  // const { netlifyUser, authReady, netlifyLogin, netlifyLogout }  = useAuthContext();

  return (
    <div className="navbar-container">
      <Link href="/">
        <div className="logo">
          <AiFillHome color="white" size={30} />
        </div>
      </Link>
      <div className="user">
        <div className="button-container">
          {!userInfo && (
            <Link href={`/login`}>
              <button type="button" className="btn">
                Login
              </button>
            </Link>
          )}
          {userInfo && (
            <div className="user-name" onClick={() => setShowCMenu(!showMenu)}>
              {userInfo.name}
            </div>
          )}
          {userInfo && showMenu && <Menu auth={userInfo?.isAdmin} />}
        </div>
        <div className="cart-icon-container">
          <button
            type="button"
            className="cart-icon"
            onClick={() => setShowCart(true)}
          >
            <AiOutlineShopping color="white" />
            <span className="cart-item-qty">{totalQuantities}</span>
          </button>
        </div>
        <div className="switch">
          <BsMoonFill
            color={darkMode ? "yellow" : "white"}
            size={20}
            onClick={() => setDarkMode(true)}
          />
          <BsSunFill
            color={darkMode ? "white" : "yellow"}
            size={20}
            onClick={() => setDarkMode(false)}
          />
        </div>
      </div>
      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
