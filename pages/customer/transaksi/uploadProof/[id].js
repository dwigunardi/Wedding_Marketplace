import FooterCustomer from "../../../../components/footer";
import Navigasi from "../../../../components/navigasi";
import { Space, Table, Tag, Button, Layout, Row, Col, Tooltip, Input, Modal, Form, Select, Upload, message, ConfigProvider, Card } from "antd";
import { EditOutlined, EyeOutlined, DeleteOutlined, PlusOutlined, UploadOutlined, MinusCircleOutlined, StopOutlined, InfoOutlined, CheckOutlined } from '@ant-design/icons';
import { Content } from "antd/lib/layout/layout";
import React, { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Countdown from "react-countdown";

ConfigProvider.config({
    theme: {
        primaryColor: '#EC4899',
    },
});
const { Option } = Select;

export default function Transaksi() {
    const [user, setUser] = useState('')
    const [transaksi, setTransaksi] = useState([])
    const [dataTransaksi, setDataTransaksi] = useState({})
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 5,
    });
    const [approve, setApprove] = useState('')
    const [foto, setFoto] = useState('')
    const [hitungMundur, setHitungMundur] = useState(true)
    const [expDate, setExpDate] = useState('')
    const router = useRouter()
    // const { id } = router.query;
    // console.log(id)

    async function getData(params = {}) {
        try {
            const id = localStorage.getItem("id_transaksi")
            const getToken = await localStorage.getItem("token_customer")
            const decode = await jwt_decode(getToken)
            setUser(decode)
            await axios.get(`https://project-wo.herokuapp.com/transaction/detail/${id}`, {
                headers: {
                    'Authorization': `Bearer ${getToken}`
                }
            }).then(res => {
                console.log(res)
                if (res.status == 200 || res.status == 201) {
                    setTransaksi([res.data.data])
                    setDataTransaksi(res.data.data)
                    setApprove(res.data.data.status)
                    setExpDate((new Date(res.data.data.expDate).getTime()) - (new Date().getTime()))
                }
            })
            setPagination({
                ...params.pagination,
                // total: product.length
            });
        } catch (error) {
            message.error(error.message)
        }
    }
    useEffect(() => {
        getData()

    }, [setExpDate]);


    async function SubmitProof() {
        try {
            const id = localStorage.getItem("id_transaksi")

            // if (approve == "Menunggu Pembayaran") {
            //     setApprove("Menunggu Persetujuan")
            // } else if (approve == "Menunggu Persetujuan") {
            //     setApprove("Approved")
            //     message.info("Status Pembayaran anda sedang di Pantau")
            // } else if (approve == "Approved") {
            //     setApprove("Selesai")
            //     message.success("Status Pembayaran anda telah Selesai Mohon Cetak Invoice")
            // } else if (approve == "Selesai") {
            //     message.success("Status Pembayaran anda telah Selesai Mohon Cetak Invoice")
            //     Router.back()
            // }
            const data = {
                // user_id: dataTransaksi.user.id,
                // product_id: dataTransaksi.product.id,
                // variant_id: dataTransaksi.variant.id,
                // // total_price: dataTransaksi.total_price,
                // start_date: dataTransaksi.startDate,
                // end_date: dataTransaksi.endDate,
                // address: dataTransaksi.address,
                status: "Menunggu Approvement",
            }
            await axios.put(`https://project-wo.herokuapp.com/transaction/edit/${id}`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token_customer")}`
                }
            }).then(res => {
                if (res.status == 200 || res.status == 201) {
                    // console.log(res)
                    message.success("Berhasil Submit dan tunggu approve dari Admin")
                    setApprove("Menunggu Approvement")
                    setHitungMundur(false)
                    getData()

                }
                if (approve == "Menunggu Approvement") {
                    setTimeout(() => {
                        message.info("Anda Sudah MengUpload Bukti Pembayaran Harap Menunggu Keputusan Admin")
                        Router.back()
                    }, 3000);
                }
            })


        } catch (error) {
            if (error) {
                message.info(error.message)
            }
        }
    }
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    const onChangeFoto = async (e) => {
        try {
            const id = localStorage.getItem("id_transaksi")
            const value = await e.file.originFileObj
            const dataForm = new FormData
            dataForm.append("transaction_proof", value)
            setFoto(value)
            await axios.put(`https://project-wo.herokuapp.com/transaction/edit/image/${id}`, dataForm, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Bearer ${localStorage.getItem("token_customer")}`
                }
            }).then(res => {
                if (res.status == 200 || res.status == 201) {
                    message.success("Berhasil Upload Bukti Pembayaran")
                }
            })
        } catch (error) {

        }


    }
    const thouSep = ".";
    const decSep = ",";
    // format to money
    const toMoney = (num) => { return (Math.round(num * 100) / 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').replace(/[,.]/g, function (m) { return m === ',' ? thouSep : decSep; }) };
    ;

    const status = function () {
        if (approve == "Menunggu Pembayaran") {
            return (<>
                <Button className="w-full" shape="round" style={{ backgroundColor: "#FDD74F" }} loading>Menunggu Pembayaran</Button>
            </>)
        } else if (approve == "Expired") {
            return (<>
                <Button className="w-full" shape="round" type="danger" icon={<StopOutlined />}>Expired</Button>
            </>)
        } else if (approve == "Menunggu Approvement") {
            return (<>
                <Button className="w-full" shape="round" style={{ backgroundColor: "#4C6FFF", color: "white" }} icon={<InfoOutlined />}>Menunggu Approvement</Button>
            </>)
        } else if (approve == "Approved") {
            return (<>
                <Button className="w-full" shape="round" style={{ backgroundColor: "#71DD37", color: "white" }} icon={<CheckOutlined />}>Approved</Button>
            </>)
        } else if (approve == "Selesai") {
            return (<>
                <Button className="w-full text-white" type="primary" shape="round" icon={<CheckOutlined />}>Selesai</Button>
            </>)
        }
    }


    const countdown = async function () {
        try {
            const id = localStorage.getItem("id_transaksi")
            const data = {
                status: "Expired",
            }
            await axios.put(`https://project-wo.herokuapp.com/transaction/edit/${id}`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token_customer")}`
                }
            }).then(res => {
                if (res.status == 200 || res.status == 201) {
                    // console.log(res)
                    setApprove("Expired")
                    message.info("Anda sudah mencapai batas akhir pembayaran")
                    router.back()
                }
            })
        } catch (error) {
            if (error) {
                console.log(error)
            }
        }
    }
    return (
        <>
            <Layout style={{ backgroundColor: "white" }}>
                <Navigasi />
            </Layout>
            <Content>
                {/* {Pages()} */}


                <Row justify="space-evenly">
                    <Col span={12} className="mt-32">

                        <div className=" sm:-mx-6 lg:-mx-8">
                            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">

                                <table className="w-3/4 ml-24">
                                    <tbody>
                                        <tr className="bg-white border-b">
                                            <td className="text-sm text-gray-900 font-light  whitespace-nowrap">
                                                No Telpon
                                            </td>
                                            <td className="text-sm text-gray-900 font-light  py-4 whitespace-nowrap">
                                                {transaksi.map((data) => {
                                                    return (
                                                        data.user.no_telp
                                                    )
                                                })}
                                            </td>

                                        </tr>
                                        <tr className="bg-white border-b">
                                            <td className="text-sm text-gray-900 font-light py-4 whitespace-nowrap">
                                                Total Price
                                            </td>
                                            {transaksi.map((data) => {
                                                return (
                                                    <td className="text-sm text-gray-900 font-light  py-4 whitespace-nowrap">

                                                        Rp. {toMoney(data.variant.price)}

                                                    </td>
                                                )
                                            })}
                                        </tr>
                                        <tr className="bg-white border-b">
                                            <td className="text-sm text-gray-900 font-light  py-4 whitespace-nowrap">
                                                Method
                                            </td>
                                            <td className="text-sm text-gray-900 font-light  py-4 whitespace-nowrap">
                                                Standard Upload Transaction Proof
                                            </td>

                                        </tr>
                                        <tr className="bg-white border-b">
                                            <td className="text-sm text-gray-900 font-light  py-4 whitespace-nowrap">
                                                Start Date
                                            </td>
                                            {transaksi.map((data) => {
                                                return (
                                                    <>
                                                        <td className="text-sm text-gray-900 font-light  py-4 whitespace-nowrap">
                                                            {data.startDate}
                                                        </td>
                                                    </>
                                                )
                                            })}
                                        </tr>
                                        <tr className="bg-white border-b">
                                            <td className="text-sm text-gray-900 font-light  py-4 whitespace-nowrap">
                                                End Date
                                            </td>
                                            {transaksi.map((data) => {
                                                return (
                                                    <>
                                                        <td className="text-sm text-gray-900 font-light  py-4 whitespace-nowrap">
                                                            {data.endDate}
                                                        </td>
                                                    </>
                                                )
                                            })}
                                        </tr>
                                        <tr className="bg-white border-b">
                                            <td className="text-sm text-gray-900 font-light  py-4 whitespace-nowrap">
                                                Address
                                            </td>
                                            {transaksi.map((data) => {
                                                return (
                                                    <td className="text-sm text-gray-900 font-light  py-4 whitespace-nowrap">
                                                        {data.address}
                                                    </td>
                                                )
                                            })}


                                        </tr>
                                    </tbody>
                                </table>

                            </div>
                            <div className="ml-32 mt-5 mb-3">
                                <h1>Paymnet Method</h1>
                            </div>

                            <Col span={22} className="ml-32">
                                <Card
                                    style={{
                                        width: 480,
                                        height: 58,
                                        backgroundColor: "#EC4899",
                                    }}
                                >
                                    <Row>
                                        <Col className="text-2xl -mt-3">

                                        </Col>
                                        <Col>
                                            <p className="text-md -mt-2  font-bold text-white">Transfer</p>
                                        </Col>
                                    </Row>
                                </Card>
                                <Card
                                    style={{
                                        width: 480,
                                        height: "auto",
                                    }}
                                >
                                    <Form
                                        name="basic"
                                        initialValues={{
                                            remember: true,
                                        }}
                                        // onFinish={onFinish}
                                        // onFinishFailed={onFinishFailed}
                                        autoComplete="off"
                                    >
                                        <Form.Item
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                            ]}
                                        >
                                            <Select
                                                placeholder="---Pilih No Rekening"

                                                onChange={handleChange}
                                            >
                                                <Option value="Bca : xxxx-xxxx-xxxx-xxxx">Bca : xxxx-xxxx-xxxx-xxxx</Option>
                                                <Option value="Mandiri : xxxx-xxxx-xxxx-xxxx">Mandiri : xxxx-xxxx-xxxx-xxxx</Option>
                                                <Option value="BNI : xxxx-xxxx-xxxx-xxxx">BNI : xxxx-xxxx-xxxx-xxxx</Option>
                                                <Option value="BRI : xxxx-xxxx-xxxx-xxxx">BRI : xxxx-xxxx-xxxx-xxxx</Option>
                                            </Select>
                                        </Form.Item>

                                        <Form.Item
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                            ]}
                                        >
                                            <Upload multiple={false} onChange={onChangeFoto} listType="picture">
                                                <Button type="primary" icon={<UploadOutlined />} style={{ width: "430px" }}>Upload Bukti Transaksi</Button>
                                            </Upload>
                                        </Form.Item>
                                    </Form>
                                </Card>
                            </Col>

                            <Row justify="space-evenly" className="ml-14 mt-20">
                                <Col span={8}>
                                    <Link href={`/customer/landing/${user.user_id}`}>
                                        <a
                                            className="inline-block  text-pink-500 underline font-small text-sm leading-tight transition duration-150 ease-in-out"
                                        >
                                            Back to Home

                                        </a>
                                    </Link>
                                </Col>
                                <Col span={8}>
                                    <Button
                                        type="primary"
                                        onClick={() => SubmitProof()}
                                        className="inline-block px-8 py-2 bg-pink-500 text-white text-md leading-tight shadow-md hover:bg-pink-700 hover:shadow-lg focus:bg-emerald-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-emerald-800 active:shadow-lg transition duration-150 ease-in-out"
                                    >
                                        Submit Proof
                                    </Button>
                                    <Button onClick={() => <Invoice></Invoice>}>

                                    </Button>
                                </Col>
                            </Row>

                        </div>
                    </Col>
                    <Col span={12}>
                        <Card style={{ backgroundColor: "#F2F2F2", height: "100%" }}>
                            <Row className="mt-20 mx-5">


                            </Row>
                            <Row justify="space-evenly" align="middle" >

                                <Col span={20}>

                                    <Card
                                    >
                                        <h1 className="text-pink-500 text-start  mt-5">Transfer ke salah satu No. Rekening di Bawah :</h1>
                                        <p>No Rekening BCA :</p>
                                        <p className="border-2 text-pink-500  text-center text-lg">xxxx-xxxx-xxxx-xxxx</p>
                                        <p>No Rekening Mandiri :</p>
                                        <p className="border-2 text-pink-500  text-center text-lg">xxxx-xxxx-xxxx-xxxx</p>
                                        <p>No Rekening BNI :</p>
                                        <p className="border-2 text-pink-500  text-center text-lg">xxxx-xxxx-xxxx-xxxx</p>
                                        <p>No Rekening BRI :</p>
                                        <p className="border-2 text-pink-500  text-center text-lg">xxxx-xxxx-xxxx-xxxx</p>

                                        <h1 className="text-pink-500">Batas Akhir Pembayaran Anda</h1>
                                        {hitungMundur ? (
                                            <>
                                                <div className="text-pink-700 text-2xl ">
                                                    <Countdown date={Date.now() + expDate} daysInHours={true} zeroPadDays={2} onComplete={() => countdown()} ></Countdown>
                                                </div>
                                            </>
                                        ) : (<>

                                            <h1 className="text-pink-700 text-lg ">Selesai Membayar tunggu Approvement dari admin</h1>

                                        </>)}


                                        <div className="mt-10">
                                            <p>Status Pembayaran Anda</p>
                                            {status()}
                                        </div>
                                        <p className="mt-10">Atau Bisa Langsung Mendatangi Kantor Kami Dengan Membawa Bukti Cetak Invoice Pembayaran ataupun Menghubungi admin maupun seller terkait.</p>

                                        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15864.008634277116!2d106.9394184!3d-6.2634444!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x6239e0ec7d2f5337!2sDignitas%20Academy!5e0!3m2!1sid!2sid!4v1660485665857!5m2!1sid!2sid"
                                            style={{ width: "100%", height: "300px", border: "0" }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                    </Card>

                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>


            </Content>
            <FooterCustomer />
        </>
    )

}