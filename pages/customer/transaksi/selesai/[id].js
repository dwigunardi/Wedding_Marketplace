import React, { useEffect, useState } from "react";
import { useRouter, Router } from "next/router";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Col, Divider, message, Row, Table, Button, Result } from 'antd';
import 'antd/dist/antd.css';
import logo from '../../../../public/Image/sahin-love.png'



export default function ThanksMessage() {

    const [data, setData] = useState({})
    const router = useRouter()
    const { id } = router.query;
    useEffect(() => {
        const getToken = localStorage.getItem("token_customer")
        axios.get(`https://project-wo.herokuapp.com/transaction/detail/${id}`, {
            headers: {
                'Authorization': `Bearer ${getToken}`
            }
        }).then(res => {
            console.log(res)
            setData(res.data.data)
        })

        setTimeout(() => {
            message.success("Transaksi ini telah selesai")
        }, 2000);

    }, []);

    const thouSep = ".";
    const decSep = ",";
    // format to money
    const toMoney = (num) => { return (Math.round(num * 100) / 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').replace(/[,.]/g, function (m) { return m === ',' ? thouSep : decSep; }) };
    ;


    return (
        <>
            <Result
                status="success"
                title="Transaksi Ini telah selesai"
                subTitle="Jika ada keluhan atau ada pertanyaan silahkan klik tombol contact us"
                extra={[
                    <>
                        <h1>Informasi Transaksi Anda</h1>
                        <Row justify="center">

                            <Col className="mx-10">
                                <h1>Product name  :  {data.product?.name}</h1>
                                <h1>Product price  :  Rp. {toMoney(data?.total_price)}</h1>
                                <h1>location  :  {data.product?.location}</h1>
                                <h1>Variant : {data.variant?.name}</h1>
                            </Col>

                        </Row>
                        <Link href={"/product"} >
                            <Button key="buy">Book Another</Button>
                        </Link>
                        <Link href={"/contactUs"} >
                            <Button key="buy">Contact Us</Button>
                        </Link>

                    </>
                ]}
            />
        </>
    )
}