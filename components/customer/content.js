import 'antd/dist/antd.css'
import '../../node_modules/@fortawesome/fontawesome-svg-core/styles.css'
import "tailwindcss/tailwind.css"
import Image from "next/image";
import GambarKanan from "../../public/Image/content-pic1.png"
import { Col, Row, Grid, Space } from "antd";
import StepProject from "../../public/Image/step.png"


const { useBreakpoint } = Grid;

function ContentMain() {
    const screens = useBreakpoint();
    return (
        <>
            <h1 className="text-center text-pink-500 text-3xl mt-5 py-10">
                Congratulations!
            </h1>
            <Row align="middle" justify="center">
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
                <Col lg={{ span: 8 }} md={{ span: 8 }} sm={{ span: 10 }} xs={{ span: 22 }} offset={1} className="gutter-row">
                    <Image src={GambarKanan} width={500} height={600} placeholder='blur' />
                </Col>
            </Row>
            <Row justify='center' align='middle' className='mt-10 p-5'>
                <Col lg={{ span: 6 }} md={{ span: 6 }} sm={{ span: 10 }} xs={{ span: 22 }} offset={1}>
                    <h1 className='text-center text-3xl text-pink-500'>Profesional</h1>
                    <h4 style={{ textAlign: "justify" }} className="text-pink-500">We take things seriously, know how to chill and enjoy, Itu sebabnya nama depan kami diambil dari kata yang mudah di Kenali. Ya, kami adalah level Profesional,
                        tetapi jangan khawatir, kami tahu bagaimana bersenang-senang dan bagaimana membuat Anda rileks
                        dan santai sepanjang jalan.</h4>
                </Col>
                <Col lg={{ span: 6 }} md={{ span: 6 }} sm={{ span: 10 }} xs={{ span: 22 }} offset={1}>
                    <h1 className='text-center text-3xl text-pink-500'>Different</h1>
                    <h4 style={{ textAlign: "justify" }} className="text-pink-500">
                        Konsep kami selanjutnya adalah BERBEDA dari yang lain.
                        Kami tidak ingin kalian dikenang sebagai pasangan biasa
                        yang menikah di akhir pekan, memenuhi undangan dan kemudian berpesta. TIDAK!! Kami tidak mau itu
                    </h4>
                </Col>
                <Col lg={{ span: 6 }} md={{ span: 6 }} sm={{ span: 10 }} xs={{ span: 22 }} offset={1}>
                    <h1 className='text-center text-3xl text-pink-500'>Dependable</h1>
                    <h4 style={{ textAlign: "justify" }} className="text-pink-500">Kami adalah sahabat terbaik Anda selama perjalanan Anda untuk
                        mempersiapkan pernikahan dan keluarga terbaik di hari besar Anda. Jadi iya!
                        Nama kami selanjutnya diambil dari kata DAPAT DI ANDALKAN.</h4>
                </Col>
            </Row>
            <Row justify='center' align='middle' style={{ height: "100%" }} className="bg-pink-500 p-5">
                <Col lg={{ span: 8 }} md={{ span: 8 }} sm={{ span: 22 }} xs={{ span: 22 }}>
                    <h1 className='text-white transition-all ease-in-out delay-150 hover:translate-x-3 hover:scale-110 text-8xl'>Why Us</h1>
                </Col>
                <Col lg={{ span: 8 }} md={{ span: 8 }} sm={{ span: 22 }} xs={{ span: 22 }} className="text-white sm:text-base lg:text-lg">
                    <p style={{ textAlign: "justify" }} className="transition-all ease-in-out delay-150 hover:underline hover:translate-x-3">Berurusan dengan industri pernikahan adalah hal yang paling menyenangkan dalam hidup kita. Menyaksikan dua burung cinta yang
                        memutuskan untuk mengikat simpul dan bersumpah untuk hidup bahagia selamanya seperti menonton film Cinderella lagi dan lagi.</p>
                    <p style={{ textAlign: "justify" }} className="transition-all ease-in-out delay-150 hover:underline hover:translate-x-3 ">Pernikahan adalah bagian lain dari kehidupan yang harus diingat sepanjang hidup Anda. Mengapa kita tidak memulai bagian hidup
                        itu dengan merayakan dan berbagi momen besar itu dengan orang yang kita cintai?</p>
                    <p style={{ textAlign: "justify" }} className="transition-all ease-in-out delay-150 hover:underline hover:translate-x-3 ">Sehubungan dengan momen besar dalam hidup Anda ini, sebagai Platform wedding organizer kami berusaha semaksimal mungkin untuk mengemasnya secara profesional,
                        konsep yang berbeda dan layanan yang dapat diandalkan. Rata-rata partner kami aktif di industri Sejak tahun 2011.</p>
                    <p style={{ textAlign: "justify" }} className="transition-all ease-in-out delay-150 hover:underline hover:translate-x-3 ">kami tidak akan pernah meninggalkan Anda dalam setiap keputusan yang Anda buat.
                        Kami akan berusaha menjadi sahabat terbaik selama perjalanan Anda menuju hari besar Anda. Anda dapat menghubungi kami 24 jam sehari.
                        Tidak akan ada hal yang perlu Anda khawatirkan.</p>
                    <p style={{ textAlign: "justify" }} className="transition-all ease-in-out delay-150 hover:underline hover:translate-x-3 ">Jadi jika Anda merasa cocok dengan ide kami, hubungi kami dan biarkan kami melakukan sisanya.
                        Sejujurnya, kami tidak sabar untuk melihat Anda dan pasangan menikah di depan kami.</p>
                </Col>
            </Row>
            <Row justify='center' align='middle' className='mt-10 mb-10'>
                <Col lg={{ span: 15 }} md={{ span: 10 }} sm={{ span: 22 }} xs={{ span: 22 }}>
                    <p className='text-pink-500 text-center text-5xl  transition-all ease-in-out delay-150 hover:scale-110 '>Step-to-Step</p>
                    <Image src={StepProject} layout="responsive" className=' transition-all ease-in-out delay-150 hover:scale-110' />
                </Col>

            </Row>



        </>
    )
}
export default ContentMain