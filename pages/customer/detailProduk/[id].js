import { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import FooterCustomer from "../../../components/footer";
import Navigasi from "../../../components/navigasi";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Col, Row, Space, Layout } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useRouter, Router } from "next/router";
import Image from "next/image";
import cardImg1 from '../../../public/Image/card-product/aminta-hotel.webp'
import { Content } from "antd/lib/layout/layout";
import Link from "next/link";

export default function ProductIdCustomer() {

    const { Header, Footer, Sider, Content } = Layout;

    const [product, setProduct] = useState([])

    useEffect(() => {

        if (localStorage.getItem("token_customer") === null) {
            window.alert("anda Belom Login Untuk Melanjutkan Transaksi Anda harus Login")
        } else {
            const getToken = localStorage.getItem("token_customer")
            const decode = jwt_decode(getToken)
        }
        axios.get("https://project-wo.herokuapp.com/product").then(res => {
            setProduct(res.data.items)
        })
    }, []);


    const router = useRouter();
    const { id } = router.query;
    const dataSelected = product.find((data) => data.id == id)
    console.log(dataSelected)
    return (
        <>
            <Layout style={{ backgroundColor: "white" }}>
                <Navigasi />
            </Layout>
            <Content className="h-min-screen h-full mt-20 p-10">
                <Row justify="center">
                    <Col span="10" pull={2}>
                        <Image src={cardImg1} height={350} width={450} />
                        <p className="text-base text-center font-semibold mt-2 pr-20 mr-4">
                            All processes with optimal effort, Chikufarm is there to meet your
                            needs.
                        </p>
                    </Col>

                    <Col
                        style={{ textAlign: "start", marginLeft: 20 }}
                        span="10"
                        pull={2}
                    >
                        <h2 className="font-bold text-2xl text-black">bibit Ayam</h2>
                        <h2 className="font-semibold text-xl my-3 text-black">
                            Rp. 30.000
                        </h2>
                        <p>
                            Telur ayam negeri diproses dengan terjamin dimulai dari pakan,
                            nutrisi, kebersihan hingga pengiriman sampai customer
                        </p>
                        <div className="flex justify-center mt-8">
                            <div className="mt-20 mb-5 xl:w-20">
                                <label
                                    htmlFor="exampleNumber0"
                                    className="ml-4  text-black font-semibold"
                                ></label>
                                <input
                                    type="number"
                                    className="
                                        form-control
                                        block
                                        w-full
                                        px-2
                                        py-0.5
                                       
                                        text-base
                                        font-normal
                                        text-gray-700
                                        bg-white bg-clip-padding
                                        border border-solid border-black
                                     
                                        transition
                                        ease-in-out
                                        m-0
                                        ml-2
                                        focus:text-gray-700 focus:bg-white focus:border-[#C78342] focus:outline-[#C78342]
                                        "
                                    id="exampleNumber0"
                                    placeholder="0"
                                    style={{
                                        width: "100px",
                                    }}
                                />
                            </div>
                        </div>
                        <Link href="/cart">
                            <button
                                type="button"
                                style={{
                                    width: "480px",
                                }}
                                className=" space-x-2 justify-end inline-block px-6 bg-[#56B280] text-white font-medium text-xs leading-tight shadow-md focus:shadow-lg hover:text-white hover:bg-[#56B280] active:bg-[#56B280]"
                            >
                                {<ShoppingCartOutlined className="mr-2 mb-2 text-xl " />}
                                <Space className="text-sm mt-2">+ Add to cart</Space>
                            </button>
                        </Link>
                    </Col>
                </Row>

            </Content>

            <FooterCustomer />
        </>
    )
}