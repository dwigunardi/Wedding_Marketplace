import React, { useEffect, useState, useRef } from "react";
import { useRouter, Router } from "next/router";
import { useReactToPrint } from "react-to-print";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Button, Col, Divider, message, Row, Table } from 'antd';
import 'antd/dist/antd.css';
import logo from "../../../../public/Image/sahin-love.png"
import "./Invoice.module.css"
import signature from "../../../../public/Image/signature.png"

export default function Invoice() {
    const [data, setData] = useState({})
    const [dataProduct, setDataProduct] = useState([])
    const [dataUser, setDataUser] = useState([])
    const router = useRouter()
    const { id } = router.query;


    async function getDataAll() {
        try {
            const getToken = await localStorage.getItem("token_customer")
            await axios.get(`https://project-wo.herokuapp.com/transaction/detail/${id}`, {
                headers: {
                    'Authorization': `Bearer ${getToken}`
                }
            }).then(res => {

                if (res.status == 200 || res.status == 201) {
                    setData(res.data.data)
                    axios.get(`https://project-wo.herokuapp.com/product/search/product?page=1&limit=20&search=&location=&category=&merchant=`).then(res => {
                        // console.log(res)
                        setDataProduct(res.data.items)
                        axios.get(`https://project-wo.herokuapp.com/users`, {
                            headers: {
                                'Authorization': `Bearer ${getToken}`
                            }
                        }).then(result => {
                            // console.log(result.data.items)
                            if (result.status == 200 || result.status == 201) {
                                setDataUser(result.data.items)

                            }

                        })
                    })
                }

            })
        } catch (error) {
            if (error) {
                message.error("Data tidak ditemukan tolong kembali lagi")
            }
        }
    }
    useEffect(() => {
        getDataAll()
        // setTimeout(() => {
        //     window.print()
        // }, 5000);
    }, []);

    const dataSelected = dataProduct.find((dataProduct) => dataProduct.id == data.product.id);
    const merchantSelected = dataUser.find((data) => data.merchant[0]?.id == dataSelected.merchant?.id)

    console.log("inidata dari dataselected", merchantSelected)
    const thouSep = ".";
    const decSep = ",";
    // format to money
    const toMoney = (num) => { return (Math.round(num * 100) / 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').replace(/[,.]/g, function (m) { return m === ',' ? thouSep : decSep; }) };
    ;

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "Invoice",
    });


    return (
        <>

            <div className="w-3/4 mx-auto">
                <div ref={componentRef}>
                    <Row justify="center" className="pt-5" >
                        <Col span={10}>

                            {/* <h1 className="text-3xl italic font-extrabold tracking-widest text-indigo-500">
                                                Larainfo
                                            </h1> */}
                            <Image src={logo} objectFit={'contain'} width={150} height={100} />


                        </Col>
                        <Col span={10}>
                            <p className="text-base">
                                Invoice digunakan sebagai Bukti pada saat anda melanjutkan transaksi kepada pihak merchant
                            </p>
                        </Col>
                    </Row>
                    <Row justify="space-between" className="w-full">
                        <Col>
                            {/* <div className="p-2"> */}
                            <div className="p-2 border-l-2 border-pink-200">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 text-pink-600 mx-auto"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                                    />
                                </svg>
                                <span className="text-sm text-center">www.Sahin.com</span>
                            </div>
                            {/* </div> */}
                        </Col>
                        <Col>
                            <div className="p-2">

                                <div className="p-2 border-l-2 border-pink-200">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-pink-600 mx-auto"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3" />
                                        <circle cx="12" cy="10" r="3" /><circle cx="12" cy="12" r="10" />
                                    </svg>
                                    <span className="text-sm text-center">{data.user?.name}</span>
                                </div>

                            </div>
                        </Col>
                        <Col>
                            <div className=" p-2 border-l-2 border-pink-200">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 text-pink-600 mx-auto"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                                <span className="text-sm">
                                    {data.address}
                                </span>
                            </div>
                        </Col>
                    </Row>
                    <div className="w-full h-0.5 bg-pink-500" />
                    <div className="flex justify-between p-4">
                        <div>
                            <h6 className="font-bold">
                                Tanggal mulai booking :{" "}
                                <span className="text-sm font-medium text-pink-500">{data?.startDate} </span>
                            </h6>
                            <h6 className="font-bold">
                                Order ID : <span className="text-sm font-medium text-pink-500">{data?.id}</span>
                            </h6>
                        </div>
                        <div className="w-40">
                            <address className="text-sm">
                                <span className="font-bold"> Di bayar oleh : {data?.user?.name}</span>

                            </address>
                        </div>
                        <div className="w-40">
                            <address className="text-sm">
                                <span className="font-bold">Lokasi Event : {data?.address}</span>

                            </address>
                        </div>
                        <div />
                    </div>
                    <h1 className="ml-10 text-lg font-bold">Information Tentang Merchant</h1>
                    <p className="ml-10 text-pink-500">
                        Anda di haruskan Menghubungi untuk melanjutkan transaksi!</p>
                    <Row>

                        <Col>
                            <ul className="ml-10 text-pink-500 ">
                                <li>
                                    Nama Merchant : {merchantSelected?.name}
                                </li>
                                <li>
                                    Nama Vendor : {dataSelected?.merchant?.name}
                                </li>
                                <li>
                                    Email : {merchantSelected?.email}
                                </li>
                                <li>
                                    No Telp : +62{merchantSelected?.no_telp}
                                </li>
                            </ul>
                        </Col>
                    </Row>
                    <div className="flex justify-center p-4">
                        <div className="border-b border-pink-200 shadow">
                            <table className="">
                                <thead className="bg-pink-50">
                                    <tr>
                                        <th className="px-4 py-2 text-xs text-pink-500 ">#</th>
                                        <th className="px-4 py-2 text-xs text-pink-500 ">
                                            Nama Product
                                        </th>
                                        <th className="px-4 py-2 text-xs text-pink-500 ">Variant</th>
                                        <th className="px-4 py-2 text-xs text-pink-500 ">Lokasi</th>
                                        <th className="px-4 py-2 text-xs text-pink-500 ">Harga</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    <tr className="whitespace-nowrap">
                                        <td className="px-6 py-2 text-sm text-pink-500">1</td>
                                        <td className="px-6 py-2">
                                            <div className="text-sm text-pink-900">
                                                {data?.product?.name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-2">
                                            <div className="text-sm text-pink-500">{data?.variant?.name}</div>
                                        </td>
                                        <td className="px-6 py-2 text-sm text-pink-500">{data?.product?.location}</td>
                                        <td className="px-6 py-2 text-pink-500">Rp. {toMoney(data?.total_price)}</td>
                                    </tr>


                                    {/*end tr*/}
                                    <tr>
                                        <th colSpan={3} />


                                    </tr>
                                    {/*end tr*/}
                                    <tr className="text-white bg-pink-800">
                                        <th colSpan={3} />
                                        <td className="text-sm font-bold">
                                            <b>Total</b>
                                        </td>
                                        <td className="text-sm font-bold">
                                            <b>Rp.{toMoney(data?.total_price)}</b>
                                        </td>
                                    </tr>
                                    {/*end tr*/}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="flex justify-between p-2">
                        <div>
                            <h3 className="text-xl">Terms And Condition :</h3>
                            <ul className="text-xs list-disc list-inside">
                                <li>
                                    Invoice yang di cetak akan berlaku di hitung dari 7 hari sejak diterimanya faktur.
                                </li>
                                <li>
                                    Invoice yang sah di dapatkan melalui pembayaran langsung online dari list no rekening yang tersedia.
                                </li>
                                <li>
                                    Jika sudah menerima invoice ini, segera chat dengan merchant yang bersangkutan.
                                </li>
                                <li>
                                    Invoice yang sah terdapat Tanda tangan admin di pokok sebelah kanan.
                                </li>
                            </ul>
                        </div>
                        <div className="p-2">
                            <h1 className="text-lg ml-7">Signature</h1>
                            <Image src={signature} width={150} height={75} priority />
                        </div>
                    </div>
                    <div className="w-full h-0.5 bg-pink-500" />
                    <div className="p-2">
                        <div className="flex items-center justify-center">
                            Thank you very much for doing business with us.
                        </div>
                    </div>

                </div>
            </div>
            <Row justify="start" className="h-full float-right mr-10  sticky bottom-10">
                <Col>
                    <button onClick={handlePrint} className="inline-block w-32 px-6 py-2.5 bg-pink-500 text-white font-medium text-xs leading-tight uppercase rounded-lg shadow-md 
                                    hover:bg-white hover:text-pink-500 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg 
                                    transition duration-150 ease-in-out  mb-3 ">
                        Print
                    </button>
                </Col>
            </Row>
        </>
    )
}