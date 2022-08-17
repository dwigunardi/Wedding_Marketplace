import FooterCustomer from "../../../components/footer";
import Navigasi from "../../../components/navigasi";
import { Space, Table, Tag, Button, Layout, Row, Col, Tooltip, Input, Modal, Form, Select, Upload, message, ConfigProvider } from "antd";
import { EditOutlined, EyeOutlined, DeleteOutlined, PlusOutlined, UploadOutlined, MinusCircleOutlined, } from '@ant-design/icons';
import { Content } from "antd/lib/layout/layout";
import React, { useEffect, useState } from "react";
import { useRouter, Router } from "next/router";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import jwt_decode from "jwt-decode";
import BackButton from "../../backButton";



ConfigProvider.config({
    theme: {
        primaryColor: '#EC4899',
    },
});
function getColumns(deleteModal) {
    return [
        {
            title: "Product name",
            dataIndex: "product",
            key: "product",
            render: (_, record) => (<a>{record.product.name}</a>)
        },
        {
            title: "Variant name",
            dataIndex: "variant",
            key: "variant",
            render: (_, record) => (<a>{record.variant.name}</a>)
        },
        {
            title: "Price",
            dataIndex: "variant",
            key: "variant",
            render: (_, record) => {
                const thouSep = ".";
                const decSep = ",";
                // format to money
                const toMoney = (num) => { return (Math.round(num * 100) / 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').replace(/[,.]/g, function (m) { return m === ',' ? thouSep : decSep; }) };
                ;
                return (
                    <>
                        <a>Rp. {toMoney(record.variant.price)}</a>
                    </>
                )
            }
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (_, record) => {
                function TagStatus() {
                    if (record.status == "Menunggu Pembayaran") {
                        return <Tag color="gold">{record.status}</Tag>
                    } else if (record.status == "Menunggu Approvement") {
                        return <Tag color="blue">{record.status}</Tag>
                    } else if (record.status === "Approved") {
                        return <Button style={{ color: "#4ade80", borderColor: "#4ade80", }}>Cetak Invoice</Button>
                    } else if (record.status == "Expired") {
                        return <Tag color="volcano">{record.status}</Tag>
                    } else if (record.status == "Selesai") {
                        return <Tag color="green">{record.status}</Tag>
                    }
                }

                return (
                    <>
                        {TagStatus()}
                    </>
                )
            }
        },
        {
            title: "Action",
            key: "action",
            dataIndex: "action",
            render: (_, record) => {

                return (<>
                    <Space size="middle">
                        <Link href={`/customer/transaksi/uploadProof/${record.id}`}>
                            <Tooltip placement="top" title="Detail">
                                <Button
                                    style={{ color: "#4ade80", borderColor: "#4ade80", width: "100px" }}
                                >
                                    Detail
                                </Button>
                            </Tooltip>
                        </Link>
                        <Tooltip placement="right" title="Delete">
                            <Button
                                onClick={() => deleteModal(record.id)}
                                type="danger"
                                danger={true}
                            >
                                Cancel
                            </Button>
                        </Tooltip>
                    </Space>
                </>)
            }
        },
    ];
}


export default function Transaksi() {

    //state modal delete
    const [visible, setVisible] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const [modalTaskId, setModalTaskId] = useState('');
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [transaksi, setTransaksi] = useState([])
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 5,
    });

    const router = useRouter()
    const { id } = router.query;


    async function getData(params = {}) {
        try {
            const getToken = await localStorage.getItem("token_customer")
            const decode = await jwt_decode(getToken)
            axios.get("https://project-wo.herokuapp.com/transaction", {
                headers: {
                    'Authorization': `Bearer ${getToken}`
                }
            }).then(res => {
                // console.log(res)
                if (res.status == 200 || res.status == 201) {
                    setTransaksi(res.data.items)
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

    }, []);
    const dataSelected = transaksi.filter((data) => data.user.id == id)

    const deleteModal = (record) => {
        if (record) {
            setModalTaskId(record);
            setVisible(true);

        } else {
            setVisible(false)
        }


    };
    const handleOkModalDelete = () => {
        axios.delete(`https://project-wo.herokuapp.com/transaction/delete/${modalTaskId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token_customer")}`
            }
        }).then(res => {
            console.log(res)
            getData()
        })

        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);
        // location.reload()
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };
    // const dataTransaksi = [
    //     {
    //         product: dataSelected?.product.name,
    //         variant: dataSelected?.variant.name,
    //         price: dataSelected?.variant.price,
    //         location: dataSelected?.product.location,
    //         user: dataSelected?.user.name,
    //         status: dataSelected?.status

    //     }
    // ]
    // console.log(dataSelected)
    return (
        <>
            <Layout style={{ backgroundColor: "white" }}>
                <Navigasi />
            </Layout>

            <Content>
                <div className="h-max-screen h-3/4 mt-36  mb-20">
                    <h1 className=" text-xl text-center">Your Cart Items</h1>
                    <p className="text-md mt-3 underline text-end mr-32">
                        <Link href={`/customer/landing/${id}`}>
                            <a className="text-pink-500">Back to Home</a>
                        </Link>
                    </p>
                    <Row justify="center" align="middle">
                        <Col
                            lg={{ span: 20 }}
                            md={{ span: 22 }}
                            sm={{ span: 22 }}
                            xs={{ span: 24 }}
                        >
                            <Table
                                columns={getColumns(deleteModal)}
                                dataSource={dataSelected}
                                size="large"
                                pagination={pagination}
                                scroll={{ y: 300 }}
                            />
                        </Col>
                    </Row>
                    <Modal
                        title="Konfirmasi Pembatalan"
                        visible={visible}
                        onOk={handleOkModalDelete}
                        confirmLoading={confirmLoading}
                        onCancel={handleCancel}
                    >
                        <p className='text-pink-500'>Apakah anda yakin akan Membatalkan ?</p>
                    </Modal>
                </div>
            </Content>

            <FooterCustomer />
        </>
    )
}