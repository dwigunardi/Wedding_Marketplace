
import Image from "next/image";
import { DownOutlined, PushpinOutlined } from '@ant-design/icons';
import {
    Button, Carousel, Col, Row, Layout, Card,
    Dropdown, Menu, message, Space, AutoComplete,
    Input, Grid, ConfigProvider, Pagination
} from "antd";
import "tailwindcss/tailwind.css"
import "antd/dist/antd.css"
import heroImg from "../public/Image/banner-wed-3.png"
import heroImg2 from "../public/Image/banner-wed-3-2.png"
import cardImg1 from '../public/Image/card-product/aminta-hotel.webp'
import cardImg2 from '../public/Image/card-product/asmara.jpg'
import cardImg3 from '../public/Image/card-product/Daima Norwood Hotel Menteng.webp'
import cardImg4 from '../public/Image/card-product/Fieris Hotel Rawamangun.webp'
import Navigasi from "../components/navigasi";
import { useState } from "react";
import 'antd/dist/antd.variable.css'
import FooterCustomer from "../components/footer";

ConfigProvider.config({
    theme: {
        primaryColor: '#EC4899',
    },
});

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


export default function ProductPage(props) {
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

    const contentStyle = {
        height: '100vh',

        lineHeight: '100px',
        textAlign: 'center',

    };

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
                <Carousel autoplay>
                    <div>
                        <div style={contentStyle}>
                            <Image src={heroImg} layout="fill" />
                            <Row justify="end" align="middle" style={contentStyle}>
                                <Col span={10} offset={3}>
                                    <p className="text-pink-500 text-5xl w-10/12">
                                        Pay Less For More Happines
                                    </p>

                                    <button
                                        type="button"
                                        className=" focus:outline-none text-white bg-pink-500
                                         hover:bg-pink-600 focus:ring-4 focus:ring-pink-300 font-medium text-lg 
                                         hover:translate-x-2  hover:scale-110 delay-150 transition ease-in-out
                                         rounded-lg  px-10 py-4 mr-20 mb-2 dark:focus:ring-pink-900"
                                    >
                                        All in one Package
                                    </button>


                                </Col>
                            </Row>
                        </div>
                    </div>
                </Carousel>
                <div className="text-center mt-5 py-10">
                    <h1 className=" text-pink-500 text-3xl ">
                        Full Paket Mulai dari 50jt an
                    </h1>
                    <p className="text-lg mt-3">Harga sudah termasuk biaya vendor (dekorasi, katering, etc.) dan dapat disesuaikan dengan kebutuhan</p>
                </div>
                <Layout style={{ backgroundColor: "white" }}>
                    <Sider className="ml-20 bg-white" style={{ backgroundColor: "white" }}>
                        <Row justify="center" >
                            <Col>
                                <Card
                                    title="Filter"
                                    style={{
                                        width: 200,
                                    }}
                                    className="text-center text-lg"
                                >
                                    <Dropdown overlay={menu}>
                                        <a onClick={(e) => e.preventDefault()}>
                                            <Space size="large">
                                                Lokasi
                                                <DownOutlined />
                                            </Space>
                                        </a>
                                    </Dropdown>
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
                                <Row justify="start space-x-5">
                                    {Object.entries(screens)
                                        .filter((screen) => !!screen[1])
                                        .map((screen) => (
                                            console.log(screen[0])
                                        ))}
                                    <Col lg={{ span: 5 }} md={{ span: 5 }} sm={{ span: 10 }} xs={{ span: 10 }} className="pt-5">


                                        <div className="rounded-lg shadow-lg bg-white ">
                                            <a href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">
                                                <Image
                                                    className="rounded-t-lg"
                                                    src={cardImg1}
                                                    alt=""
                                                />
                                            </a>
                                            <div className="p-6">
                                                <h5 className="text-gray-900 text-xl font-medium mb-2">Aminta Hall</h5>
                                                <p className="text-gray-700 text-base mb-4">
                                                    Rp. 70,600,000
                                                </p>

                                            </div>
                                        </div>

                                    </Col>
                                    <Col lg={{ span: 5 }} md={{ span: 5 }} sm={{ span: 10 }} xs={{ span: 10 }} className=" pt-5">
                                        <div className="rounded-lg shadow-lg bg-white ">
                                            <a href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">
                                                <Image
                                                    className="rounded-t-lg"
                                                    src={cardImg2}
                                                    alt=""
                                                />
                                            </a>
                                            <div className="p-6">
                                                <h5 className="text-gray-900 text-xl font-medium mb-2">Daima Norwood Hotel</h5>
                                                <p className="text-gray-700 text-base mb-4">
                                                    Rp. 63,600,000
                                                </p>

                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={{ span: 5 }} md={{ span: 5 }} sm={{ span: 10 }} xs={{ span: 10 }} className="pt-5">


                                        <div className="rounded-lg shadow-lg bg-white ">
                                            <a href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">
                                                <Image
                                                    className="rounded-t-lg"
                                                    src={cardImg3}
                                                    alt=""
                                                />
                                            </a>
                                            <div className="p-6">
                                                <h5 className="text-gray-900 text-xl font-medium mb-2">Mang kabayan vida Bekasi</h5>
                                                <p className="text-gray-700 text-base mb-4">
                                                    Rp. 50,000,000
                                                </p>

                                            </div>
                                        </div>

                                    </Col>
                                    <Col lg={{ span: 5 }} md={{ span: 5 }} sm={{ span: 10 }} xs={{ span: 10 }} className="pt-5">


                                        <div className="rounded-lg shadow-lg bg-white ">
                                            <a href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">
                                                <Image
                                                    className="rounded-t-lg"
                                                    src={cardImg4}
                                                    alt=""
                                                />
                                            </a>
                                            <div className="p-6">
                                                <h5 className="text-gray-900 text-xl font-medium mb-2">Fieris Hotel Rawamangun</h5>
                                                <p className="text-gray-700 text-base mb-4">
                                                    Rp. 66,600,000
                                                </p>

                                            </div>
                                        </div>

                                    </Col>
                                </Row>
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
        </>
    )
}