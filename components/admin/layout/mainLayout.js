import React from "react";
import { Layout, ConfigProvider } from "antd";
import NavbarAdmin from "./layoutHeader";
import Sidebar from "./layoutSider";
import 'antd/dist/antd.variable.css'
import 'tailwindcss/tailwind.css'
import Link from "next/link";
const { Footer, Header, Sider } = Layout
ConfigProvider.config({
    theme: {
        primaryColor: '#EC4899',
    },
});
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
                            Sahin ©2022 Created by Dwi
                        </Footer>
                    </Layout>


                </Layout>
            </Layout >
        </ConfigProvider>
    );
}

export default MainLayout;
