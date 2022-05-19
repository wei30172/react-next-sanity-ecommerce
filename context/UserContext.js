import React, { useState, useEffect, createContext, useContext } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { setLocalStorage, getLocalStorage } from '../utils/storage'
import { getError }from '../utils/getError';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const UserContext = ({ children }) => {
  const router = useRouter();
  
  const [userInfo, setUserInfo] = useState(getLocalStorage("userInfo", null));

  useEffect(() => {
    setLocalStorage("userInfo", userInfo);
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
      console.log(err);
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
      console.log(err);
      toast.error(getError(err));
    }
  }

  const userLogout = () => {
    console.log("Logout");
    localStorage.removeItem("userInfo");
    setUserInfo(null);
  }

  return (
    <Context.Provider
      value={{
        userInfo,
        userLogin,
        userRegister,
        userLogout
      }}
    >
      { children }
    </Context.Provider>
  )
}

export const useUserContext = () => useContext(Context);