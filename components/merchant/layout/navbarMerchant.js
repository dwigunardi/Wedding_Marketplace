import {
    UserOutlined,
    DownOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import { Col, Layout, Menu, Row, Space, Dropdown, Button } from 'antd';
import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css'
import 'tailwindcss/tailwind.css'
import Router, { useRouter } from 'next/router';
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import Link from 'next/link';
const { Header } = Layout;




const NavbarMerchant = () => {

    const [username, setUsername] = useState('')
    const [isLogged, setLogged] = useState(false)
    const [role, setRole] = useState('')
    const router = useRouter();

    const bgStyle = {
        backgroundColor: "white",

    }

    async function validate() {
        try {
            const token = await localStorage.getItem('token_customer')
            const decode = await jwt_decode(token)
            const user = decode.username
            const roleId = decode.role
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
            if (roleId) {
                setRole(roleId)
            }

        } catch (error) {

        }
    }
    async function buttonLogout() {
        try {
            const remove = localStorage.clear()
            window.alert("Anda telah keluar")
            router.push("/auth/login")

        } catch (error) {

        }
    }


    const menu = (
        <Menu
            items={[
                {
                    label: <Link href={`/merchant/profile/${username}`}>
                        <a>Profile</a>
                    </Link>,
                    key: '1',
                    icon: <UserOutlined />,
                },
                {
                    label: <Button onClick={buttonLogout}>
                        Logout
                    </Button>,
                    key: '2',
                    icon: <LogoutOutlined />,
                },
                {
                    label: '3rd menu item',
                    key: '3',
                    icon: <UserOutlined />,
                },
            ]}
        />
    );
    useEffect(() => {

        validate()

    }, []);
    return (
        <>
            <Header
                className="w-full drop-shadow-md text-2xl"
                style={bgStyle}>
                <Row justify='space-between' align='middle' className='w-full'>
                    <Col><h1 className='text-pink-500'>Dashboard</h1></Col>
                    <Col>
                        <div className='text-center text-pink-500 space-x-2'>
                            <Space className='text-center '>
                                <UserOutlined className='mb-5' />
                                <Dropdown overlay={menu} trigger={['click']}>
                                    <a onClick={(e) => e.preventDefault()}>
                                        {username}
                                        <DownOutlined />
                                    </a>
                                </Dropdown>
                            </Space>
                        </div>
                    </Col>
                </Row>
            </Header>
        </>
    );
};

export default NavbarMerchant;