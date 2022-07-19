import Head from 'next/head'
import 'antd/dist/antd.css'
import Beranda from './beranda'
import "tailwindcss/tailwind.css"
import Navigasi from './navigasi'
import CarouselAuto from './carousel'
import ContentMain from './content'

import dynamic from 'next/dynamic'
<<<<<<< HEAD
=======
import FooterCustomer from './footer'
>>>>>>> be39ec6d4f44635aebf471badedc02234eb2adff

export default function Home() {
  return (

    <>
      <Navigasi />
      <CarouselAuto />
      <ContentMain />
<<<<<<< HEAD
=======
      <FooterCustomer />
>>>>>>> be39ec6d4f44635aebf471badedc02234eb2adff
    </>



  )
}
