import ContentDashBoard from "../../components/admin/konten/kontendashboard"
import NavbarAdmin from "../../components/admin/layout/layoutHeader"
import MainLayout from "../../components/admin/layout/mainLayout"


function Dashboard() {

    return (
        <>
            <MainLayout>
                <ContentDashBoard />
            </MainLayout>

        </>
    )
}
export default Dashboard