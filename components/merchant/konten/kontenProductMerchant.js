import { Space, Table, Tag, Button, Layout, Row, Col, Tooltip, Input, Modal, Form, Select, Upload, message } from 'antd';
import { EditOutlined, EyeOutlined, DeleteOutlined, PlusOutlined, UploadOutlined, MinusCircleOutlined, } from '@ant-design/icons';
import Link from "next/link";
import React, { useEffect, useState } from 'react';
import TambahProduct from './tambahProduct';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useRouter } from "next/router"
const { Option, OptGroup } = Select;

const { Header, Content, Sider } = Layout;

const { Search, TextArea } = Input;





function getColumns(deleteModal, updateModal, imageModal) {
    return [
        // {
        //     title: 'id',
        //     dataIndex: 'id',
        //     key: 'id',

        // },

        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',

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
                                                <li style={{ listStyleType: "circle" }}>{v.price}</li>
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
            render: (_, record) => <a>{record.category.name}</a>
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
                            Show Image
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
    const [merchantId, setMerchantId] = useState([])
    const [merchantMap, setMerchantMap] = useState('')
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
    const [foto, setFoto] = useState('')

    //state image modal

    const [visibleTiga, setVisibleTiga] = useState(false);
    const [modalTextTiga, setModalTextTiga] = useState('Content of the modal');
    const [modalTaskIdTiga, setModalTaskIdTiga] = useState('');

    //state tambah product

    const [VisibleTambah, setVisibleTambah] = useState(false);


    // const [name, setName] = useState('')
    // const [availability, setAvailability] = useState('')
    // const [location, setLocation] = useState('')
    // const [image, setImage] = useState('')
    // const [description, setDescription] = useState('')

    const [form] = Form.useForm();

    async function getData(params = {}) {
        try {
            const getToken = await localStorage.getItem("token_merchant")
            const decode = await jwt_decode(getToken)
            setToken(decode)
            await axios.get(`https://project-wo.herokuapp.com/users/detail/${decode.user_id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token_merchant")}`
                }
            }).then(res => {
                // console.log(res.data)
                if (res.status == 200) {

                    setMerchantId(res.data.data.merchant[0].id)
                    axios.get(`https://project-wo.herokuapp.com/product/search/product?page=1&limit=20&search=&location=&category=&merchant=${res.data.data.merchant[0].id}`, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem("token_merchant")}`
                        }
                    }).then(result => {
                        // console.log(result)
                        if (result.status == 200 || result.status == 201) {
                            setProduct(result.data.items)
                            // setMerchantId(res.data.items)
                        } else {
                            message.warning("data tidak ada harap menambahkan data")
                        }
                    })
                }
                else {
                    message.warning("data tidak ada harap menambahkan data")
                }
            })
            setPagination({
                ...params.pagination,
                // total: product.length
            });
        } catch (error) {

        }
    }
    useEffect(() => {
        getData()


    }, []);
    const onSearch = (value) => {
        axios.get(`https://project-wo.herokuapp.com/product/search/product?page=1&limit=20&search=${value}&location=&category=&merchant=${merchantId}`).then(res => {

            setProduct(res.data.items)
            // console.log(res.data.items)
        })
    };

    const onSelect = (value) => {
        // console.log('onSelect', value);
        axios.get(`https://project-wo.herokuapp.com/product/search/product?page=1&limit=20&search=&location=${value}&category=&merchant=${merchantId}`).then(res => {
            setProduct(res.data.items)
            // console.log(res.data.items)
        })
    }


    const handleTableChange = (newPagination, filters, sorter) => {
        getData({
            sortField: sorter.field,
            sortOrder: sorter.order,
            pagination: newPagination,
            ...filters,
        });
    };


    //start tambah product

    const showModal = () => {
        setVisibleTambah(true);
    };
    const onSelectTambah = (value) => {
        // console.log('onSelect', value);
        setLokasi(value)
    };


    const onChangeFoto = (e) => {
        const value = e.file.originFileObj
        // console.log(value)
        setFoto(value)
    }


    const onFinish = async (values) => {
        try {
            // console.log(values)

            const dataForm = new FormData()
            dataForm.append("name", values.name)
            dataForm.append('availability', values.availability)
            dataForm.append('location', values.location)
            dataForm.append('image', foto)
            dataForm.append("description", values.description)
            dataForm.append("category_id", values.category_id)
            dataForm.append("merchant_id", merchantId)

            for (let i = 0; i < values.variant.length; i++) {
                dataForm.append(`variant[${i}][name]`, values.variant[i].name)
                dataForm.append(`variant[${i}][price]`, values.variant[i].price)
            }
            // Object.keys(values.variant).map(variant => {
            //     dataForm.append("variant", JSON.stringify(values.variant[variant]))
            // })   
            // dataForm.append('variant[1][name]', values.variant[1].name)
            // dataForm.append('variant[1][price]', values.variant[1].price)
            // dataForm.append('variant[2][name]', values.variant[2].name)
            // dataForm.append('variant[2][price]', values.variant[2].price)

            for (const value of dataForm.values()) {
                console.log(value);
            }
            // console.log(...dataForm)

            await axios.post("https://project-wo.herokuapp.com/product", dataForm, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Bearer ${localStorage.getItem("token_merchant")}`
                }
            }).then(res => {
                if (res.status == 200 || res.status == 201) {
                    message.success(`${res.data.message} Menambah Product`)
                    setVisibleTambah(false)
                    getData()
                }
                console.log(res)
            })

        } catch (error) {
            if (error) {
                message.error("Gagal menambahkan data")
            }
        }


    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        message.info(errorInfo.errorFields[0].errors[0])
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
        axios.delete(`https://project-wo.herokuapp.com/product/delete/${modalTaskId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token_merchant")}`
            }
        }).then(res => {

        })
        getData()
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
    // const onChangeFoto = (e) => {
    //     const value = e.target.files[0]
    //     setFoto(value)
    //     // console.log(value)
    // }
    // const normFile = (e) => {
    //     console.log('Upload event:', e);

    //     // if (Array.isArray(e)) {
    //     //     return e;
    //     // }
    //     // return console.log(e?.fileList)

    // };

    const updateModal = (record) => {
        // console.log(record)
        if (record) {
            setModalTaskIdDua(record.id);
            setVisibleDua(true);
            form.setFieldsValue({
                id: record.id,
                name: record.name,
                location: record.location,
                category: record.category.id,
                merchant: record.merchant.id,
                variant: record.variant,
                price: record.price,
                description: record.description,
                availability: record.availability,
                image: record.image
            });
        } else {
            setVisibleDua(false)
        }
    };
    // const onFormSubmit = (e) => {
    //     e.preventDefault()
    // }
    const uploadHandler = async (args) => {
        console.log("masuk sini", args)
        try {
            const formData = new FormData();
            formData.append("image", args.file);

            const processImage = await axios
                .put(
                    `https://project-wo.herokuapp.com/product/edit/image/${modalTaskIdDua}`,
                    formData,
                    { headers: { "content-type": "multipart/form-data" } }
                )
                .then((res) => {
                    // message.success("berhasil Upload File")
                    // onChangeImage(res.data.data.filename)
                    // console.log(res)
                });
        } catch (e) {
            console.log(e, "apa errornya")
                ;
        }
    };
    const handleOkModalUpdate = async () => {
        try {
            const data = await form.getFieldsValue();
            // console.log(data)
            // const dataForm = new FormData()
            // dataForm.append("id", data.id)
            // dataForm.append("name", data.name)
            // dataForm.append('availability', data.availability)
            // dataForm.append('location', data.location)
            // // dataForm.append('image', foto)
            // dataForm.append("description", data.description)
            // dataForm.append("category_id", data.category)
            // dataForm.append("merchant_id", merchantId)

            // for (let i = 0; i < data.variant.length; i++) {
            //     dataForm.append(`variant[${i}][name]`, data.variant[i].name)
            //     dataForm.append(`variant[${i}][price]`, data.variant[i].price)
            // }
            // for (const value of dataForm.values()) {
            //     console.log(value);
            // }
            console.log(data)
            await axios.put(`https://project-wo.herokuapp.com/product/edit/${data.id}`, data, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token_merchant")}`,
                    "content-type": "application/json"
                }
            }).then(res => {
                console.log(res)
            })
            getData()
            setModalTextDua('The modal will be closed after two seconds');
            setConfirmLoading(true);
            setTimeout(() => {
                setVisibleDua(false);
                setConfirmLoading(false);
            }, 2000);
            // location.reload()
        } catch (error) {

        }

    };

    //akhir update modal

    //start Image modal
    const imageModal = async (record) => {
        setLoadingDua(true)
        if (record) {
            // await setModalTaskIdTiga(record);
            setVisibleTiga(true);
            await axios.get(`https://project-wo.herokuapp.com/product/image/${record}`).then(res => {
                setImageUrl(res.config.url)
            })
        } else {
            setVisibleTiga(false)
        }
        setLoadingDua(false)

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
        setVisibleTambah(false)
    };

    // const getToken = localStorage.getItem('token_merchant')
    return (
        <>
            <Content>
                <h1 className='mt-6 ml-14 text-2xl'>Table Product</h1>
                <div className="rounded-lg shadow-lg bg-white mx-10 py-4">

                    <Row className='my-5 ' justify='space-between'>
                        <Col lg={{ span: 5, offset: 2 }} md={{ span: 5, offset: 2 }} sm={{ span: 10 }} xs={{ span: 10 }} >
                            <Search
                                placeholder="Search....."
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
                        <Col lg={{ span: 5, }} md={{ span: 5 }} sm={{ span: 10 }} xs={{ span: 10 }}>
                            {/* product modal form */}
                            <Button type="primary" onClick={showModal}>
                                Tambah Product <PlusOutlined />
                            </Button>
                            <Modal title="Tambah Product"
                                visible={VisibleTambah}
                                footer={[
                                    <Button key="back" onClick={handleCancel}>
                                        Return
                                    </Button>,
                                ]}>
                                <Form
                                    name="basic"
                                    layout='vertical'
                                    // onSubmit={onFormSubmit}
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                    autoComplete="off"
                                    method='POST'
                                >
                                    <Form.Item
                                        label="Product Name"
                                        name="name"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input product Name!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        label="Lokasi"
                                        name="location"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input product Venue!',
                                            },
                                        ]}
                                    >
                                        <Select
                                            defaultValue="All"
                                            style={{
                                                width: 470,
                                            }}
                                            // onChange={onSelectTambah}
                                            placeholder="Filter"
                                        >
                                            <Option value="All">All</Option>
                                            <Option value="Jakarta">Jakarta</Option>
                                            <Option value="Bogor">Bogor</Option>
                                            <Option value="Depok" >Depok</Option>
                                            <Option value="Tanggerang" >Tanggerang</Option>
                                            <Option value="Bekasi" >Bekasi</Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        name="image"
                                        label="Upload"
                                    // valuePropName="fileList"
                                    // getValueFromEvent={normFile}
                                    // extra="Silahkan upload gambar anda"
                                    >
                                        <Upload multiple={false} onChange={onChangeFoto} listType="picture">
                                            <Button icon={<UploadOutlined />}>Click to upload</Button>
                                        </Upload>
                                    </Form.Item>
                                    {/* <input
                        id="img"
                        // style={{ display: "none" }}
                        type="file"
                        accept="image/*"
                        className="form-control block w-full px-4 py-1 text-base font-normal text-gray-700  mb-5
                                    bg-white bg-clip-padding border border-solid border-pink-300 rounded transition 
                                    ease-in-out m-0 focus:text-pink-700 focus:bg-white focus:border-pink-600 focus:outline-none"
                        onChange={onChangeFoto}
                    />
                    <button className="inline-block px-6 py-2 mb-5 border-2 border-pink-500 text-pink-500 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                        <label htmlFor="img"><UploadOutlined /> upload Photo anda </label>
                    </button> */}


                                    <Form.List name="variant">
                                        {(fields, { add, remove }) => (
                                            <>
                                                {fields.map(({ key, name, ...restField }) => (
                                                    <Space
                                                        key={key}
                                                        style={{
                                                            display: 'flex',
                                                            marginBottom: 8,
                                                        }}
                                                        align="baseline"
                                                    >
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'name']}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: 'Missing name',
                                                                },
                                                            ]}
                                                        >
                                                            <Input placeholder="Variant Name" />
                                                        </Form.Item>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'price']}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: 'Missing Price',
                                                                },
                                                            ]}
                                                        >
                                                            <Input placeholder="Variant Price" />
                                                        </Form.Item>
                                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                                    </Space>
                                                ))}
                                                <Form.Item>
                                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                        Tambah varian
                                                    </Button>
                                                </Form.Item>
                                            </>
                                        )}
                                    </Form.List>
                                    <Form.Item
                                        label="Category"
                                        name='category_id'

                                        rules={[
                                            {

                                                message: 'Please select product Category'
                                            }
                                        ]}>
                                        <Select placeholder="--Pilih Category"
                                        >
                                            <Option value="10204698-277b-45a6-9e5e-440091731647" >Wedding Organizer</Option>
                                            <Option value="41d341e1-7126-44f6-8eba-de30bf5a518a" >Venue</Option>
                                            <Option value="68703cc9-a91f-408e-b88d-9c99a7bd3a82" >Chatering</Option>
                                            <Option value="1c6a09c9-8e9c-4648-a0ac-adf7da50744b" >Photographer</Option>
                                        </Select>
                                    </Form.Item>


                                    <Form.Item
                                        label="Deskripsi"
                                        name="description"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input product deskripsi!',
                                            },
                                        ]}
                                    >
                                        <Input.TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
                                    </Form.Item>
                                    <Form.Item
                                        label="Status"
                                        name='availability'

                                        rules={[
                                            {

                                                message: 'Please select product Status'
                                            }
                                        ]}>
                                        <Select placeholder="--Pilih status"
                                        >
                                            <Option value="Tersedia" >Tersedia</Option>
                                            <Option value="Tidak-Tersedia">Tidak Tersedia</Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        name="merchant_id"
                                    >
                                        <Input value={merchantId} type="hidden" />
                                    </Form.Item>
                                    <Form.Item

                                    >
                                        <Button type="primary" htmlType="submit" >
                                            Submit
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Modal>

                        </Col>
                    </Row>
                    <Row justify="center" align="middle" style={{ overflow: "auto" }}>

                        <Col lg={{ span: 20 }} md={{ span: 22 }}  >
                            <Table
                                loading={loading}
                                columns={getColumns(deleteModal, updateModal, imageModal)}
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
                                title="Konfirmasi Update Data"
                                visible={visibleDua}
                                onOk={handleOkModalUpdate}
                                confirmLoading={confirmLoading}
                                onCancel={handleCancel}
                            >
                                <Form
                                    form={form}
                                    name="basic"
                                    layout='vertical'
                                    // onSubmit={onFormSubmit}
                                    // onFinish={onFinish}
                                    // onFinishFailed={onFinishFailed}
                                    autoComplete="off"
                                    method='POST'
                                >
                                    <Form.Item
                                        label="Product Name"
                                        name="name"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input product Name!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        label="Lokasi"
                                        name="location"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input product Venue!',
                                            },
                                        ]}
                                    >
                                        <Select
                                            defaultValue="All"
                                            style={{
                                                width: 470,
                                            }}
                                            onChange={onSelect}
                                            placeholder="Filter"
                                        >
                                            <Option value="All">All</Option>
                                            <Option value="Jakarta">Jakarta</Option>
                                            <Option value="Bogor">Bogor</Option>
                                            <Option value="Depok" >Depok</Option>
                                            <Option value="Tanggerang" >Tanggerang</Option>
                                            <Option value="Bekasi" >Bekasi</Option>
                                        </Select>
                                    </Form.Item>
                                    {/* <input
                                        id='img'
                                        style={{ display: "none" }}
                                        type="file"
                                        accept="image/*"
                                        className="form-control block w-full px-4 py-1 text-base font-normal text-gray-700 
                                    bg-white bg-clip-padding border border-solid border-pink-300 rounded transition 
                                    ease-in-out m-0 focus:text-pink-700 focus:bg-white focus:border-pink-600 focus:outline-none"
                                        onChange={onChangeFoto}
                                    />
                                    <button className="inline-block px-6 py-2 mb-5 border-2 border-pink-500 text-pink-500 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                                        <label htmlFor="img"><UploadOutlined /> upload Photo anda </label>
                                    </button> */}
                                    <Form.Item

                                        label="Upload"
                                    // valuePropName="fileList"
                                    // getValueFromEvent={normFile}

                                    >
                                        <Upload customRequest={(args) => uploadHandler(args)} multiple={false} listType="picture">
                                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                        </Upload>
                                    </Form.Item>
                                    <Form.List name="variant">
                                        {(fields, { add, remove }) => (
                                            <>
                                                {fields.map(({ key, name, ...restField }) => (
                                                    <Space
                                                        key={key}
                                                        style={{
                                                            display: 'flex',
                                                            marginBottom: 8,
                                                        }}
                                                        align="baseline"
                                                    >
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'name']}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: 'Missing name',
                                                                },
                                                            ]}
                                                        >
                                                            <Input placeholder="Variant Name" />
                                                        </Form.Item>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'price']}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: 'Missing Price',
                                                                },
                                                            ]}
                                                        >
                                                            <Input placeholder="Variant Price" />
                                                        </Form.Item>
                                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                                    </Space>
                                                ))}
                                                <Form.Item>
                                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                        Tambah varian
                                                    </Button>
                                                </Form.Item>
                                            </>
                                        )}
                                    </Form.List>
                                    <Form.Item
                                        label="Category"
                                        name='category'

                                        rules={[
                                            {

                                                message: 'Please select product Category'
                                            }
                                        ]}>
                                        <Select placeholder="--Pilih Category"
                                        >
                                            <Option value="10204698-277b-45a6-9e5e-440091731647" >Wedding Organizer</Option>
                                            <Option value="41d341e1-7126-44f6-8eba-de30bf5a518a" >Venue</Option>
                                            <Option value="68703cc9-a91f-408e-b88d-9c99a7bd3a82" >Chatering</Option>
                                            <Option value="1c6a09c9-8e9c-4648-a0ac-adf7da50744b" >Photographer</Option>
                                        </Select>
                                    </Form.Item>


                                    <Form.Item
                                        label="Deskripsi"
                                        name="description"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input product deskripsi!',
                                            },
                                        ]}
                                    >
                                        <Input.TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
                                    </Form.Item>
                                    <Form.Item
                                        label="Status"
                                        name='availability'

                                        rules={[
                                            {

                                                message: 'Please select product Status'
                                            }
                                        ]}>
                                        <Select placeholder="--Pilih status"
                                        >
                                            <Option value="Tersedia" >Tersedia</Option>
                                            <Option value="non-tersedia" >Non-Tersedia</Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        name="merchant_id"
                                    >
                                        <Input value={merchantId} type="hidden" />
                                    </Form.Item>
                                    <Form.Item
                                        name="id"
                                    >
                                        <Input type="hidden" />
                                    </Form.Item>
                                    <Form.Item>

                                    </Form.Item>
                                </Form>
                                {/* <p className='text-red-500'>{JSON.stringify(modalTaskIdDua)}</p> */}
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