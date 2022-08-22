import { Col, Row, Card, Button, Form, Input, Space, Modal, Upload, message } from "antd";
import {
    InboxOutlined, UploadOutlined, EyeTwoTone,
    EyeInvisibleOutlined
} from '@ant-design/icons';
import { Content } from "antd/lib/layout/layout";
import { useRouter, Router } from "next/router";
import Image from "next/image";
// import ImgPlaceholder from "../../../public/Image/img-placeholder.png"
import { useEffect, useState } from "react";
import Link from "next/link";
import BackButton from "../../pages/backButton";
import axios from "axios";
import jwt_decode from "jwt-decode";



export default function DetailCustomer() {
    const [form] = Form.useForm();
    const [formUpdate] = Form.useForm()
    const [dataUser, setDataUser] = useState({})
    const [myRole, setMyRole] = useState({})
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [myDate, setMyDate] = useState('')
    async function validate() {
        try {
            const getToken = localStorage.getItem("token_customer")
            const decode = jwt_decode(getToken)
            const getData = await axios.get(`https://project-wo.herokuapp.com/users/detail/${decode.user_id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token_customer")}`
                }
            }).then(response => {
                if (response.status == 200 || response.status == 201) {
                    setDataUser(response.data.data)
                    setMyRole(response.data.data.role)
                    setMyDate(response.data.data.createdAt.split("T")[0])
                }
            })
        } catch (error) {

        }
        return
    }
    useEffect(() => {

        validate()

    }, []);

    const router = useRouter();
    const { username } = router.query;

    const date = new Date(dataUser.createdAt)

    // console.log(myDate)
    form.setFieldsValue({
        id: dataUser.id,
        name: dataUser.name,
        username: dataUser.username,
        email: dataUser.email,
        no_telp: dataUser.no_telp,
        createdAt: myDate,
        image: dataUser.image
    })

    const showModal = () => {
        setVisible(true);
        // formUpdate.setFieldsValue({
        //     id: dataUser.id,
        //     name: dataUser.name,
        //     username: dataUser.username,
        //     email: dataUser.email,
        //     no_telp: dataUser.no_telp,
        //     createdAt: myDate,
        //     image: dataUser.image
        // })
        // console.log(data)
    };
    const handleCancel = () => {
        setVisible(false);
    };

    const handleOkModalUpdate = async () => {
        try {
            const data = await formUpdate.getFieldsValue();
            await axios.put(`https://project-wo.herokuapp.com/users/edit/${dataUser.id}`, data, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token_customer")}`,
                    "content-type": "application/json"
                }
            }).then(res => {
                setDataUser(res.data.data)
            })
            setConfirmLoading(true);
            setTimeout(() => {
                message.success("Data Berhasil di Update")
                validate()
                setVisible(false);
                setConfirmLoading(false);
            }, 2000);
            // location.reload()
        } catch (error) {

        }

    };
    const uploadHandler = async (args) => {
        console.log("masuk sini", args)
        try {
            const formData = new FormData();
            formData.append("image", args.file);

            const processImage = await axios
                .put(
                    `https://project-wo.herokuapp.com/users/edit/image/${dataUser.id}`,
                    formData,
                    {
                        headers:
                        {
                            "content-type": "multipart/form-data",
                            'Authorization': `Bearer ${localStorage.getItem("token_customer")}`,
                        }
                    }
                )
                .then((res) => {
                    message.success("berhasil Upload File")
                    // onChangeImage(res.data.data.filename)
                    setDataUser(res.data.data)
                    console.log(res)
                });
        } catch (e) {
            console.log(e, "apa errornya")
                ;
        }
    };

    const orig = `https://project-wo.herokuapp.com/users/image/${dataUser.image}`
    const onChangeName = (e) => {
        const value = e.target.value
        setNameUpdate(value)
    }
    const onChangeEmail = (e) => {
        const value = e.target.value
        setEmailUpdate(value)
    }
    const onChangeUsername = (e) => {
        const value = e.target.value
        setUsernameUpdate(value)
    }
    const onChangeNoTel = (e) => {
        const value = e.target.value
        setNoTelUpdate(value)
    }
    const onChangePassword = (e) => {
        const value = e.target.value
        setPassword(value)
    }
    const onChangeId = (e) => {
        const value = e.target.value
        setId(myData.id)
        console.log(value)
    }
    const onChangeImage = (e) => {
        const value = e.target.files[0]
        setImage(value)
    }
    const onChangeToko = (e) => {
        const value = e.target.value
        setNamaToko(value)
    }
    const onFormSubmit = (e) => {
        e.preventDefault()
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const onReset = () => {

        form.setFieldsValue({
            id: dataUser.id,
            name: dataUser.name,
            username: dataUser.username,
            email: dataUser.email,
            no_telp: dataUser.no_telp,
            createdAt: myDate,
            image: dataUser.image
        })

    };





    // console.log(date)

    return (
        <>

            <Content>

                <Row justify="center" align="middle" className='mt-6 ' >
                    <Col lg={{ span: 16 }} sm={{ span: 20 }}>
                        <div className="rounded-lg shadow-lg bg-white ">
                            <Row justify="center" align="middle" className="p-5">
                                <Col span={5}>

                                    <Image
                                        className="rounded-t-lg"
                                        loader={() => dataUser.image}
                                        priority={true}
                                        unoptimized={true}
                                        src={`https://project-wo.herokuapp.com/product/image/${dataUser.image}`}
                                        width={150}
                                        height={150}
                                        alt=""
                                    />
                                    <Upload customRequest={(args) => uploadHandler(args)} multiple={false} showUploadList={false}>
                                        <Button icon={<UploadOutlined />}>Upload Photo</Button>
                                    </Upload>

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
                                    // onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                    disabled={true}
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

                                    </Form.Item>
                                </Form>
                                <Space>

                                    <BackButton />
                                    <Button htmlType="button" onClick={onReset}>
                                        Reset
                                    </Button>
                                    <Button htmlType="button" onClick={showModal}>
                                        Update
                                    </Button>
                                </Space>
                                {/* modal update */}
                                <Modal
                                    title="Update Data"
                                    visible={visible}
                                    onOk={handleOkModalUpdate}
                                    confirmLoading={confirmLoading}
                                    onCancel={handleCancel}

                                >

                                    <Form
                                        layout="vertical"
                                        form={formUpdate}
                                        labelCol={{
                                            span: 16,
                                        }}
                                        wrapperCol={{
                                            span: 16,
                                        }}
                                        // onFinish={onFinish}
                                        onFinishFailed={onFinishFailed}
                                        autoComplete="off"
                                        initialValues={dataUser}
                                    >
                                        <Form.Item
                                            label=" Ganti Nama"
                                            name="name"

                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            label="Ganti username"
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
                                            label="Ganti Email"
                                            name="email"

                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            label="Ganti No telpon"
                                            name="no_telp"

                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name="password"
                                            label="Ganti Password"



                                        >
                                            <Input.Password iconRender={(visible) => (visible ? <EyeTwoTone style={{ color: "pink" }} /> : <EyeInvisibleOutlined style={{ color: "pink" }} />)} />
                                        </Form.Item>
                                    </Form>

                                </Modal>
                            </div>
                        </div>


                    </Col>
                </Row>
            </Content>

        </>
    )
}