import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu } from 'antd';
import React, { useState } from 'react';
import 'antd/dist/antd.css'
import 'tailwindcss/tailwind.css'
import Image from 'next/image';
import logo from '../../public/Image/sahin-love.png'
const { Header, Sider, Content } = Layout;

const NavbarAdmin = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout hasSider>
            <Sider
                style={{
                    overflow: 'auto',
                    height: '100vh',

                }}
                trigger={null} collapsible collapsed={collapsed}>
                <Image src={logo} className="logo" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: 'nav 1',
                        },
                        {
                            key: '2',
                            icon: <VideoCameraOutlined />,
                            label: 'nav 2',
                        },
                        {
                            key: '3',
                            icon: <UploadOutlined />,
                            label: 'nav 3',
                        },
                    ]}
                />
            </Sider>
            <Layout className="bg-white">
                <Header
                    className="w-100 bg-white shadow"
                    style={{
                        padding: 0,
                    }}
                >
                    <div className=" my-3 justify-between px-4 mx-auto md:items-center md:flex md:px-8">
                        <div className="flex  justify-self-start md:block">
                            <Button onClick={() => setCollapsed(!collapsed)} className='ml-5 text-center'>

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
                            </Button>
                        </div>
                        <div className="flex justify-self-start md:block">


                            <Button className='px-4 py-2 text-center align-center border-2 border-solid border-pink-500'>
                                <i class="fa-solid fa-user"></i>
                            </Button>
                        </div>


                    </div>

                </Header>
                {/* tempat kontent */}
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    Content
                </Content>



            </Layout>
        </Layout >
    );
};

export default NavbarAdmin;