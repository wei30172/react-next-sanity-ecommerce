import jsCookie from "js-cookie";
import Cookies from "js-cookie";

export const setCookie = (key, value) => {
  try {
    jsCookie.set(key, JSON.stringify(value));
  } catch (err) {
    console.log(err);
  }
};

export const getCookie = (key, initialValue) => {
  try {
    if (Cookies) {
      return Cookies.get(key) ? JSON.parse(Cookies.get(key)) : initialValue;
    }
  } catch (err) {
    console.log(err);
    return initialValue;
  }
};
