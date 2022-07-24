import { Col, Row, Card, Input } from "antd";
import { Content } from "antd/lib/layout/layout";
import { useRouter } from "next/router";
import MainLayout from "../../components/admin/layout/mainLayout";
import Image from "next/image";
import ImgPlaceholder from "../../public/Image/img-placeholder.png"


export default function DetailUser() {




    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['Admin'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['Customer'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['Merchant'],
        },
    ];
    const router = useRouter();
    const { name } = router.query;
    const dataSelected = data.find((data) => data.name == name);

    return (
        <>
            <MainLayout>
                <Content>
                    <h1 className='mt-6 ml-14 text-2xl'>Form Detail User</h1>
                    <Row justify="center" align="middle" className='mt-6 ' >
                        <Col lg={{ span: 16 }} sm={{ span: 20 }}>
                            <div className="rounded-lg shadow-lg bg-white ">
                                <Row justify="center" align="middle">
                                    <Col>
                                        <a href="#!" className="mx-20">
                                            <Image
                                                className="rounded-t-lg"
                                                src={ImgPlaceholder}
                                                width={150}
                                                height={150}
                                                alt=""
                                            />
                                        </a>
                                        <br />

                                    </Col>
                                </Row>
                                <div className="w-full border-b-2" ></div>
                                <div className="p-6">

                                    <Input defaultValue={name} value={name} allowClear={true} />
                                    <button
                                        type="button"
                                        className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                    >
                                        Button
                                    </button>
                                </div>
                            </div>


                        </Col>
                    </Row>
                </Content>
            </MainLayout>
        </>
    )
}