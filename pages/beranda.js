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

export default function Beranda() {

    return (
        <>

            <CarouselAuto />
            <ContentMain />
            <ProductHome />
            <ReviewerSection />

        </>
    )
}
