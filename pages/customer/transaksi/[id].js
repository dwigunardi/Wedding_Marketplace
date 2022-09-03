import FooterCustomer from "../../../components/footer";
import Navigasi from "../../../components/navigasi";
import { Space, Table, Tag, Button, Layout, Row, Col, Tooltip, Input, Modal, Form, Select, Upload, message, ConfigProvider, Rate } from "antd";
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




function getColumns(deleteModal, hapusModal, reviewModal) {
    const router = useRouter()

    function setItem(value) {
        console.log(value)
        localStorage.setItem("id_transaksi", value)

        router.push(`/customer/transaksi/uploadProof/${value}`)
    }
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
                        return (<>
                            <Tag color="blue">{record.status}</Tag>
                        </>)
                    } else if (record.status == "Expired") {
                        return <Tag color="volcano">{record.status}</Tag>
                    } else if (record.status == "Selesai") {
                        return <Tag color="green">{record.status}</Tag>
                    }
                    else if (record.status == "Declined") {
                        return <Tag color="volcano">{record.status}</Tag>
                    } else if (record.status == "Canceled") {
                        return <Tag color="volcano">{record.status}</Tag>
                    } else if (record.status == "Ongoing") {
                        return <Tag color="blue">{record.status}</Tag>
                    }
                }
                // console.log(record.status)
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
                // console.log(record.status)
                function buttonStatus() {
                    if (record.status == "Menunggu Pembayaran") {
                        return (
                            <>
                                <Space size="middle">

                                    <Tooltip placement="top" title="Detail">
                                        <Button onClick={() => setItem(record.id)}
                                            style={{ color: "#4ade80", borderColor: "#4ade80", width: "100px" }}
                                        >
                                            Detail
                                        </Button>
                                    </Tooltip>

                                    <Tooltip placement="right" title="Cancel">
                                        <Button
                                            onClick={() => deleteModal(record.id)}
                                            type="danger"
                                            danger={true}
                                        >
                                            Cancel
                                        </Button>
                                    </Tooltip>
                                </Space>
                            </>
                        )

                    } else if (record.status == "Menunggu Approvement") {
                        return (
                            <>
                                <Space size="middle">
                                    <Link href={`/customer/transaksi/info/${record.id}`}>
                                        <Tooltip placement="top" title="Detail">
                                            <Button
                                                style={{ color: "#4ade80", borderColor: "#4ade80", width: "100px" }}
                                            >
                                                Detail
                                            </Button>
                                        </Tooltip>
                                    </Link>
                                </Space>
                            </>
                        )

                    } else if (record.status == "Approved") {
                        return (
                            <>
                                <Space size="middle">
                                    <Link href={`/customer/transaksi/invoice/${record.id}`} target="_blank">
                                        <Tooltip placement="top" title="Detail">
                                            <Button
                                                style={{ color: "#4ade80", borderColor: "#4ade80" }}
                                            >

                                                Cetak Invoice

                                            </Button>
                                        </Tooltip>
                                    </Link>
                                </Space>
                            </>
                        )
                    } else if (record.status == "Expired") {
                        return (
                            <>
                                <Space size="middle">

                                    <Tooltip placement="top" title="Hapus">
                                        <Button onClick={() => hapusModal(record.id)}
                                            style={{ color: "red", borderColor: "red", width: "100px" }}
                                        >
                                            Hapus
                                        </Button>
                                    </Tooltip>

                                </Space>
                            </>
                        )
                    } else if (record.status == "Canceled") {
                        return (
                            <>
                                <Space size="middle">

                                    <Tooltip placement="top" title="Detail">
                                        <Button
                                            style={{ color: "#4ade80", borderColor: "#4ade80", width: "100px" }}
                                        >
                                            Detail
                                        </Button>
                                    </Tooltip>
                                    <Tooltip placement="top" title="Hapus">
                                        <Button onClick={() => hapusModal(record.id)}
                                            style={{ color: "red", borderColor: "red", width: "100px" }}
                                        >
                                            Hapus
                                        </Button>
                                    </Tooltip>

                                </Space>
                            </>
                        )
                    } else if (record.status == "Declined") {
                        return (
                            <>
                                <Space size="middle">

                                    <Tooltip placement="top" title="Detail">
                                        <Button
                                            style={{ color: "#4ade80", borderColor: "#4ade80", width: "100px" }}
                                        >
                                            Declined
                                        </Button>
                                    </Tooltip>
                                    <Tooltip placement="top" title="Hapus">
                                        <Button onClick={() => hapusModal(record.id)}
                                            style={{ color: "red", borderColor: "red", width: "100px" }}
                                        >
                                            Hapus
                                        </Button>
                                    </Tooltip>
                                </Space>
                            </>
                        )
                    } else if (record.status == "Selesai") {

                        return (
                            <>
                                <Space size="middle">
                                    <Link href={`/customer/transaksi/invoice/${record.id}`} target="_blank">
                                        <Tooltip placement="top" title="Kasih Ulasan Produk">
                                            <Button
                                                style={{ color: "#4ade80", borderColor: "#4ade80", }}
                                            >
                                                Cetak Invoice
                                            </Button>
                                        </Tooltip>
                                    </Link>
                                    <Tooltip placement="top" title="Detail">
                                        <Link href={`/customer/transaksi/selesai/${record.id}`} >
                                            <Button
                                                style={{ color: "#4ade80", borderColor: "#4ade80", width: "100px" }}
                                            >
                                                Detail                                            </Button>
                                        </Link>
                                    </Tooltip>
                                    <Link href={`/customer/detailProduk/${record.product.id}`} target="_blank">
                                        <Tooltip placement="top" title="Kasih Ulasan Produk">
                                            <Button
                                                style={{ color: "#4ade80", borderColor: "#4ade80", }}
                                            >
                                                Review
                                            </Button>
                                        </Tooltip>
                                    </Link>
                                    <Tooltip placement="top" title="Hapus">
                                        <Button onClick={() => hapusModal(record.id)}
                                            style={{ color: "red", borderColor: "red", width: "100px" }}
                                        >
                                            Hapus
                                        </Button>
                                    </Tooltip>
                                </Space>
                            </>
                        )
                    } else if (record.status == "Ongoing") {
                        return (
                            <>
                                <Space size="middle">
                                    <Link href={`/customer/detailProduk/${record.product.id}`} target="_blank">
                                        <Tooltip placement="top" title="Kasih Ulasan Produk">
                                            <Button
                                                style={{ color: "#4ade80", borderColor: "#4ade80", }}
                                            >
                                                Review
                                            </Button>
                                        </Tooltip>
                                    </Link>
                                    <Link href={`/customer/transaksi/invoice/${record.id}`} target="_blank">
                                        <Tooltip placement="top" title="Cetak">
                                            <Button
                                                style={{ color: "#4ade80", borderColor: "#4ade80", }}
                                            >
                                                Cetak Invoice
                                            </Button>
                                        </Tooltip>
                                    </Link>
                                </Space>
                            </>
                        )
                    }
                }
                return (<>

                    {buttonStatus()}
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
    const [visibleDua, setVisibleDua] = useState(false);
    const [modalTaskIdDua, setModalTaskIdDua] = useState('');
    const [visibleTiga, setVisibleTiga] = useState(false);
    const [modalTaskIdTiga, setModalTaskIdTiga] = useState('');
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [transaksi, setTransaksi] = useState([])
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 5,
    });
    const [itemCount, setItemCount] = useState("")
    const router = useRouter()
    const [form] = Form.useForm();
    const { id } = router.query;



    async function getData(params = {}) {
        try {
            const getToken = await localStorage.getItem("token_customer")

            await axios.get("https://project-wo.herokuapp.com/transaction?page=1&limit=100", {
                headers: {
                    'Authorization': `Bearer ${getToken}`
                }
            }).then(res => {
                // console.log(res.data, "ini pages")
                if (res.status == 200 || res.status == 201) {
                    setItemCount(res.data.meta.totalPages)
                    setTransaksi(res.data.items)
                    setPagination({
                        ...params.pagination,
                        total: res.data.meta.itemCount,
                        // current: 1
                    });
                }
            })

        } catch (error) {
            if (error) {
                message.error("anda belom login dan tidak berhak mengakses")
                router.push('/auth/login')
            }
        }
    }
    async function nextData() {
        try {
            const getToken = await localStorage.getItem("token_customer")
            const decode = await jwt_decode(getToken)
            await axios.get("https://project-wo.herokuapp.com/transaction", {
                headers: {
                    'Authorization': `Bearer ${getToken}`
                }
            }).then(res => {
                // console.log(res.data.links, "ini pages")
                if (res.status == 200 || res.status == 201) {
                    axios.get(res.data.links.next, {
                        headers: {
                            'Authorization': `Bearer ${getToken}`
                        }
                    }).then(result => {
                        // setItemCount(result.data.meta.totalPages)
                        setTransaksi(result.data.items)

                    })

                }
            })

        } catch (error) {
            if (error) {
                message.error(error.message)

            }
        }
    }
    function ambilToken() {
        const getToken = localStorage.getItem("token_customer")
        if (getToken) {
            const decode = jwt_decode(getToken)
            return decode.user_id
        }
    }
    function dataSelected() {
        const getToken = localStorage.getItem("token_customer")
        const decode = jwt_decode(getToken)
        const findData = transaksi.filter((data) => data.user.id == decode.user_id)
        return findData
    }
    useEffect(() => {

        getData()
        dataSelected()
    }, [transaksi]);

    const handleTableChange = (e, newPagination, filters, sorter) => {
        console.log(e)
        if (e.current > 1) {
            nextData()
        } else if (e.current == 1) {
            getData({
                sortField: sorter.field,
                sortOrder: sorter.order,
                pagination: newPagination,
                ...filters,
            });
        }

    };
    const deleteModal = (record) => {
        if (record) {
            setModalTaskId(record);
            setVisible(true);

        } else {
            setVisible(false)
        }
    };
    const hapusModal = (record) => {
        if (record) {
            setModalTaskIdDua(record);
            setVisibleDua(true);

        } else {
            setVisibleDua(false)
        }
    };
    const reviewModal = (record) => {
        if (record) {
            setModalTaskIdTiga(record);
            setVisibleTiga(true);

        } else {
            setVisibleTiga(false)
        }
    };
    const handleOkModalDelete = () => {
        const data = {
            status: "Canceled",
        }
        axios.put(`https://project-wo.herokuapp.com/transaction/edit/${modalTaskId}`, data, {
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
    const handleOkModalHapus = () => {
        axios.delete(`https://project-wo.herokuapp.com/transaction/delete/${modalTaskIdDua}`, {
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
            setVisibleDua(false);
            setConfirmLoading(false);
        }, 2000);
        // location.reload()
    };
    const handleModalReview = () => {
        const getForm = form.getFieldValue()
        // console.log(modalTaskIdTiga)
        const data = {
            user_id: modalTaskIdTiga.user?.id,
            product_id: modalTaskIdTiga.product?.id,
            star: getForm.rate,
            message: getForm.message,
        }
        console.log(getForm)
        axios.post(`https://project-wo.herokuapp.com/review`, data, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token_customer")}`
            }
        }).then(res => {
            console.log(res)
        })

        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            getData()
            setVisibleTiga(false);
            setConfirmLoading(false);
        }, 2000);
        // location.reload()
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
        setVisibleDua(false)
        setVisibleTiga(false)
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
    // console.log(transaksi)
    return (
        <>
            <Layout style={{ backgroundColor: "white" }}>
                <Navigasi />
            </Layout>

            <Content>
                <div className="h-max-screen h-3/4 mt-36  mb-20">
                    <h1 className=" text-xl text-center">History Transaksi Anda</h1>
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
                                columns={getColumns(deleteModal, hapusModal, reviewModal)}
                                dataSource={dataSelected()}
                                size="large"
                                pagination={pagination}
                                scroll={{ y: 300 }}
                                onChange={handleTableChange}
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
                    <Modal
                        title="Konfirmasi Pengahapusan"
                        visible={visibleDua}
                        onOk={handleOkModalHapus}
                        confirmLoading={confirmLoading}
                        onCancel={handleCancel}
                    >
                        <p className='text-pink-500'>Apakah anda yakin akan Menghapus ?</p>
                    </Modal>
                    <Modal
                        title="Berikan Review"
                        visible={visibleTiga}
                        onOk={handleModalReview}
                        confirmLoading={confirmLoading}
                        onCancel={handleCancel}
                    >
                        <Form
                            name="basic"
                            form={form}
                            initialValues={{
                                remember: true,
                            }}
                            autoComplete="off"
                        >
                            <Form.Item name="rate" label="Rate">
                                <Rate />
                            </Form.Item>
                            <Form.Item name={"message"} label="Komen">
                                <Input.TextArea />
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
            </Content>

            <FooterCustomer />
        </>
    )
}