import React, { useEffect, useState } from "react";
import { useRouter, Router } from "next/router";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Col, Divider, message, Row, Table, Button, Result } from 'antd';
import 'antd/dist/antd.css';
import logo from '../../../../public/Image/sahin-love.png'
import BackButton from "../../../backButton";



export default function InfoMessage() {

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

    }, []);

    const thouSep = ".";
    const decSep = ",";
    // format to money
    const toMoney = (num) => { return (Math.round(num * 100) / 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').replace(/[,.]/g, function (m) { return m === ',' ? thouSep : decSep; }) };
    ;


    return (
        <>
            <Result
                title="Transaksi anda sedang di tinjau oleh admin"
                subTitle="Jika ada keluhan atau ada pertanyaan silahkan klik tombol contact us"
                extra={
                    <>
                        <BackButton />
                        <Link href={"/contactUs"} >
                            <Button key="buy">Contact Us</Button>
                        </Link>
                    </>
                }
            />
        </>
    )
}