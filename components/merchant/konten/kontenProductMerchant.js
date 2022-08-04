import { Space, Table, Tag, Button, Layout, Row, Col, Tooltip, Input, Modal, Form, Select } from 'antd';
import { EditOutlined, EyeOutlined, DeleteOutlined, } from '@ant-design/icons';
import Link from "next/link";
import Image from 'next/image';
import image1 from "../../../public/Image/card-product/aminta-hotel.webp"
import image2 from "../../../public/Image/card-product/Fieris Hotel Rawamangun.webp"
import image3 from "../../../public/Image/card-product/Mang Kabayan Vida Bekasi.webp"
import React, { useEffect, useState } from 'react';
import TambahProduct from './tambahProduct';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
// import { useForm } from 'antd/lib/form/Form';
const { Option } = Select;

const { Header, Content, Sider } = Layout;

const { Search, TextArea } = Input;

function getColumns(deleteModal, updateModal, imageModal) {
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

                    <Tooltip placement="left" title="Update">
                        <Button
                            onClick={() => updateModal(record)}
                            style={{ color: "#0d6efd", borderColor: "#0d6efd" }}
                            icon={<EditOutlined />}
                        >

                        </Button>
                    </Tooltip>


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

export default function MerchantProduct() {

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

    //state modal update
    const [visibleDua, setVisibleDua] = useState(false);
    const [modalTextDua, setModalTextDua] = useState('Content of the modal');
    const [modalTaskIdDua, setModalTaskIdDua] = useState('');

    //state image modal
    //state modal update
    const [visibleTiga, setVisibleTiga] = useState(false);
    const [modalTextTiga, setModalTextTiga] = useState('Content of the modal');
    const [modalTaskIdTiga, setModalTaskIdTiga] = useState('');

    // const [name, setName] = useState('')
    // const [availability, setAvailability] = useState('')
    // const [location, setLocation] = useState('')
    // const [image, setImage] = useState('')
    // const [description, setDescription] = useState('')

    const [form] = Form.useForm();



    async function getData(params = {}) {
        try {
            setLoading(true)
            await axios.get("https://project-wo.herokuapp.com/merchant").then(res => {

                if (res.status == 200) {
                    setUserId(res.data.items[0].user.id)
                    setMerchantId(res.data.items[0].id)

                } else {
                    window.alert("data tidak ada harap menambahkan data")
                }
                return res
            })
            await axios.get("https://project-wo.herokuapp.com/product").then(result => {

                if (result.status == 200) {
                    setProduct(result.data.items)

                } else {
                    window.alert("data tidak ada harap menambahkan data")
                }
                return result
            })
            setPagination({
                ...params.pagination,
                total: productId.length
            });
            setLoading(false)
        } catch (error) {

        }
    }
    useEffect(() => {

        getData({
            pagination,
        })
        const getToken = localStorage.getItem("token_customer")
        const decode = jwt_decode(getToken)
        setToken(decode)
    }, []);

    const dataSelected = product.filter((product) => product.merchant.id == merchantId)

    const handleTableChange = (newPagination, filters, sorter) => {
        getData({
            sortField: sorter.field,
            sortOrder: sorter.order,
            pagination: newPagination,
            ...filters,
        });
    };

    //start delete modal

    const deleteModal = (record) => {
        if (record) {
            setModalTaskId(record);
            setVisible(true);

        } else {
            setVisible(false)
        }


    };
    const handleOkModalDelete = () => {
        axios.delete(`https://project-wo.herokuapp.com/product/${modalTaskId}`).then(res => {

        })
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);
        // location.reload()
    };

    //akhir delete modal

    //start update modal
    const updateModal = (record) => {
        if (record) {
            setModalTaskIdDua(record);

            setVisibleDua(true);


        } else {
            setVisibleDua(false)
        }


    };
    const handleOkModalUpdate = () => {
        // axios.delete(`https://project-wo.herokuapp.com/product/${modalTaskId}`).then(res => {
        //     console.log(res)
        // })
        setModalTextDua('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setVisibleDua(false);
            setConfirmLoading(false);
        }, 2000);
        // location.reload()
    };

    //akhir update modal


    //start Image modal
    const imageModal = async (record) => {
        setLoadingDua(true)
        if (record) {
            await setModalTaskIdTiga(record);
            setVisibleTiga(true);
            await axios.get(`https://project-wo.herokuapp.com/product/image/${modalTaskIdTiga}`).then(res => {
                console.log(res.config.url)
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
        setVisibleDua(false);
        setVisibleTiga(false)
    };

    // const getToken = localStorage.getItem('token_customer')


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
                            <TambahProduct merchant={merchantId} />
                        </Col>
                    </Row>
                    <Row justify="center" align="middle" style={{ overflow: "auto" }}>

                        <Col lg={{ span: 20 }} md={{ span: 22 }}  >
                            <Table
                                loading={loading}
                                columns={getColumns(deleteModal, updateModal, imageModal)}
                                dataSource={dataSelected}
                                pagination={pagination}
                                scroll={{
                                    y: 240,
                                }}

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
                            <Modal
                                title="Konfirmasi Update Data"
                                visible={visibleDua}
                                onOk={handleOkModalUpdate}
                                confirmLoading={confirmLoading}
                                onCancel={handleCancel}
                            >
                                <Form layout="vertical" >
                                    <Form.Item label="Name" name="name">
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label="Location" name="location">
                                        <Select placeholder="--Silahkan Pilih">
                                            <Option value="Jakarta">
                                                Jakarta
                                            </Option>
                                            <Option value="Bogor">
                                                Bogor
                                            </Option>
                                            <Option value="Depok">
                                                Depok
                                            </Option>
                                            <Option value="Tanggerang">
                                                Tanggerang
                                            </Option>
                                            <Option value="Bekasi">
                                                Bekasi
                                            </Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item label="Category" name="category">
                                        <Select placeholder="--Silahkan Pilih">
                                            <Option value="97de0e48-d7b6-446c-8e68-94e3baaa5000">
                                                Wo
                                            </Option>
                                            <Option value="bbc709ac-30d7-4b0a-9ab0-982aef62df59 ">
                                                Venue
                                            </Option>
                                            <Option value="31666e7d-5d27-4698-a205-9b902b8b5164">
                                                Chatering
                                            </Option>
                                            <Option value="0a0e6483-fb83-47f5-8525-654131a70af8">
                                                Photographer
                                            </Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item label="Description" name="description">
                                        <Input type='text' />
                                    </Form.Item>
                                    <Form.Item label="Image" name="image">
                                        <Input type='file' />
                                    </Form.Item>
                                    <Form.Item label="Status" name="category">
                                        <Select placeholder="---Silahkan Pilih">
                                            <Option value="Tersedia">
                                                Tersedia
                                            </Option>
                                            <Option value="tidak_tersedia">
                                                Tidak Tersedia
                                            </Option>

                                        </Select>
                                    </Form.Item>
                                </Form>
                                {/* <p className='text-red-500'>{JSON.stringify(modalTaskIdDua)}</p> */}
                            </Modal>
                            <Modal
                                title="Image"
                                visible={visibleTiga}
                                onOk={handleOkModalImage}
                                confirmLoading={confirmLoading}
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