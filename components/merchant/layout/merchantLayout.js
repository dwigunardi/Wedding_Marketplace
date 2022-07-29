import React from "react";
import { Layout, ConfigProvider } from "antd";
import 'antd/dist/antd.variable.css'
import 'tailwindcss/tailwind.css'
import NavbarMerchant from "./navbarMerchant";
import SiderMerchant from "./siderMerchant";
import { useEffect } from "react";
import { useRouter } from "next/router";
const { Footer, Header, Sider } = Layout
ConfigProvider.config({
    theme: {
        primaryColor: '#EC4899',
    },
});
export default function MerchantLayout({ children }) {
    const router = useRouter()
    useEffect(() => {
        const getToken = localStorage.getItem('token_customer')

        if (!getToken) {
            window.alert("Anda belom login dan tidak berhak mengakses")
            router.push("/auth/login")
        }


    }, []);
    return (

        <Layout

        >
            <SiderMerchant />
            <Layout>
                <NavbarMerchant />
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


