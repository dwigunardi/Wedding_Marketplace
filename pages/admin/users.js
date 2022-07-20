import KontenUsers from "./konten/kontenUser";
import MainLayout from "./layout/mainLayout";



export default function UsersDasboard() {

    return (
        <>
            <MainLayout>
                <KontenUsers />
            </MainLayout>
        </>
    )
}