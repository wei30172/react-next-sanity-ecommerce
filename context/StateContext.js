import React, { useState, useEffect, createContext, useContext } from "react";
import jsCookie from "js-cookie";
import { setCookie, getCookie } from "../utils/jsCookie";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [showMenu, setShowCMenu] = useState(false);
  const [cartItems, setCartItems] = useState(getCookie("cartItems", []));
  const [itemsPrice, setItemsPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  const [darkMode, setDarkMode] = useState(false);

  let foundProduct;

  useEffect(() => {
    setCookie("cartItems", cartItems);
  }, [cartItems]);

  useEffect(() => {
    setTotalQuantities(() => getLocalTotalQuantities(0));
    setItemsPrice(() => getLocalTotalPrice(0));
  }, []);

  function getLocalTotalQuantities(initialValue) {
    if (cartItems.length > 0) {
      const value = cartItems.reduce(
        (total, cartProduct) => total + cartProduct.quantity,
        initialValue,
      );
      return value;
    }
    return initialValue;
  }

  function getLocalTotalPrice(initialValue) {
    if (cartItems.length > 0) {
      const value = cartItems.reduce(
        (total, cartProduct) =>
          total + cartProduct.price * cartProduct.quantity,
        initialValue,
      );
      return value;
    }
    return initialValue;
  }

  const incQty = () => {
    setQty((pervQty) => pervQty + 1);
  };

  const decQty = () => {
    setQty((pervQty) => {
      if (pervQty - 1 < 1) return 1;
      return pervQty - 1;
    });
  };

  const addToCart = async (product, quantity) => {
    if (product.countInStock < quantity) {
      toast.error(`Sorry. ${product.name} is out of stock.`);
      return;
    }

    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id,
    );

    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    setItemsPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity,
    );

    if (checkProductInCart) {
      const updateCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
      });
      setCartItems(updateCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }

    toast.success(`${qty} ${product.name} added to the cart.`);
    setQty(1);
  };

  const removeFromCart = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setCartItems(newCartItems);
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity,
    );
    setItemsPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity,
    );
  };

  const updateCartItemQuanitity = async (id, value) => {
    const foundProduct = cartItems.find((item) => item._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id);

    if (value === "inc") {
      if (foundProduct.countInStock < foundProduct.quantity + 1) {
        toast.error(
          `Sorry. ${foundProduct.quantity} ${foundProduct.name} left.`,
        );
        return;
      }
      setCartItems([
        ...newCartItems,
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
      ]);
      setItemsPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        setCartItems([
          ...newCartItems,
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
        ]);
        setItemsPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };

  const clearCart = () => {
    jsCookie.remove("cartItems");
    setCartItems([]);
    setItemsPrice(0);
    setTotalQuantities(0);
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        showMenu,
        setShowCMenu,
        cartItems,
        itemsPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        addToCart,
        removeFromCart,
        updateCartItemQuanitity,
        setCartItems,
        setTotalQuantities,
        clearCart,
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
