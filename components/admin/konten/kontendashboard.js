import { Layout, Col, Row, Card } from "antd";
import {
    CreditCardOutlined,
    UserOutlined,
    FileOutlined,
} from '@ant-design/icons';
const { Header, Content, Sider } = Layout;


export default function ContentDashBoard() {
    // data bohongan
    const data = [
        {
            key: 2,
            Nama: "Ariel Winardi",
            NomorPemesanan: 19072022,
            tanggalBeli: "09-07-2022",
            jumlah: 120000,
            alamat:
                "jln. mars kelurahan merkurius kecamatan uranus kota neptunus provinsi jupiter",
        },
        {
            key: 1,
            Nama: "Dwi Gunawan",
            NomorPemesanan: 11072022,
            tanggalBeli: "11-07-2022",
            jumlah: 180000,
            alamat:
                "jln. mars kelurahan merkurius kecamatan uranus kota neptunus provinsi jupiter",
        },
        {
            key: 3,
            Nama: "Galuh Sudariono",
            NomorPemesanan: 15072022,
            tanggalBeli: "15-07-2022",
            jumlah: 200000,
            alamat:
                "jln. mars kelurahan merkurius kecamatan uranus kota neptunus provinsi jupiter",
        },
        {
            key: 4,
            Nama: "Budi wicaksono",
            email: "budi_wicaksono@gaguna.com",
            jumlah: 0,
            status: ["Non-Aktif"],
            alamat:
                "jln. mars kelurahan merkurius kecamatan uranus kota neptunus provinsi jupiter",
        },
        {
            key: 5,
            Nama: "Munawir",
            email: "Munawir@hot.com",
            jumlah: 0,
            status: ["Aktif"],
            alamat:
                "jln. mars kelurahan merkurius kecamatan uranus kota neptunus provinsi jupiter",
        }
    ];
    const totalTransaksi = data.length - 2;
    const totalPendapatan = data.reduce((i, obj) => {
        return i + obj.jumlah;
    }, 0);
    const totalCustomer = data.length;

    const cardStyle = {
        width: 300,
        textAlign: "center",

    }
    const cardHead = {
        color: "white", textAlign: "center",
        backgroundColor: "#1FC8B9",

    }
    const cardHead2 = {
        color: "white",
        backgroundColor: "#517BEA",
    }
    const cardHead3 = {
        color: "white", textAlign: "center",
        backgroundColor: "#FDD74F",
    }
    return (
        <>
            <Content
                className="bg-white"
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,

                }}
            >
                <Row justify="space-evenly" align="center">
                    <Col lg={{ span: 6 }} md={{ span: 6 }} sm={{ span: 20 }}
                        className="shadow-lg  hover:translate-x-2 hover: transition-all delay-300 duration-300 ease-in-out hover:scale-110">
                        <Card
                            title="Total Pemesanan"
                            headStyle={cardHead2}
                            bordered={false}
                        >
                            <Row justify="space-evenly" align="middle" style={{ fontSize: '32pt' }} className="text-slate-500">
                                <Col >{totalTransaksi}</Col>
                                <Col ><FileOutlined /></Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col lg={{ span: 6 }} md={{ span: 6 }} sm={{ span: 20 }}
                        className="shadow-lg  hover:translate-x-2 hover: transition-all delay-300 duration-300 ease-in-out hover:scale-110">
                        <Card
                            title="Total Pembayaran"
                            bordered={false}
                            headStyle={cardHead}

                        >
                            <Row justify="space-evenly" align="middle" style={{ fontSize: '32pt' }} className="text-slate-500">
                                <Col >{totalPendapatan}</Col>
                                <Col ><CreditCardOutlined /></Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col lg={{ span: 6 }} md={{ span: 6 }} sm={{ span: 20 }}
                        className="shadow-lg  hover:translate-x-2 hover: transition-all delay-300 duration-300 ease-in-out hover:scale-110">
                        <Card
                            title="Total Customer"
                            headStyle={cardHead3}
                            bordered={false}
                        >
                            <Row justify="space-evenly" align="middle" style={{ fontSize: '32pt' }} className="text-slate-500">
                                <Col >{totalCustomer}</Col>
                                <Col ><UserOutlined /></Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Content >
        </>
    )
}