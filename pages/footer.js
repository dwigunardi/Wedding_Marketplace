import Image from "next/image";
import logo from "../public/Image/sahin-love2.png";
import { Layout, Col, Row } from "antd";
import React from "react";
import Link from "next/link";
const { Header, Footer, Sider, Content } = Layout

function FooterCustomer() {
    return (
        <>
            <Layout>
                <footer className="bg-pink-500 py-5">
                    <Row justify="center">
                        <Col span={19} >
                            <div className="  border-white">
                                <hr className=""></hr>
                            </div>
                        </Col>
                    </Row>

                    <Row justify="space-evenly">
                        <Col lg={{ span: 5 }} md={{ span: 5 }} sm={{ span: 10 }} xs={{ span: 10 }} >
                            <Image src={logo} objectFit="contain" layout="responsive" />
                            <p className="text-white text-center">
                                One stop wedding solution
                            </p>
                        </Col>


                        <Col lg={{ span: 3 }} className="py-7">
                            <Link href="/product">
                                <a className="text-white">Discovery</a>
                            </Link>
                            <p className="mt-4 mb-4">
                                <a href="#!" className="text-white">
                                    Product
                                </a>
                            </p>
                        </Col>
                        <Col lg={{ span: 3 }} className="py-7">
                            <Link href="/product">
                                <a className="text-white">About</a>
                            </Link>
                            <p className="mt-4 mb-4">
                                <a href="#!" className="text-white">
                                    Help
                                </a>
                            </p>
                            <p className="mb-4">
                                <a href="#!" className="text-white">
                                    Agen
                                </a>
                            </p>
                        </Col>
                        <Col lg={{ span: 3 }} className="py-7">
                            <Link href="/product">
                                <a className="text-white">Info</a>
                            </Link>
                            <p className="mt-4 mb-4">
                                <a href="#!" className="text-white">
                                    Contact Us
                                </a>
                            </p>
                            <p className="mb-4">
                                <a href="#!" className="text-white">
                                    Privacy Policies
                                </a>
                            </p>
                            <p className="mb-4">
                                <a href="#!" className="text-white">
                                    Term and Condition
                                </a>
                            </p>
                        </Col>
                    </Row>
                </footer>
            </Layout>
        </>
    );
}

export default FooterCustomer;