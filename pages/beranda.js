import BookingBg from "../components/customer/bgBooking";
import ContentMain from "../components/customer/content";
import CoupleSlide from "../components/customer/coupleSlide";
import ProductHome from "../components/customer/productHome";
import CarouselAuto from "./carousel";
import FooterCustomer from "../components/footer";
import Navigasi from "../components/navigasi";
import "antd/dist/antd.css"
import "tailwindcss/tailwind.css"
import ReviewerSection from "../components/customer/reviewerHome";
import { BackTop } from "antd";
import { ArrowUpOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css'

export default function Beranda() {

    return (
        <>

            <CarouselAuto />
            <ContentMain />
            <CoupleSlide />
            <ProductHome />
            <ReviewerSection />

            <BookingBg />
            <BackTop style={{
                height: 40,
                width: 40,
                lineHeight: '30px',
                borderRadius: "20px",
                backgroundColor: '#EC4899',
                color: '#fff',
                textAlign: 'center',
                fontSize: "12pt",
                opacity: 0.7
            }}><div className="hover:translate-y-3 ease-in-out transition-all"><ArrowUpOutlined /></div></BackTop>
        </>
    )
}
