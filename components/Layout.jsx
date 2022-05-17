import { useStateContext } from '../context/StateContext';

import React from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';

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
      <main className='main-container'>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout