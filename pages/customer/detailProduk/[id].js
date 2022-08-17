import { useEffect, useState, useRef } from "react";
import "tailwindcss/tailwind.css";
import 'antd/dist/antd.variable.css'
import FooterCustomer from "../../../components/footer";
import Navigasi from "../../../components/navigasi";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Col, Row, Space, Layout, Select, ConfigProvider, Collapse, message, Form, Input, DatePicker, Modal } from "antd";
import { ShoppingCartOutlined, BookOutlined, ShopOutlined, AppstoreOutlined } from "@ant-design/icons";
import { useRouter, Router } from "next/router";
import Image from "next/image";
import cardImg1 from '../../../public/Image/card-product/aminta-hotel.webp'
import { Content } from "antd/lib/layout/layout";
import Link from "next/link";



ConfigProvider.config({
    theme: {
        primaryColor: '#EC4899',
    },
});
const { Panel } = Collapse;
const { Option } = Select;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
export default function ProductIdCustomer() {


    const { Header, Footer, Sider, Content } = Layout;
    const [form] = Form.useForm();
    const [product, setProduct] = useState([])
    const [variant, setVariant] = useState([])
    const [userId, setUserId] = useState('')
    const [transaksiId, setTransaksiId] = useState('')
    const [harga, setHarga] = useState(false)
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [address, setAddress] = useState('')

    const router = useRouter();
    const { id } = router.query;
    useEffect(() => {

        if (localStorage.getItem("token_customer") === null) {
            message.error("anda Belom Login Untuk Melanjutkan Transaksi Anda harus Login")
        } else {
            const getToken = localStorage.getItem("token_customer")
            const decode = jwt_decode(getToken)
            setUserId(decode.user_id)
        }
        axios.get("https://project-wo.herokuapp.com/product").then(res => {
            setProduct(res.data.items)
            // console.log(res.data)
            // for (let i = 0; i < res.data.items.length; i++) {
            //     setVariant([res.data.items[i].variant])
            //     // console.log(res.data.items[i].variant)
            // }
            // setVariant(res.data.items.variant)
        })


    }, []);


    const dataSelected = product.find((data) => data.id == id);
    const selectedVariant = dataSelected?.variant[0]
    const handleChange = (value) => {
        // console.log(`selected ${value}`);
        const selectedVariant = dataSelected?.variant?.find(d => d.id == value)
        setHarga(true)
        setVariant(selectedVariant);

    };

    const onChange = (key) => {
        console.log(key);
    };

    const showModal = () => {
        setVisible(true);

    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const onChangeStartDate = (e) => {
        console.log(e._d)
        const value = e?._d
        setStartDate(value)
    }
    const onChangeEndDate = (e) => {
        // console.log(e)
        const value = e?._d
        setEndDate(value)
    }
    const onChangeAddress = (e) => {
        const value = e.target.value
        setAddress(value)
    }
    // const variantSelected = variant.find((data) => data.variant)
    // console.log(dataSelected)
    const submitTransaksi = async function (values) {

        try {
            const myData = await {
                user_id: userId,
                product_id: dataSelected?.id,
                variant_id: variant.id,
                total_price: variant.price,
                start_date: startDate,
                end_date: endDate,
                address: address,
            }

            // console.log(myData)
            if (myData.variant_id == undefined) {
                message.info("Periksa lagi pesanan anda")
            } else if (myData.total_price == undefined) {
                message.info("Variant tidak boleh kosong")
            }
            await axios.post("https://project-wo.herokuapp.com/transaction", myData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token_customer")}`
                }
            }).then(res => {
                console.log(res.data.data.id)
                if (res.status == 200 || res.status == 201) {
                    setTransaksiId(res.data.data.id)
                    setConfirmLoading(true);
                    message.success("Product berhasil di Booking")
                    setTimeout(() => {
                        setVisible(false);
                        setConfirmLoading(false)
                        message.info("Anda akan Di arahkan Ke halaman Transaksi")
                        router.push(`/customer/transaksi/${userId}`)
                    }, 2000);

                }
            })

        } catch (error) {
            if (error) {
                message.error("Anda Belom Login dan tidak dapat melanjutkan transaksi")
            }

        }
    }
    const thouSep = ".";
    const decSep = ",";
    // format to money
    const toMoney = (num) => { return (Math.round(num * 100) / 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').replace(/[,.]/g, function (m) { return m === ',' ? thouSep : decSep; }) };
    return (
        <>
            <Layout style={{ backgroundColor: "white" }}>
                <Navigasi idTransaksi={transaksiId} />
            </Layout>
            <Content className="h-3/4 mt-20 p-10">
                <Row justify="space-evenly">
                    <Col span="8" >
                        <Image loader={() => dataSelected?.image}
                            src={`https://project-wo.herokuapp.com/product/image/${dataSelected?.image}`}
                            priority={true}
                            unoptimized={true}
                            width={450}
                            height={350} />
                        <p className="text-base font-semibold mt-2 text-justify">
                            {dataSelected?.description}
                        </p>
                    </Col>

                    <Col
                        style={{ textAlign: "justify" }}
                        span="5" offset={2}
                    >
                        <h2 className="font-bold text-2xl text-black">{dataSelected?.name}</h2>
                        <h2 className="font-semibold text-xl my-3 text-black">
                            {/* {product.map((data) => {
                                return data.variant.find((data) => {
                                    data.id == variant
                                    console.log(variant)
                                })
                            })} */}
                        </h2>
                        {harga ? (<>

                            <h1 className="text-pink-500 text-2xl "> RP. {toMoney(variant?.price)}</h1>
                        </>) : (<>
                            <h1 className="text-pink-500 text-2xl ">Rp. {toMoney(dataSelected?.variant[0].price)}</h1>

                        </>)
                        }
                        <div className="my-5">
                            <Select
                                placeholder="---Pilih variant"
                                style={{
                                    width: 150,
                                }}
                                onChange={handleChange}
                            >
                                {dataSelected?.variant.map((data) => {
                                    return (
                                        <>
                                            <Option value={data.id} key={data.id}>{data.name}</Option>
                                        </>
                                    )
                                })}
                            </Select>
                        </div>
                        <div className="my-5">
                            <AppstoreOutlined className="mr-2 mb-2 text-xl" />
                            <Space className="text-base mt-2">Category</Space>
                            <p className="text-pink-500 text-xl">{dataSelected?.category.name}</p>
                        </div>
                        <div className="my-5">
                            <ShopOutlined className="mr-2 mb-2 text-xl" />
                            <Space className="text-base mt-2">Partner</Space>

                            <p className="text-pink-500">{dataSelected?.merchant.name}</p>
                        </div>
                        <div className="my-5">
                            <AppstoreOutlined className="mr-2 mb-2 text-xl" />
                            <Space className="text-base mt-2">Availability</Space>
                            <p className="text-pink-500 text-xl">{dataSelected?.availability}</p>
                        </div>
                    </Col>
                    <Col span="8">
                        <Collapse accordion >
                            <Panel header="Wedding Planner & MC" key="1" >
                                <ol style={{ listStyleType: "circle", }} className="ml-5">
                                    <li>Unlimited consultation before wedding day </li>
                                    <li>1x Technical Meeting with All Vendors</li>
                                    <li>Arranging Wedding Checklist & Rundown Details</li>
                                    <li>Included d-day crew (1 Coordinator & 5 Crews)</li>
                                    <li>MC for Akad / Holy Matrimony & Reception</li>
                                </ol>
                            </Panel>
                            <Panel header="Decorations" key="2">
                                <ol style={{ listStyleType: "circle", }} className="ml-5">
                                    <li>Unlimited consultation before wedding day </li>
                                    <li>Mix Fresh Flower and Artificial</li>
                                    <li>Welcome Sign (Printing)</li>
                                    <li>1 Set Akad Nikah / Holy Matrimony (6 chairs & Hias Meja)</li>
                                    <li>Pelaminan (Backdrop 6x3m, Mini Garden, Permadani)</li>
                                    <li>Aisle (4 Standing Flowers / 12 Titik Jalur Peacock)</li>
                                    <li>Meja VIP decoration (Centerpiece Flowers)</li>
                                    <li>Foyer (2 Kotak Angpao, Meja Penerima Tamu)</li>
                                </ol>
                                <h2>Complimentary : Hand Bouquet & Corsage</h2>
                                <h2>+ Add Ons</h2>
                                <ol style={{ listStyleType: "circle", }} className="ml-5">
                                    <li>Photo Gallery / Photo Spot Decoration</li>
                                    <li> Upgrade Items / FLowers</li>
                                </ol>

                            </Panel>
                            <Panel header="Catering" key="3">
                                <ol style={{ listStyleType: "circle", }} className="ml-5">
                                    <li>Buffet according to ordered pax</li>
                                    <li>Stalls up to 4 menus</li>
                                    <li>Dessert Condiments (Fruit, Pudding)</li>
                                    <li>Drink (Water, Soda, Tea)</li>
                                </ol>
                            </Panel>
                            <Panel header="Documentation" key="4">
                                <ol style={{ listStyleType: "circle", }} className="ml-5">
                                    <li>Photo and Videos by our professional vendors</li>
                                    <li>1 Photographer & 1 Videographer</li>
                                    <li>Cover 4-6 hours works</li>
                                    <li>3-5 minute highlight Video</li>
                                    <li>50-100 Edited Photos</li>
                                    <li>All files via Google Drive</li>
                                </ol>
                            </Panel>
                            <Panel header="Entertainment, Sound System, and Lighting" key="5">
                                <ol style={{ listStyleType: "circle", }} className="ml-5">
                                    <li>Entertainment (Singer, musician)</li>
                                    <li>Included 2 wireless microphones </li>
                                    <li>3,000-5,000 watt sound system</li>
                                    <li>Lighting for Backdrop Pelaminan</li>
                                </ol>
                            </Panel>
                            <Panel header="Bridal & Make Up" key="6">
                                <ol style={{ listStyleType: "circle", }} className="ml-5">
                                    <li>Make up for bride </li>
                                    <li>2 rented gown for bride (Akad/Holy & Reception)</li>
                                    <li>2 rented suit for groom (Beskap / Jas)</li>
                                    <li>2 Moms Makeup</li>
                                </ol>
                            </Panel>
                        </Collapse>

                        <div className="mt-20">



                            <button
                                type="button"
                                onClick={showModal}
                                className=" space-x-2 justify-end inline-block px-6 bg-pink-500 text-white font-medium text-xs leading-tight shadow-md 
                                focus:shadow-lg hover:bg-white active:bg-pink-700 hover:text-pink-500 hover:border-pink-500
                                transition-all ease-in-out w-full"
                            >
                                <BookOutlined className="mr-2 mb-2 text-xl" />
                                <Space className="text-sm mt-2">Book Now</Space>
                            </button>


                        </div>
                    </Col>
                </Row>
                <Modal
                    title="Isi Lengkap"
                    visible={visible}
                    onOk={submitTransaksi}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}

                >


                    <Form
                        form={form}
                        className="w-full"
                        // onFinish={submitTransaksi}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"

                    >
                        <Form.Item
                            label="Start Date"
                            name="start_date"
                            rules={[
                                {
                                    required: true,
                                    message: 'choose your date',
                                },
                            ]}
                        >
                            <DatePicker className="w-full" onChange={onChangeStartDate} format="YYYY-MM-DD" />
                        </Form.Item>

                        <Form.Item
                            label="End Date"
                            name="end_date"
                            rules={[
                                {
                                    required: true,
                                    message: 'choose your date',
                                },
                            ]}
                        >
                            <DatePicker onChange={onChangeEndDate} className="w-full" />
                        </Form.Item>
                        <Form.Item
                            label="Address"
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: 'input your address',
                                },
                            ]}
                        >
                            <Input.TextArea onChange={onChangeAddress} className="w-full h-1/2" />
                        </Form.Item>

                        {/* <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item> */}
                    </Form>
                </Modal>
            </Content>

            <FooterCustomer />
        </>
    )
}