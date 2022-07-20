
import Image from "next/image";
import { DownOutlined, UserOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Carousel, Col, Row, Layout, Card, Dropdown, Menu, message, Space, AutoComplete, Input } from "antd";
import "tailwindcss/tailwind.css"
import "antd/dist/antd.css"
import heroImg from "../../public/Image/banner-wed-3.png"
import heroImg2 from "../../public/Image/banner-wed-3-2.png"
import Navigasi from "../../components/navigasi";
import { useState } from "react";
const { Header, Footer, Sider, Content } = Layout;

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
export default function ProductPage() {
    const menu = (
        <Menu
            onClick={onClick}
            items={[
                {
                    label: 'Jakarta',
                    key: 'Jakarta',
                    icon: <UserOutlined />,
                },
                {
                    label: 'Bogor',
                    key: 'Bogor',
                    icon: <UserOutlined />,
                },
                {
                    label: 'Depok',
                    key: 'Depok',
                    icon: <UserOutlined />,
                },
                {
                    label: 'Tanggerang',
                    key: 'Tanggerang',
                    icon: <UserOutlined />,
                },
                {
                    label: 'Bekasi',
                    key: 'Bekasi',
                    icon: <UserOutlined />,
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
            <Layout>
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
                <Layout>
                    <Sider className="ml-20">
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
                    <Content className="ml-20">
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
                            </Col>
                        </Row>

                    </Content>
                </Layout>
                <Footer>Footer</Footer>
            </Layout>
        </>
    )
}