import { useEffect, useState, useRef } from "react";
import "tailwindcss/tailwind.css";
import 'antd/dist/antd.variable.css'
import FooterCustomer from "../../../components/footer";
import Navigasi from "../../../components/navigasi";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Col, Row, Space, Layout, Select, ConfigProvider, Collapse, message, Form, Input, DatePicker, Modal, Rate, Button, Tooltip, Slider } from "antd";
import { ShoppingCartOutlined, BookOutlined, ShopOutlined, AppstoreOutlined, PlusCircleOutlined, StarFilled, FrownFilled, ExclamationCircleOutlined, WhatsAppOutlined } from "@ant-design/icons";
import { useRouter, Router } from "next/router";
import Image from "next/image";
import cardImg1 from '../../../public/Image/card-product/aminta-hotel.webp'
import { Content } from "antd/lib/layout/layout";
import Link from "next/link";
import placeholder from "../../../public/Image/img-placeholder.png"
import StickyBox from "react-sticky-box";
ConfigProvider.config({
    theme: {
        primaryColor: '#EC4899',
    },
});
const { Panel } = Collapse;
const { Option } = Select;

export default function ProductIdCustomer() {


    const { Header, Footer, Sider, Content } = Layout;
    const [form] = Form.useForm();
    const [formDua] = Form.useForm();
    const [product, setProduct] = useState([])
    const [variant, setVariant] = useState([])
    const [userId, setUserId] = useState('')
    const [transaksiId, setTransaksiId] = useState('')
    const [harga, setHarga] = useState(false)
    const [visible, setVisible] = useState(false);
    const [visibleDua, setVisibleDua] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [address, setAddress] = useState('')
    const [fotoProfil, setFotoProfil] = useState(false)
    const [dataReview, setDataReview] = useState([])
    const [bintang, setBintang] = useState(
        {
            lima: "",
            empat: "",
            tiga: "",
            dua: "",
            satu: "",
        }
    )
    const router = useRouter();
    const { id } = router.query;



    const dataSelected = product.find((data) => data.id == id);
    const selectedVariant = dataSelected?.variant[0]
    const handleChange = (value) => {
        // console.log(`selected ${value}`);
        const selectedVariant = dataSelected?.variant?.find(d => d.id == value)
        setHarga(true)
        setVariant(selectedVariant);

    };
    function getReview() {
        axios.get(`https://project-wo.herokuapp.com/review/product/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token_customer")}`
            }
        }).then(res => {
            console.log(res)
            setDataReview(res.data.data)
        })
    }
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
            console.log(res.data)
            // for (let i = 0; i < res.data.items.length; i++) {
            //     setVariant([res.data.items[i].variant])
            //     // console.log(res.data.items[i].variant)
            // }
            // setVariant(res.data.items.variant)
        })

        getReview()
    }, []);
    const onChange = (key) => {
        console.log(key);
    };

    const showModal = () => {
        setVisible(true);

    };
    const showUlasan = () => {
        setVisibleDua(true)
    }
    const handleModalReview = () => {
        const getForm = formDua.getFieldValue()
        // console.log(modalTaskIdTiga)
        const getToken = localStorage.getItem("token_customer")
        const decode = jwt_decode(getToken)
        const data = {
            user_id: decode.user_id,
            product_id: dataSelected?.id,
            star: getForm.rate,
            message: getForm.message,
        }
        console.log(getForm)
        axios.post(`https://project-wo.herokuapp.com/review`, data, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token_customer")}`
            }
        }).then(res => {
            console.log(res)

        })

        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            getReview()
            setVisibleDua(false);
            setConfirmLoading(false);
        }, 2000);
        // location.reload()
    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
        setVisibleDua(false)
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
                // console.log(res)
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
    // console.log(dataSelected);
    function getStar() {
        const fiveStar = dataReview.filter((data) => data.star == 5).length
        const fourStar = dataReview.filter((data) => data.star == 4).length
        const thirdStar = dataReview.filter((data) => data.star == 3).length
        const twoStar = dataReview.filter((data) => data.star == 2).length
        const oneStar = dataReview.filter((data) => data.star == 1).length
        const arrBintang = {
            lima: fiveStar,
            empat: fourStar,
            tiga: thirdStar,
            dua: twoStar,
            satu: oneStar
        }
        const rumusKepuasan = arrBintang.lima + arrBintang.empat / dataReview.length * 100

        return (<>
            <div>

                <h1 className="text-center text-lg">{rumusKepuasan.toString().slice(0, 2)}% Pembeli merasa puas
                    <Tooltip title="Dihitung dari jumlah rating positif (bintang 4 dan 5) di bagi dengan total rating">
                        <span className="ml-3 mb-5">
                            <ExclamationCircleOutlined />
                        </span>
                    </Tooltip>
                </h1>

            </div></>)
    }


    function hitungReview() {
        if (dataReview.some(item => item.star == 1 || 2 || 3 || 4 || 5)) {
            const rumus = dataReview.length
            const hitungTotalBintang = dataReview.map((data) => {
                return data.star
            }).reduce((prev, curent) => {
                return prev + curent
            })

            const jumlah = hitungTotalBintang / rumus
            const aksi = jumlah.toString().slice(0, 3)
            const fiveStar = dataReview.filter((data) => data.star == 5).length
            const fourStar = dataReview.filter((data) => data.star == 4).length
            const thirdStar = dataReview.filter((data) => data.star == 3).length
            const twoStar = dataReview.filter((data) => data.star == 2).length
            const oneStar = dataReview.filter((data) => data.star == 1).length
            return ((<>
                <div className="text-5xl text-center mx-2 text-pink-500">
                    <StarFilled style={{ color: "#ffc400", marginBottom: "10px", marginRight: "10px" }} />{aksi}/
                    <span className="text-lg text-gray-500">5.0</span>
                </div>
                {getStar()}
                <p className="text-center text-gray-500">{hitungTotalBintang} rating dari {dataReview.length} Ulasan</p>
                <Row className="max-w-3/4 text-center" justify="center" align="middle">
                    <Col>
                        <StarFilled style={{ color: "#ffc400", marginBottom: "10px", }} /> 5
                    </Col>
                    <Col span={10}>
                        <div className="ml-5">
                            <Slider defaultValue={fiveStar} max={5} disabled={true} />
                        </div>
                    </Col>
                    <Col offset={1}>
                        <p>{fiveStar}</p>
                    </Col>
                </Row>
                <Row className="max-w-3/4 text-center" justify="center" align="middle">
                    <Col>
                        <StarFilled style={{ color: "#ffc400", marginBottom: "10px", }} /> 4
                    </Col>
                    <Col span={10}>
                        <div className="ml-5">
                            <Slider defaultValue={fourStar} max={5} disabled={true} />
                        </div>
                    </Col>
                    <Col offset={1}>
                        <p>{fourStar}</p>
                    </Col>
                </Row>
                <Row className="max-w-3/4 text-center" justify="center" align="middle">
                    <Col>
                        <StarFilled style={{ color: "#ffc400", marginBottom: "10px", }} /> 3
                    </Col>
                    <Col span={10}>
                        <div className="ml-5">
                            <Slider defaultValue={thirdStar} max={5} disabled={true} />
                        </div>
                    </Col>
                    <Col offset={1}>
                        <p>{thirdStar}</p>
                    </Col>
                </Row>
                <Row className="max-w-3/4 text-center" justify="center" align="middle">
                    <Col>
                        <StarFilled style={{ color: "#ffc400", marginBottom: "10px", }} /> 2
                    </Col>
                    <Col span={10}>
                        <div className="ml-5">
                            <Slider defaultValue={twoStar} max={5} disabled={true} />
                        </div>
                    </Col>
                    <Col offset={1}>
                        <p>{twoStar}</p>
                    </Col>
                </Row>
                <Row className="max-w-3/4 text-center" justify="center" align="middle">
                    <Col>
                        <StarFilled style={{ color: "#ffc400", marginBottom: "10px", }} /> 1
                    </Col>
                    <Col span={10}>
                        <div className="ml-5">
                            <Slider defaultValue={oneStar} max={5} disabled={true} />
                        </div>
                    </Col>
                    <Col offset={1}>
                        <p>{oneStar}</p>
                    </Col>
                </Row>
            </>))
        } else {
            return <div className="text-center text-2xl text-red-600"><FrownFilled /><p>Product ini Belom memiliki review</p></div>
        }

    }
    // console.log(hitungReview())
    return (
        <>
            <Layout style={{ backgroundColor: "white" }}>
                <Navigasi idTransaksi={transaksiId} />
            </Layout>
            <Content className="h-full mt-20 p-10 ">
                <Row justify="space-evenly">
                    <Col span="8" className="border-2 border-gray-200 shadow-md">
                        <Image loader={() => dataSelected?.image}
                            src={`https://project-wo.herokuapp.com/product/image/${dataSelected?.image}`}
                            priority={true}
                            unoptimized={true}
                            width={450}
                            height={350} />
                        <h1 className="text-lg text-pink-500 mx-5">Deskripsi Product</h1>
                        <p className="text-base font-semibold mt-2 text-justify mx-5 text-ellipsis overflow-hidden ...">
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
                    <Col span="8" className="sticky top-0">
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
                        <div className="mt-5">

                            <Row justify='start' align='middle'>
                                <Col> <WhatsAppOutlined style={{ color: "#25D366" }} className='text-xl mx-2' /> </Col>

                                <Col> <a href='https://wa.me/+6285724763231' target={"_blank"} className=' text-lg font-bold mx-auto'><span>Hubungi : </span>{dataSelected?.merchant.name}</a></Col>

                            </Row>
                        </div>
                        <div className="mt-10">
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

                <Row justify="center" className=" my-5">
                    <Col>
                        <h1 className="text-2xl text-pink-500 mt-5">Ulasan Pilihan</h1>
                        <p className="text-sm text-grey-200">Menampilkan 5 dari {dataReview.length} Ulasan</p>
                    </Col>
                </Row>
                <Button type="primary" icon={<PlusCircleOutlined />} onClick={showUlasan} className="ml-5">Berikan Ulasan</Button>
                <div className="h-96 overflow-auto">
                    <Row justify="space-between">
                        <Col span={11}>
                            {dataReview.slice(0, 5).map((data) => {
                                return (<>
                                    <Row justify="start" className=" border-2 mt-5 border-pink-500 " key={data.id}>
                                        <Col span={11}>
                                            <div className="p-5 ">
                                                <div className="my-5">
                                                    <Rate disabled defaultValue={data.star} />
                                                </div>
                                                {fotoProfil ? (<>  <Image src={placeholder}
                                                    width={48} height={48} /></>) : (<>  <Image
                                                        className="rounded-t-lg"
                                                        loader={() => data.user.image}
                                                        priority={true}
                                                        unoptimized={true}
                                                        src={`https://project-wo.herokuapp.com/product/image/${data.user.image}`}
                                                        width={48}
                                                        height={48}
                                                        alt=""
                                                    /> </>)}
                                                <p>{data.createdAt?.slice(0, 10)}</p>
                                                <h1>{data.user.name}</h1>
                                                <p className="text-sm text-grey-300">product : {data.product.name}</p>
                                            </div>
                                        </Col>
                                        <Col span={11} className="mt-10">
                                            <h1 className="text-2xl text-pink-500">Ulasan</h1>
                                            <p className="text-md mt-2 text-gray-600 text-ellipsis overflow-hidden ...">{data.message}</p>
                                        </Col>
                                    </Row>
                                </>)
                            })}
                        </Col>
                        <Col span={11}>
                            <div className="h-full ">
                                <h1 className="text-center text-2xl text-pink-500 sticky top-0">Rating Keseluruhan</h1>
                                <div className="sticky top-10 mx-auto">
                                    {hitungReview()}
                                </div>
                            </div>
                        </Col>
                    </Row>

                </div>
                <Modal
                    title="Berikan Ulasan Anda"
                    visible={visibleDua}
                    onOk={handleModalReview}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}

                >
                    <Form
                        name="basic"
                        form={formDua}
                        initialValues={{
                            remember: true,
                        }}
                        autoComplete="off"
                    >
                        <Form.Item name="rate" label="Rate">
                            <Rate />
                        </Form.Item>
                        <Form.Item name={"message"} label="Komen">
                            <Input.TextArea wrap="true" />
                        </Form.Item>
                    </Form>
                </Modal>

            </Content>

            <FooterCustomer />
        </>
    )
}