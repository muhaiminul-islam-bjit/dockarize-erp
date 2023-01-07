import { Button, Input, Select } from "antd";
import { Report } from "notiflix";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../../../components/atom/container/container";
import Header from "../../../components/atom/heading/header";
import Admin from "../../../components/templates/dashboard/admin"
import { get, store } from "../../../services/dataServices";

const CustomerPayment: React.FC = () => {
    const navigate = useNavigate();
    const dateConst = new Date();
    const [date, setDate] = useState<string>(dateConst.toISOString().slice(0, 10),);
    const [customer, setCustomer] = useState<any>([]);
    const [due, setDue] = useState<any>(0);
    const [account, setAccount] = useState<any>([]);
    const [payment, setPayment] = useState<number>(0);
    const [customerId, setCustomerId] = useState<number>(0);
    const [accountId, setAccountId] = useState<any>(null);
    const getAllCustomer = async () => {
        let allCustomer = await get("get-all-customer-select", false);
        setCustomer(allCustomer.data);
    };

    const getCustomerDue = async (customerId: any) => {
        const customerDue = await get("get-previous-due/" + customerId, false);
        setDue(customerDue.data);
    }

    const getAccount = async () => {
        const customerDue = await get("get-all-account-select", false);
        setAccount(customerDue.data);
    }

    const handleSelectChange = (value: any) => {
        setCustomerId(value)
        getCustomerDue(value);
    }

    const handlePaymentChange = (e: any) => {
        const value = parseInt(e.target.value);
        if (value > due) {
            Report.warning(
                'Warning',
                'Payment must equal or lower than total due',
                'Okay',
            );
            return;
        }

        if (!accountId) {
            Report.warning(
                'Warning',
                'Please select an account',
                'Okay',
            );
            return;
        }
        setPayment(value);
    }

    const completePayment = async () => {
        const data ={
            customer_id: customerId,
            amount: payment,
            account_id: accountId,
            date: date
        };
        let response = await store(data, "customer-payment");
        if (response) {
            setPayment(0);
            setAccountId(null);
            getCustomerDue(customerId);
            navigate('/customers-payment-list');
        }
    }

    const handleAccountChange = (value: any) =>{
        setAccountId(value);
    }

    const handleChangeDate = (e:any) => {
        setDate(e.target.value);
    }

    useEffect(() => {
        getAllCustomer();
        getAccount();
    }, ["customer"]);

    return (<Admin type="light">
        <Header Tag="h2" text="Customer Payment" />
        <Container margin="16">
            <p style={{ fontSize: '14px', color: 'darkblue', fontWeight: 'bold' }}>Customer</p>
            <Container margin="8">
                <Select
                    defaultValue="--Select Customer--"
                    style={{ width: 420 }}
                    onChange={handleSelectChange}
                    options={customer}
                />
            </Container>
        </Container>
        <Container margin="8">
            <p style={{ fontSize: '14px', color: 'darkblue', fontWeight: 'bold' }}>Account</p>
            <Container margin="8">
                <Select
                    defaultValue="--Select Account--"
                    style={{ width: 420 }}
                    onChange={handleAccountChange}
                    options={account}
                />
            </Container>
        </Container>
        <Container margin="8">
            <p style={{ fontSize: '14px', color: 'darkblue', fontWeight: 'bold' }}>Total Due</p>
            <Container margin="8">
                <Input type="number" style={{ width: 420 }} value={due} />
            </Container>
        </Container>
        <Container margin="8">
            <p style={{ fontSize: '14px', color: 'darkblue', fontWeight: 'bold' }}>Total Payment</p>
            <Container margin="8">
                <Input type="number" value={payment} name="payment" onChange={handlePaymentChange} style={{ width: 420 }} />
            </Container>
        </Container>
        <Container margin="8">
            <p style={{ fontSize: '14px', color: 'darkblue', fontWeight: 'bold' }}>Date</p>
            <Container margin="8">
                <Input type="date" value={date} name="date" onChange={handleChangeDate} style={{ width: 420 }} />
            </Container>
        </Container>
        <Container margin="16">
            <Button type="primary" size="middle" onClick={completePayment} disabled={payment > 0 ? false : true}>
                Complete Payment
            </Button>
        </Container>
    </Admin>)
}

export default CustomerPayment;