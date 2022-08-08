import { Space, Table, Tag, Button, Layout, Row, Col, Tooltip, AutoComplete, Input, Modal, Select } from 'antd';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import qs from 'qs'
import Highlighter from "react-highlight-words";

const { Header, Content, Sider } = Layout;
const { Search } = Input;
const { Option } = Select;

function getColumns(showModal) {
    return [
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
        {
            title: 'Role',
            key: 'role',
            dataIndex: 'role',
            render: (_, record) => <a> {record.role.name} </a>

        },
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

                    <Tooltip placement="right" title="Delete">
                        <Button
                            onClick={() => showModal(record.id)}
                            type="danger"
                            icon={<DeleteOutlined />}
                            danger={true}
                        >
                        </Button>

                    </Tooltip>

                </Space>
            ),
        },
    ];
}


export default function KontenUsers() {

    const [dataUser, setDataUser] = useState([])
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 5,
    });
    const [searchText, setSearchText] = useState('');
    const [options, setOptions] = useState([]);
    const [visible, setVisible] = useState(false);
    const [currentModalOpen, setCurrentModalOpen] = useState(null)
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const [modalTaskId, setModalTaskId] = useState('');



    const searchInput = useRef(null);

    const [loading, setLoading] = useState(false);
    const getRandomuserParams = (params) => ({
        results: params.pagination?.pageSize,
        page: params.pagination?.current,
        ...params,
    });



    async function validate(params = {}) {
        try {

            const getUsers = await axios.get("https://project-wo.herokuapp.com/users", {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token_customer")}`
                }
            },
            ).then(response => {

                if (response.status == 200 || response.status == 201) {
                    setDataUser(response.data.items)

                }
            })
            setPagination({
                ...params.pagination,
                total: dataUser.length
            });

        } catch (error) {

        }
    }
    useEffect(() => {
        const controller = new AbortController()
        validate()

        return () => controller.abort()

    }, []);



    const handleTableChange = (newPagination, filters, sorter) => {
        validate({
            sortField: sorter.field,
            sortOrder: sorter.order,
            pagination: newPagination,
            ...filters,
        });
    };



    const showModal = (record) => {
        if (record) {
            setModalTaskId(record);
            setVisible(true);

        } else {
            setVisible(false)
        }


    };

    const handleOkModal = () => {
        axios.delete(`https://project-wo.herokuapp.com/users/delete/${modalTaskId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token_customer")}`
            }
        }).then(res => {
            console.log(res)
        })
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);
        location.reload()
    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };





    const onSearch = function (value) {
        axios.get(`https://project-wo.herokuapp.com/users/search/users/?page=1&limit=20&search=${value}&role=`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token_customer")}`
            }
        }).then(res => {
            setDataUser(res.data.items)
            // console.log(res.data.items)
        })
    }
    const onSelect = (value) => {
        console.log('onSelect', value);
        axios.get(`https://project-wo.herokuapp.com/users/search/users/?page=1&limit=20&search=&role=${value}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token_customer")}`
            }
        }).then(res => {
            setDataUser(res.data.items)
            // console.log(res.data.items)
        })
    };
    console.log(pagination)

    return (
        <>
            <Content>
                <h1 className='mt-4 ml-14 text-2xl'>Table User</h1>
                <Row className='mt-4 ' justify='space-between'>
                    <Col lg={{ span: 10, offset: 2 }} md={{ span: 5 }} sm={{ span: 10 }} xs={{ span: 24 }}>
                        <AutoComplete
                            dropdownMatchSelectWidth={252}
                            style={{
                                width: 300,
                            }}
                            options={options}
                            onSelect={onSelect}
                            onSearch={onSearch}
                        >
                            <Input.Search size="large" placeholder="Search...." enterButton />

                        </AutoComplete>

                    </Col>
                    <Col lg={{ span: 4, }} md={{ span: 5 }} sm={{ span: 10 }} xs={{ span: 24 }} >

                        <Select
                            defaultValue="All"
                            style={{
                                width: 110,
                            }}
                            onChange={onSelect}
                            placeholder="Filter"
                        >
                            <Option value="All">All</Option>
                            <Option value="Admin">Admin</Option>
                            <Option value="Costumer">Customer</Option>
                            <Option value="Merchant" >
                                Merchant
                            </Option>
                        </Select>
                    </Col>
                </Row>
                <Row justify="center" align="middle" style={{ overflow: "auto" }}>

                    <Col lg={{ span: 20 }} md={{ span: 22 }} className="mt-2">
                        <Table
                            columns={getColumns(showModal)}
                            // scroll={{
                            //     y: 270,
                            // }}
                            dataSource={dataUser}
                            pagination={pagination}
                            loading={loading}
                            onChange={handleTableChange}
                        />
                        <Modal
                            title="Konfirmasi Penghapusan"
                            visible={visible}
                            onOk={handleOkModal}
                            confirmLoading={confirmLoading}
                            onCancel={handleCancel}
                        >
                            <p className='text-pink-500'>Apakah anda yakin akan meghapus ? user yang Memiliki ID </p>
                            <p className='text-red-500'>{JSON.stringify(modalTaskId)}</p>
                        </Modal>
                    </Col>
                </Row>


            </Content>
        </>
    )
}