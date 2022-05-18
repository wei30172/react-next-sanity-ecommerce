import React from 'react';
import Head from 'next/head';
import { useStateContext } from '../context/StateContext';

import { AuthWrapper, Navbar, Footer } from '../components';

const Layout = ({ children }) => {
  const { darkMode } = useStateContext();

  return (
    <div className={darkMode ? 'layout dark-mode-on' : 'layout dark-mode-off'}>
      <Head>
        <title>Sanity Store</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <AuthWrapper>
        <main className='main-container'>
          {children}
        </main>
      </AuthWrapper>
      <Footer />
    </div>
  )
}

export default Layout