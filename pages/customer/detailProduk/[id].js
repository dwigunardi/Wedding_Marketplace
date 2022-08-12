import { useEffect, useState, useRef } from "react";
import "tailwindcss/tailwind.css";
import 'antd/dist/antd.variable.css'
import FooterCustomer from "../../../components/footer";
import Navigasi from "../../../components/navigasi";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Col, Row, Space, Layout, Select, ConfigProvider, Collapse, message } from "antd";
import { ShoppingCartOutlined, BookOutlined } from "@ant-design/icons";
import { useRouter, Router } from "next/router";
import Image from "next/image";
import cardImg1 from '../../../public/Image/card-product/aminta-hotel.webp'
import { Content } from "antd/lib/layout/layout";
import Link from "next/link";



ConfigProvider.config({
    theme: {
        primaryColor: '#EC4899',
    },
});
const { Panel } = Collapse;
const { Option } = Select;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
export default function ProductIdCustomer() {


    const { Header, Footer, Sider, Content } = Layout;

    const [product, setProduct] = useState([])
    const [variant, setVariant] = useState([])
    const [userId, setUserId] = useState('')
    const [harga, setHarga] = useState(false)
    const router = useRouter();
    const { id } = router.query;
    useEffect(() => {

        if (localStorage.getItem("token_customer") === null) {
            message.error("anda Belom Login Untuk Melanjutkan Transaksi Anda harus Login")
        } else {
            const getToken = localStorage.getItem("token_customer")
            const decode = jwt_decode(getToken)
            setUserId(decode.user_id)
        }
        axios.get("https://project-wo.herokuapp.com/product").then(res => {
            setProduct(res.data.items)
            // console.log(res.data)
            // for (let i = 0; i < res.data.items.length; i++) {
            //     setVariant([res.data.items[i].variant])
            //     // console.log(res.data.items[i].variant)
            // }
            // setVariant(res.data.items.variant)
        })


    }, []);


    const dataSelected = product.find((data) => data.id == id);
    const selectedVariant = dataSelected?.variant[0]
    const handleChange = (value) => {
        // console.log(`selected ${value}`);
        const selectedVariant = dataSelected?.variant?.find(d => d.id == value)
        setHarga(true)
        setVariant(selectedVariant);

    };

    const onChange = (key) => {
        console.log(key);
    };
    // const variantSelected = variant.find((data) => data.variant)
    // console.log(dataSelected)

    const thouSep = ".";
    const decSep = ",";
    // format to money
    const toMoney = (num) => { return (Math.round(num * 100) / 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').replace(/[,.]/g, function (m) { return m === ',' ? thouSep : decSep; }) };
    return (
        <>
            <Layout style={{ backgroundColor: "white" }}>
                <Navigasi />
            </Layout>
            <Content className="h-3/4 mt-20 p-10">
                <Row justify="space-evenly">
                    <Col span="8" >
                        <Image loader={() => dataSelected?.image}
                            src={`https://project-wo.herokuapp.com/product/image/${dataSelected?.image}`}
                            priority={true}
                            unoptimized={true}
                            width={450}
                            height={350} />
                        <p className="text-base font-semibold mt-2 text-justify">
                            {dataSelected?.description}
                        </p>
                    </Col>

                    <Col
                        style={{ textAlign: "justify" }}
                        span="5" offset={2}
                    >
                        <h2 className="font-bold text-2xl text-black">{dataSelected?.name}</h2>
                        <h2 className="font-semibold text-xl my-3 text-black">
                            {/* {product.map((data) => {
                                return data.variant.find((data) => {
                                    data.id == variant
                                    console.log(variant)
                                })
                            })} */}
                        </h2>
                        {harga ? (<>

                            <h1 className="text-pink-500 text-2xl "> RP. {toMoney(variant?.price)}</h1>
                        </>) : (<>
                            <h1 className="text-pink-500 text-2xl ">Rp. {toMoney(dataSelected?.variant[0].price)}</h1>

                        </>)
                        }
                        <div className="my-5">
                            <Select
                                placeholder="---Pilih variant"
                                style={{
                                    width: 150,
                                }}
                                onChange={handleChange}
                            >
                                {dataSelected?.variant.map((data) => {
                                    return (
                                        <>
                                            <Option value={data.id} key={data.id}>{data.name}</Option>
                                        </>
                                    )
                                })}
                            </Select>
                        </div>
                        <div className="my-5">


                            <Link href="/cart">
                                <button
                                    type="button"

                                    className=" space-x-2 justify-end inline-block px-6 bg-pink-500 text-white font-medium text-xs leading-tight shadow-md 
                                focus:shadow-lg hover:bg-white active:bg-pink-700 hover:text-pink-500 hover:border-pink-500
                                transition-all ease-in-out"
                                >
                                    <BookOutlined className="mr-2 mb-2 text-xl" />
                                    <Space className="text-sm mt-2">Book Now</Space>
                                </button>
                            </Link>

                        </div>
                    </Col>
                    <Col span="8">
                        <Collapse defaultActiveKey={['1']} onChange={onChange}>
                            <Panel header="Wedding Planner & MC" key="1">
                                <ol style={{ listStyleType: "circle", }} className="ml-5">
                                    <li>Unlimited consultation before wedding day </li>
                                    <li>1x Technical Meeting with All Vendors</li>
                                    <li>Arranging Wedding Checklist & Rundown Details</li>
                                    <li>Included d-day crew (1 Coordinator & 5 Crews)</li>
                                    <li>MC for Akad / Holy Matrimony & Reception</li>
                                </ol>
                            </Panel>
                            <Panel header="This is panel header 2" key="2">
                                <p>{text}</p>
                            </Panel>
                            <Panel header="This is panel header 3" key="3">
                                <p>{text}</p>
                            </Panel>
                        </Collapse>
                    </Col>
                </Row>

            </Content>

            <FooterCustomer />
        </>
    )
}