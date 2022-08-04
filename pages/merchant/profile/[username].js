import { Col, Row, Card, Button, Form, Input, Space, Modal, Upload } from "antd";
import {
    InboxOutlined, UploadOutlined, EyeTwoTone,
    EyeInvisibleOutlined
} from '@ant-design/icons';
import { Content } from "antd/lib/layout/layout";
import { useRouter, Router } from "next/router";
import MainLayout from "../../../components/admin/layout/mainLayout";
import Image from "next/image";
import ImgPlaceholder from "../../../public/Image/img-placeholder.png"
import { useEffect, useState } from "react";
import Link from "next/link";
import BackButton from "../../backButton";
import axios from "axios";

const normFile = (e) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
        return e;
    }

    return e?.fileList;
};

export default function detailMerchantId() {

    // state di update berdasarkan data harus di ubah
    const [id, setId] = useState('')
    const [nameUpdate, setNameUpdate] = useState('')
    const [password, setPassword] = useState('')
    const [usernameUpdate, setUsernameUpdate] = useState('')
    const [emailUpdate, setEmailUpdate] = useState('')
    const [noTelpUpdate, setNoTelUpdate] = useState('')
    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);

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
    }
    useEffect(() => {
        validate()
    }, []);

    const router = useRouter();
    const { username } = router.query;

    const dataSelected = dataUser.find((dataUser) => dataUser.username == username)
    const [form] = Form.useForm();


    const myData = {
        id: `${dataSelected?.id}`,
        name: `${dataSelected?.name}`,
        username: `${dataSelected?.username}`,
        email: `${dataSelected?.email}`,
        no_telp: `${dataSelected?.no_telp}`,
        image: `${dataSelected?.image}`,
        createdAt: `${dataSelected?.createdAt}`,
        isActive: `${dataSelected?.isActive}`,

    }

    form.setFieldsValue({
        id: myData.id,
        name: myData.name,
        username: myData.username,
        email: myData.email,
        no_telp: myData.no_telp,
        createdAt: myData.createdAt,
        image: myData.image
    })


    const showModal = () => {
        setVisible(true);
    };
    const handleCancel = () => {
        setVisible(false);
    };
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
    }
    const onChangeImage = (e) => {
        const value = e.target.files[0]
        setImage(value)
    }


    const onFormSubmit = (e) => {
        e.preventDefault()
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    async function submitUpdate() {
        try {
            const dataUpdate = new FormData()
            dataUpdate.append('id', id)
            dataUpdate.append('nameUpdate', nameUpdate)
            dataUpdate.append('usernameUpdate', usernameUpdate)
            dataUpdate.append('emailUpdate', emailUpdate)
            dataUpdate.append('no_telpUpdate', noTelpUpdate)
            dataUpdate.append('password', password)
            dataUpdate.append('image', image)
            // for (const value of dataUpdate.values()) {
            //     console.log(value);
            // }
            await axios.put(`https://project-wo.herokuapp.com/users/${myData.id}`, dataUpdate).then(res => {
                console.log(res)
            })
        } catch (error) {

        }

    }
    // const [defaultValues, setDefaultValues] = useState({
    //     name: myData.name,
    //     username: myData.username,
    //     email: myData.email,
    //     no_telp: myData.no_telp,
    //     createdAt: myData.createdAt
    // })


    const onReset = () => {

        form.setFieldsValue(dataSelected)

    };


    return (
        <>
            <MainLayout>
                <Content>
                    <h1 className='mt-6 ml-14 text-2xl'>Form Detail Merchant</h1>
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
                                        // initialValues={{
                                        //     name: `${dataSelected?.name}`,
                                        //     username: `${dataSelected?.username}`,
                                        //     email: `${dataSelected?.email}`,
                                        //     no_telp: `${dataSelected?.no_telp}`,
                                        //     image: `${dataSelected?.image}`,
                                        //     createdAt: `${dataSelected?.createdAt}`,
                                        //     isActive: `${dataSelected?.isActive}`,
                                        // }}

                                        // onFinish={onFinish}
                                        onFinishFailed={onFinishFailed}
                                        autoComplete="off"
                                    >
                                        <Form.Item
                                            label="Name"
                                            name="name"

                                        >
                                            <Input value={nameUpdate} onChange={onChangeName} />
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
                                            <Input value={usernameUpdate} onChange={onChangeUsername} />
                                        </Form.Item>
                                        <Form.Item
                                            label="Email"
                                            name="email"

                                        >
                                            <Input value={emailUpdate} onChange={onChangeEmail} />
                                        </Form.Item>
                                        <Form.Item
                                            label="Phone"
                                            name="no_telp"

                                        >
                                            <Input value={noTelpUpdate} onChange={onChangeNoTel} />
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
                                                Active : {myData.isActive}
                                            </Button>
                                        </Form.Item>

                                        <Form.Item
                                            wrapperCol={{
                                                offset: 3,
                                                span: 16,
                                            }}
                                        >
                                            <Space>
                                                <Button htmlType="button" onClick={onReset}>
                                                    Reset
                                                </Button>
                                                <Button htmlType="button" onClick={showModal}>
                                                    Update
                                                </Button>
                                                <BackButton />
                                            </Space>
                                        </Form.Item>
                                    </Form>
                                    <Modal
                                        visible={visible}
                                        title="Title"

                                        onCancel={handleCancel}
                                        footer={[
                                            <Button key="back" onClick={handleCancel}>
                                                Return
                                            </Button>,
                                        ]}
                                    >

                                        <form onSubmit={onFormSubmit} className="mt-5" method="POST">
                                            <div className="form-group mb-6">
                                                <label
                                                    className="form-label inline-block mb-2 text-gray-700"
                                                >
                                                    Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="nameUpdate"
                                                    className="form-control
                                                    block
                                                    w-full
                                                    px-3
                                                    py-1.5
                                                    text-base
                                                    font-normal
                                                    text-pink-700
                                                    bg-white bg-clip-padding
                                                    border border-solid border-pink-300
                                                    rounded
                                                    transition
                                                    ease-in-out
                                                    m-0
                                                    focus:text-pink-700 focus:bg-white focus:border-pink-600 focus:outline-none"
                                                    value={nameUpdate} onChange={onChangeName}
                                                    placeholder="Nama Anda"
                                                />

                                            </div>
                                            <div className="form-group mb-6">

                                                <label
                                                    className="form-label inline-block mb-2 text-gray-700"
                                                >
                                                    Username
                                                </label>
                                                <input
                                                    type="text"
                                                    name="usernameUpdate"
                                                    className="form-control
                                                    block
                                                    w-full
                                                    px-3
                                                    py-1.5
                                                    text-base
                                                    font-normal
                                                    text-pink-700
                                                    bg-white bg-clip-padding
                                                    border border-solid border-pink-300
                                                    rounded
                                                    transition
                                                    ease-in-out
                                                    m-0
                                                    focus:text-pink-700 focus:bg-white focus:border-pink-600 focus:outline-none"
                                                    value={usernameUpdate} onChange={onChangeUsername}
                                                    placeholder="Username Anda"
                                                />

                                            </div>
                                            <div className="form-group mb-6">
                                                <label

                                                    className="form-label inline-block mb-2 text-gray-700"
                                                >
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    name="emailUpdate"
                                                    className="form-control
                                                    block
                                                    w-full
                                                    px-3
                                                    py-1.5
                                                    text-base
                                                    font-normal
                                                    text-pink-700
                                                    bg-white bg-clip-padding
                                                    border border-solid border-pink-300
                                                    rounded
                                                    transition
                                                    ease-in-out
                                                    m-0
                                                    focus:text-pink-700 focus:bg-white focus:border-pink-600 focus:outline-none"
                                                    value={emailUpdate} onChange={onChangeEmail}
                                                    placeholder="Email Anda"
                                                />

                                            </div>
                                            <div className="form-group mb-6">
                                                <label

                                                    className="form-label inline-block mb-2 text-gray-700"
                                                >
                                                    No telpon
                                                </label>
                                                <input
                                                    type="text"
                                                    name="no_telpUpdate"
                                                    className="form-control
                                                    block
                                                    w-full
                                                    px-3
                                                    py-1.5
                                                    text-base
                                                    font-normal
                                                    text-pink-700
                                                    bg-white bg-clip-padding
                                                    border border-solid border-pink-300
                                                    rounded
                                                    transition
                                                    ease-in-out
                                                    m-0
                                                    focus:text-pink-700 focus:bg-white focus:border-pink-600 focus:outline-none"
                                                    value={noTelpUpdate} onChange={onChangeNoTel}
                                                    placeholder="nomer telpon anda"
                                                />

                                            </div>
                                            <div className="form-group mb-6">
                                                <label

                                                    className="form-label inline-block mb-2 text-gray-700"
                                                >
                                                    Password
                                                </label>
                                                <Input.Password
                                                    type="password"
                                                    className="form-control
                                                    block
                                                    w-full
                                                    px-3
                                                    py-1.5
                                                    text-base
                                                    font-normal
                                                    text-pink-700
                                                    bg-white bg-clip-padding
                                                    border border-solid border-pink-300
                                                    rounded
                                                    transition
                                                    ease-in-out
                                                    m-0
                                                    focus:text-pink-700 focus:bg-white focus:border-pink-600 focus:outline-none"
                                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                                    placeholder="Password"
                                                    value={password} onChange={onChangePassword}
                                                />
                                                <input
                                                    name="id"
                                                    type="hidden"
                                                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 
                                    bg-white bg-clip-padding border border-solid border-pink-300 rounded transition 
                                    ease-in-out m-0 focus:text-pink-700 focus:bg-white focus:border-pink-600 focus:outline-none"
                                                    value={id} onChange={onChangeId}

                                                />

                                            </div>
                                            <div className="mb-4">
                                                <input
                                                    id="img"
                                                    style={{ display: "none" }}
                                                    type="file"
                                                    accept="image/*"
                                                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 
                                    bg-white bg-clip-padding border border-solid border-pink-300 rounded transition 
                                    ease-in-out m-0 focus:text-pink-700 focus:bg-white focus:border-pink-600 focus:outline-none"
                                                    onChange={onChangeImage}
                                                />

                                                <button className="inline-block px-6 py-4 border-2 border-pink-500 text-pink-500 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                                                    <label htmlFor="img"><UploadOutlined /> upload Photo anda </label>
                                                </button>

                                            </div>
                                            <div className="text-center pt-1 mb-12 pb-1">
                                                <button
                                                    type="submit"
                                                    className="inline-block px-6 py-2.5 text-pink-500 font-medium text-xs leading-tight uppercase rounded shadow-md 
                                    hover:bg-pink-700 hover:text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg 
                                    transition duration-150 ease-in-out w-full mb-3"

                                                    data-mdb-ripple="true"
                                                    data-mdb-ripple-color="light"
                                                    onClick={submitUpdate}
                                                >
                                                    Submit
                                                </button>

                                            </div>
                                        </form>

                                    </Modal>
                                </div>
                            </div>


                        </Col>
                    </Row>
                </Content>
            </MainLayout>
        </>
    )
}