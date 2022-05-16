import '../styles/globals.scss'
import '../styles/pages.scss'
import '../styles/components.scss'
import { StateContext } from '../context/StateContext';
import { Toaster } from 'react-hot-toast';

import { Layout } from '../components';

function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  )
}

export default MyApp
