import { Space, Table, Tag, Button, Layout, Row, Col } from 'antd';
import { PoweroffOutlined, EyeOutlined } from '@ant-design/icons';
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
            title: 'Name',
            dataIndex: 'name',
            key: 'detailUser',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, { tags }) => (
                <>
                    {tags.map((tag) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';

                        if (tag === 'loser') {
                            color = 'volcano';
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
                        <Button
                            type="success"
                            icon={<EyeOutlined />}
                            loading={loadings[1]}
                            onClick={() => enterLoading(1)}
                        >
                            Click me!
                        </Button>
                    </Link>
                    <Link href={`/${record.deleteUser}`}>
                        <Button
                            type="danger"
                            icon={<PoweroffOutlined />}
                            loading={loadings[1]}
                            onClick={() => enterLoading(1)}
                        >
                            Delete
                        </Button>
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
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];

    return (
        <>
            <Content>
                <Row justify="center" align="middle">
                    <Col>
                        <Space align='center'>
                            <Table columns={columns} dataSource={data} />
                        </Space>
                    </Col>
                </Row>


            </Content>
        </>
    )
}