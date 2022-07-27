import { Button, Input, Modal, Form, Select, } from 'antd';
import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { useRouter } from "next/router"
import axios from "axios"

export default function TambahProduct() {
    const [visible, setVisible] = useState(false);
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
        const value = e.target.value
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
        setVisible(true);
    };

    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setVisible(false);
        }, 2000);
    };

    const handleCancel = () => {
        setVisible(false);
    };
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const onFormSubmit = (e) => {
        e.preventDefault()
    }

    const router = useRouter()
    const { TextArea } = Input;
    const submitTambah = async () => {

        try {
            const formData = {
                product: product,
                venue: venue,
                lokasi: lokasi,
                varian: varian,
                harga: harga,
                foto: foto,
                deskripsi: deskripsi,
                status: status,
            }

            console.log(formData)


        } catch (error) {
            console.error(error);
        }

    }
    return (
        <>
            <Button type="primary" onClick={showModal}>
                Tambah Product <PlusOutlined />
            </Button>
            <Modal title="Tambah Product"
                visible={visible}
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
                    onSubmit={onFormSubmit}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    method='POST'
                >
                    <Form.Item
                        label="Product"
                        name="product"
                        rules={[
                            {
                                required: true,
                                message: 'Please input product Name!',
                            },
                        ]}
                    >
                        <Input value={product} onChange={onChangeProduct} />
                    </Form.Item>

                    <Form.Item
                        label="Venue"
                        name="venue"
                        rules={[
                            {
                                required: true,
                                message: 'Please input product Venue!',
                            },
                        ]}
                    >
                        <Input value={venue} onChange={onChangeVenue} />
                    </Form.Item>
                    <Form.Item
                        label="Lokasi"
                        name="lokasi"
                        rules={[
                            {
                                required: true,
                                message: 'Please input product Lokasi!',
                            },
                        ]}
                    >
                        <Input value={lokasi} onChange={onChangeLokasi} />
                    </Form.Item>
                    <Form.Item
                        label="Varian"
                        name="varian"
                        rules={[
                            {
                                required: true,
                                message: 'Please input product Varian!',
                            },
                        ]}
                    >
                        <Input value={varian} onChange={onChangeVarian} />
                    </Form.Item>
                    <Form.Item
                        label="Harga"
                        name="harga"
                        rules={[
                            {
                                required: true,
                                message: 'Please input product harga!',
                            },
                        ]}
                    >
                        <Input value={harga} onChange={onChangeHarga} />
                    </Form.Item>

                    <Form.Item
                        label="Foto"
                        name="foto"
                        rules={[
                            {
                                required: true,
                                message: 'Please input product foto!',
                            },
                        ]}
                    >
                        <Input type='file' value={foto} onChange={onChangeFoto} />
                    </Form.Item>
                    <Form.Item
                        label="Deskripsi"
                        name="deskripsi"
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
                        name='status'

                        rules={[
                            {

                                message: 'Please select product Status'
                            }
                        ]}>
                        <Select value={status}
                        >
                            <Select.Option value="Tersedia" onChange={onChangeStatus}>Tersedia</Select.Option>
                            <Select.Option value="non-tersedia" onChange={onChangeStatus}>Non-Tersedia</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item

                    >
                        <Button type="primary" htmlType="submit" onClick={submitTambah}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}