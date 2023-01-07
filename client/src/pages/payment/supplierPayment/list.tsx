import { Button, Col, Pagination, Row, Select, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../../../components/atom/container/container";
import Header from "../../../components/atom/heading/header"
import Admin from "../../../components/templates/dashboard/admin"
import { get } from "../../../services/dataServices";


interface DataType {
    key: string;
    dataIndex: string;
    title: string;
}

const SupplierPaymentList: React.FC = () => {
    const navigation =useNavigate();
    const [customerId, setCustomerId] = useState<any>(null);
    const [data, setData] = useState<any>([]);
    const [customer, setCustomer] = useState<any>([]);
    const [total, setTotal] = useState<any>(0);
    const [current, setCurrent] = useState<any>(1);
    const columns: ColumnsType<DataType> = [
        {
            key: "supplier_name",
            dataIndex: "supplier_name",
            title: "Supplier Name",
        },
        {
            key: "supplier_phone",
            dataIndex: "supplier_phone",
            title: "Supplier Phone",
        },
        {
            key: "amount",
            dataIndex: "amount",
            title: "Amount",
        },
        {
            key: "account",
            dataIndex: "account",
            title: "Account",
        },
        {
            key: "date",
            dataIndex: "date",
            title: "Date",
        },
    ];
    const getAllCustomer = async () => {
        let allCustomer = await get("get-all-supplier-select", false);
        setCustomer(allCustomer.data);
    };

    const handleSelectChange = (value: any) => {
        setCustomerId(value)
        fetchData(value)
    }

    const fetchData = async (customerId: any) => {
        let fetchedData = await get("get-supplier-payments" + "?page=" + 1 + "&perPage=" + 10 + "&supplierId=" + customerId)
        setData(fetchedData.data.data);
        setTotal(fetchedData.data.total);
        setCurrent(fetchedData.data.current_page);
    }

    const getCustomerPayments = async (page?: number, pageSize = 10) => {
        let fetchedData = await get("get-supplier-payments" + "?page=" + page + "&perPage=" + pageSize + "&supplierId=" + customerId)
        setData(fetchedData.data.data);
        setTotal(fetchedData.data.total);
        setCurrent(fetchedData.data.current_page);
    }

    const cratePayment = () => {
        navigation('/suppliers-payment');
    }

    useEffect(() => {
        getAllCustomer();
    }, ["customer"]);

    return (<Admin type="light">
        <Header Tag="h2" text="All Payment" />
        <Container margin="16">
            <p style={{ fontSize: '14px', color: 'darkblue', fontWeight: 'bold' }}>Supplier</p>
            <Container margin="8">
                <Row>
                    <Col span={12}>
                    <Select
                    defaultValue="--Select Supplier--"
                    style={{ width: 420 }}
                    onChange={handleSelectChange}
                    options={customer}
                />
                    </Col>
                    <Col span={12}>
                        <Button style={{float:'right'}} type="primary" onClick={cratePayment}  >Due Payment</Button>
                    </Col>
                </Row>
                
            </Container>
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
                onChange={getCustomerPayments}
                total={total}
                size="small"
                current={current}
            />
        </Container>
    </Admin>)
}

export default SupplierPaymentList;