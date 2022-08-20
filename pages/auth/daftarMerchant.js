import Background from "../../public/Image/banner-wed-5.png"
import Image from "next/image"
import Logo from "../../public/Image/sahin-love.png"
import { Col, Row, Grid, Layout, message, Upload, Button, Checkbox, Form, Input } from "antd"
import "antd/dist/antd.css"
import "tailwindcss/tailwind.css"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { LoadingOutlined, PlusOutline, UploadOutlined } from '@ant-design/icons';
import axios, { AxiosError } from "axios"


const { useBreakpoint } = Grid;
const { Content } = Layout

export default function MerchantRegis() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [no_telp, setNotel] = useState('')
    const [password, setPassword] = useState('')
    const [roleId, setRoleid] = useState('36bb08f9-e29d-4d11-806c-b26ba1560dca')
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState('')
    const [namaToko, setNamaToko] = useState('')



    const onChangeNamaToko = (e) => {
        const value = e.target.value
        setNamaToko(value)
    }

    const onChangeName = (e) => {
        const value = e.target.value
        setName(value)
    }
    const onChangeEmail = (e) => {
        const value = e.target.value
        setEmail(value)
    }


    const onChangeUsername = (e) => {
        const value = e.target.value
        setUsername(value)
    }

    const onChangeNotel = (e) => {
        const value = e.target.value
        setNotel(value)
    }

    const onChangeImage = (e) => {
        const value = e.target.files[0]
        setImage(value)
    }

    const onChangePassword = (e) => {
        const value = e.target.value
        setPassword(value)
    }
    const onChangeRoleid = (e) => {
        const value = e.target.value
        setRoleid(value)
    }
    const onFormSubmit = (e) => {
        e.preventDefault()
    }

    const router = useRouter()

    const submitDaftar = async () => {

        try {
            //     const data = new FormData()
            //     data.append('name', name)
            //     data.append('username', username)
            //     data.append('email', email)
            //     data.append('no_telp', no_telp)
            //     data.append('password', password)
            //     data.append('role_id', roleId)
            //     // data.append('image', image)
            //     data.append('merchant_name', namaToko)

            const data = {
                name: name,
                username: username,
                email: email,
                no_telp: no_telp,
                password: password,
                role_id: roleId,
                merchant_name: namaToko
            }

            const res = await axios.post("https://project-wo.herokuapp.com/auth/register", data, {
                headers: {
                    "Content-Type": "application/json",
                }
            }).then(result => {
                console.log(result)
                if (result.status == 201 || result.status == 200) {
                    message.success("Selamat anda telah mendaftar silahkan login")
                    router.push('/auth/login')
                } else {
                    message.info("Gagal mendaftar")
                }

            })
        } catch (error) {
            if (error) {
                console.error(error);
                message.error(error.message)
            }

        }

    }

    useEffect(() => {
        const getTokenAdmin = localStorage.getItem("token_admin")
        const getTokenMerchant = localStorage.getItem("token_merchant")
        const getTokenCostumer = localStorage.getItem("token_customer")
        if (getTokenAdmin || getTokenMerchant || getTokenCostumer) {
            message.info("Anda Sudah Login")
            Router.back()
        }
    }, []);

    return (
        <>
            <div style={{ position: "relative" }} className="min-h-screen min-w-full">
                <Image src={Background} layout="fill" priority={true} />
                <div className="align-middle">
                    <Row gutter={{
                        xs: 8,
                        sm: 16,
                        md: 32,
                        lg: 32,
                    }} align="middle" className="justify-between" style={{ width: "50%" }}>

                        <Col lg={{ span: 10 }} offset={4} className="pt-5  align-middle">

                            <h1 className="text-pink-500 text-3xl">Daftar Merchant</h1>


                        </Col>
                        <Col span={8} offset={1} className="pt-5 mb-4 justify-self-end">
                            <Image src={Logo} width={150} height={125} />
                        </Col>

                    </Row>
                    <Row align="middle" className="justify-between" style={{ width: "50%" }}>
                        <Col lg={{ span: 16 }} offset={4}>
                            <form onSubmit={onFormSubmit} className="mt-5" method="POST">
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700
                                    bg-white bg-clip-padding border border-solid border-pink-300 rounded transition 
                                    ease-in-out m-0 focus:text-pink-700 focus:bg-white focus:border-pink-600 focus:outline-none"
                                        value={name} onChange={onChangeName}
                                        placeholder="Masukan Nama Anda"

                                    />
                                </div>
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700
                                    bg-white bg-clip-padding border border-solid border-pink-300 rounded transition 
                                    ease-in-out m-0 focus:text-pink-700 focus:bg-white focus:border-pink-600 focus:outline-none"
                                        value={namaToko} onChange={onChangeNamaToko}
                                        placeholder="Masukan Nama Toko Anda"

                                    />
                                </div>
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700
                                    bg-white bg-clip-padding border border-solid border-pink-300 rounded transition 
                                    ease-in-out m-0 focus:text-pink-700 focus:bg-white focus:border-pink-600 focus:outline-none"
                                        value={email} onChange={onChangeEmail}
                                        placeholder="Masukan Email Anda"

                                    />
                                </div>
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700
                                    bg-white bg-clip-padding border border-solid border-pink-300 rounded transition 
                                    ease-in-out m-0 focus:text-pink-700 focus:bg-white focus:border-pink-600 focus:outline-none"
                                        value={no_telp} onChange={onChangeNotel}
                                        placeholder="Masukan No Telepon Anda"
                                    />
                                </div>
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700
                                    bg-white bg-clip-padding border border-solid border-pink-300 rounded transition 
                                    ease-in-out m-0 focus:text-pink-700 focus:bg-white focus:border-pink-600 focus:outline-none"
                                        value={username} onChange={onChangeUsername}
                                        placeholder="Masukan Username Anda"

                                    />
                                </div>

                                <div className="mb-4">
                                    <input
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
                                        value={password} onChange={onChangePassword}
                                        placeholder="Password"
                                    />

                                    <input
                                        type="hidden"
                                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 
                                    bg-white bg-clip-padding border border-solid border-pink-300 rounded transition 
                                    ease-in-out m-0 focus:text-pink-700 focus:bg-white focus:border-pink-600 focus:outline-none"
                                        value={roleId} onChange={onChangeRoleid}

                                    />

                                </div>
                                {/* <div className="mb-4">
                                    <input
                                        id="img"
                                        style={{ display: "none" }}
                                        type="file"
                                        accept="image/*"
                                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 
                                    bg-white bg-clip-padding border border-solid border-pink-300 rounded transition 
                                    ease-in-out m-0 focus:text-pink-700 focus:bg-white focus:border-pink-600 focus:outline-none"
                                        onChange={onChangeImage}
                                    />

                                    <button className="inline-block px-6 py-4 border-2 border-pink-500 text-pink-500 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                                        <label htmlFor="img"><UploadOutlined /> upload Photo anda </label>
                                    </button>

                                </div> */}
                                <div className="text-center pt-1 mb-12 pb-1">
                                    <button
                                        type="submit"
                                        className="inline-block px-6 py-2.5 text-pink-500 font-medium text-xs leading-tight uppercase rounded shadow-md 
                                    hover:bg-pink-700 hover:text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg 
                                    transition duration-150 ease-in-out w-full mb-3"

                                        data-mdb-ripple="true"
                                        data-mdb-ripple-color="light"
                                        onClick={submitDaftar}
                                    >
                                        Daftar
                                    </button>

                                </div>

                                <p className="mb-0 mr-2">Sudah punya akun? <Link href="/auth/login"><a className="text-pink-500">Login disini</a></Link></p>


                            </form>


                        </Col>
                    </Row>

                </div>
            </div>
        </>
    )
}