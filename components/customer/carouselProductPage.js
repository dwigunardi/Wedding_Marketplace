import { Carousel, Row, Col } from 'antd'
import heroImg from "../../public/Image/banner-wed-3.png"
import Image from 'next/image';
export default function CarouselProductPage() {
    const contentStyle = {
        height: '100%',
        minHeight: '100vh',
        maxHeight: '200vh',
        lineHeight: '100px',
        textAlign: 'center',

    };

    return (
        <>
            <Carousel autoplay>
                <div>
                    <div style={contentStyle}>
                        <Image src={heroImg} layout="fill" placeholder='blur' priority={true} />
                        <Row justify="end" align="middle" style={contentStyle}>
                            <Col span={10} offset={3}>
                                <p className="text-pink-500 text-5xl w-10/12">
                                    Pay Less For More Happines
                                </p>

                                <button
                                    type="button"
                                    className=" focus:outline-none text-white bg-pink-500
                                         hover:bg-pink-600 focus:ring-4 focus:ring-pink-300 font-medium text-lg 
                                         hover:translate-x-2  hover:scale-110 delay-150 transition ease-in-out
                                         rounded-lg  px-10 py-4 mr-20 mb-2 dark:focus:ring-pink-900"
                                >
                                    All in one Package
                                </button>


                            </Col>
                        </Row>
                    </div>
                </div>
            </Carousel>
        </>
    )
}