import { Col, Row, Card, Button, Form, Input, Space, Tag, message, } from "antd";
import { Content } from "antd/lib/layout/layout";
import { useRouter, Router } from "next/router";
import MainLayout from "../../../components/admin/layout/mainLayout";
import Image from "next/image";
import { React, useState, useEffect } from "react";
import BackButton from "../../backButton";
import axios from "axios";
import 'tailwindcss/tailwind.css'
import { Editor } from '@tinymce/tinymce-react';
const { TextArea } = Input;
export default function DetailProduct() {

    const [dataProduct, setDataProduct] = useState([])
    const [variant, setVariant] = useState({
        name: '',
        price: ''
    })
    const [form] = Form.useForm();
    async function validate() {
        try {
            const getData = await axios.get("https://project-wo.herokuapp.com/product").then(response => {
                console.log(response)
                if (response.status == 200 || response.status == 201) {
                    setDataProduct(response.data.items)
                }
            })
        } catch (error) {
            if (error) {
                message.error(error.message)
            }
        }

    }
    useEffect(() => {
        validate()
    }, []);



    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const router = useRouter();
    const { id } = router.query;
    const dataSelected = dataProduct.find((dataProduct) => dataProduct.id == id);

    const myData = {
        id: `${dataSelected?.id}`,
        availability: `${dataSelected?.availability}`,
        description: `${dataSelected?.description}`,
        location: `${dataSelected?.location}`,
        name: `${dataSelected?.name}`,
        merchant: `${dataSelected?.merchant.name}`,
        category: `${dataSelected?.category.name}`,
        image: `${dataSelected?.image}`,
        // variant: [dataSelected?.variant.map((data) => {
        //     return (
        //         <Tag color={'volcano'} >
        //             {data}
        //         </Tag>
        //     );
        // })]
    }
    const dataImg = `https://project-wo.herokuapp.com/product/image/${myData.image}`
    form.setFieldsValue({
        name: myData.name,
        availability: myData.availability,
        location: myData.location,
        merchant: myData.merchant,
        category: myData.category,
        description: myData.description,
        variant: myData.variant
    })

    return (
        <>
            <MainLayout>
                <Content>
                    <h1 className='mt-6 ml-14 text-2xl'>Form Detail Product</h1>
                    <div className="rounded-lg shadow-lg bg-white mx-10 mb-10">
                        <Row justify="space-between" align="middle">
                            <Col lg={{ span: 11 }} md={{ span: 12 }} sm={{ span: 24 }} offset={1}>

                                <Image
                                    loader={() => dataImg}
                                    src={dataImg}
                                    priority={true}
                                    unoptimized={true}
                                    width={400}
                                    height={300}
                                />
                                <div className="mt-5 p-5">
                                    <Form
                                        layout="vertical"
                                        form={form}
                                        labelCol={{
                                            span: 3,
                                        }}
                                        wrapperCol={{
                                            span: 16,
                                        }}
                                        onFinish={onFinish}
                                        onFinishFailed={onFinishFailed}
                                        autoComplete="off"

                                    >
                                        <Form.Item
                                            label="Deskripsi"
                                            name="description"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Mohon Isi Nama Anda!',
                                                },
                                            ]}
                                        >
                                            <TextArea autoSize={true} />

                                        </Form.Item>
                                    </Form>
                                </div>
                            </Col>
                            <Col lg={{ span: 12 }} md={{ span: 12 }} sm={{ span: 24 }} className="mt-5">

                                <Form
                                    layout="vertical"
                                    form={form}
                                    labelCol={{
                                        span: 3,
                                    }}
                                    wrapperCol={{
                                        span: 20,
                                    }}

                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                    autoComplete="off"

                                >
                                    <Form.Item
                                        label="Product"
                                        name="name"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Mohon Isi Nama Anda!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Category"
                                        name="category"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Mohon Isi Nama Anda!',
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
                                                message: 'Mohon Isi Nama Anda!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Availability"
                                        name="availability"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Mohon Isi Nama Anda!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Pemilik"
                                        name="merchant"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Mohon Isi Nama Anda!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        wrapperCol={{

                                            span: 16,
                                        }}
                                        name="variant"
                                    >

                                        {/* {myData.variant.map((data) => {
                                            let color = ''
                                            // if (name) {
                                            //     color = 'green';
                                            // }
                                            // else if (price) {
                                            //     color = 'volcano';
                                            // }


                                           
                                        })}
                                        { } */}

                                    </Form.Item>

                                    <Form.Item
                                        wrapperCol={{

                                            span: 16,
                                        }}
                                    >
                                        <Space>

                                            <BackButton />
                                            <Button htmlType="button" >
                                                Reset
                                            </Button>
                                        </Space>
                                    </Form.Item>
                                </Form>
                            </Col>
                        </Row>
                    </div>
                </Content>
            </MainLayout>
        </>
    )
}