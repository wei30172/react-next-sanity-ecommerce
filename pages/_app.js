import '../styles/globals.scss'
import '../styles/pages.scss'
import '../styles/components.scss'
import { StateContext } from '../context/StateContext';
import { AuthContext } from '../context/AuthContext';
import { Toaster } from 'react-hot-toast';

import { Layout } from '../components';

function MyApp({ Component, pageProps }) {
  return (
    <AuthContext>
      <StateContext>
        <Layout>
          <Toaster />
          <Component {...pageProps} />
        </Layout>
      </StateContext>
    </AuthContext>
  )
}

export default MyApp
