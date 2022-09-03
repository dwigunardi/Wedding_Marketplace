import Navigasi from "../../../components/navigasi";
import { useRouter, Router } from "next/router";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { Button, Col, Row, ConfigProvider, message } from "antd";
import 'antd/dist/antd.variable.css'
import Beranda from "../../beranda";
import FooterCustomer from "../../../components/footer";

ConfigProvider.config({
    theme: {
        primaryColor: '#EC4899',
    },
});


export default function LandingCustomer(props) {
    const router = useRouter()
    let [role, setRole] = useState('')

    const { username } = router.query;
    // console.log(props)

    useEffect(() => {
        const getToken = localStorage.getItem('token_customer')
        if (!getToken) {
            message.error("Anda belom login dan tidak berhak mengakses")
            router.push("/auth/login")
        }

    }, []);
    return (
        <>
            <Navigasi />
            <Beranda />
            <FooterCustomer />

        </>
    )

}