import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import 'antd/dist/antd.css'
import {
    Button,
    Checkbox,
    Col,
    Form,
    InputNumber,
    Radio,
    Rate,
    Row,
    Select,
    Slider,
    Switch,
    Upload,
    Input
} from 'antd';
import React from 'react';
const { Option } = Select;
const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};

const normFile = (e) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
        return e;
    }

    return e?.fileList;
};

const testDaftar = () => {
    let [roleId, setRoleid] = useState('')
    const onChangeRoleid = (e) => {
        const value = e.target.value
        setRoleid(value)
    }
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Form
            name="basic"
            {...formItemLayout}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            initialValues={{
                'input-number': 3,
                'checkbox-group': ['A', 'B'],
                rate: 3.5,
            }}
        >
            <Form.Item label="Plain Text">
                <span className="ant-form-text">aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</span>
            </Form.Item>

            <Form.Item
                label="Nama"
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
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
                        message: 'Please input your username!',
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
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="no_telp"
                name="no_telp"
                rules={[
                    {
                        required: true,
                        message: 'Please input your no_telp!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Role"
                name="roleId"

            >
                <Input type='hidden' value={roleId = "7791673c-4586-43c6-8020-83f68de55f60"} onChange={onChangeRoleid} />
            </Form.Item>
            <Form.Item
                name="upload"
                label="Upload"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                extra="longgggggggggggggggggggggggggggggggggg"
            >
                <Upload name="logo" action="/upload.do" listType="picture">
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
            </Form.Item>



            <Form.Item
                wrapperCol={{
                    span: 12,
                    offset: 6,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default testDaftar;