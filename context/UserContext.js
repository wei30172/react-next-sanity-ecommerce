import React, { useState, useEffect, createContext, useContext } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import jsCookie from 'js-cookie';
import { setCookie, getCookie } from '../utils/jsCookie'
import { getError }from '../utils/getError';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const UserContext = ({ children }) => {
  const router = useRouter();
  
  const [userInfo, setUserInfo] = useState(getCookie("userInfo", null));
  const [shippingAddress, setShippingAddress] = useState(getCookie("shippingAddress", {
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    address: ""
  }));

  useEffect(() => {
    setCookie("userInfo", userInfo);
  }, [userInfo]);

  const userLogin = async ({email, password} = info, redirect) => {
    try {
      const { data } = await axios.post('/api/users/login', {
        email,
        password,
      });
      setUserInfo(data)
      router.push(redirect || '/');
    } catch (err) {
      toast.error(getError(err));
    }
  }

  const userRegister = async ({name, email, password, confirmPassword} = info, redirect) => {
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    try {
      const { data } = await axios.post('/api/users/register', {
        name,
        email,
        password,
      });
      setUserInfo(data)
      router.push(redirect || '/');
    } catch (err) {
      toast.error(getError(err));
    }
  }

  const userLogout = () => {
    toast.success(`You've been logged out.`);
    jsCookie.remove("userInfo");
    jsCookie.remove("shippingAddress");
    setUserInfo(null);
    setShippingAddress(null);
  }

  const saveShippingAddress = async (info) => {
    try {
      setShippingAddress(info);
      setCookie("shippingAddress", shippingAddress);
      router.push('/payment');
    } catch (err) {
      toast.error(getError(err));
    }
  }

  return (
    <Context.Provider
      value={{
        userInfo,
        userLogin,
        userRegister,
        userLogout,
        shippingAddress,
        setShippingAddress,
        saveShippingAddress
      }}
    >
      { children }
    </Context.Provider>
  )
}

export const useUserContext = () => useContext(Context);