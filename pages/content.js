import "tailwindcss/tailwind.css"
import "antd/dist/antd.css"
import Image from "next/image";
import GambarKanan from "../public/Image/content-pic1.png"
import ProductHome from "./productHome";
import ReviewerSection from "./reviewerHome";
<<<<<<< HEAD

function ContentMain() {

=======
import { Col, Row, Grid, Space } from "antd";
const { useBreakpoint } = Grid;

function ContentMain() {
    const screens = useBreakpoint();
>>>>>>> be39ec6d4f44635aebf471badedc02234eb2adff
    return (
        <>
            <h1 className="text-center text-pink-500 text-3xl mt-5 py-10">
                Congratulations!
            </h1>
<<<<<<< HEAD
            <div className="grid md:grid-cols-2 md:mx-auto w-10/12 mb-10">

                <div className="w-10/12 mr-10 sm:text-start text-2xl text-start sm:ml-auto ">
                    <h1 className="text-pink-500">Anda Mau menikah?, Selamat!</h1>
                    <br />
                    <p style={{ textAlign: "justify" }}>Kami tahu mimpi untuk Menikah ini spesial.
                        Anda menginginkan pernikahan impian Anda tanpa kompromi. Upacara mengungkapkan isi hati.
                        Makanan yang lezat dan acara yang dapat dinikmati setiap detiknya.
                    </p>
                    <br />
                    <p style={{ textAlign: "justify" }}>Styling decor di mana para tamu pergi wow.
                        Sebuah ruangan yang memungkinkan Anda untuk merayakannya. Di SahIn.com, kami ingin mengabadikan impian Anda
                        dan menghilangkan stres sehingga Anda agar dapat benar-benar menikmati hari bersama tamu dan keluarga.
                    </p>
                    <br />
                    <h1 className="text-pink-500">just say to SahIn one stop solution for your wedding</h1>

                </div>
                <Image src={GambarKanan} width={293} height={555} objectFit='contain' className="w-10/12 ml-5" />
            </div>
=======
            <Row align="middle" justify="center">

                {Object.entries(screens)
                    .filter((screen) => !!screen[1])
                    .map((screen) => (
                        console.log(screen[0])
                    ))}
                <Col lg={{ span: 8 }} md={{ span: 8 }} sm={{ span: 22 }} xs={{ span: 22 }} className="gutter-row">
                    <div className=" sm:text-start text-2xl text-start sm:ml-auto ">
                        <h1 className="text-pink-500">Anda Mau menikah?, Selamat!</h1>
                        <br />
                        <p style={{ textAlign: "justify" }}>Kami tahu mimpi untuk Menikah ini spesial.
                            Anda menginginkan pernikahan impian Anda tanpa kompromi. Upacara mengungkapkan isi hati.
                            Makanan yang lezat dan acara yang dapat dinikmati setiap detiknya.
                        </p>
                        <br />
                        <p style={{ textAlign: "justify" }}>Styling decor di mana para tamu pergi wow.
                            Sebuah ruangan yang memungkinkan Anda untuk merayakannya. Di SahIn.com, kami ingin mengabadikan impian Anda
                            dan menghilangkan stres sehingga Anda agar dapat benar-benar menikmati hari bersama tamu dan keluarga.
                        </p>
                        <br />
                        <h1 className="text-pink-500">just say to SahIn one stop solution for your wedding</h1>

                    </div>
                </Col>
                {/* <Col lg={{ span: 2 }} sm={{ span: 22 }} xs={{ span: 22 }} className="gutter-row"></Col> */}
                <Col lg={{ span: 8 }} md={{ span: 8 }} sm={{ span: 10 }} xs={{ span: 22 }} offset={2} className="gutter-row">
                    <Image src={GambarKanan} width={500} height={600} />
                </Col>
            </Row>

>>>>>>> be39ec6d4f44635aebf471badedc02234eb2adff
            <ProductHome />
            <ReviewerSection />

        </>
    )
}
export default ContentMain