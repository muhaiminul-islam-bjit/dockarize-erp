import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../../../components/atom/container/container";
import Header from "../../../components/atom/heading/header";
import Admin from "../../../components/templates/dashboard/admin"
import { get } from "../../../services/dataServices";

interface DataType {
    key: string;
    dataIndex: string;
    title: string;
}

const Details: React.FC = () => {
    let { invoiceId, invoiceNumber } = useParams();
    const listUrl = "get-sell-item/" + invoiceId;
    const [data, setData] = useState<any>([]);
    const fetchData = async () => {
        let fetchedData: any;
        fetchedData = await get(listUrl);
        setData(fetchedData.data);
        console.log(fetchedData)
    };

    const columns: ColumnsType<DataType> = [
        {
            key: "product_name",
            dataIndex: "product_name",
            title: "Product Name",
        },
        {
            key: "qty",
            dataIndex: "qty",
            title: "Qty",
        },
        {
            key: "price",
            dataIndex: "price",
            title: "Unit Price",
        },
        {
            key: "discount",
            dataIndex: "discount",
            title: "Discount(%)",
        },
        {
            key: "total_selling_price",
            dataIndex: "total_selling_price",
            title: "Total Price ",
        },
    ];


    useEffect(() => {
        fetchData();
    }, ["data"]);

    return (<Admin type="light">
        <Header Tag="h2" text={`Invoce No: ${invoiceNumber}`} />
        <Container margin="16"> 
        <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            size="small"
        />
        </Container>
        
    </Admin>)
}

export default Details;