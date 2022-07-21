import { useRouter } from "next/router";


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
            <p>Nama : {dataSelected?.name}</p>
        </>
    )
}