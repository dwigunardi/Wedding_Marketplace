import Image from "next/image";
import { DownOutlined, PushpinOutlined, ArrowUpOutlined } from '@ant-design/icons';
import {
    Col, Row, Layout, Card,
    Dropdown, Menu, message, Space, AutoComplete,
    Input, Grid, Pagination, BackTop, ConfigProvider
} from "antd";
import "tailwindcss/tailwind.css"
import "antd/dist/antd.variable.min.css"
import Navigasi from "../../components/navigasi";
import FooterCustomer from "../../components/footer";
import { useState } from "react";
import CarouselProductPage from "./carouselProductPage";
import CardProductPage from "./cardProductPage";




const { Header, Footer, Sider, Content } = Layout;
const { useBreakpoint } = Grid;

//autocomplete random
const getRandomInt = (max, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min;
const searchResult = (query) =>
    new Array(getRandomInt(5))
        .join('.')
        .split('.')
        .map((_, idx) => {
            const category = `${query}${idx}`;
            return {
                value: category,
                label: (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',

                        }}
                    >
                        <span>
                            {query} Product{' '}
                            <a
                                href={`https://s.taobao.com/search?q=${query}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {category}
                            </a>
                        </span>
                        <span>{getRandomInt(100)} results</span>
                    </div>
                ),
            };
        });
// menu onclick handle biar gak pusing
const onClick = ({ key }) => {
    message.info(`Click on item ${key}`);
};


export default function ContentProduct() {

    ConfigProvider.config({
        theme: {
            primaryColor: "#EC4899"
        },
    });
    const screens = useBreakpoint();
    const menu = (
        <Menu

            onClick={onClick}
            items={[
                {
                    label: 'Jakarta',
                    key: 'Jakarta',
                    icon: <PushpinOutlined />,
                },
                {
                    label: 'Bogor',
                    key: 'Bogor',
                    icon: <PushpinOutlined />,
                },
                {
                    label: 'Depok',
                    key: 'Depok',
                    icon: <PushpinOutlined />,
                },
                {
                    label: 'Tanggerang',
                    key: 'Tanggerang',
                    icon: <PushpinOutlined />,
                },
                {
                    label: 'Bekasi',
                    key: 'Bekasi',
                    icon: <PushpinOutlined />,
                },
            ]}
        />
    );


    // autocomplete state handle
    const [options, setOptions] = useState([]);

    const handleSearch = (value) => {
        setOptions(value ? searchResult(value) : []);
    };

    const onSelect = (value) => {
        console.log('onSelect', value);
    };


    return (
        <>
            <Layout style={{ backgroundColor: "white" }}>
                <Navigasi />
                <CarouselProductPage />
                <div className="text-center mt-5 py-10">
                    <h1 className=" text-pink-500 text-3xl ">
                        Full Paket Mulai dari 50jt an
                    </h1>
                    <p className="text-lg mt-3">Harga sudah termasuk biaya vendor (dekorasi, katering, etc.) dan dapat disesuaikan dengan kebutuhan</p>
                </div>
                <Layout style={{ backgroundColor: "white" }}>

                    <Sider className="ml-20 bg-white" style={{ backgroundColor: "white" }}>
                        <Row justify="center" >
                            {Object.entries(screens)
                                .filter((screen) => !!screen[1])
                                .map((screen) => (
                                    console.log(screen[0])
                                ))}
                            <Col>
                                <Card
                                    title="Filter"
                                    style={{
                                        width: 200,
                                    }}
                                    className="text-center text-lg"
                                >
                                    <ConfigProvider>
                                        <Dropdown overlay={menu} className="text-pink-500 hover:text-pink-700">
                                            <a onClick={(e) => e.preventDefault()}>
                                                <Space size="large">
                                                    Lokasi
                                                    <DownOutlined />
                                                </Space>
                                            </a>
                                        </Dropdown>
                                    </ConfigProvider>
                                </Card>
                            </Col>
                        </Row>

                    </Sider>

                    <Content className="ml-20 bg-white">
                        <Row>
                            <Col>
                                <AutoComplete
                                    dropdownMatchSelectWidth={252}

                                    options={options}
                                    onSelect={onSelect}
                                    onSearch={handleSearch}
                                >
                                    <Input.Search size="large" placeholder="Search Product" enterButton />
                                </AutoComplete>

                                {/* Card product  */}
                                <CardProductPage />
                                <Row justify="center" align="middle" style={{ height: "160px" }}>
                                    <Col span={12}>
                                        <Pagination defaultCurrent={6} total={500} />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                    </Content>
                </Layout>
                <Footer style={{ backgroundColor: "white" }}>

                </Footer>
            </Layout>

            <FooterCustomer />
            <BackTop style={{
                height: 40,
                width: 40,
                lineHeight: '30px',
                borderRadius: "20px",
                backgroundColor: '#EC4899',
                color: '#fff',
                textAlign: 'center',
                fontSize: "12pt",
                opacity: 0.7
            }}><div className="hover:translate-y-3 ease-in-out transition-all"><ArrowUpOutlined /></div></BackTop>
        </>

    )
}