import { Space, Table, Tag, Button, Layout, Row, Col, Tooltip, Input, Modal, Form, Select } from 'antd';
import { EditOutlined, EyeOutlined, DeleteOutlined, PlusOutlined, UploadOutlined, MinusCircleOutlined } from '@ant-design/icons';
import Link from "next/link";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const { Option, OptGroup } = Select;

const { Header, Content, Sider } = Layout;

const { Search, TextArea } = Input;
function getColumns(deleteModal, imageModal) {
    return [
        // {
        //     title: 'No',
        //     dataIndex: 'id',
        //     key: 'id',
        // },
        {
            title: 'Name Product',
            dataIndex: 'name',
            key: 'name',

        },
        {
            title: 'Merchant',
            dataIndex: 'merchant',
            key: 'merchant',
            render: (_, record) => <a>{record.merchant.name}</a>
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
        },
        {
            title: 'Variant',
            dataIndex: 'variant',
            key: 'variant',
            render: (_, status) => (
                <>
                    {status.variant.map((res) => {
                        return (
                            <>
                                {/* 
                                */}
                                <Row justify='space-between'>
                                    <Col>
                                        <p>variant Name :{res.name}</p>
                                    </Col>
                                    <Col>
                                        <p>variant Price :{res.price}</p>

                                    </Col>
                                </Row>
                            </>
                        )
                    })}
                </>
            )
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            render: (_, record) => <a> {record.category.name} </a>
        },

        // {
        //     title: 'Harga',
        //     dataIndex: 'harga',
        //     key: 'harga',
        // },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (_, record) =>
            (

                <>
                    <Tooltip placement="left" title="Open Image">
                        <Button
                            onClick={() => imageModal(record.image)}
                            style={{ color: "#0d6efd", borderColor: "#0d6efd", overflow: "hidden" }}
                        // icon={<EyeOutlined />}
                        >
                            Double Klik
                        </Button>
                    </Tooltip>
                </>

            )
        },
        {
            title: 'Availability',
            key: 'availability',
            dataIndex: 'availability',
            // render: (_, { status }) => (
            //     <>
            //         {
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
            //         }
            //     </>
            // ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">


                    <Link href={`/merchant/detailProdukMerchant/${record.id}`}>
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
                            onClick={() => deleteModal(record.id)}
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


export default function ProductContent() {

    const [token, setToken] = useState()
    const [userId, setUserId] = useState('')
    const [merchantId, setMerchantId] = useState('')
    const [product, setProduct] = useState([])
    const [productId, setProductId] = useState([])
    const [loading, setLoading] = useState(false);
    const [loadingDua, setLoadingDua] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 5,
    });
    let [imageUrl, setImageUrl] = useState('')
    //state modal delete
    const [visible, setVisible] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const [modalTaskId, setModalTaskId] = useState('');

    //state image modal

    const [visibleTiga, setVisibleTiga] = useState(false);
    const [modalTextTiga, setModalTextTiga] = useState('Content of the modal');
    const [modalTaskIdTiga, setModalTaskIdTiga] = useState('');

    const [form] = Form.useForm();


    async function getData() {
        try {
            await axios.get("https://project-wo.herokuapp.com/product").then(result => {
                if (result.status == 200) {
                    setProduct(result.data.items)

                } else {
                    window.alert("data tidak ada harap menambahkan data")
                }
                return result
            })
        } catch (error) {

        }
    }
    useEffect((params = {}) => {

        getData({
            pagination,
        })
        setPagination({
            ...params.pagination,
            total: productId.length
        });
        const getToken = localStorage.getItem("token_customer")
        const decode = jwt_decode(getToken)
        setToken(decode)
    }, []);

    const handleTableChange = (newPagination, filters, sorter) => {
        getData({
            sortField: sorter.field,
            sortOrder: sorter.order,
            pagination: newPagination,
            ...filters,
        });
    };

    const deleteModal = (record) => {
        if (record) {
            setModalTaskId(record);
            setVisible(true);

        } else {
            setVisible(false)
        }


    };
    const handleOkModalDelete = () => {
        axios.delete(`https://project-wo.herokuapp.com/product/delete/${modalTaskId}`).then(res => {

        })
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);
        // location.reload()
    };
    const imageModal = async (record) => {
        setLoadingDua(true)
        if (record) {
            await setModalTaskIdTiga(record);
            setVisibleTiga(true);
            await axios.get(`https://project-wo.herokuapp.com/product/image/${modalTaskIdTiga}`).then(res => {
                setImageUrl(res.config.url)
            })
        } else {
            setVisibleTiga(false)
        }
        setLoadingDua(false)
        console.log(modalTaskIdTiga)

    };
    const handleOkModalImage = () => {
        setImageUrl(null)
        setModalTextTiga('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setVisibleTiga(false)
            setConfirmLoading(false);
        }, 1000);
        // location.reload()
    };



    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
        setVisibleTiga(false)
    };
    const onSearch = (value) => {
        axios.get(`https://project-wo.herokuapp.com/product/search/product?page=1&limit=20&search=${value}&location=&category=&merchant=`).then(res => {
            setProduct(res.data.items)
            // console.log(res.data.items)
        })
    };

    const onSelect = (value) => {
        // console.log('onSelect', value);
        axios.get(`https://project-wo.herokuapp.com/product/search/product?page=1&limit=20&search=&location=${value}&category=&merchant=`).then(res => {
            setProduct(res.data.items)
            // console.log(res.data.items)
        })
    };

    return (
        <>
            <Content>
                <h1 className='mt-6 ml-14 text-2xl'>Table Product</h1>
                <div className="rounded-lg shadow-lg bg-white mx-10 py-4">

                    <Row className='my-5 ' justify='space-between'>
                        <Col lg={{ span: 5, offset: 2 }} md={{ span: 5, offset: 2 }} sm={{ span: 10 }} xs={{ span: 10 }} >
                            <Search
                                placeholder="Search...."
                                allowClear
                                enterButton
                                size="large"
                                onSearch={onSearch}

                            />
                        </Col>
                        <Col lg={{ span: 5, }} md={{ span: 5 }} sm={{ span: 10 }} xs={{ span: 10 }}>
                            <Form.Item
                                label={"Filter :"}>
                                <Select
                                    defaultValue="All"

                                    style={{
                                        width: 110,
                                    }}
                                    onChange={onSelect}
                                    placeholder="Filter"
                                >
                                    <Option value="">All</Option>
                                    <Option value="Jakarta">Jakarta</Option>
                                    <Option value="Bogor">Bogor</Option>
                                    <Option value="Depok" >Depok</Option>
                                    <Option value="Tanggerang" >Tanggerang</Option>
                                    <Option value="Bekasi" >Bekasi</Option>
                                </Select>
                            </Form.Item>

                        </Col>

                    </Row>
                    <Row justify="center" align="middle" >

                        <Col lg={{ span: 20 }} md={{ span: 22 }}  >
                            <Table columns={getColumns(deleteModal, imageModal)}
                                dataSource={product}
                                pagination={pagination}
                                // scroll={{
                                //     y: 240,
                                // }}

                                onChange={handleTableChange}
                                className="shadow-sm" />
                            <Modal
                                title="Konfirmasi Penghapusan"
                                visible={visible}
                                onOk={handleOkModalDelete}
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