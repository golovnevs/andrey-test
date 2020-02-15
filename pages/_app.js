import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import '../global-styles.css'
import Layout from '../components/Layout'

const alertOptions = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  transition: transitions.SCALE
}

export default function MyApp({ Component, pageProps }) {
  return <AlertProvider template={AlertTemplate} {...alertOptions}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </AlertProvider>
}
