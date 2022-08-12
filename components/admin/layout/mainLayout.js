import React from "react";
import { Layout, ConfigProvider, message } from "antd";
import NavbarAdmin from "./layoutHeader";
import Sidebar from "./layoutSider";
import 'antd/dist/antd.variable.css'
import 'tailwindcss/tailwind.css'
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
const { Footer, Header, Sider } = Layout

ConfigProvider.config({
    theme: {
        primaryColor: '#EC4899',
    },
});
function MainLayout({ children }) {
    const router = useRouter()
    useEffect(() => {
        const getToken = localStorage.getItem('token_admin')

        if (!getToken) {
            message.error("Anda belom login dan tidak berhak mengakses")
            router.push("/auth/login")
        }


    }, []);
    return (

        <Layout

        >
            <Sidebar />
            <Layout>
                <NavbarAdmin />
                <Layout>{children}

                    <Footer
                        className="text-center"
                        style={{
                            backgroundColor: "white",

                            width: "100%"
                        }}
                    >
                        Sahin ©2022 Created by Dwi
                    </Footer>
                </Layout>


            </Layout>
        </Layout >

    );
}

export default MainLayout;
