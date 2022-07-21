import { Space, Table, Tag, Button, Layout, Row, Col, Tooltip } from 'antd';
import { PoweroffOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';
import Link from "next/link";
const { Header, Content, Sider } = Layout;


export default function KontenUsers() {
    const [loadings, setLoadings] = useState([]);

    const enterLoading = (index) => {
        setTimeout(() => {
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = false;
                return newLoadings;
            });
        }, 6000);
    };
    const columns = [
        {
            title: 'No',
            dataIndex: 'no',
            key: 'no',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'detailUser',
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

                    <Link href={`/${record.detailUser}`}>
                        <Tooltip placement="left" title="Detail">
                            <Button
                                style={{ color: "#4ade80", borderColor: "#4ade80" }}
                                icon={<EyeOutlined />}
                                loading={loadings[1]}
                                onClick={() => enterLoading(1)}
                                className="bg-green-300"
                            >

                            </Button>
                        </Tooltip>
                    </Link>
                    <Link href={`/${record.deleteUser}`}>
                        <Tooltip placement="right" title="Delete">
                            <Button
                                type="danger"
                                icon={<DeleteOutlined />}
                                loading={loadings[1]}
                                onClick={() => enterLoading(1)}
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

    return (
        <>
            <Content>

                <Row justify="center" align="middle" className='h-96'>
                    <Col lg={{ span: 20 }} md={{ span: 22 }} sm={{ span: 22 }} xs={{ span: 24 }} >
                        <Table columns={columns} dataSource={data} />
                    </Col>
                </Row>


            </Content>
        </>
    )
}