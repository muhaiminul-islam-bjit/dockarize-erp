import { EyeOutlined } from "@ant-design/icons";
import { Pagination, Space, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../../components/atom/container/container";
import Header from "../../components/atom/heading/header";
import Input from "../../components/atom/input/input";
import Admin from "../../components/templates/dashboard/admin"
import { get } from "../../services/dataServices";


interface DataType {
    key: string;
    dataIndex: string;
    title: string;
}


const Sell: React.FC = () => {
    const navigate = useNavigate();
    const listUrl = "get-all-sell";
    const [data, setData] = useState<any>([]);
    const [searchValue, setSearchValue] = useState<string>("");
    const [total, setTotal] = useState<any>(0);
    const [current, setCurrent] = useState<any>(1);
    const fetchData = async (page?: number, pageSize = 10) => {
        let fetchedData: any;
        if (page) {
            fetchedData = await get(
                listUrl + "?page=" + page + "&perPage=" + pageSize
            );
        } else {
            fetchedData = await get(listUrl + "?perPage=" + pageSize);
        }
        setData(fetchedData.data.data);
        setTotal(fetchedData.data.total);
        setCurrent(fetchedData.data.current_page);
    };

    const details = (record: any) => {
        navigate("/sell-items/" + record.id + "/" + record.sell_number);
    };

    const columns: ColumnsType<DataType> = [
        {
            key: "sell_number",
            dataIndex: "sell_number",
            title: "Invoice No",
        },
        {
            key: "customer_phone",
            dataIndex: "customer_phone",
            title: "Customer Phone",
        },
        {
            key: "customer_name",
            dataIndex: "customer_name",
            title: "Customer Name",
        },
        {
            key: "qty",
            dataIndex: "qty",
            title: "Qty",
        },
        {
            key: "payment",
            dataIndex: "payment",
            title: "Payment",
        },
        {
            key: "due",
            dataIndex: "due",
            title: "Due",
        },
        {
            key: "total",
            dataIndex: "total",
            title: "Total",
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <EyeOutlined
                        onClick={async () => {
                            await details(record);
                        }}
                    />
                </Space>
            ),
        },
    ];

    const handleSearch = (e: any) => {
        setSearchValue(e.target.value);
    };

    useEffect(() => {
        fetchData();
    }, ['listUrl']);
    return (<Admin type="light">
        <div className="p-productList">
            <Header Tag="h2" text="All Sell" />
            <Container margin="12">
                <div className="o-list__topBar">
                    <Input
                        label={false}
                        placeHolder="Search"
                        name="search"
                        type="text"
                        onChange={handleSearch}
                        value={searchValue}
                    />
                </div>
            </Container>
            <Container margin="24">
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    size="small"
                />
            </Container>
            <Container margin="8">
                <Pagination
                    defaultCurrent={6}
                    onChange={fetchData}
                    total={total}
                    size="small"
                    current={current}
                />
            </Container>
        </div>
    </Admin>)
}

export default Sell;