import { Space, Table, Tag, Button, Layout, Row, Col, Tooltip, AutoComplete, Input } from 'antd';
import { EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import Link from "next/link";
import Image from 'next/image';
import React, { useRef, useState, useEffect } from 'react';
import image1 from "../../../public/Image/card-product/aminta-hotel.webp"
import image2 from "../../../public/Image/card-product/Fieris Hotel Rawamangun.webp"
import image3 from "../../../public/Image/card-product/Mang Kabayan Vida Bekasi.webp"

const { Header, Content, Sider } = Layout;

const { Search } = Input;
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
                    <Link href={`/admin/${record.name}`}>
                        <Tooltip placement="left" title="Detail">
                            <Button
                                style={{ color: "#0d6efd", borderColor: "#0d6efd" }}
                                icon={<EditOutlined />}
                            >

                            </Button>
                        </Tooltip>
                    </Link>

                    <Link href={`/admin/${record.name}`}>
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
    return (
        <>
            <Content>
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
                        <Table columns={columns} dataSource={data} />
                    </Col>
                </Row>


            </Content>
        </>
    )
}