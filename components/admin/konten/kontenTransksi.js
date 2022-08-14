import { Space, Table, Tag, Button, Layout, Row, Col, Tooltip, AutoComplete, Input, Modal, Select } from 'antd';
import { EyeOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import qs from 'qs'
import Highlighter from "react-highlight-words";

const { Header, Content, Sider } = Layout;
const { Search } = Input;
const { Option } = Select;

function getColumns(deleteModal, updateModal, imageModal) {
    return [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'User',
            dataIndex: 'user',
            key: 'user',
            render: (_, record) => <a> {record.user.name} </a>
        },
        {
            title: 'Product',
            dataIndex: 'product',
            key: 'product',
            render: (_, record) => <a> {record.product.name} </a>
        },
        {
            title: 'Tgl/transaksi',
            dataIndex: 'createdAt',
            key: 'creeatedAt',
            render: (_, record) => <a> {record.createdAt.split("T")[0]} </a>
        },
        {
            title: 'Variant',
            dataIndex: 'variant',
            key: 'variant',
            render: (_, data) => (
                <>
                    <Row justify='space-evenly' >
                        <Col>
                            <h1 className='border-b-2 border-pink-500'>Variant Name</h1>

                            <ol>
                                <li style={{ listStyleType: "circle" }}>{data.variant.name}</li>
                            </ol>

                        </Col>
                        <Col>
                            <h1 className='border-b-2 border-pink-500'>Variant Price</h1>

                            <ol>
                                <li style={{ listStyleType: "circle" }}>{data.variant.price}</li>
                            </ol>

                        </Col>
                    </Row>
                </>
            )
        },
        {
            title: 'Total',
            dataIndex: 'total_price',
            key: 'total_price',
            render: (_, record) => {
                const thouSep = ".";
                const decSep = ",";
                // format to money
                const toMoney = (num) => { return (Math.round(num * 100) / 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').replace(/[,.]/g, function (m) { return m === ',' ? thouSep : decSep; }) };
                ;
                return (
                    <>
                        <a>Rp.{toMoney(record.total_price)}</a>
                    </>
                )
            }
        },
        {
            title: 'Proof',
            dataIndex: 'transaction_proof',
            key: 'transaction_proof',
            render: (_, record) =>
            (

                <>
                    <Tooltip placement="left" title="Check Proof">
                        <Button
                            onClick={() => imageModal(record.transaction_proof)}
                            style={{ color: "#0d6efd", borderColor: "#0d6efd", overflow: "hidden" }}
                        // icon={<EyeOutlined />}
                        >
                            Check Proof
                        </Button>
                    </Tooltip>
                </>

            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (_, record) => (<a>{record.status}</a>)
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">

                    <Tooltip placement="left" title="Update">
                        <Button
                            onClick={() => updateModal(record)}
                            style={{ color: "#0d6efd", borderColor: "#0d6efd" }}
                            icon={<EditOutlined />}
                        >

                        </Button>
                    </Tooltip>

                    <Tooltip placement="right" title="Delete">
                        <Button
                            onClick={() => deleteModal(record.id)}
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


export default function KontenTransaksi() {

    const [dataUser, setDataUser] = useState([])
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 5,
    });
    const [searchText, setSearchText] = useState('');
    const [options, setOptions] = useState([]);
    const [currentModalOpen, setCurrentModalOpen] = useState(null)
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const [loadingDua, setLoadingDua] = useState(false);
    let [imageUrl, setImageUrl] = useState('')

    //state modal delete
    const [visible, setVisible] = useState(false);
    const [modalTaskId, setModalTaskId] = useState('');

    //state modal update
    const [visibleDua, setVisibleDua] = useState(false);
    const [modalTextDua, setModalTextDua] = useState('Content of the modal');
    const [modalTaskIdDua, setModalTaskIdDua] = useState('');
    const [foto, setFoto] = useState('')

    //state image modal

    const [visibleTiga, setVisibleTiga] = useState(false);
    const [modalTextTiga, setModalTextTiga] = useState('Content of the modal');
    const [modalTaskIdTiga, setModalTaskIdTiga] = useState('');



    const searchInput = useRef(null);

    const [loading, setLoading] = useState(false);
    const getRandomuserParams = (params) => ({
        results: params.pagination?.pageSize,
        page: params.pagination?.current,
        ...params,
    });



    async function validate(params = {}) {
        try {

            const getTransaksi = await axios.get("https://project-wo.herokuapp.com/transaction", {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token_admin")}`
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
    const handleTableChange = (newPagination, filters, sorter) => {
        validate({
            sortField: sorter.field,
            sortOrder: sorter.order,
            pagination: newPagination,
            ...filters,
        });
    };



    //start delete modal

    const deleteModal = (record) => {
        if (record) {
            setModalTaskId(record);
            setVisible(true);

        } else {
            setVisible(false)
        }


    };
    const handleOkModalDelete = () => {
        axios.delete(`https://project-wo.herokuapp.com/product/delete/${modalTaskId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token_admin")}`
            }
        }).then(res => {

        })
        getData()
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);
        // location.reload()
    };

    //akhir delete modal

    //start update modal
    const onChangeFoto = (e) => {
        const value = e.target.files[0]
        setFoto(value)
        // console.log(value)
    }
    const normFile = (e) => {
        console.log('Upload event:', e);

        // if (Array.isArray(e)) {
        //     return e;
        // }
        // return console.log(e?.fileList)

    };

    const updateModal = (record) => {
        // console.log(record)
        if (record) {
            setModalTaskIdDua(record.id);
            setVisibleDua(true);

        } else {
            setVisibleDua(false)
        }
    };
    const handleOkModalUpdate = async () => {
        try {
            const data = await form.getFieldsValue();

            await axios.put(`https://project-wo.herokuapp.com/transaction/edit/${data.id}`, data, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token_admin")}`,
                    "content-type": "application/json"
                }
            }).then(res => {
                console.log(res)
            })
            getData()
            setModalTextDua('The modal will be closed after two seconds');
            setConfirmLoading(true);
            setTimeout(() => {
                setVisibleDua(false);
                setConfirmLoading(false);
            }, 2000);
            // location.reload()
        } catch (error) {

        }

    };

    //akhir update modal

    //start Image modal
    const imageModal = async (record) => {
        setLoadingDua(true)
        if (record) {
            // await setModalTaskIdTiga(record);
            setVisibleTiga(true);
            await axios.get(`https://project-wo.herokuapp.com/transaction/image/${record}`).then(res => {
                setImageUrl(res.config.url)
            })
        } else {
            setVisibleTiga(false)
        }
        setLoadingDua(false)

    };
    const handleOkModalImage = () => {
        setImageUrl(null)
        setModalTextTiga('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setVisibleTiga(false)
            setConfirmLoading(false);
        }, 1000);
        // location.reload()
    };



    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
        setVisibleDua(false);
        setVisibleTiga(false)
    };

    const onSearch = function (value) {
        axios.get(`https://project-wo.herokuapp.com/transaction/search/transaction/?page=1&limit=20&search=${value}&status=`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token_admin")}`
            }
        }).then(res => {
            setDataUser(res.data.items)
            // console.log(res.data.items)
        })
    }
    const onSelect = (value) => {
        console.log('onSelect', value);
        axios.get(`https://project-wo.herokuapp.com/transaction/search/transaction/?page=1&limit=20&search=&status=${value}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token_admin")}`
            }
        }).then(res => {
            setDataUser(res.data.items)
            // console.log(res.data.items)
        })
    };
    useEffect(() => {
        validate()
    }, []);


    return (
        <>
            <Content>
                <h1 className='mt-4 ml-14 text-2xl'>Table Transaksi</h1>
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
                            <Option value="Menunggu Pembayaran">Menunggu Pembayaran</Option>

                        </Select>
                    </Col>
                </Row>
                <Row justify="center" align="middle" style={{ overflow: "auto" }}>

                    <Col lg={{ span: 20 }} md={{ span: 22 }} className="mt-2">
                        <Table
                            columns={getColumns(deleteModal, updateModal, imageModal)}
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
                            onOk={handleOkModalDelete}
                            confirmLoading={confirmLoading}
                            onCancel={handleCancel}
                        >
                            <p className='text-pink-500'>Apakah anda yakin akan meghapus ?</p>
                        </Modal>
                        <Modal
                            title="Konfirmasi Update Data"
                            visible={visibleDua}
                            onOk={handleOkModalUpdate}
                            confirmLoading={confirmLoading}
                            onCancel={handleCancel}
                        >

                            <p className='text-red-500'>{JSON.stringify(modalTaskIdDua)}</p>
                        </Modal>
                        <Modal
                            title="Image"
                            visible={visibleTiga}
                            // onOk={handleOkModalImage}
                            onCancel={handleCancel}
                            confirmLoading={confirmLoading}
                            footer={[
                                <Button key="back" onClick={handleCancel}>
                                    Return
                                </Button>,
                            ]}
                        >
                            <img src={imageUrl} width={500} height={500} />
                        </Modal>
                    </Col>
                </Row>


            </Content>
        </>
    )
}