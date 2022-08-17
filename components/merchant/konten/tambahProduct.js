import { Button, Input, Modal, Form, Select, Upload, Space, message } from 'antd';
import React, { useState } from 'react';
import { PlusOutlined, UploadOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useRouter } from "next/router"
import axios from "axios"
import jwt_decode from 'jwt-decode';
const { Option } = Select;

export default function TambahProduct(props) {

    // const token = localStorage.getItem('token_merchant')
    // const decode = jwt_decode(token)
    const [VisibleTambah, setVisibleTambah] = useState(false);
    const [loading, setLoading] = useState(false);

    const [product, setProduct] = useState('')
    const [venue, setVenue] = useState('')
    const [lokasi, setLokasi] = useState('')
    const [harga, setHarga] = useState('')
    const [varian, setVarian] = useState('')
    const [foto, setFoto] = useState('')
    const [status, setStatus] = useState('Tersedia')
    const [deskripsi, setDeskripsi] = useState('')

    const onChangeProduct = (e) => {
        const value = e.target.value
        setProduct(value)
    }
    const onChangeVenue = (e) => {
        const value = e.target.value
        setVenue(value)
    }
    const onChangeLokasi = (e) => {
        const value = e.target.value
        setLokasi(value)
    }
    const onChangeVarian = (e) => {
        const value = e.target.value
        setVarian(value)
    }
    const onChangeHarga = (e) => {
        const value = e.target.value
        setHarga(value)
    }
    const onChangeFoto = (e) => {
        const value = e.file.originFileObj
        // console.log(value)
        setFoto(value)
    }
    const onChangeStatus = (e) => {
        const value = e.target.value
        setStatus(value)
    }
    const onChangeDeskripsi = (e) => {
        const value = e.target.value
        setDeskripsi(value)
    }
    const showModal = () => {
        setVisibleTambah(true);
    };

    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setVisibleTambah(false);
        }, 2000);
    };

    const handleCancel = () => {
        setVisibleTambah(false);
    };
    const onSelect = (value) => {
        // console.log('onSelect', value);
        setLokasi(value)
    };

    const normFile = (e) => {
        console.log('Upload event:', e);
        // setFoto(e)
        if (Array.isArray(e)) {
            return e;
        }

        return e?.fileList;
    };
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
            dataForm.append("merchant_id", props.merchant)

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
                }
                console.log(res)
            })

        } catch (error) {

        }


    };


    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const onFormSubmit = (e) => {
        e.preventDefault()
    }

    const router = useRouter()
    const { TextArea } = Input;

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Tambah Product <PlusOutlined />
            </Button>
            <Modal title="Tambah Product"
                visible={VisibleTambah}
                onOk={handleOk}
                onCancel={handleCancel}
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
                        <Input.TextArea autoSize={{ minRows: 3, maxRows: 5 }} value={deskripsi} onChange={onChangeDeskripsi} />
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
                            <Option value="Tersedia" onChange={onChangeStatus}>Tersedia</Option>
                            <Option value="Tidak-Tersedia" onChange={onChangeStatus}>Tidak Tersedia</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="merchant_id"
                    >
                        <Input value={props.merchant} type="hidden" />
                    </Form.Item>
                    <Form.Item

                    >
                        <Button type="primary" htmlType="submit" >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}