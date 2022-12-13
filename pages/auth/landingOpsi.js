import Background from "../../public/Image/banner-wed-5.png"
import Image from "next/image"
import Logo from "../../public/Image/sahin-love.png"
import { Col, Row, Grid, Layout } from "antd"
import "antd/dist/antd.css"
import "tailwindcss/tailwind.css"
import { useState, } from "react"
import Link from "next/link"
import { useRouter } from "next/router"


const { useBreakpoint } = Grid;
const { Content } = Layout

function opsiDaftar() {
    // @refresh reset

    const screens = useBreakpoint();
    return (
        <>

            <div style={{ position: "relative" }} className="min-h-screen min-w-full">
                <Image src={Background} layout="fill" priority={true} />
                <div className=" align-middle">
                    <Row gutter={{
                        xs: 8,
                        sm: 16,
                        md: 32,
                        lg: 32,
                    }} align="middle" className="justify-between" style={{ width: "50%" }} >

                        <Col lg={{ span: 10 }} offset={4} className="pt-5  align-middle">

                            <h1 className="text-pink-500 text-3xl">Daftar</h1>


                        </Col >
                        <Col offset={1} className="pt-5 mb-10 justify-self-end">
                            <Image src={Logo} width={150} height={125} />
                        </Col>

                    </Row >
                    <Row gutter={{
                        xs: 8,
                        sm: 16,
                        md: 32,
                        lg: 32,
                    }} align="middle" className="justify-between" style={{ width: "50%" }}>
                        <Col lg={{ span: 16 }} offset={4}>
                            <div className="mt-5">
                                <div className="mb-10">
                                    <Link href="/auth/daftarMerchant">
                                        <button
                                            className="inline-block px-6 py-2.5 text-white bg-pink-500 font-medium text-xs leading-tight uppercase rounded shadow-md 
                                            hover:bg-pink-700 hover:text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg 
                                            transition duration-150 ease-in-out w-full mb-3">
                                            Daftar sebagai Merchant
                                        </button>
                                    </Link>

                                </div>
                                <div className="mb-10">
                                    <Link href="/auth/daftar">
                                        <button
                                            className="inline-block px-6 py-2.5 text-white bg-pink-500 font-medium text-xs leading-tight uppercase rounded shadow-md 
                                            hover:bg-pink-700 hover:text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg 
                                            transition duration-150 ease-in-out w-full mb-3">
                                            Daftar sebagai customer
                                        </button>
                                    </Link>
                                </div>

                                <div className="flex items-center justify-between pb-6">
                                    <p className="mb-0 mr-2">Sudah punya akun? <Link href="/auth/login"><a className="text-pink-500">Login disini</a></Link></p>

                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>

        </>
    )
}

export default opsiDaftar
