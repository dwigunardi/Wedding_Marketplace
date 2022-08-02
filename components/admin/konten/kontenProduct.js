import { Space, Table, Tag, Button, Layout, Row, Col, Tooltip, Input, } from 'antd';
import { EditOutlined, EyeOutlined, DeleteOutlined, } from '@ant-design/icons';
import Link from "next/link";
import Image from 'next/image';
import image1 from "../../../public/Image/card-product/aminta-hotel.webp"
import image2 from "../../../public/Image/card-product/Fieris Hotel Rawamangun.webp"
import image3 from "../../../public/Image/card-product/Mang Kabayan Vida Bekasi.webp"
import React, { useState, useEffect } from 'react';
import axios from 'axios';



const { Header, Content, Sider } = Layout;

const { Search, TextArea } = Input;



export default function ProductContent() {



    const columns = [
        {
            title: 'No',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Product',
            dataIndex: 'product',
            key: 'product',

        },
        {
            title: 'Venue',
            dataIndex: 'venue',
            key: 'venue',
        },
        {
            title: 'Lokasi',
            dataIndex: 'lokasi',
            key: 'lokasi',
        },
        {
            title: 'Varian',
            dataIndex: 'varian',
            key: 'varian',
        },
        {
            title: 'Harga',
            dataIndex: 'harga',
            key: 'harga',
        },
        {
            title: 'Foto',
            dataIndex: 'foto',
            key: 'foto',
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            render: (_, { status }) => (
                <>
                    {status.map((tag) => {
                        let color = ''
                        if (tag === 'Tersedia') {
                            color = 'green';
                        }
                        else if (tag === 'Non-Tersedia') {
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
                    <Link href={`/admin/detailProduct/${record.id}`}>
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
    const data = [
        {
            id: '1',
            product: 'WO',
            venue: 'Aminta Hall',
            lokasi: 'Jakarta',
            varian: '100',
            harga: 'Rp. 70,600,000',
            foto: <Image src={image1} width={65} height={44} placeholder='blur' />,
            status: ['Tersedia'],
        },
        {
            id: '2',
            product: 'WO',
            venue: 'Fieris Hotel',
            lokasi: 'Jakarta',
            varian: '100',
            harga: 'Rp. 66,600,000',
            foto: <Image src={image2} width={65} height={44} placeholder='blur' />,
            status: ['Tersedia'],
        },
        {
            id: '3',
            product: 'WO',
            venue: 'Mang Kabayan Vida',
            lokasi: 'Bekasi',
            varian: '100',
            harga: 'Rp. 45,900,000',
            foto: <Image src={image3} width={65} height={44} placeholder='blur' />,
            status: ['Non-Tersedia'],
        },
    ];

    const onSearch = (value) => console.log(value);

    useEffect(() => {

        // getMerchant()

        // // return () => {
        // //     cleanup
        // // };
    }, []);
    return (
        <>
            <Content>
                <h1 className='mt-6 ml-14 text-2xl'>Table Product</h1>
                <div className="rounded-lg shadow-lg bg-white mx-10 py-4">

                    <Row className='my-5 ' justify='space-between'>
                        <Col lg={{ span: 5, offset: 2 }} md={{ span: 5, offset: 2 }} sm={{ span: 10 }} xs={{ span: 10 }} >
                            <Search
                                placeholder="input search text"
                                allowClear
                                enterButton
                                size="large"
                                onSearch={onSearch}

                            />
                        </Col>

                    </Row>
                    <Row justify="center" align="middle" className='h-96 ' style={{ overflow: "auto" }}>

                        <Col lg={{ span: 20 }} md={{ span: 22 }}  >
                            <Table columns={columns} dataSource={data} className="shadow-sm" />
                        </Col>
                    </Row>

                </div>
            </Content>
        </>
    )
}