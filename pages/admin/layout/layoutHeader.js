import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    SettingOutlined,
    DownOutlined
} from '@ant-design/icons';
import { Button, Col, Layout, Menu, Row, Space, Dropdown, Link } from 'antd';
import React, { useState } from 'react';
import 'antd/dist/antd.css'
import 'tailwindcss/tailwind.css'
import Image from 'next/image';
import logo from '../../../public/Image/sahin-love.png'
const { Header, Sider, Content } = Layout;

const menu = (
    <Menu
        items={[
            {
                label: '1st menu item',
                key: '1',
                icon: <UserOutlined />,
            },
            {
                label: '2nd menu item',
                key: '2',
                icon: <UserOutlined />,
            },
            {
                label: '3rd menu item',
                key: '3',
                icon: <UserOutlined />,
            },
        ]}
    />
);


const NavbarAdmin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const bgStyle = {
        backgroundColor: "white",

    }

    return (
        <>
            <Header
                className="w-full drop-shadow-md text-2xl"
                style={bgStyle}>
                <Row justify='space-between' align='middle' className='w-full'>
                    <Col><h1 className='text-pink-500'>Dashboard</h1></Col>
                    <Col>
                        <div className='text-center text-pink-500 space-x-2'>
                            <UserOutlined className='mb-5' />
                            <Dropdown overlay={menu} trigger={['click']}>
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space className='text-center '>
                                        Admin
                                        <DownOutlined />
                                    </Space>
                                </a>
                            </Dropdown>

                        </div>
                    </Col>
                </Row>
            </Header>
        </>
    );
};

export default NavbarAdmin;