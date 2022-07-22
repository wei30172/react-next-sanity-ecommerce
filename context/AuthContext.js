import React, { useState, useEffect, createContext, useContext } from "react";
import { setCookie } from "../utils/jsCookie";
import netlifyIdentity from "netlify-identity-widget";

const Context = createContext();

export const AuthContext = ({ children }) => {
  const [netlifyUser, setNetlifyUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    netlifyIdentity.on("login", (user) => {
      setNetlifyUser(user);
      netlifyIdentity.close();
      // console.log('log in');
    });

    netlifyIdentity.on("logout", () => {
      setNetlifyUser(null);
      // console.log('log out');
    });

    netlifyIdentity.on("init", (user) => {
      setNetlifyUser(user);
      setAuthReady(true);
      // console.log('init');
    });

    // init netlify identity connection
    netlifyIdentity.init();

    return () => {
      netlifyIdentity.off("login");
      netlifyIdentity.off("logout");
      netlifyIdentity.off("init");
    };
  }, []);

  const netlifyLogin = () => {
    netlifyIdentity.open();
  };

  const netlifyLogout = () => {
    netlifyIdentity.logout();
  };

  if (netlifyUser) {
    setCookie("user", {
      name: netlifyUser.user_metadata.full_name,
      email: netlifyUser.email,
    });
  }

  return (
    <Context.Provider
      value={{
        netlifyUser,
        authReady,
        netlifyLogin,
        netlifyLogout,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAuthContext = () => useContext(Context);
