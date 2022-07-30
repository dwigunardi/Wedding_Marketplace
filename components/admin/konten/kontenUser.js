import { Space, Table, Tag, Button, Layout, Row, Col, Tooltip, AutoComplete, Input } from 'antd';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import qs from 'qs'

const { Header, Content, Sider } = Layout;

const { Search } = Input;
export default function KontenUsers() {

    const [dataUser, setDataUser] = useState()
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 6,
    });
    const [loading, setLoading] = useState(false);
    const getRandomuserParams = (params) => ({
        results: params.pagination?.pageSize,
        page: params.pagination?.current,
        ...params,
    });

    async function validate(params = {}) {
        try {
            setLoading(true);
            const getUsers = await axios.get(`https://project-wo.herokuapp.com/users?${qs.stringify(getRandomuserParams(params))}`,
            ).then(response => {
                if (response.status == 200 || response.status == 201) {
                    setDataUser(response.data.items)

                }
            })
            setLoading(false);
            setPagination({
                ...params.pagination,
                total: dataUser.length
            });
        } catch (error) {

        }
    }
    useEffect(() => {
        validate({
            pagination,
        });
    }, []);

    const handleTableChange = (newPagination, filters, sorter) => {
        fetchData({
            sortField: sorter.field,
            sortOrder: sorter.order,
            pagination: newPagination,
            ...filters,
        });
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'no_telp',
            key: 'no_telp',
        },
        // {
        //     title: 'Role',
        //     key: 'role',
        //     dataIndex: 'role',
        //     // render: (_, { data }) => (
        //     //     <>
        //     //         {data.map((tag) => {
        //     //             let color = ''
        //     //             if (tag === 'Admin') {
        //     //                 color = 'geekblue';
        //     //             }
        //     //             else if (tag === 'Customer') {
        //     //                 color = 'volcano';
        //     //             }
        //     //             else if (tag === 'Merchant') {
        //     //                 color = 'green'
        //     //             }

        //     //             return (
        //     //                 <Tag color={color} key={tag}>
        //     //                     {tag.toUpperCase()}
        //     //                 </Tag>
        //     //             );
        //     //         })}
        //     //     </>
        //     // ),
        // },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">

                    <Link href={`/admin/detailUser/${record.username}`}>
                        <Tooltip placement="left" title="Detail">
                            <Button
                                style={{ color: "#4ade80", borderColor: "#4ade80" }}
                                icon={<EyeOutlined />}
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

    const onSearch = (value) => console.log(value);
    return (
        <>
            <Content>
                <h1 className='mt-6 ml-14 text-2xl'>Table User</h1>
                <Row className='mt-6 ' justify='center'>
                    <Col lg={{ span: 5 }} md={{ span: 5 }} sm={{ span: 10 }} xs={{ span: 24 }}>
                        <Search
                            placeholder="input search text"
                            allowClear
                            enterButton
                            size="large"
                            onSearch={onSearch}

                        />
                    </Col>
                    <Col lg={{ span: 15 }} md={{ span: 15 }} sm={{ span: 14 }} xs={{ span: 24 }}></Col>
                </Row>
                <Row justify="center" align="middle" className='h-96 ' style={{ overflow: "auto" }}>

                    <Col lg={{ span: 20 }} md={{ span: 22 }}  >
                        <Table
                            columns={columns}
                            scroll={{
                                y: 240,
                            }}

                            dataSource={dataUser}
                            pagination={pagination}
                            loading={loading}
                            onChange={handleTableChange}
                        />
                    </Col>
                </Row>


            </Content>
        </>
    )
}