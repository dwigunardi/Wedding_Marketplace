import { Col, Row, Card, Button, Form, Input, Space, } from "antd";
import { Content } from "antd/lib/layout/layout";
import { useRouter, Router } from "next/router";
import MainLayout from "../../../components/admin/layout/mainLayout";
import Image from "next/image";
import ImgPlaceholder from "../../../public/Image/img-placeholder.png"
import { useEffect, useState } from "react";
import Link from "next/link";
import BackButton from "../../backButton";

export default function detailUserId() {

    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['Admin'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['Customer'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['Merchant'],
        },
    ];
    const router = useRouter();
    const { key } = router.query;
    const dataSelected = data.find((data) => data.key == key);
    // state di update berdasarkan data harus di ubah
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [age, setAge] = useState('')

    const onChangeName = (e) => {
        const value = e.target.value
        setName(value)
    }
    const onChangeEmail = (e) => {
        const value = e.target.value
        setEmail(value)
    }
    const onChangeAddress = (e) => {
        const value = e.target.value
        setAddress(value)
    }
    const onChangeAge = (e) => {
        const value = e.target.value
        setAge(value)
    }
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const [defaultValues, setDefaultValues] = useState({
        name: `${dataSelected?.name}`,
        email: `${dataSelected?.age}`,
        address: `${dataSelected?.address}`,
        age: `${dataSelected?.age}`
    })


    const onReset = () => {
        useEffect(() => {
            form.setFieldsValue(defaultValues)
        }, [form, defaultValues])
    };


    const [form] = Form.useForm();
    return (
        <>
            <MainLayout>
                <Content>
                    <h1 className='mt-6 ml-14 text-2xl'>Form Detail User</h1>
                    <Row justify="center" align="middle" className='mt-6 ' >
                        <Col lg={{ span: 16 }} sm={{ span: 20 }}>
                            <div className="rounded-lg shadow-lg bg-white ">
                                <Row justify="center" align="middle">
                                    <Col>
                                        <a href="#!" className="mx-20">
                                            <Image
                                                className="rounded-t-lg"
                                                src={ImgPlaceholder}
                                                width={150}
                                                height={150}
                                                alt=""
                                            />
                                        </a>
                                        <br />

                                    </Col>
                                </Row>
                                <div className="w-full border-b-2" ></div>
                                <div className="p-6">

                                    <Form
                                        form={form}
                                        labelCol={{
                                            span: 3,
                                        }}
                                        wrapperCol={{
                                            span: 16,
                                        }}
                                        initialValues={defaultValues}
                                        onFinish={onFinish}
                                        onFinishFailed={onFinishFailed}
                                        autoComplete="off"

                                    >
                                        <Form.Item
                                            label="Name"
                                            name="name"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Mohon Isi Nama Anda!',
                                                },
                                            ]}
                                        >
                                            <Input value={name}
                                                onChange={onChangeName} />
                                        </Form.Item>
                                        <Form.Item
                                            label="Age"
                                            name="age"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Mohon Isi Email Anda!',
                                                },
                                            ]}
                                        >
                                            <Input value={age}
                                                onChange={onChangeAge} />
                                        </Form.Item>
                                        <Form.Item
                                            label="Address"
                                            name="address"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Mohon Isi Nama Anda!',
                                                },
                                            ]}
                                        >
                                            <Input value={address}
                                                onChange={onChangeAddress} />
                                        </Form.Item>
                                        <Form.Item
                                            wrapperCol={{
                                                offset: 3,
                                                span: 16,
                                            }}>
                                            <Button>
                                                {dataSelected?.tags}
                                            </Button>
                                        </Form.Item>

                                        <Form.Item
                                            wrapperCol={{
                                                offset: 3,
                                                span: 16,
                                            }}
                                        >
                                            <Space>

                                                <BackButton />
                                                <Button htmlType="button" onClick={onReset}>
                                                    Reset
                                                </Button>
                                            </Space>
                                        </Form.Item>
                                    </Form>

                                </div>
                            </div>


                        </Col>
                    </Row>
                </Content>
            </MainLayout>
        </>
    )
}