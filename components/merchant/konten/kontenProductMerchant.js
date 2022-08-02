import { Space, Table, Tag, Button, Layout, Row, Col, Tooltip, Input, Modal } from 'antd';
import { EditOutlined, EyeOutlined, DeleteOutlined, } from '@ant-design/icons';
import Link from "next/link";
import Image from 'next/image';
import image1 from "../../../public/Image/card-product/aminta-hotel.webp"
import image2 from "../../../public/Image/card-product/Fieris Hotel Rawamangun.webp"
import image3 from "../../../public/Image/card-product/Mang Kabayan Vida Bekasi.webp"
import React, { useEffect, useState } from 'react';
import TambahProduct from './tambahProduct';
import axios from 'axios';


const { Header, Content, Sider } = Layout;

const { Search, TextArea } = Input;

function getColumns(showModal) {
    return [
        {
            title: 'No',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name Product',
            dataIndex: 'name',
            key: 'name',

        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            render: (_, record) => <a> {record.category.name} </a>
        },
        // {
        //     title: 'Varian',
        //     dataIndex: 'varian',
        //     key: 'varian',
        // },
        // {
        //     title: 'Harga',
        //     dataIndex: 'harga',
        //     key: 'harga',
        // },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
        },
        {
            title: 'Availability',
            key: 'availability',
            dataIndex: 'availability',
            // render: (_, { status }) => (
            //     <>
            //         {status.map((tag) => {
            //             let color = ''
            //             if (tag === 'Tersedia') {
            //                 color = 'green';
            //             }
            //             else if (tag === 'Non-Tersedia') {
            //                 color = 'volcano';
            //             }


            //             return (
            //                 <Tag color={color} key={tag}>
            //                     {tag.toUpperCase()}
            //                 </Tag>
            //             );
            //         })}
            //     </>
            // ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link href={`/admin/${record.id}`}>
                        <Tooltip placement="left" title="Update">
                            <Button
                                style={{ color: "#0d6efd", borderColor: "#0d6efd" }}
                                icon={<EditOutlined />}
                            >

                            </Button>
                        </Tooltip>
                    </Link>

                    <Link href={`/admin/detailProduct/${record.id}`}>
                        <Tooltip placement="top" title="Detail">
                            <Button
                                style={{ color: "#4ade80", borderColor: "#4ade80" }}
                                icon={<EyeOutlined />}
                            >

                            </Button>
                        </Tooltip>
                    </Link>

                    <Tooltip placement="right" title="Delete">
                        <Button
                            onClick={() => showModal(record.id)}
                            type="danger"
                            icon={<DeleteOutlined />}
                            danger={true}
                        >
                        </Button>
                    </Tooltip>


                </Space>
            ),
        },
    ];
}

export default function MerchantProduct() {

    const [token, setToken] = useState('')
    const [userId, setUserId] = useState('')
    const [merchantId, setMerchantId] = useState('')
    const [product, setProduct] = useState([])
    const [productId, setProductId] = useState([])
    const [loading, setLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const [modalTaskId, setModalTaskId] = useState('');
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 5,
    });
    const [visible, setVisible] = useState(false);


    async function getMerchant(params = {}) {
        try {

            const token = await localStorage.getItem("token_customer")
            if (token) {
                setToken(token)

            }
            setLoading(true);
            await axios.get("https://project-wo.herokuapp.com/merchant").then(res => {
                // console.log(res.data.items)
                if (res.status == 200) {
                    setUserId(res.data.items[0].user.id)
                    setMerchantId(res.data.items[0].id)

                }
            })
            await axios.get("https://project-wo.herokuapp.com/product").then(res => {
                // console.log(res)
                if (res.status == 200) {
                    setProduct(res.data.items)

                }
            }).then(show => {
                // product.map((ele) => {
                //     console.log(ele.merchant.id)
                // })

                const dataSelected = product.filter((product) => product.merchant.id == merchantId)
                // console.log(product);
                if (dataSelected) {
                    setProductId(dataSelected)

                }

            })
            setPagination({
                ...params.pagination,
                total: productId.length
            });
            setLoading(false);


        } catch (error) {

        }

    }


    useEffect(() => {

        getMerchant({
            pagination,
        })



    }, []);

    const handleTableChange = (newPagination, filters, sorter) => {
        getMerchant({
            sortField: sorter.field,
            sortOrder: sorter.order,
            pagination: newPagination,
            ...filters,
        });
    };

    const showModal = (record) => {
        if (record) {
            setModalTaskId(record);
            setVisible(true);

        } else {
            setVisible(false)
        }


    };
    const handleOkModal = () => {
        axios.delete(`https://project-wo.herokuapp.com/product/${modalTaskId}`).then(res => {
            console.log(res)
        })
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);
        location.reload()
    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };
    console.log(productId)

    const onSearch = (value) => console.log(value);
    return (
        <>
            <Content>
                <h1 className='mt-6 ml-14 text-2xl'>Table Product</h1>
                <div className="rounded-lg shadow-lg bg-white mx-10 py-4">

                    <Row className='my-5 ' justify='space-between'>
                        <Col lg={{ span: 5, offset: 2 }} md={{ span: 5, offset: 2 }} sm={{ span: 10 }} xs={{ span: 10 }} >
                            <Search
                                placeholder="input search text"
                                allowClear
                                enterButton
                                size="large"
                                onSearch={onSearch}

                            />
                        </Col>
                        <Col lg={{ span: 5, }} md={{ span: 5 }} sm={{ span: 10 }} xs={{ span: 10 }}>
                            {/* product modal form */}
                            <TambahProduct />
                        </Col>
                    </Row>
                    <Row justify="center" align="middle" style={{ overflow: "auto" }}>

                        <Col lg={{ span: 20 }} md={{ span: 22 }}  >
                            <Table
                                columns={getColumns(showModal)}
                                dataSource={productId}
                                pagination={pagination}
                                // scroll={{
                                //     y: 240,
                                // }}
                                loading={loading}
                                onChange={handleTableChange}
                                className="shadow-sm" />
                            <Modal
                                title="Konfirmasi Penghapusan"
                                visible={visible}
                                onOk={handleOkModal}
                                confirmLoading={confirmLoading}
                                onCancel={handleCancel}
                            >
                                <p className='text-pink-500'>Apakah anda yakin akan meghapus ? user yang Memiliki ID </p>
                                <p className='text-red-500'>{JSON.stringify(modalTaskId)}</p>
                            </Modal>
                        </Col>
                    </Row>

                </div>
            </Content>
        </>
    )
}