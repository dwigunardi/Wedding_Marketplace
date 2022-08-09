import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Tabs } from 'antd';
import { Col, Row, Grid, Select } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import cardImg1 from '../../public/Image/card-product/aminta-hotel.webp'
import cardImg2 from '../../public/Image/card-product/asmara.jpg'
import cardImg3 from '../../public/Image/card-product/Daima Norwood Hotel Menteng.webp'
import cardImg4 from '../../public/Image/card-product/Fieris Hotel Rawamangun.webp'
import cardImg from '../../public/Image/card-product/Mang Kabayan Vida Bekasi.webp'
import Image from 'next/image'
import React from 'react';
import 'antd/dist/antd.css'
import "tailwindcss/tailwind.css"
const { useBreakpoint } = Grid;
const { TabPane } = Tabs;
const styleTab = {
    fontWeight: "bold",
    fontSize: "50pt",
    borderRight: "solid red 5px"
}
const { Option } = Select;
function ProductHome() {
    const screens = useBreakpoint();
    // const [buttonStyle, setButtonStyle] = useState({
    //     background: "red",
    //     value : 
    // })

    const [product, setProduct] = useState([])

    useEffect(() => {
        axios.get("https://project-wo.herokuapp.com/product").then(res => {

            setProduct(res.data.items)
        })
        // return () => {
        //     cleanup
        // };
    }, []);
    const onChange = (value) => {
        console.log(`selected ${value}`);
    };

    const onSearch = (value) => {
        console.log('search:', value);
    };
    return (
        <>
            <div className="text-center mt-5 py-10">
                <h1 className=" text-pink-500 text-3xl ">
                    Full Paket Mulai dari 50jt an
                </h1>
                <p className="text-lg mt-3">Harga sudah termasuk biaya vendor (dekorasi, katering, etc.) dan dapat disesuaikan dengan kebutuhan</p>
            </div>
            <div className="h-full bg-[#FFF2F5] pb-10">
                <ul
                    className="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 pt-5 mb-4 justify-center"
                    id="tabs-tab"
                    role="tablist"
                >
                    <li className="nav-item" role="presentation">
                        <a
                            href="#tabs-jakarta"
                            className="
                            
                            block
                            font-medium
                            leading-tight
                            uppercase
                            text-pink-500
                            border-x-0 border-t-0 border-b-2 border-pink-500 
                            px-6
                            py-3
                            my-2
                             hover:bg-pink-500 hover:text-white
                             text-xl "
                            id="tabs-jakarta-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#tabs-jakarta"
                            role="tab"
                            aria-controls="tabs-jakarta"
                            aria-selected="true"
                        >
                            Jakarta
                        </a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a
                            href="#tabs-bogor"
                            className="
                            text-pink-500
                            block
                            font-medium
                            
                            leading-tight
                            uppercase
                            border-x-0 border-t-0 border-b-2 border-transparent
                            px-6
                            py-3
                            my-2
                            hover:text-white
                             text-xl 
                            hover:bg-pink-500
                            "
                            id="tabs-bogor-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#tabs-bogor"
                            role="tab"
                            aria-controls="tabs-bogor"
                            aria-selected="false"
                        >
                            Bogor
                        </a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a
                            href="#tabs-depok"
                            className="
                                text-pink-500
                                block
                                font-medium
                                
                                leading-tight
                                uppercase
                                border-x-0 border-t-0 border-b-2 border-transparent
                                px-6
                                py-3
                                my-2
                                 hover:bg-pink-500
                                 hover:text-white
                                 text-xl "
                            id="tabs-depok-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#tabs-depok"
                            role="tab"
                            aria-controls="tabs-depok"
                            aria-selected="false"
                        >
                            Depok
                        </a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a
                            href="#tabs-tanggerang"
                            className="
                            text-pink-500
                            block
                            font-medium
                            
                            leading-tight
                            uppercase
                            border-x-0 border-t-0 border-b-2 border-transparent
                            px-6
                            py-3
                            my-2
                             hover:bg-pink-500
                             hover:text-white
                             text-xl "
                            id="tabs-tanggerang-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#tabs-tanggerang"
                            role="tab"
                            aria-controls="tabs-tanggerang"
                            aria-selected="false"
                        >
                            Tanggerang
                        </a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a
                            href="#tabs-bekasi"
                            className="
                            text-pink-500
                            block
                            font-medium
                            
                            leading-tight
                            uppercase
                            border-x-0 border-t-0 border-b-2 border-transparent
                            px-6
                            py-3
                            my-2
                             hover:bg-pink-500
                             hover:text-white
                             text-xl mr-5"
                            id="tabs-bekasi-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#tabs-bekasi"
                            role="tab"
                            aria-controls="tabs-bekasi"
                            aria-selected="false"
                        >
                            Bekasi
                        </a>
                    </li>
                </ul>
                <div className="tab-content" id="tabs-tabContent">
                    <div
                        className="tab-pane fade show active"
                        id="tabs-jakarta"
                        role="tabpanel"
                        aria-labelledby="tabs-jakarta-tab"
                    >


                        {/* card product */}

                        <Row justify="center space-x-5">
                            {product.map((data) => {
                                return (
                                    <>
                                        <Col lg={{ span: 5 }} md={{ span: 5 }} sm={{ span: 10 }} xs={{ span: 10 }} className="pt-5">

                                            <div className="rounded-lg shadow-lg bg-white ">
                                                <a href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">
                                                    <Image
                                                        className="rounded-t-lg"
                                                        loader={() => data.image}
                                                        priority={true}
                                                        unoptimized={true}
                                                        src={`https://project-wo.herokuapp.com/product/image/${data.image}`}
                                                        alt=""
                                                        width={150}
                                                        height={100}
                                                        layout='responsive'
                                                    />
                                                </a>
                                                <div className="p-6">
                                                    <h5 className="text-gray-900 text-xl font-medium mb-2">{data.name}</h5>
                                                    <p className="text-gray-700 text-base mb-4">


                                                        <Row justify='space-between'>
                                                            <Col>
                                                                <h1>Variant Name</h1>
                                                                {data.variant.map((v) => {
                                                                    return (
                                                                        <>
                                                                            <p>
                                                                                {v.name}
                                                                            </p>
                                                                        </>
                                                                    )
                                                                })}
                                                            </Col>
                                                            <Col>
                                                                <h1>Variant Price</h1>
                                                                {data.variant.map((v) => {
                                                                    return (
                                                                        <>
                                                                            <p>
                                                                                {v.price}
                                                                            </p>
                                                                        </>
                                                                    )
                                                                })}
                                                            </Col>
                                                        </Row>

                                                    </p>
                                                </div>
                                            </div>
                                        </Col>
                                    </>
                                )

                            })}
                        </Row>
                    </div>
                    <div
                        className="tab-pane fade"
                        id="tabs-bogor"
                        role="tabpanel"
                        aria-labelledby="tabs-bogor-tab"
                    >
                        Tab 2 content
                    </div>
                    <div
                        className="tab-pane fade"
                        id="tabs-depok"
                        role="tabpanel"
                        aria-labelledby="tabs-bogor-tab"
                    >
                        Tab 3 content
                    </div>
                    <div
                        className="tab-pane fade"
                        id="tabs-tanggerang"
                        role="tabpanel"
                        aria-labelledby="tabs-tanggerang-tab"
                    >
                        Tab 4 content
                    </div>
                    <div
                        className="tab-pane fade"
                        id="tabs-bekasi"
                        role="tabpanel"
                        aria-labelledby="tabs-bekasi-tab"
                    >
                        Tab 5 content
                    </div>
                </div>


            </div>

        </>
    )
}

export default ProductHome