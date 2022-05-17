import React, { useState, useEffect, createContext, useContext } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState(() => getLocalStorage("cartItems", []));
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  const [darkMode, setDarkMode] = useState(false);

  let foundProduct;
  let index;

  useEffect(() => {
    setLocalStorage("cartItems", cartItems);
  }, [cartItems]);

  useEffect(() => {
    setTotalQuantities(() => getLocalTotalQuantities(0));
    setTotalPrice(() => getLocalTotalPrice(0));
  }, []);

  function getLocalTotalQuantities(initialValue) {
    if (cartItems.length > 0) {
      const value = cartItems.reduce((total, cartProduct) => total + cartProduct.quantity, initialValue);
      return value;
    }
    return initialValue;
  }

  function getLocalTotalPrice(initialValue) {
    if (cartItems.length > 0) {
      const value = cartItems.reduce((total, cartProduct) => total + cartProduct.price * cartProduct.quantity, initialValue);
      return value;
    }
    return initialValue;
  }

  function setLocalStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.log(err);
    }
  }

  function getLocalStorage(key, initialValue) {
    try {
      if (typeof window !== "undefined") {
        return localStorage.getItem(key) ?  JSON.parse(localStorage.getItem(key)) : initialValue;
      }
    } catch (err) {
      console.log(err);
      return initialValue;
    }
  }

  const incQty = () => {
    setQty((pervQty) => pervQty + 1)
  }

  const decQty = () => {
    setQty((pervQty) => {
      if (pervQty - 1 < 1) return 1;
      return pervQty - 1;
    })
  }

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find((item) => item._id === product._id);
    
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);

    if (checkProductInCart) {
      const updateCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) return {
          ...cartProduct,
          quantity: cartProduct.quantity + quantity
        }
      })
      setCartItems(updateCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, {...product}]);
    }
    
    toast.success(`${qty} ${product.name} added to the cart.`);
    setQty(1);
  }

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);
    
    setCartItems(newCartItems);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity);
    setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
    
  }

  const toggleCartItemQuanitity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);

    const newCartItems = cartItems.filter((item) => item._id !== id);
    
    if(value === 'inc') {
      setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 } ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
    } else if(value === 'dec') {
      if (foundProduct.quantity > 1) {
        setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 } ]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1);
      }
    }
  }

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        onRemove,
        toggleCartItemQuanitity,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
        darkMode,
        setDarkMode
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);