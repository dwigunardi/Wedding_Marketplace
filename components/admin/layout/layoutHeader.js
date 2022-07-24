import {
    UserOutlined,
    DownOutlined
} from '@ant-design/icons';
import { Col, Layout, Menu, Row, Space, Dropdown, Link } from 'antd';
import React, { useState } from 'react';
import 'antd/dist/antd.css'
import 'tailwindcss/tailwind.css'

const { Header } = Layout;

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
                            <Space className='text-center '>
                                <UserOutlined className='mb-5' />
                                <Dropdown overlay={menu} trigger={['click']}>
                                    <a onClick={(e) => e.preventDefault()}>
                                        Admin
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

export default NavbarAdmin;