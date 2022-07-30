import { Col, Row, Card, Button, Form, Input, Space, } from "antd";
import { Content } from "antd/lib/layout/layout";
import { useRouter, Router } from "next/router";
import MainLayout from "../../../components/admin/layout/mainLayout";
import Image from "next/image";
import ImgPlaceholder from "../../../public/Image/img-placeholder.png"
import { useEffect, useState } from "react";
import Link from "next/link";
import BackButton from "../../../pages/backButton";
import axios from "axios";
import jwt_decode from 'jwt-decode'


export default function Detail() {


    const [username, setUsername] = useState('')
    const [isLogged, setLogged] = useState('')
    const [role, setRole] = useState('')
    const [dataUser, setDataUser] = useState([])


    const router = useRouter();

    async function validate() {
        try {
            const token = await localStorage.getItem('token_customer')
            if (token) {
                setLogged(token)
            } else {
                setLogged(null)
            }
            const decode = await jwt_decode(token)
            const user = decode.username
            const roleId = decode.role
            console.log(decode);

            if (user) {
                setUsername(user)

            } else {
                setUsername(null)
            }
            if (roleId) {
                setRole(roleId)
            }
            const getUsers = await axios.get(`https://project-wo.herokuapp.com/users/username/${user}`,
            ).then(response => {
                console.log(response.data);
                if (response.data[0].username == username) {
                    setDataUser(response.data)
                }

            })

        } catch (error) {

        }
    }




    useEffect(() => {

        validate()

    });

    const [form] = Form.useForm();

    return (
        <>
            <Content>
                <h1 className='mt-6 ml-14 text-2xl'>Detail User</h1>
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
                                            priority={true}
                                        />
                                    </a>
                                    <br />

                                </Col>
                            </Row>
                            <div className="w-full border-b-2" ></div>
                            <div className="p-6">
                                {dataUser.map((data) => {
                                    return (
                                        <>
                                            <Form
                                                form={form}
                                                labelCol={{
                                                    span: 3,
                                                }}
                                                wrapperCol={{
                                                    span: 16,
                                                }}
                                                initialValues={{
                                                    name: data.name,
                                                    email: data.email,
                                                    no_telp: data.no_telp,

                                                }}

                                                disabled={true}
                                                autoComplete="off"

                                            >
                                                <Form.Item
                                                    label="Name"
                                                    name="name"

                                                >
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item
                                                    label="Email"
                                                    name="email"

                                                >
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item
                                                    label="No Telpon"
                                                    name="no_telp"

                                                >
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item
                                                    wrapperCol={{
                                                        offset: 3,
                                                        span: 16,
                                                    }}>
                                                    <Button>
                                                        role :  {role}
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
                                                        <Button htmlType="button" >
                                                            Reset
                                                        </Button>
                                                    </Space>
                                                </Form.Item>
                                            </Form>
                                        </>
                                    )
                                })}
                            </div>
                        </div>


                    </Col>
                </Row>
            </Content>

        </>
    )
}