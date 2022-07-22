import Head from 'next/head'
import 'antd/dist/antd.css'
import Beranda from './beranda'
import "tailwindcss/tailwind.css"
import Navigasi from '../components/navigasi'
import dynamic from 'next/dynamic'
import FooterCustomer from '../components/footer'

import React, { useEffect, useLayoutEffect } from "react";
export default function Home(props) {
  if (typeof document === 'undefined') {
    React.useLayoutEffect = React.useEffect;
  }
  return (

    <>
      <Navigasi />
      <Beranda />
      <FooterCustomer />
    </>



  )
}
