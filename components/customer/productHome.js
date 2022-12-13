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
import Link from 'next/link';
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
        axios.get("https://project-wo.herokuapp.com/product/search/product?page=1&limit=20&search=&location=Jakarta&category=&merchant=").then(res => {
            console.log(res)
            setProduct(res.data.items)
        })
        // return () => {
        //     cleanup
        // };
    }, []);
    const onChange = (value) => {
        console.log(`selected ${value}`);
        axios.get(`https://project-wo.herokuapp.com/product/search/product?page=1&limit=20&search=&location=${value}&category=&merchant=`).then(res => {
            console.log(res)
            setProduct(res.data.items)
        })
    };

    const onSearch = (value) => {
        console.log('search:', value);
    };
    const thouSep = ".";
    const decSep = ",";
    // format to money
    const toMoney = (num) => { return (Math.round(num * 100) / 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').replace(/[,.]/g, function (m) { return m === ',' ? thouSep : decSep; }) };
    ;
    // console.log(product.slice(1, 5))
    return (
        <>
            <div className="text-center mt-5 py-10">
                <h1 className=" text-pink-500 text-3xl ">
                    Full Paket Mulai dari 50jt an
                </h1>
                <p className="text-lg mt-3">Harga sudah termasuk biaya vendor (dekorasi, katering, etc.) dan dapat disesuaikan dengan kebutuhan</p>
            </div>
            <div className="h-full bg-[#FFF2F5] pb-10 mx-auto">
                <Tabs defaultActiveKey="Jakarta" onChange={onChange} className="text-2xl text-center" size='large' centered="true">
                    <TabPane tab="Jakarta" key="Jakarta">



                        {/* card product */}

                        <Row justify="center space-x-5">
                            {product.slice(0, 4).map((data) => {

                                return (
                                    <>
                                        <Col lg={{ span: 5 }} md={{ span: 5 }} sm={{ span: 10 }} xs={{ span: 10 }} className="pt-5">

                                            <div className="rounded-lg shadow-lg bg-white ">
                                                <Link href={`/customer/detailProduk/${data.id}`} data-mdb-ripple="true" data-mdb-ripple-color="light">
                                                    <a>
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

                                                </Link>
                                                <div className="p-6">
                                                    <h5 className="text-gray-900 text-xl font-medium mb-2">{data.name}</h5>
                                                    <p className="text-gray-700 text-base mb-4">


                                                        <Row justify='space-between'>
                                                            <Col>
                                                                <h1>Variant Name</h1>
                                                                {data.variant[0].name}
                                                                {/* {data.variant.map((v) => {
                                                                    return (
                                                                        <>
                                                                            <p>
                                                                                {v.name}
                                                                            </p>
                                                                        </>
                                                                    )
                                                                })} */}
                                                            </Col>
                                                            <Col>
                                                                <h1>Variant Price</h1>
                                                                Rp.{toMoney(data.variant[0].price)}
                                                                {/* {data.variant.map((v) => {
                                                                    return (
                                                                        <>
                                                                            <p>
                                                                                {v.price}
                                                                            </p>
                                                                        </>
                                                                    )
                                                                })} */}
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
                    </TabPane>
                    <TabPane tab="Bogor" key="Bogor">
                        <Row justify="center space-x-5">
                            {product.slice(0, 4).map((data) => {

                                return (
                                    <>
                                        <Col lg={{ span: 5 }} md={{ span: 5 }} sm={{ span: 10 }} xs={{ span: 10 }} className="pt-5">

                                            <div className="rounded-lg shadow-lg bg-white ">
                                                <Link href={`/customer/detailProduk/${data.id}`} data-mdb-ripple="true" data-mdb-ripple-color="light">
                                                    <a>
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

                                                </Link>
                                                <div className="p-6">
                                                    <h5 className="text-gray-900 text-xl font-medium mb-2">{data.name}</h5>
                                                    <p className="text-gray-700 text-base mb-4">


                                                        <Row justify='space-between'>
                                                            <Col>
                                                                <h1>Variant Name</h1>
                                                                {data.variant[0].name}
                                                                {/* {data.variant.map((v) => {
                                                                    return (
                                                                        <>
                                                                            <p>
                                                                                {v.name}
                                                                            </p>
                                                                        </>
                                                                    )
                                                                })} */}
                                                            </Col>
                                                            <Col>
                                                                <h1>Variant Price</h1>
                                                                Rp.{toMoney(data.variant[0].price)}
                                                                {/* {data.variant.map((v) => {
                                                                    return (
                                                                        <>
                                                                            <p>
                                                                                {v.price}
                                                                            </p>
                                                                        </>
                                                                    )
                                                                })} */}
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
                    </TabPane>
                    <TabPane tab="Depok" key="Depok">
                        <Row justify="center space-x-5">
                            {product.slice(0, 4).map((data) => {

                                return (
                                    <>
                                        <Col lg={{ span: 5 }} md={{ span: 5 }} sm={{ span: 10 }} xs={{ span: 10 }} className="pt-5">

                                            <div className="rounded-lg shadow-lg bg-white ">
                                                <Link href={`/customer/detailProduk/${data.id}`} data-mdb-ripple="true" data-mdb-ripple-color="light">
                                                    <a>
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

                                                </Link>
                                                <div className="p-6">
                                                    <h5 className="text-gray-900 text-xl font-medium mb-2">{data.name}</h5>
                                                    <p className="text-gray-700 text-base mb-4">


                                                        <Row justify='space-between'>
                                                            <Col>
                                                                <h1>Variant Name</h1>
                                                                {data.variant[0].name}
                                                                {/* {data.variant.map((v) => {
                                                                    return (
                                                                        <>
                                                                            <p>
                                                                                {v.name}
                                                                            </p>
                                                                        </>
                                                                    )
                                                                })} */}
                                                            </Col>
                                                            <Col>
                                                                <h1>Variant Price</h1>
                                                                Rp.{toMoney(data.variant[0].price)}
                                                                {/* {data.variant.map((v) => {
                                                                    return (
                                                                        <>
                                                                            <p>
                                                                                {v.price}
                                                                            </p>
                                                                        </>
                                                                    )
                                                                })} */}
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
                    </TabPane>
                    <TabPane tab="Tanggerang" key="Tanggerang">
                        <Row justify="center space-x-5">
                            {product.slice(0, 4).map((data) => {

                                return (
                                    <>
                                        <Col lg={{ span: 5 }} md={{ span: 5 }} sm={{ span: 10 }} xs={{ span: 10 }} className="pt-5">

                                            <div className="rounded-lg shadow-lg bg-white ">
                                                <Link href={`/customer/detailProduk/${data.id}`} data-mdb-ripple="true" data-mdb-ripple-color="light">
                                                    <a>
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

                                                </Link>
                                                <div className="p-6">
                                                    <h5 className="text-gray-900 text-xl font-medium mb-2">{data.name}</h5>
                                                    <p className="text-gray-700 text-base mb-4">


                                                        <Row justify='space-between'>
                                                            <Col>
                                                                <h1>Variant Name</h1>
                                                                {data.variant[0].name}
                                                                {/* {data.variant.map((v) => {
                                                                    return (
                                                                        <>
                                                                            <p>
                                                                                {v.name}
                                                                            </p>
                                                                        </>
                                                                    )
                                                                })} */}
                                                            </Col>
                                                            <Col>
                                                                <h1>Variant Price</h1>
                                                                Rp.{toMoney(data.variant[0].price)}
                                                                {/* {data.variant.map((v) => {
                                                                    return (
                                                                        <>
                                                                            <p>
                                                                                {v.price}
                                                                            </p>
                                                                        </>
                                                                    )
                                                                })} */}
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
                    </TabPane>
                    <TabPane tab="Bekasi" key="Bekasi">
                        <Row justify="center space-x-5">
                            {product.slice(0, 4).map((data) => {

                                return (
                                    <>
                                        <Col lg={{ span: 5 }} md={{ span: 5 }} sm={{ span: 10 }} xs={{ span: 10 }} className="pt-5" key={data.id}>

                                            <div className="rounded-lg shadow-lg bg-white ">
                                                <Link href={`/customer/detailProduk/${data.id}`} data-mdb-ripple="true" data-mdb-ripple-color="light">
                                                    <a>
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

                                                </Link>
                                                <div className="p-6">
                                                    <h5 className="text-gray-900 text-xl font-medium mb-2 text-ellipsis overflow-hidden ...">{data.name}</h5>
                                                    <p className="text-gray-700 text-base mb-4">


                                                        <Row justify='space-between'>
                                                            <Col>
                                                                <h1>Variant Name</h1>
                                                                {data.variant[0].name}
                                                                {/* {data.variant.map((v) => {
                                                                    return (
                                                                        <>
                                                                            <p>
                                                                                {v.name}
                                                                            </p>
                                                                        </>
                                                                    )
                                                                })} */}
                                                            </Col>
                                                            <Col>
                                                                <h1>Variant Price</h1>
                                                                Rp.{toMoney(data.variant[0].price)}
                                                                {/* {data.variant.map((v) => {
                                                                    return (
                                                                        <>
                                                                            <p>
                                                                                {v.price}
                                                                            </p>
                                                                        </>
                                                                    )
                                                                })} */}
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
                    </TabPane>

                </Tabs>


            </div>

        </>
    )
}

export default ProductHome