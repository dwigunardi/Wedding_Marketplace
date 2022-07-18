import Head from 'next/head'
import 'antd/dist/antd.css'
import Beranda from './beranda'
import "tailwindcss/tailwind.css"
import Navigasi from './navigasi'
import CarouselAuto from './carousel'
import ContentMain from './content'

import dynamic from 'next/dynamic'
import FooterCustomer from './footer'

export default function Home() {
  return (

    <>
      <Navigasi />
      <CarouselAuto />
      <ContentMain />
      <FooterCustomer />
    </>



  )
}
