import Background from "../public/Image/banner-wed-5.png"
import Image from "next/image"
import Logo from "../public/Image/sahin-love.png"
import { Col, Row, Grid, Layout } from "antd"
import "antd/dist/antd.css"
import "tailwindcss/tailwind.css"
import Link from "next/link"
import { useState } from "react"
const { useBreakpoint } = Grid;
const { Content } = Layout




function MerchantRegis() {
    const screens = useBreakpoint();
    const contentStyle = {
        height: '100vh',
        color: '#CC5A80',
        textAlign: 'center',
        position: 'relative',
    };
    const [nama, setNama] = useState('')
    return (
        <>
            <Image src={Background} layout="fill" />
            <div style={{ width: "768px" }} className="min-h-screen align-middle">



                <Row gutter={{
                    xs: 8,
                    sm: 16,
                    md: 32,
                    lg: 32,
                }} align="middle" className="justify-between" >
                    {Object.entries(screens)
                        .filter((screen) => !!screen[1])
                        .map((screen) => (
                            console.log(screen[0])
                        ))}
                    <Col offset={3} span={10} className="pt-5  align-middle">

                        <h1 className="text-pink-500 text-3xl">Daftar</h1>


                    </Col>
                    <Col span={8} offset={1} className="pt-5 mb-5 justify-self-end">
                        <Image src={Logo} width={253} height={213} />
                    </Col>

                </Row>
                <Row align="middle" className="justify-between">
                    <Col span={15} offset={3}>
                        <form className="mt-5">
                            <div className="mb-5">
                                <input
                                    type="text"
                                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700
                                    bg-white bg-clip-padding border border-solid border-pink-300 rounded transition 
                                    ease-in-out m-0 focus:text-pink-700 focus:bg-white focus:border-pink-600 focus:outline-none"
                                    id="exampleFormControlInput1"
                                    placeholder="Masukan Nama Toko Anda"

                                />
                            </div>
                            <div className="text-center pt-1 mb-12 pb-1">
                                <button
                                    className="inline-block px-6 py-2.5 text-pink-500 font-medium text-xs leading-tight uppercase rounded shadow-md 
                                    hover:bg-pink-700 hover:text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg 
                                    transition duration-150 ease-in-out w-full mb-3"
                                    type="submit"
                                    data-mdb-ripple="true"
                                    data-mdb-ripple-color="light"
                                >
                                    Daftar
                                </button>

                            </div>

                            <p className="mb-0 mr-2">Sudah punya akun? <Link href="/login"><a className="text-pink-500">Login disini</a></Link></p>


                        </form>
                    </Col>
                </Row>

            </div>
        </>
    )
}

export default MerchantRegis