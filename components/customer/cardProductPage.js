import cardImg1 from '../../public/Image/card-product/aminta-hotel.webp'
import cardImg2 from '../../public/Image/card-product/asmara.jpg'
import cardImg3 from '../../public/Image/card-product/Daima Norwood Hotel Menteng.webp'
import cardImg4 from '../../public/Image/card-product/Fieris Hotel Rawamangun.webp'
import Image from "next/image";
import { Card, Row, Col, Grid } from 'antd'


const { useBreakpoint } = Grid;
export default function CardProductPage() {
    const screens = useBreakpoint();
    const { Meta } = Card;

    const data = [
        {
            id: '1',
            product: 'WO',
            venue: 'Aminta Hall',
            lokasi: 'Jakarta',
            varian: '100',
            harga: 'Rp. 70,600,000',
            foto: <Image src={cardImg1} placeholder='blur' />,
            status: ['Tersedia'],
        },
        {
            id: '2',
            product: 'WO',
            venue: 'Fieris Hotel',
            lokasi: 'Jakarta',
            varian: '100',
            harga: 'Rp. 66,600,000',
            foto: <Image src={cardImg4} placeholder='blur' />,
            status: ['Tersedia'],
        },
        {
            id: '3',
            product: 'WO',
            venue: 'Mang Kabayan Vida',
            lokasi: 'Bekasi',
            varian: '100',
            harga: 'Rp. 45,900,000',
            foto: <Image src={cardImg2} placeholder='blur' />,
            status: ['Non-Tersedia'],
        },
        {
            id: '4',
            product: 'WO',
            venue: 'Daima Norwood',
            lokasi: 'Jakarta',
            varian: '100',
            harga: 'Rp. 65,400,000',
            foto: <Image src={cardImg3} placeholder='blur' />,
            status: ['Non-Tersedia'],
        },

    ];
    return (
        <>
            <Row justify="start space-x-5">
                {Object.entries(screens)
                    .filter((screen) => !!screen[1])
                    .map((screen) => (
                        console.log(screen[0])
                    ))}


                {data.map((result => {
                    return (<>
                        <Col lg={{ span: 5 }} md={{ span: 5 }} sm={{ span: 20 }} xs={{ span: 20 }} className="pt-5">
                            <Card
                                hoverable

                                cover={result.foto}
                            >
                                <Meta title={result.venue} description={result.harga} />
                            </Card>
                        </Col>
                    </>)
                }))}




            </Row>
        </>
    )
}