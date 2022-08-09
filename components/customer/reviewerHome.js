import 'antd/dist/antd.css'
import "tailwindcss/tailwind.css"
import { Col, Row, Space, Grid, Carousel } from 'antd';
import Image from 'next/image';
import React, { useState } from 'react';
import Coupleimg from "../../public/Image/couple1.png"
import Coupleimg2 from "../../public/Image/couple3.webp"
import Coupleimg3 from "../../public/Image/couple3-2.webp"
import Coupleimg4 from "../../public/Image/couple4.jpg"
import Coupleimg5 from "../../public/Image/couple4-3.jpg"
import CoupleSlide from './coupleSlide';
import BookingBg from '../../components/customer/bgBooking';
const { useBreakpoint } = Grid;


function ReviewerSection() {

    const [random, setRandom] = useState();
    const screens = useBreakpoint();
    return (
        <>
            <div className="text-center mt-5 py-5">
                <h1 className=" text-pink-500 text-3xl ">
                    Real Couples. Real Love. Real Weddings.
                </h1>
            </div>
            <div className='bg-[#FFF2F5]'>
                <Row className=" justify-center">

                    <Col lg={{ span: 5 }} md={{ span: 5 }} sm={{ span: 20 }} xs={{ span: 20 }} className="space-x-2 pt-5">
                        <Image

                            src={Coupleimg}
                            layout="responsive"
                            objectFit='contain'
                            placeholder='blur'
                        />
                    </Col>
                    <Col lg={{ span: 5 }} md={{ span: 5 }} sm={{ span: 20 }} xs={{ span: 20 }} className="space-x-2 pt-5">
                        <p className='text-3xl text-pink-500 text-center'>
                            Brian & Jasmine
                        </p>
                        <p className='text-3xl text-pink-500 text-center'>
                            "Udah Sampe Goal Nih, Loe Kapan?"
                        </p>
                    </Col>
                    <Col lg={{ span: 5 }} md={{ span: 5 }} sm={{ span: 20 }} xs={{ span: 20 }} className="space-x-2 pt-5">
                        <Image
                            className=' h-auto transition-shadow ease-in-out duration-300 shadow-none hover:shadow-xl'
                            src={Coupleimg}
                            layout="responsive"
                            objectFit='contain'
                            placeholder='blur'
                        />
                    </Col>
                </Row>
                <Row className=" justify-center">

                    <Col lg={{ span: 6 }} md={{ span: 5 }} sm={{ span: 20 }} xs={{ span: 20 }} className=" pt-5">
                        <Image

                            src={Coupleimg2}
                            layout="responsive"
                            objectFit='contain'
                            placeholder='blur'
                        />
                    </Col>
                    <Col lg={{ span: 3 }} md={{ span: 5 }} sm={{ span: 20 }} xs={{ span: 20 }} offset={1} className=" pt-5">
                        <Image
                            className=' h-auto transition-shadow ease-in-out duration-300 shadow-none hover:shadow-xl'
                            src={Coupleimg3}
                            layout="responsive"
                            placeholder='blur'
                            objectFit='contain'
                        />
                    </Col>
                    <Col lg={{ span: 4 }} md={{ span: 5 }} sm={{ span: 20 }} xs={{ span: 20 }} offset={1} className=" pt-5">
                        <p className='text-3xl text-pink-500 text-center'>
                            Rizky & Nadya
                        </p>
                        <p className='text-3xl text-pink-500 text-center'>
                            “Mau nikah? makanya SahIn”
                        </p>
                    </Col>
                </Row>
                <Row justify="center">

                    <Col lg={{ span: 5 }} md={{ span: 5 }} sm={{ span: 20 }} xs={{ span: 20 }} className="space-x-2 pt-5">
                        <Image

                            src={Coupleimg4}
                            layout="responsive"
                            objectFit='contain'
                            placeholder='blur'
                        />
                    </Col>

                    <Col lg={{ span: 5 }} md={{ span: 5 }} sm={{ span: 20 }} xs={{ span: 20 }} offset={1} className="space-x-2 pt-5">
                        <Image
                            className=' h-auto transition-shadow ease-in-out duration-300 shadow-none hover:shadow-xl'
                            src={Coupleimg5}
                            layout="responsive"
                            objectFit='contain'
                            placeholder='blur'
                        />
                    </Col>
                    <Col lg={{ span: 4 }} md={{ span: 5 }} sm={{ span: 20 }} xs={{ span: 20 }} className="space-x-2 pt-5">
                        <p className='text-3xl text-pink-500 text-center'>
                            Adhiguna & Sabrina
                        </p>
                        <p className='text-3xl text-pink-500 text-center'>
                            “Say Yes To SahIn”
                        </p>
                    </Col>
                </Row>


                {/* carousel section */}

            </div>

        </>
    )
}

export default ReviewerSection