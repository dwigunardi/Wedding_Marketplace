import { Col, Row, Grid, Layout, Button, Input, message } from "antd"
import 'antd/dist/antd.variable.css'
import "tailwindcss/tailwind.css"
import Background from "../../public/Image/banner-wed-5.png"
import Image from "next/image"
import Logo from "../../public/Image/sahin-love.png"
import { useState, Fragment, useEffect } from "react"
import axios, { AxiosError } from "axios";
import Link from "next/link"
import Router, { useRouter } from "next/router"
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import jwt_decode from "jwt-decode";


const { useBreakpoint } = Grid;
const { Content } = Layout


export default function Login() {
    const screens = useBreakpoint();
    const contentStyle = {
        height: '100vh',
        color: '#CC5A80',
        textAlign: 'center',
        position: 'relative',
    };
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState('')
    const router = useRouter()
    useEffect(() => {
        const getTokenAdmin = localStorage.getItem("token_admin")
        const getTokenMerchant = localStorage.getItem("token_merchant")
        const getTokenCostumer = localStorage.getItem("token_customer")
        if (getTokenAdmin || getTokenMerchant || getTokenCostumer) {
            message.info("Anda Sudah Login")
            Router.back()
        }
    }, []);



    const onChangeUsername = (e) => {
        const value = e.target.value
        setUsername(value)
    }

    const onChangePassword = (e) => {
        const value = e.target.value
        setPassword(value)
    }
    const onFormSubmit = (e) => {
        e.preventDefault()
    }
    const submitLogin = async () => {

        try {
            const formData = {
                username: username,
                password: password
            }
            // console.log(formData)

            const request = await axios.post("https://project-wo.herokuapp.com/auth/login", formData, {
                headers: { 'content-type': 'application/json' }
            }).then(result => {
                // console.log(result);

                const decode = jwt_decode(result.data.access_token)
                console.log(decode.role)

                if (decode.role == "Admin") {
                    localStorage.setItem('token_admin', result.data.access_token)
                    router.push("/admin/dashboard")
                    message.success("Hai! admin selamat datang!!")

                } else if (decode.role == "Merchant") {
                    localStorage.setItem('token_merchant', result.data.access_token)
                    router.push("/merchant/dashboard")
                    message.success("Hai! Merchant Selamat Bergabung!!")
                } else if (decode.role == "Costumer") {
                    localStorage.setItem('token_customer', result.data.access_token)
                    router.push(`/customer/landing/${decode.username}`)
                    message.success("Hai! Customer Selamat Datang!!")
                }
            })
        } catch (error) {
            if (error) {
                message.error(error.message = "Username Atau Password Salah!")
                console.error(error);
            }

        }

    }


    return (
        <>

            <div style={{ position: "relative" }} className="min-h-screen min-w-full">
                <Image src={Background} layout="fill" priority={true} />
                <div className="min-h-screen align-middle">
                    <Row gutter={{
                        xs: 8,
                        sm: 16,
                        md: 32,
                        lg: 32,
                    }} align="middle" className="justify-between" style={{ width: "50%" }} >

                        <Col lg={{ span: 10 }} offset={4} className="pt-5  align-middle">

                            <h1 className="text-pink-500 text-3xl">Login</h1>


                        </Col>
                        <Col span={8} offset={2} className="pt-5 mb-10 justify-self-end">
                            <Image src={Logo} width={150} height={125} />
                        </Col>

                    </Row>

                    <Row align="middle" className="justify-between" style={{ width: "50%" }}>
                        <Col lg={{ span: 16 }} offset={4}>
                            <form className="mt-5" onSubmit={onFormSubmit}>
                                <div className="mb-10">
                                    <input
                                        type="text"
                                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700
                                    bg-white bg-clip-padding border border-solid border-pink-300 rounded transition 
                                    ease-in-out m-0 focus:text-pink-700 focus:bg-white focus:border-pink-600 focus:outline-none"

                                        placeholder="Masukan Username Anda"
                                        value={username} onChange={onChangeUsername}

                                    />
                                </div>
                                <div className="mb-10">
                                    <Input.Password
                                        type="password"
                                        className="form-control
                                            block
                                            w-full
                                            px-3
                                            py-1.5
                                            text-base
                                            font-normal
                                            text-pink-700
                                            bg-white bg-clip-padding
                                            border border-solid border-pink-300
                                            rounded
                                            transition
                                            ease-in-out
                                            m-0
                                            focus:text-pink-700 focus:bg-white focus:border-pink-600 focus:outline-none"
                                        iconRender={(visible) => (visible ? <EyeTwoTone style={{ color: "pink" }} /> : <EyeInvisibleOutlined style={{ color: "pink" }} />)}
                                        placeholder="Password"
                                        style={{ borderColor: "pink", color: "pink" }}
                                        value={password} onChange={onChangePassword}
                                    />

                                </div>
                                <div className="text-center pt-1 mb-12 pb-1">
                                    <button
                                        className="inline-block px-6 py-2.5 text-pink-500 font-medium text-xs leading-tight uppercase rounded shadow-md 
                                    hover:bg-pink-700 hover:text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg 
                                    transition duration-150 ease-in-out w-full mb-3"

                                        data-mdb-ripple="true"
                                        data-mdb-ripple-color="light"
                                        type="submit"
                                        onClick={submitLogin}
                                    >
                                        Log in
                                    </button>

                                </div>

                                <div className="flex items-center justify-between pb-6">
                                    <div className="mb-0 mr-2">Tidak punya akun? <Link href="/auth/landingOpsi"><a className="text-pink-500">Daftar disini</a></Link></div>

                                </div>
                            </form>
                        </Col>
                    </Row>
                </div>
            </div>

        </>
    )
}