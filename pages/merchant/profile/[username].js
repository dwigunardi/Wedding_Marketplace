import { Col, Row, Card, Button, Form, Input, Space, Modal, Upload, message } from "antd";
import {
    InboxOutlined, UploadOutlined, EyeTwoTone,
    EyeInvisibleOutlined
} from '@ant-design/icons';
import { Content } from "antd/lib/layout/layout";
import { useRouter, Router } from "next/router";
import MerchantLayout from "../../../components/merchant/layout/merchantLayout";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import BackButton from "../../backButton";
import axios from "axios";
import jwt_decode from "jwt-decode";

export default function detailMerchantId() {
    const router = useRouter();
    const { username } = router.query;
    // state di update berdasarkan data harus di ubah
    const [token, setToken] = useState('')
    const [dataToken, setDataToken] = useState('')
    const [myRole, setMyRole] = useState({})
    const [id, setId] = useState('')
    const [nameUpdate, setNameUpdate] = useState('')
    const [password, setPassword] = useState('')
    const [usernameUpdate, setUsernameUpdate] = useState('')
    const [emailUpdate, setEmailUpdate] = useState('')
    const [noTelpUpdate, setNoTelUpdate] = useState('')
    const [namaToko, setNamaToko] = useState('')
    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [dataUser, setDataUser] = useState({})
    const [form] = Form.useForm();
    const [formUpdate] = Form.useForm()

    function getUser() {
        const getToken = localStorage.getItem("token_merchant")
        const decode = jwt_decode(getToken)
        setToken(getToken)
        setDataToken(decode)
        axios.get(`https://project-wo.herokuapp.com/users/detail/${decode.user_id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token_merchant")}`
            }
        }).then(response => {
            console.log(response)
            if (response.status == 200 || response.status == 201) {
                setDataUser(response.data.data)
                setMyRole(response.data.data.role)
            }
        })
    }
    useEffect(() => {

        getUser()

    }, [])


    form.setFieldsValue({
        id: dataUser.id,
        name: dataUser.name,
        username: dataUser.username,
        email: dataUser.email,
        no_telp: "+62" + dataUser.no_telp,
        createdAt: dataUser.createdAt?.slice(0, 10),
        image: dataUser.image
    })

    // console.log(dataUser.image)
    const showModal = () => {
        setVisible(true);
        formUpdate.setFieldsValue({
            id: dataUser.id,
            name: dataUser.name,
            username: dataUser.username,
            email: dataUser.email,
            no_telp: "+62" + dataUser.no_telp,
            createdAt: dataUser.createdAt?.slice(0, 10),
            image: dataUser.image
        })
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
                    'Authorization': `Bearer ${localStorage.getItem("token_merchant")}`,
                    "content-type": "application/json"
                }
            }).then(res => {
                setDataUser(res.data.data)
            })
            setConfirmLoading(true);
            setTimeout(() => {
                getUser()
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
                            'Authorization': `Bearer ${localStorage.getItem("token_merchant")}`,
                        }
                    }
                )
                .then((res) => {
                    message.success("berhasil Upload File")
                    // onChangeImage(res.data.data.filename)
                    getUser()
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


    // async function submitUpdate() {
    //     try {
    //         const dataUpdate = new FormData()
    //         dataUpdate.append('id', id)
    //         dataUpdate.append('nameUpdate', nameUpdate)
    //         dataUpdate.append('usernameUpdate', usernameUpdate)
    //         dataUpdate.append('emailUpdate', emailUpdate)
    //         dataUpdate.append('no_telpUpdate', noTelpUpdate)
    //         dataUpdate.append('password', password)
    //         // dataUpdate.append('image', image)
    //         // for (const value of dataUpdate.values()) {
    //         //     console.log(value);
    //         // }
    //         await axios.put(`https://project-wo.herokuapp.com/users/${myData.id}`, {
    //             headers: {
    //                 'Authorization': `Bearer ${localStorage.getItem("token_merchant")}`
    //             }
    //         }, dataUpdate).then(res => {
    //             // console.log(res)
    //             if (res.status == 200 || res.status == 201) {
    //                 window.alert("berhasil update")
    //                 location.reload()
    //             }
    //         })
    //     } catch (error) {
    //         window.alert(error + error.message)
    //     }

    // }
    const onReset = () => {

        form.setFieldsValue(dataUser)

    };
    // console.log(myRole)

    return (
        <>
            <MerchantLayout>
                <Content>
                    <h1 className='mt-6 ml-14 text-2xl'>Form Detail Merchant</h1>
                    <Row justify="center" align="middle" className='mt-6 ' >
                        <Col lg={{ span: 16 }} sm={{ span: 20 }}>
                            <div className="rounded-lg shadow-lg bg-white ">
                                <Row justify="center" align="middle" className="p-5">
                                    <Col span={5}>

                                        <Image
                                            className="rounded-t-lg"
                                            loader={() => dataUser.image}
                                            src={`https://project-wo.herokuapp.com/product/image/${dataUser.image}`}
                                            width={150}
                                            height={150}
                                            alt=""
                                            priority={true}
                                            unoptimized={true}
                                        />
                                        <Upload customRequest={(args) => uploadHandler(args)} multiple={false} showUploadList={false}>
                                            <Button icon={<UploadOutlined />}>Upload Photo</Button>
                                        </Upload>

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
                                        // onFinish={onFinish}
                                        onFinishFailed={onFinishFailed}
                                        autoComplete="off"
                                        disabled={true}
                                    >
                                        <Form.Item
                                            label="Name"
                                            name="name"

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

                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            label="Phone"
                                            name="no_telp"

                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            label="Di buat"
                                            name="createdAt"

                                        >
                                            <Input />
                                        </Form.Item>

                                        <Form.Item
                                            wrapperCol={{
                                                offset: 3,
                                                span: 16,
                                            }}>
                                            <Button>
                                                Role : {myRole.name}
                                            </Button>
                                        </Form.Item>

                                    </Form>
                                    <Space className="ml-20">
                                        <Button htmlType="button" onClick={onReset}>
                                            Reset
                                        </Button>
                                        <Button htmlType="button" onClick={showModal}>
                                            Update
                                        </Button>
                                        <BackButton />
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
                                                label="Name"
                                                name="name"

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

                                            >
                                                <Input />
                                            </Form.Item>
                                            <Form.Item
                                                label="Phone"
                                                name="no_telp"

                                            >
                                                <Input />
                                            </Form.Item>
                                            <Form.Item
                                                name="upload"
                                                label="Upload"
                                            // valuePropName="fileList"


                                            >
                                                <Upload customRequest={(args) => uploadHandler(args)} multiple={false}>
                                                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                                </Upload>
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
            </MerchantLayout>
        </>
    )
}