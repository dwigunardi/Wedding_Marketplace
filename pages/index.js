import Head from 'next/head'
import 'antd/dist/antd.css'
import Beranda from './beranda'
import "tailwindcss/tailwind.css"
import Navigasi from '../components/navigasi'
import dynamic from 'next/dynamic'
import FooterCustomer from '../components/footer'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
export default function Home() {

  return (

    <>
      <Navigasi />
      <Beranda />
      <FooterCustomer />
    </>



  )
}
