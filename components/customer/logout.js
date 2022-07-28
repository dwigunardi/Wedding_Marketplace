import { Button } from "antd"

export default function Logout() {

    async function buttonLogout() {
        try {
            const remove = localStorage.clear()
            window.alert("Anda telah keluar")
            router.push("/auth/login")

        } catch (error) {

        }
    }
    return (
        <>

        </>
    )
}