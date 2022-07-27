import React from "react";
import { Layout, ConfigProvider } from "antd";
import 'antd/dist/antd.variable.css'
import 'tailwindcss/tailwind.css'
import NavbarMerchant from "./navbarMerchant";
import SiderMerchant from "./siderMerchant";
const { Footer, Header, Sider } = Layout
ConfigProvider.config({
    theme: {
        primaryColor: '#EC4899',
    },
});
export default function MerchantLayout({ children }) {
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


