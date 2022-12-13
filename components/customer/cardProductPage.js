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
    const thouSep = ".";
    const decSep = ",";
    // format to money
    const toMoney = (num) => { return (Math.round(num * 100) / 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').replace(/[,.]/g, function (m) { return m === ',' ? thouSep : decSep; }) };
    ;
    return (
        <>
            <Row justify="start">
                {props.product.map((data) => {
                    return (<>
                        <Col lg={{ span: 5 }} md={{ span: 5 }} sm={{ span: 20 }} xs={{ span: 20 }} className="pt-5 mr-5" key={data.id}>
                            <Link href={`/customer/detailProduk/${data.id}`}>
                                <a> <Card
                                    hoverable

                                    cover={
                                        <Image loader={() => data.image}
                                            priority={true}
                                            unoptimized={true}
                                            src={`https://project-wo.herokuapp.com/product/image/${data.image}`}
                                            alt=""
                                            width={350}
                                            height={250}
                                        />
                                    }
                                >
                                    <Meta title={data.name} description={"Rp. " + toMoney(data.variant[0].price)}
                                    />


                                </Card></a>
                            </Link>

                        </Col>
                    </>)
                })}
            </Row>
        </>
    )
}