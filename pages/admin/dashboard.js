import ContentDashBoard from "./konten/kontendashboard"
import NavbarAdmin from "./layout/layoutHeader"
import MainLayout from "./layout/mainLayout"


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