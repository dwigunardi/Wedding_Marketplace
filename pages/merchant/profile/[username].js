import { Col, Row, Card, Button, Form, Input, Space, } from "antd";
import { Content } from "antd/lib/layout/layout";
import { useRouter, Router } from "next/router";
import MainLayout from "../../../components/admin/layout/mainLayout";
import Image from "next/image";
import ImgPlaceholder from "../../../public/Image/img-placeholder.png"
import { useEffect, useState } from "react";
import Link from "next/link";
import BackButton from "../../backButton";
import axios from "axios";

export default function detailMerchantId() {

    const [dataUser, setDataUser] = useState([])

    async function validate() {
        try {
            const getData = await axios.get("https://project-wo.herokuapp.com/users").then(response => {
                if (response.status == 200 || response.status == 201) {
                    setDataUser(response.data.items)

                }


            })
        } catch (error) {

        }
        return
    }
    useEffect(() => {

        validate().then(show => {

            const dataSelected = dataUser.find((dataUser) => dataUser.username == username)

            const myData = {
                name: `${dataSelected?.name}`,
                username: `${dataSelected?.username}`,
                email: `${dataSelected?.email}`,
                no_telp: `${dataSelected?.no_telp}`,
                image: `${dataSelected?.image}`,
                createdAt: `${dataSelected?.createdAt}`,
                isActive: `${dataSelected?.isActive}`,

            }

            form.setFieldsValue({
                name: myData.name,
                username: myData.username,
                email: myData.email,
                no_telp: myData.no_telp,
                createdAt: myData.createdAt
            })


        })

    }, [validate]);
    const router = useRouter();
    const { username } = router.query;
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
    // const [defaultValues, setDefaultValues] = useState({
    //     name: `${dataSelected?.name}`,
    //     email: `${dataSelected?.age}`,
    //     address: `${dataSelected?.address}`,
    //     age: `${dataSelected?.age}`
    // })


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
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            label="Username"
                                            name="username"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Mohon Isi Email Anda!',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            label="Email"
                                            name="email"
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
                                            label="Phone"
                                            name="no_telp"
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
                                            label="Di buat"
                                            name="createdAt"
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
                                                offset: 3,
                                                span: 16,
                                            }}>
                                            <Button>
                                                Active
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
                                                {/* <Button htmlType="button">
                                                    Reset
                                                </Button> */}
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