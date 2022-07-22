import React from "react";
import { Layout, ConfigProvider } from "antd";
import NavbarAdmin from "./layoutHeader";
import Sidebar from "./layoutSider";
import 'antd/dist/antd.variable.css'
import 'tailwindcss/tailwind.css'
import { useEffect, useLayoutEffect } from "react";
import Link from "next/link";
const { Footer } = Layout
ConfigProvider.config({
    theme: {
        primaryColor: '#EC4899',
    },
});
if (typeof document === 'undefined') {
    React.useLayoutEffect = React.useEffect;
}
function MainLayout({ children }) {
    return (
        <ConfigProvider>
            <Layout
                hasSider
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
                            Ant Design ©2018 Created by Ant UED
                        </Footer>
                    </Layout>


                </Layout>
            </Layout >
        </ConfigProvider>
    );
}

export default MainLayout;
