import cardImg1 from '../../public/Image/card-product/aminta-hotel.webp'
import cardImg2 from '../../public/Image/card-product/asmara.jpg'
import cardImg3 from '../../public/Image/card-product/Daima Norwood Hotel Menteng.webp'
import cardImg4 from '../../public/Image/card-product/Fieris Hotel Rawamangun.webp'
import Image from "next/image";
import { Card, Row, Col, Grid, Button } from 'antd'
import Link from 'next/link';


const { useBreakpoint } = Grid;
export default function CardProductPage(props) {
    const screens = useBreakpoint();
    const { Meta } = Card;
    // props.product.map((data) => {
    //     console.log(data.id)
    // })

    return (
        <>
            <Row justify="start space-x-5">
                {props.product.map((data => {
                    return (<>
                        <Col lg={{ span: 5 }} md={{ span: 5 }} sm={{ span: 20 }} xs={{ span: 20 }} className="pt-5">
                            <Card
                                hoverable

                                cover={
                                    <Image loader={() => res.image}
                                        src={cardImg1}
                                        priority={true}
                                        unoptimized={true}
                                        width={350}
                                        height={250}>
                                    </Image>}
                            >
                                <Meta title={data.name} description={data.variant.map((items) => {
                                    return (
                                        <>
                                            <p>Rp.{items.price}</p>
                                        </>
                                    )
                                })}
                                />

                                <Link href={`/customer/detailProduk/${data.id}`}>
                                    <Button>Detail</Button>
                                </Link>
                            </Card>
                        </Col>
                    </>)
                }))}
            </Row>
        </>
    )
}