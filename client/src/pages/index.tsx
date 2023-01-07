import { Button, Col, Row } from "antd";
import { useNavigate } from "react-router-dom";
import Card from "../components/atom/card/card";
import Container from "../components/atom/container/container";
import Header from "../components/atom/heading/header"
import Admin from "../components/templates/dashboard/admin"

const Index: React.FC = () => {
    const navigate = useNavigate();
    const handleQuickLink = (link: string) => {
        navigate(link);
    }
    return (<Admin type="light" noCard>
        <Container margin="24">
            <Row gutter={16}>
                <Col span={12}>
                    <Card>
                        <Header Tag="h2" text="Quick Links" />
                        <Container margin="16">
                            <Row gutter={10}>
                                <Col span={4}><Button onClick={() => { handleQuickLink('product/item/list') }}>Products</Button></Col>
                                <Col span={4}><Button onClick={() => { handleQuickLink('unit') }}>All Unit</Button></Col>
                                <Col span={4}><Button onClick={() => { handleQuickLink('brand') }}>All Brand</Button></Col>
                                <Col span={4}><Button onClick={() => { handleQuickLink('category') }}>Category</Button></Col>
                                <Col span={4}><Button onClick={() => { handleQuickLink('supplier') }}>Supplier</Button></Col>
                                <Col span={4}><Button onClick={() => { handleQuickLink('customer') }}>Customer</Button></Col>
                            </Row>
                        </Container>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card>
                        <Header Tag="h2" text="Quick Links" />
                        <Container margin="16">
                            <Row gutter={10}>
                                <Col span={4}><Button onClick={() => { handleQuickLink('product/item/list') }}>Products</Button></Col>
                                <Col span={4}><Button onClick={() => { handleQuickLink('unit') }}>All Unit</Button></Col>
                                <Col span={4}><Button onClick={() => { handleQuickLink('brand') }}>All Brand</Button></Col>
                                <Col span={4}><Button onClick={() => { handleQuickLink('category') }}>Category</Button></Col>
                                <Col span={4}><Button onClick={() => { handleQuickLink('supplier') }}>Supplier</Button></Col>
                                <Col span={4}><Button onClick={() => { handleQuickLink('customer') }}>Customer</Button></Col>
                            </Row>
                        </Container>
                    </Card>
                </Col>
            </Row>
        </Container>


    </Admin>)
}

export default Index;