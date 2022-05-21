import React, {useState, useEffect} from 'react';
import Head from 'next/head';
import { useStateContext } from '../context/StateContext';

import { AuthWrapper, Navbar, Footer } from '../components';

const Layout = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true)
  }, []);

  const { darkMode } = useStateContext();

  if (!mounted) return null;
  
  return (
    <div className={darkMode ? 'layout dark-mode-on' : 'layout dark-mode-off'}>
      <Head>
        <title>Sanity Store</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <AuthWrapper>
        <main className="main-container">
          {children}
        </main>
      </AuthWrapper>
      <Footer />
    </div>
  )
}

export default Layout