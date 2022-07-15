import { Col, Row, Space } from 'antd';
import Image from 'next/image';
import React, { useState } from 'react';
import Coupleimg from "../../public/Image/couple1.png"


function ReviewerSection() {
    const [random, setRandom] = useState();
    return (
        <>
            <div className="text-center mt-5 py-5">
                <h1 className=" text-pink-500 text-3xl ">
                    Real Couples. Real Love. Real Weddings.
                </h1>
            </div>
            <Row className="flex justify-center w-10/12 ml-20 pl-20">
                <Col span={6} className="ml-20 pt-5">
                    <Image

                        src={Coupleimg}
                        layout="responsive"
                        objectFit='contain'

                    />
                </Col>
                <Col span={6} className="mx-4 pt-5">
                    <p className='text-3xl text-pink-500 text-center'>
                        Brian & Jasmine
                    </p>
                    <p className='text-3xl text-pink-500 text-center'>
                        "Udah Sampe Goal Nih, Loe Kapan?"
                    </p>
                </Col>
                <Col span={6} className="mx-4 pt-5">
                    <Image
                        className='max-w-sm h-auto transition-shadow ease-in-out duration-300 shadow-none hover:shadow-xl'
                        src={Coupleimg}
                        layout="responsive"
                        objectFit='contain'
                    />
                </Col>

            </Row>
        </>
    )
}

export default ReviewerSection