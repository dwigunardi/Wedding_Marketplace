import Image from "next/image"
import "antd/dist/antd.css"
import "tailwindcss/tailwind.css"
import Link from "next/link"
import { Col, Row, Grid, Layout, Button } from "antd"
import bgParallax from "../public/Image/bg-paralax 1.png"

function BookingBg() {
    const bgStyle = {

        backgroundAttachment: "fixed",
        backgroundPostion: "center",
        backgroundRepeat: "no-repeat"
    }
    return (
        <>
            <div className="relative">
                <Image src={bgParallax} style={bgStyle} layout="fill" />
                <Row justify="space-evenly" align="middle" className="h-52">
                    <Col lg={{ span: 10 }} md={{ span: 10 }} sm={{ span: 10 }} xs={{ span: 10 }} offset={2}>
                        <h1 className="text-5xl text-pink-500 ">SahIn, one stop solution for your wedding </h1>
                    </Col>
                    <Col lg={{ span: 5 }} md={{ span: 10 }} sm={{ span: 10 }} xs={{ span: 10 }} offset={2}>
                        <button className="transition ease-in-out hover:-translate-x-2 hover:scale-110 delay-150 px-6 py-3 
                         text-pink-500 mr-4 border-solid border-pink-500 border-2 rounded-full 
                        shadow hover:bg-pink-500 hover:text-white ...">
                            <p className="text-center text-lg">Book Now</p> </button>
                    </Col>
                </Row>

            </div>
        </>
    )
}
export default BookingBg