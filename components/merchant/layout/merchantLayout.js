import React from "react";
import { Layout, ConfigProvider, message } from "antd";
import 'antd/dist/antd.variable.css'
import 'tailwindcss/tailwind.css'
import NavbarMerchant from "./navbarMerchant";
import SiderMerchant from "./siderMerchant";
import { useEffect } from "react";
import Router, { useRouter } from "next/router";
import jwt_decode from "jwt-decode";
const { Footer, Header, Sider } = Layout
ConfigProvider.config({
    theme: {
        primaryColor: '#EC4899',
    },
});
export default function MerchantLayout({ children }) {
    const router = useRouter()
    useEffect(() => {
        const getToken = localStorage.getItem('token_merchant')
        if (!getToken || jwt_decode(getToken).role != 'Merchant') {
            message.error("Anda belom login dan tidak berhak mengakses")
            Router.back()
            return
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


