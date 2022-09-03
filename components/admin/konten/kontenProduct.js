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
            render: (_, data) => {
                const thouSep = ".";
                const decSep = ",";
                // format to money
                const toMoney = (num) => { return (Math.round(num * 100) / 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').replace(/[,.]/g, function (m) { return m === ',' ? thouSep : decSep; }) };
                ;

                return (
                    <>
                        <Row justify='space-evenly space-x-2' >
                            <Col>
                                <h1 className='border-b-2 border-pink-500'>Variant Name</h1>
                                {data.variant.map((v) => {
                                    return (
                                        <>
                                            <ol>
                                                <li style={{ listStyleType: "circle" }}>{v.name}</li>
                                            </ol>
                                        </>
                                    )
                                })}
                            </Col>
                            <Col>
                                <h1 className='border-b-2 border-pink-500'>Variant Price</h1>
                                {data.variant.map((v) => {
                                    return (
                                        <>
                                            <ol>
                                                <li style={{ listStyleType: "circle" }}>Rp. {toMoney(v.price)}</li>
                                            </ol>
                                        </>
                                    )
                                })}
                            </Col>
                        </Row>
                    </>
                )
            }
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
                            Open Image
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
    const [meta, setMeta] = useState("")
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


    async function getData(params = {}) {
        try {
            await axios.get("https://project-wo.herokuapp.com/product?limit=100").then(result => {
                if (result.status == 200) {
                    console.log(result)
                    setProduct(result.data.items)
                    setMeta(result.data.meta)

                } else {
                    window.alert("data tidak ada harap menambahkan data")
                }
                return result
            })
            setPagination({
                ...params.pagination,
                total: meta.totaItems
            });
        } catch (error) {

        }
    }
    useEffect(() => {

        getData({
            pagination,
        })
        const getToken = localStorage.getItem("token_admin")
        const decode = jwt_decode(getToken)
        setToken(decode)
    }, []);



    const deleteModal = (record) => {
        if (record) {
            setModalTaskId(record);
            setVisible(true);

        } else {
            setVisible(false)
        }


    };
    const handleOkModalDelete = () => {
        axios.delete(`https://project-wo.herokuapp.com/product/delete/${modalTaskId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token_admin")}`
            }
        }).then(res => {
            console.log(res)
            console.log(pagination)
        })

        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            getData({
                pagination,
            })
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);

    };
    const imageModal = (record) => {

        if (record) {
            setModalTaskIdTiga(record);
            setVisibleTiga(true);
            axios.get(`https://project-wo.herokuapp.com/file/${record}`).then(res => {
                // console.log(res)
                setImageUrl(res.config.url)
            })
        } else {
            setVisibleTiga(false)
        }

        // console.log(modalTaskIdTiga)

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
        axios.get(`https://project-wo.herokuapp.com/product/search/product?page=1&limit=200&search=${value}&location=&category=&merchant=`).then(res => {
            setProduct(res.data.items)
            // console.log(res.data.items)
        })
    };

    const onSelect = (value) => {
        console.log('onSelect', value);
        axios.get(`https://project-wo.herokuapp.com/product/search/product?page=1&limit=200&search=&location=${value}&category=&merchant=`).then(res => {
            setProduct(res.data.items)
            // console.log(res.data.items)
        })
    };
    const handleTableChange = (newPagination, filters, sorter) => {
        getData({
            sortField: sorter.field,
            sortOrder: sorter.order,
            pagination: newPagination,
            ...filters,
        });
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
                                <p className='text-pink-500'>Apakah anda yakin akan meghapus ?</p>

                            </Modal>
                            <Modal
                                title="Image"
                                visible={visibleTiga}
                                // onOk={handleOkModalImage}
                                onCancel={handleCancel}
                                confirmLoading={confirmLoading}
                                footer={[
                                    <Button key="back" onClick={handleCancel}>
                                        Return
                                    </Button>,
                                ]}
                            >
                                <img src={imageUrl} width={500} height={500} />
                            </Modal>
                        </Col>
                    </Row>

                </div>
            </Content>
        </>
    )
}