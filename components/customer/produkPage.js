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
import { useState, useEffect } from "react";
import CarouselProductPage from "./carouselProductPage";
import CardProductPage from "./cardProductPage";
import axios from "axios";




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



export default function ContentProduct() {

    const [product, setProduct] = useState([])
    const [meta, setMeta] = useState({})
    const [links, setLinks] = useState({})
    // autocomplete state handle
    const [options, setOptions] = useState([]);

    useEffect(() => {
        axios.get("https://project-wo.herokuapp.com/product/").then(res => {
            console.log(res)
            setProduct(res.data.items)
            setMeta(res.data.meta)
            setLinks(res.data.links)
        })
        // return () => {
        //     cleanup
        // };
    }, []);


    ConfigProvider.config({
        theme: {
            primaryColor: "#EC4899"
        },
    });
    const onClick = ({ key }) => {
        message.info(`Anda Memilih ${key}`);
        axios.get(`https://project-wo.herokuapp.com/product/search/product?page=1&limit=20&search=&location=${key}&category=&merchant=`).then(res => {
            setProduct(res.data.items)
            setMeta(res.data.meta)
            setLinks(res.data.links)
            // console.log(res)
        })
    };
    const screens = useBreakpoint();
    const menu = (
        <Menu
            onClick={onClick}
            items={[
                {
                    label: 'All',
                    key: '',
                    icon: <PushpinOutlined />,
                },
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

    const handleSearch = (value) => {
        axios.get(`https://project-wo.herokuapp.com/product/search/product?page=1&limit=20&search=${value}&location=&category=&merchant=`).then(res => {
            setProduct(res.data.items)
            // console.log(res.data.items)
            setMeta(res.data.meta)
            setLinks(res.data.links)
        })
    };

    const onSelect = (value) => {
        console.log('onSelect', value);
    };

    const onChangePaginate = (e) => {
        console.log(e)
        axios.get(`https://project-wo.herokuapp.com/product?page=${e}&limit=20`).then(res => {
            setProduct(res.data.items)
            console.log(res)
        })
    }
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
                        <Row justify="space-evenly" >

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
                            <Col lg={{ span: 20 }}>
                                <AutoComplete
                                    dropdownMatchSelectWidth={252}

                                    // options={options}
                                    // onSelect={onSelect}
                                    onSearch={handleSearch}
                                >
                                    <Input.Search size="large" placeholder="Search Product" enterButton />
                                </AutoComplete>

                                {/* Card product  */}
                                <CardProductPage product={product} />
                                <Row justify="center" align="middle" style={{ height: "160px" }}>
                                    <Col span={6}>
                                        <Pagination defaultCurrent={1} total={meta.itemCount} onChange={onChangePaginate} />
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