import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useStateContext } from "../context/StateContext";

import { Navbar, Footer } from "../components";

const Layout = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { darkMode } = useStateContext();

  if (!mounted) return null;

  return (
    <div className={darkMode ? "layout dark-mode-on" : "layout dark-mode-off"}>
      <Head>
        <title>React E-Commerce Website</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="main-container">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
