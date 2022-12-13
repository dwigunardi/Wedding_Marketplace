import DetailCustomer from "../../../components/customer/profile";
import FooterCustomer from "../../../components/footer";
import Navigasi from "../../../components/navigasi";
import { Col, Row, Space, Layout, Select, ConfigProvider } from "antd";

const { Header, Footer, Sider, Content } = Layout;



export default function ProfileCustomer() {

    return (
        <>
            <Layout style={{ backgroundColor: "white" }}>
                <Navigasi />
            </Layout>
            <Content className="h-3/4 mt-20 p-10">
                <DetailCustomer />
            </Content>
            <FooterCustomer />
        </>)
}