import { Layout, Col, Row, Card } from "antd";
import {
    CreditCardOutlined,
    UserOutlined,
    FileOutlined,
    InboxOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from "react";
import jwt_decode from 'jwt-decode'
import axios from "axios";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const { Header, Content, Sider } = Layout;


export default function MerchantDashboard() {


    const [dataUser, setDataUser] = useState([])
    const [dataMerchant, setDataMerchant] = useState([])
    const [dataTransaksi, setDataTransaksi] = useState([])
    const [proudctId, setProductId] = useState([])

    useEffect(() => {
        const controller = new AbortController()
        const getToken = localStorage.getItem("token_merchant")
        const decode = jwt_decode(getToken)
        axios.get(`https://project-wo.herokuapp.com/users/detail/${decode.user_id}`, {
            signal: controller.signal,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token_merchant")}`
            }
        }).then(res => {
            if (res.status == 200 || res.status == 201) {
                // console.log(res)
                setDataUser(res.data.data)
                axios.get(`https://project-wo.herokuapp.com/merchant/detail/${res.data.data.merchant[0].id}`, {
                    signal: controller.signal,
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token_merchant")}`
                    }
                }).then(res => {
                    // console.log("ini data merchant", res.data.data)
                    if (res.status == 200 || res.status == 201) {
                        setDataMerchant(res.data.data)
                        setProductId(res.data.data.product)
                        axios.get(`https://project-wo.herokuapp.com/transaction`, {
                            signal: controller.signal,
                            headers: {
                                'Authorization': `Bearer ${localStorage.getItem("token_merchant")}`
                            }
                        }).then(res => {
                            // console.log(res)
                            if (res.status == 200 || res.status == 201) {
                                setDataTransaksi(res.data.items)
                            }

                        })
                    }

                })
            }
        })


    }, []);


    // const totalTransaksi = dataTransaksi.length;
    // // const totalPendapatan = data.reduce((i, obj) => {
    // //     return i + obj.jumlah;
    // // }, 0);
    const totalUser = proudctId.length
    // const totalProduct = dataProduct.length


    // console.log(dataTransaksi)
    function filterFind() {
        const mapped = proudctId?.map((data) => {
            const dataSelected = dataTransaksi.filter((e) => e.product.id == data.id)
            return dataSelected
        })
        if (mapped == undefined) {
            return 0
        } else if (Array.isArray(mapped)) {
            const last = mapped.pop()
            // console.log(last)
            return last?.length
        }
    }
    const cardStyle = {
        width: 300,
        textAlign: "center",

    }
    const cardHead = {
        color: "white", textAlign: "center",
        backgroundColor: "#1FC8B9",

    }
    const cardHead2 = {
        color: "white",
        backgroundColor: "#517BEA",
    }
    const cardHead3 = {
        color: "white", textAlign: "center",
        backgroundColor: "#FDD74F",
    }
    console.log(filterFind())
    return (
        <>
            <Content
                className="bg-white"
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,

                }}
            >
                <Row justify="space-evenly" align="center">
                    <Col lg={{ span: 6 }} md={{ span: 6 }} sm={{ span: 20 }}
                        className="shadow-lg  hover:translate-x-2 hover: transition-all delay-300 duration-300 ease-in-out hover:scale-110">
                        <Card
                            title="Total Pembeli"
                            headStyle={cardHead2}
                            bordered={false}
                        >
                            <Row justify="space-evenly" align="middle" style={{ fontSize: '32pt' }} className="text-slate-500">
                                <Col >{filterFind()} </Col>
                                <Col ><UserOutlined /></Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col lg={{ span: 6 }} md={{ span: 6 }} sm={{ span: 20 }}
                        className="shadow-lg  hover:translate-x-2 hover: transition-all delay-300 duration-300 ease-in-out hover:scale-110">
                        <Card
                            title="Total product"
                            bordered={false}
                            headStyle={cardHead}

                        >
                            <Row justify="space-evenly" align="middle" style={{ fontSize: '32pt' }} className="text-slate-500">
                                <Col >{proudctId.length}</Col>
                                <Col ><InboxOutlined /></Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col lg={{ span: 6 }} md={{ span: 6 }} sm={{ span: 20 }}
                        className="shadow-lg  hover:translate-x-2 hover: transition-all delay-300 duration-300 ease-in-out hover:scale-110">
                        <Card
                            title="Total Transaksi Product"
                            headStyle={cardHead3}
                            bordered={false}
                        >
                            <Row justify="space-evenly" align="middle" style={{ fontSize: '32pt' }} className="text-slate-500">
                                <Col >{filterFind()}</Col>
                                <Col ><CreditCardOutlined /></Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>

                {/* <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        width={500}
                        height={300}
                        data={dataTransaksi}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="startDate" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="endDate" stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer> */}
            </Content >
        </>
    )
}