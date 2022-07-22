import "../styles/globals.scss";
import "../styles/pages.scss";
import "../styles/components.scss";
import { StateContext } from "../context/StateContext";
import { UserContext } from "../context/UserContext";
// import { AuthContext } from '../context/AuthContext';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Toaster } from "react-hot-toast";

import { Layout } from "../components";

function MyApp({ Component, pageProps }) {
  return (
    <UserContext>
      <StateContext>
        <Layout>
          <Toaster />
          <PayPalScriptProvider deferLoading={true}>
            <Component {...pageProps} />
          </PayPalScriptProvider>
        </Layout>
      </StateContext>
    </UserContext>
  );
}

export default MyApp;
