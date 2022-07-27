import Navigasi from "../../../components/navigasi";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { Button, Col, Row } from "antd";



export default function LandingCustomer() {
    const router = useRouter()
    let [role, setRole] = useState('')
    async function validate() {
        try {
            // const token = await localStorage.getItem('token_customer')
            // if (!token) {



            // }

            // const decode = await jwtDecode(getToken)
            // const costumer = decode.role
            // setRole = costumer
            // console.log(costumer)


        } catch (error) {

        }
    }

    async function logout() {
        try {
            const remove = localStorage.clear()

            window.alert("Anda telah keluar")
            router.push("/auth/login")

        } catch (error) {

        }
    }
    useEffect(() => {
        const getToken = localStorage.getItem('token_customer')

        if (!getToken) {
            window.alert("Anda belom login dan tidak berhak mengakses")
            router.push("/auth/login")
        }
    }, [])
    return (
        <>
            <Navigasi />
            <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
                <Col>
                    <Button onClick={logout}>
                        Logout
                    </Button>
                </Col>
            </Row>


        </>
    )

}