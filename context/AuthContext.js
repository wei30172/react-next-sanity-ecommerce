import React, { useState, useEffect, createContext, useContext } from 'react';
import netlifyIdentity from 'netlify-identity-widget'

const Context = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  authReady: false,
});

export const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    netlifyIdentity.on('login', (user) => {
      setUser(user);
      netlifyIdentity.close();
      // console.log('log in');
    })

    netlifyIdentity.on('logout', () => {
      setUser(null);
      // console.log('log out');
    })

    netlifyIdentity.on('init', (user) => {
      setUser(user);
      setAuthReady(true);
      // console.log('init');
    })

    // init netlify identity connection
    netlifyIdentity.init();

    return () => {
      netlifyIdentity.off('login')
      netlifyIdentity.off('logout')
      netlifyIdentity.off('init')
    }
  }, [])

  const login = () => {
    netlifyIdentity.open()
  }

  const logout = () => {
    netlifyIdentity.logout()
  }

  if (user) {
    window.localStorage.setItem('email', user.email)
  }
  
  return (
    <Context.Provider
      value={{
        user,
        login,
        logout,
        authReady
      }}
    >
      { children }
    </Context.Provider>
  )
}

export const useAuthContext = () => useContext(Context);