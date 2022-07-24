import 'antd/dist/antd.css'
import 'tailwindcss/tailwind.css'
import { useRouter } from 'next/router'
import { Layout, Menu, } from 'antd';
import { useState } from 'react';
import {
    DesktopOutlined,
    TeamOutlined,
    StockOutlined,
    SwapOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../public/Image/sahin-love.png'

const { Sider } = Layout;


export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const items = [
        {
            label: <Link href="/admin/dashboard" ><a className='w-full text-lg text-pink-500' > Dashboard</a></Link>, key: "dashboard", icon: <DesktopOutlined />,

        },
        {
            label: <Link href="/admin/users" ><a className='w-full text-lg'>Users</a></Link>, key: "users", icon: <TeamOutlined />,

        },
        {
            label: <Link href="/admin/product"><a className='w-full text-lg '>Product</a></Link>, key: "product", icon: <StockOutlined />,

        },
        {
            label: <Link href="/admin/transaksi"><a className='w-full text-lg '>Transaksi</a></Link>, key: "transaksi", icon: <SwapOutlined />,

        },
    ];
    function getItem(label, key, icon, children) {
        return {
            key,
            icon,
            children,
            label,
        };
    }
    return (
        <>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}
                style={{
                    overflow: 'auto',
                    minHeight: '100vh',

                }}
                theme="light"
                className='drop-shadow-md '>
                <div className='mx-5 my-10'>
                    <Image src={logo} width={130} height={100} className="logo" priority={true} />
                </div>

                <Menu
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={items}

                />
            </Sider>

        </>
    )
}