import 'antd/dist/antd.css'
import "tailwindcss/tailwind.css"
import { Row, Col, Layout } from 'antd'
import Navigasi from '../components/navigasi'
import FooterCustomer from '../components/footer'
import { WhatsAppOutlined } from '@ant-design/icons';
export default function ContactUs() {



    return (
        <>
            <Layout style={{ backgroundColor: "white" }}>
                <Navigasi />
            </Layout>
            <h1 className='text-center text-2xl text-pink-500 italic hover:not-italic mt-20 pt-10'>Contact Us</h1>
            <Row justify="center" align="middle">
                <Col span={16}>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15864.008634277116!2d106.9394184!3d-6.2634444!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x6239e0ec7d2f5337!2sDignitas%20Academy!5e0!3m2!1sid!2sid!4v1660485665857!5m2!1sid!2sid"
                        allowfullscreen="true" loading="lazy" referrerpolicy="no-referrer-when-downgrade" style={{ width: "100%", height: "400px" }} className="border-8 border-pink-500">
                    </iframe>
                    <p className='text-center text-lg font-bold my-2'>Anda Bisa Menghubungi kami kapan pun anda mau</p>
                    <p className='text-center text-lg font-bold my-2'>Kami akan Memastikan untuk Menjawab segala Pertanyaan ataupun Kendala Anda</p>
                    <p className='text-center text-lg font-bold my-2'>Selama itu masih bersangkutan dengan website kami</p>
                    <Row justify='center' align='middle' className='py-4'>
                        <Col>
                            <WhatsAppOutlined style={{ color: "#25D366" }} className='text-2xl mx-2' />

                        </Col>

                        <Col>
                            <a href='https://wa.me/+6285724763231' target={"_blank"} className=' text-lg font-bold my-2 mx-auto'>Admin Sahin : 1</a>
                        </Col>

                    </Row>
                    <Row justify='center' align='middle' className='mb-5'>
                        <Col> <WhatsAppOutlined style={{ color: "#25D366" }} className='text-2xl mx-2' /></Col>

                        <Col><a href='https://wa.me/+6281213741626' target={"_blank"} className=' text-lg font-bold my-2 mx-auto'>Admin Sahin : 2</a></Col>

                    </Row>

                </Col>
            </Row>
            <FooterCustomer />
        </>
    )
}