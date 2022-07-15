
import { Tabs } from 'antd';
import { Col, Row } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React from 'react';
const { TabPane } = Tabs;
const styleTab = {
    fontWeight: "bold",
    fontSize: "50pt",
    borderRight: "solid red 5px"
}
function ProductHome() {

    return (
        <>
            <div className="text-center mt-5 py-10">
                <h1 className=" text-pink-500 text-3xl ">
                    Full Paket Mulai dari 50jt an
                </h1>
                <p className="text-lg mt-3">Harga sudah termasuk biaya vendor (dekorasi, katering, etc.) dan dapat disesuaikan dengan kebutuhan</p>
            </div>
            <div className="max-h-screen bg-[#FFF2F5] pb-10">
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
                             text-xl mr-5"
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
                             text-xl mr-5
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
                                 text-xl mr-5"
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
                             text-xl mr-5"
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
                        <Content>
                            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 22 }} justify="center">
                                <Col span={4} className="mx-4 pt-5">


                                    <div className="rounded-lg shadow-lg bg-white ">
                                        <a href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">
                                            <img
                                                className="rounded-t-lg"
                                                src="https://mdbootstrap.com/img/new/standard/nature/182.jpg"
                                                alt=""
                                            />
                                        </a>
                                        <div className="p-6">
                                            <h5 className="text-gray-900 text-xl font-medium mb-2">Card title</h5>
                                            <p className="text-gray-700 text-base mb-4">
                                                Some quick example text to build on the card title and make up the bulk
                                                of the card's content.
                                            </p>
                                            <button
                                                type="button"
                                                className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                            >
                                                Button
                                            </button>
                                        </div>
                                    </div>

                                </Col>
                                <Col span={4} className="mx-4 pt-5">
                                    <div className="rounded-lg shadow-lg bg-white ">
                                        <a href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">
                                            <img
                                                className="rounded-t-lg"
                                                src="https://mdbootstrap.com/img/new/standard/nature/182.jpg"
                                                alt=""
                                            />
                                        </a>
                                        <div className="p-6">
                                            <h5 className="text-gray-900 text-xl font-medium mb-2">Card title</h5>
                                            <p className="text-gray-700 text-base mb-4">
                                                Some quick example text to build on the card title and make up the bulk
                                                of the card's content.
                                            </p>
                                            <button
                                                type="button"
                                                className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                            >
                                                Button
                                            </button>
                                        </div>
                                    </div>
                                </Col>
                                <Col span={4} className="mx-4 pt-5">
                                    <div className="rounded-lg shadow-lg bg-white ">
                                        <a href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">
                                            <img
                                                className="rounded-t-lg"
                                                src="https://mdbootstrap.com/img/new/standard/nature/182.jpg"
                                                alt=""
                                            />
                                        </a>
                                        <div className="p-6">
                                            <h5 className="text-gray-900 text-xl font-medium mb-2">Card title</h5>
                                            <p className="text-gray-700 text-base mb-4">
                                                Some quick example text to build on the card title and make up the bulk
                                                of the card's content.
                                            </p>
                                            <button
                                                type="button"
                                                className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                            >
                                                Button
                                            </button>
                                        </div>
                                    </div>
                                </Col>
                                <Col span={4} className="mx-4 pt-5">
                                    <div className="rounded-lg shadow-lg bg-white max-w-sm">
                                        <a href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">
                                            <img
                                                className="rounded-t-lg"
                                                src="https://mdbootstrap.com/img/new/standard/nature/182.jpg"
                                                alt=""
                                            />
                                        </a>
                                        <div className="p-6">
                                            <h5 className="text-gray-900 text-xl font-medium mb-2">Card title</h5>
                                            <p className="text-gray-700 text-base mb-4">
                                                Some quick example text to build on the card title and make up the bulk
                                                of the card's content.
                                            </p>
                                            <button
                                                type="button"
                                                className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                            >
                                                Button
                                            </button>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Content>


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