import { Col, Row, Card, Button, Form, Input, Space, } from "antd";
import { Content } from "antd/lib/layout/layout";
import { useRouter, Router } from "next/router";
import MainLayout from "../../../components/admin/layout/mainLayout";
import Image from "next/image";
import ImgPlaceholder from "../../../public/Image/img-placeholder.png"
import { useEffect, useState } from "react";
import Link from "next/link";
import BackButton from "../../../pages/backButton";
import axios from "axios";
import jwt_decode from 'jwt-decode'


export default function Detail() {


    const [username, setUsername] = useState('')
    const [isLogged, setLogged] = useState(false)
    const [role, setRole] = useState('')
    const router = useRouter();

    async function validate() {
        try {
            const token = await localStorage.getItem('token_customer')
            const decode = await jwt_decode(token)
            const user = decode.username
            const roleId = decode.role
            console.log(decode);
            if (token) {
                setLogged(true)
            } else {
                setLogged(false)
            }
            if (user) {
                setUsername(user)

            } else {
                setUsername(null)
            }
            if (roleId) {
                setRole(roleId)
            }

        } catch (error) {

        }
    }




    useEffect(() => {

        validate()

    }, []);


    return (
        <>
            <Content>
                <h1 className='mt-6 ml-14 text-2xl'>{username}</h1>
            </Content>
        </>
    )
}