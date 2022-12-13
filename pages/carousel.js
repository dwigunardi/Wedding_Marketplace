import { Button, Carousel, Col, Divider, Row, Radio } from "antd";
import Image from "next/image";
import "tailwindcss/tailwind.css"
import banner1 from "../public/Image/banner-wed-1.png"
import banner2 from "../public/Image/banner-wed-2.png"
import banner3 from "../public/Image/banner-wed-4.png"
import { useState } from "react";
import "antd/dist/antd.css"
const contentStyle = {
    height: '100vh',

    lineHeight: '100px',
    textAlign: 'center',
    position: 'relative',
};



function CarouselAuto() {
    const [dotPosition, setDotPosition] = useState('top');

    const onChange = (currentSlide) => {

    };
    return (
        <>

            <Carousel afterChange={onChange} effect="fade" className=" text-black" autoplay>

                <div>
                    <div style={contentStyle}>
                        <Image src={banner1} layout="fill" className="" placeholder='blur' priority={true} />

                        <Row align="middle" style={{
                            position: "absolute",
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0
                        }}>
                            <Col span={10} offset={2}>
                                <p className="text-pink-500 text-5xl w-10/12">
                                    Pay Less For More Happines
                                </p>
                                <div className="">
                                    <button
                                        type="button"
                                        className=" focus:outline-none text-white bg-pink-500
                                         hover:bg-pink-600 focus:ring-4 focus:ring-pink-300 font-medium 
                                         hover:translate-x-2  hover:scale-110 delay-150 transition ease-in-out
                                         rounded-lg text-sm px-10 py-2.5 mr-20 mb-2 dark:focus:ring-pink-900"
                                    >
                                        Book Now
                                    </button>

                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div>
                    <div style={contentStyle}>
                        <Image src={banner2} layout="fill" className="" priority={true} placeholder='blur' />

                        <Row align="middle" style={{
                            position: "absolute",
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0
                        }}>
                            <Col span={10} offset={3}>
                                <p className="text-pink-500 text-5xl w-10/12">
                                    Pay Less For More Happines
                                </p>
                                <div className="">
                                    <button
                                        type="button"
                                        className=" focus:outline-none text-white bg-pink-500
                                         hover:bg-pink-600 focus:ring-4 focus:ring-pink-300 font-medium 
                                         rounded-lg text-sm px-10 py-2.5 mr-20 mb-2 dark:focus:ring-pink-900"
                                    >
                                        Book Now
                                    </button>

                                </div>
                            </Col>
                        </Row>

                    </div>
                </div>
                <div>
                    <div style={contentStyle}>
                        <Image src={banner3} layout="fill" className="" placeholder='blur' priority={true} />

                        <Row align="middle" style={{
                            position: "absolute",
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0
                        }}>
                            <Col span={10} offset={3} className="justify-center">
                                <p className="text-pink-500 text-5xl w-10/12">
                                    Pay Less For More Happines
                                </p>
                                <div className="">
                                    <button
                                        type="button"
                                        className=" focus:outline-none text-white bg-pink-500
                                         hover:bg-pink-600 focus:ring-4 focus:ring-pink-300 font-medium 
                                         rounded-lg text-sm px-10 py-2.5 mr-20 mb-2 dark:focus:ring-pink-900"
                                    >
                                        Book Now
                                    </button>

                                </div>

                            </Col>
                        </Row>
                    </div>
                </div>

            </Carousel>

        </>

    )
}

export default CarouselAuto