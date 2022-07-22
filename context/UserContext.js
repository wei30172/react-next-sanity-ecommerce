import React, { useState, useEffect, createContext, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import jsCookie from "js-cookie";
import { setCookie, getCookie } from "../utils/jsCookie";
import { getError } from "../utils/getError";
import { toast } from "react-hot-toast";

const Context = createContext();

export const UserContext = ({ children }) => {
  const router = useRouter();

  const [userLoading, setUserLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(getCookie("userInfo", null));
  const [shippingAddress, setShippingAddress] = useState(
    getCookie("shippingAddress", {
      fullName: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
    }),
  );
  const [paymentMethod, setPaymentMethod] = useState(
    getCookie("paymentMethod", null),
  );

  useEffect(() => {
    setCookie("userInfo", userInfo);
  }, [userInfo]);

  const userLogin = async ({ email, password } = info, redirect) => {
    try {
      setUserLoading(true);
      const { data } = await axios.post("/api/users/login", {
        email,
        password,
      });
      setUserInfo(data);
      setUserLoading(false);
      router.push(redirect || "/");
    } catch (err) {
      setUserLoading(false);
      toast.error(getError(err));
    }
  };

  const userRegister = async (
    { name, email, password, confirmPassword } = info,
    redirect,
  ) => {
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    try {
      setUserLoading(true);
      const { data } = await axios.post("/api/users/register", {
        name,
        email,
        password,
      });
      setUserInfo(data);
      setUserLoading(false);
      router.push(redirect || "/");
    } catch (err) {
      setUserLoading(false);
      toast.error(getError(err));
    }
  };

  const userUpdate = async ({ name, email } = info) => {
    try {
      const { data } = await axios.put(
        "/api/users/profile",
        {
          name,
          email,
        },
        { headers: { authorization: `Bearer ${userInfo.token}` } },
      );
      setUserInfo(data);
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const userLogout = () => {
    toast.success(`You've been logged out.`);
    jsCookie.remove("userInfo");
    jsCookie.remove("shippingAddress");
    jsCookie.remove("paymentMethod");
    setUserInfo(null);
    setShippingAddress({
      fullName: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
    });
    setPaymentMethod(null);
  };

  const saveShippingAddress = (info) => {
    try {
      setShippingAddress(info);
      setCookie("shippingAddress", info);
      router.push("/payment");
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const savePaymentMethod = (method) => {
    try {
      setPaymentMethod(method);
      setCookie("paymentMethod", method);
      router.push("/placeorder");
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <Context.Provider
      value={{
        userInfo,
        userLoading,
        userLogin,
        userRegister,
        userUpdate,
        userLogout,
        shippingAddress,
        saveShippingAddress,
        paymentMethod,
        savePaymentMethod,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useUserContext = () => useContext(Context);
