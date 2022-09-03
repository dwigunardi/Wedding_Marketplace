import 'tailwindcss/tailwind.css'
import 'antd/dist/antd.variable.css'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import logo from "../public/Image/sahin-love.png"
import Link from 'next/link'
import { Space, Dropdown, Menu, Button, ConfigProvider, message } from 'antd'
import {
    UserOutlined,
    DownOutlined, LogoutOutlined, ShoppingCartOutlined
} from '@ant-design/icons';
import jwt_decode from 'jwt-decode'



ConfigProvider.config({
    theme: {
        primaryColor: '#EC4899',
    },
});

export default function Navigasi(props) {
    const [navbar, setNavbar] = useState(false);
    const [isLogged, setLogged] = useState(false)
    const [username, setUsername] = useState('')
    const [id, setId] = useState('')
    const router = useRouter();
    const currentRoute = router.pathname;

    async function validate() {
        try {
            let token = localStorage.getItem('token_customer')

            const decode = jwt_decode(token)
            const user = decode.username
            const id = decode.user_id
            // console.log(decode);
            if (user) {
                setUsername(user)

            } else {
                setUsername(null)
            }
            if (token) {
                setLogged(true)
            } else {
                setLogged(false)
            }
            if (id) {
                setId(id)
            }

        } catch (error) {

        }
    }
    useEffect(() => {
        validate()
    }, []);
    async function buttonLogout() {
        try {
            const remove = localStorage.clear()
            message.info("Anda telah keluar")
            router.push("/auth/login")

        } catch (error) {

        }
    }

    const menu = (
        <Menu
            items={[
                {
                    label: <Link href={`/customer/profile/${username}`}>
                        <a>Profile</a>
                    </Link>,
                    key: '1',
                    icon: <UserOutlined />,
                },
                {
                    label: <Button type='danger' onClick={buttonLogout}>
                        Logout
                    </Button>,
                    key: '2',
                    icon: <LogoutOutlined />,
                },

            ]}
        />
    );
    return (
        <>

            <div className='relative'>
                <div className="w-full bg-white drop-shadow-md" style={{ position: "fixed", zIndex: "10" }}>
                    <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">

                        <div className="flex items-center justify-between md:block">
                            <Link href="/">
                                <a>
                                    <Image src={logo} width={150} height={65} objectFit='contain' />
                                </a>
                            </Link>

                            <div className="md:hidden">
                                <button
                                    className="p-2 text-pink-500 rounded-md outline-none focus:border-pink-500 focus:border"
                                    onClick={() => setNavbar(!navbar)}
                                >
                                    {navbar ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6 text-pink-500"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6 text-pink-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4 6h16M4 12h16M4 18h16"
                                            />
                                        </svg>
                                    )}
                                </button>

                            </div>
                        </div>



                        <div
                            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navbar ? "block" : "hidden"
                                }`}
                        >

                            <ul className="items-center justify-center  md:flex md:space-x-6 md:space-y-0">
                                <li className="text-pink-500 ">
                                    <Link href="/">
                                        <a className={`text-pink-500 hover:text-white hover:bg-pink-500 
                                 pt-5 pb-6 px-5 text-lg ${currentRoute === "/" ? "active" : "non-active"}`}>
                                            Home
                                        </a>
                                    </Link>
                                </li>
                                <li className="text-pink-500 ">
                                    <Link href="/product">
                                        <a className={`text-pink-500 hover:text-white hover:bg-pink-500 
                                 pt-5 pb-6 px-5 text-lg ${currentRoute === "/product" ? "active" : "non-active"}`}>Product</a>
                                    </Link>
                                </li>
                                <li className="text-pink-500 ">
                                    <Link href="/contactUs">
                                        <a className={`text-pink-500 hover:text-white hover:bg-pink-500 
                                 pt-5 pb-6 px-5 text-lg ${currentRoute === "/contactUs" ? "active" : "non-active"}`}>Contact Us</a>
                                    </Link>
                                </li>
                                {/* <li className="text-pink-500 ">
                                <Link href=""><a className='text-pink-500 hover:text-white hover:bg-pink-500 pt-5 pb-6 px-5 text-lg'>Transaksi</a></Link>
                            </li> */}
                            </ul>

                            <div className="mt-3 space-y-2 lg:hidden md:hidden sm:inline-block">
                                {isLogged ? (
                                    <>
                                        <div className='flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 '>
                                            <ul className="items-center justify-center  md:flex md:space-x-6 md:space-y-0">
                                                <li className="text-pink-500 ">
                                                    <Link href={`/customer/transaksi/${id}`}  >
                                                        <a>
                                                            <ShoppingCartOutlined className='text-2xl' />
                                                        </a>
                                                    </Link>
                                                </li>
                                                <li className="text-pink-500 ">
                                                    <div className='text-center text-pink-500 space-x-2'>
                                                        <Space className='text-center '>
                                                            <UserOutlined className=' text-2xl' />
                                                            <Dropdown overlay={menu} trigger={['click']}>
                                                                <a onClick={(e) => e.preventDefault()} className="text-lg">
                                                                    {username}
                                                                    <DownOutlined />
                                                                </a>
                                                            </Dropdown>
                                                        </Space>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <Link href="/auth/login">
                                            <button
                                                className="transition ease-in-out hover:-translate-x-2 hover:scale-110 delay-150 px-5 py-2 
                                 text-pink-500 mr-4 border-solid border-pink-500 border-2 rounded-full shadow hover:bg-pink-500
                                  hover:text-white ..."
                                            >
                                                Login
                                            </button>
                                        </Link>
                                        <Link href="/auth/landingOpsi">
                                            <button
                                                className="transition ease-in-out hover:-translate-x-2 hover:scale-110 delay-150 px-5 py-2 text-pink-500 bg-white rounded-md shadow hover:bg-pink-500 hover:text-white ..."
                                            >
                                                Daftar
                                            </button>
                                        </Link>
                                    </>

                                )}
                            </div>
                        </div>
                        <div className="hidden space-x-2 md:inline-block">
                            {isLogged ? (
                                <>
                                    <div className='flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 '>
                                        <ul className="items-center justify-center  md:flex md:space-x-6 md:space-y-0">
                                            <li className="text-pink-500 ">
                                                <Link href={`/customer/transaksi/${id}`}  >
                                                    <a>
                                                        <ShoppingCartOutlined className='text-2xl' />
                                                    </a>
                                                </Link>
                                            </li>
                                            <li className="text-pink-500 ">
                                                <div className='text-center text-pink-500 space-x-2'>
                                                    <Space className='text-center '>
                                                        <UserOutlined className=' text-2xl' />
                                                        <Dropdown overlay={menu} trigger={['click']}>
                                                            <a onClick={(e) => e.preventDefault()} className="text-lg">
                                                                {username}
                                                                <DownOutlined />
                                                            </a>
                                                        </Dropdown>
                                                    </Space>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Link href="/auth/login">
                                        <button
                                            className="transition ease-in-out hover:-translate-x-2 hover:scale-110 delay-150 px-5 py-2 
                                 text-pink-500 mr-4 border-solid border-pink-500 border-2 rounded-full shadow hover:bg-pink-500
                                  hover:text-white ..."
                                        >
                                            Login
                                        </button>
                                    </Link>
                                    <Link href="/auth/landingOpsi">
                                        <button
                                            className="transition ease-in-out hover:-translate-x-2 hover:scale-110 delay-150 px-5 py-2 text-pink-500 bg-white rounded-md shadow hover:bg-pink-500 hover:text-white ..."
                                        >
                                            Daftar
                                        </button>
                                    </Link>
                                </>

                            )}
                        </div>
                    </div>
                </div >
            </div>
            <style jsx>{`
                
                  /* Specific styles for active links */
                  .active {
                    color: white;
                    background: #ec4899;
                  }`}</style>
        </>
    )
};
