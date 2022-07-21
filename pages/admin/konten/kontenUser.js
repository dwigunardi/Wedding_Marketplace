import { Space, Table, Tag, Button, Layout, Row, Col, Tooltip, AutoComplete, Input } from 'antd';
import { PoweroffOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import Link from "next/link";
import React, { useRef, useState } from 'react';

const { Header, Content, Sider } = Layout;

const { Search } = Input;
export default function KontenUsers() {

    const columns = [
        {
            title: 'No',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Username',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Email',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Phone',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Role',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, { tags }) => (
                <>
                    {tags.map((tag) => {
                        let color = ''
                        if (tag === 'Admin') {
                            color = 'geekblue';
                        }
                        else if (tag === 'Customer') {
                            color = 'volcano';
                        }
                        else if (tag === 'Merchant') {
                            color = 'green'
                        }

                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">

                    <Link href={`/admin/${record.name}`}>
                        <Tooltip placement="left" title="Detail">
                            <Button
                                style={{ color: "#4ade80", borderColor: "#4ade80" }}
                                icon={<PoweroffOutlined />}
                            >

                            </Button>
                        </Tooltip>
                    </Link>
                    <Link href={`/${record.deleteUser}`}>
                        <Tooltip placement="right" title="Delete">
                            <Button
                                type="danger"
                                icon={<DeleteOutlined />}
                                danger={true}
                            >
                            </Button>
                        </Tooltip>
                    </Link>

                </Space>
            ),
        },
    ];
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

    const onSearch = (value) => console.log(value);
    return (
        <>
            <Content>
                <Row className='mt-6 max-w-sm ml-20' justify='center'>
                    <Col lg={{ span: 20 }} md={{ span: 20 }} sm={{ span: 22 }} xs={{ span: 24 }}>
                        <Search
                            placeholder="input search text"
                            allowClear
                            enterButton="Search"
                            size="large"
                            onSearch={onSearch}

                        />
                    </Col>
                </Row>
                <Row justify="center" align="middle" className='h-96'>

                    <Col lg={{ span: 20 }} md={{ span: 22 }} sm={{ span: 22 }} xs={{ span: 24 }} >
                        <Table columns={columns} dataSource={data} />
                    </Col>
                </Row>


            </Content>
        </>
    )
}