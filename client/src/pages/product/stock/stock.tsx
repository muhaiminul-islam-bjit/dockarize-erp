import { Col, Row, Tooltip } from "antd"
import { useState } from "react"
import Badge from "../../../components/atom/badge/badge"
import Container from "../../../components/atom/container/container"
import Header from "../../../components/atom/heading/header"
import Admin from "../../../components/templates/dashboard/admin"
import './stock.scss';

const Stock: React.FC = () => {
  const [filteredProduct, setFilterdProduct] = useState<any>([]);
  return (<Admin type="light" >
    <Header Tag="h2" text="Product Stock" />
    <Container margin="16">
      <Row>
        <Col span={24}>
          <Row gutter={[16, 16]}>
            {filteredProduct.map((item: any, i: any) => {
              return (
                <Col className="gutter-row" span={8} key={i}>
                  <div
                    className="p-pos__productCard"
                  >
                    <Container margin="8">
                      <Tooltip title={item.product_name}>
                        <p className="p-pos__name">{item.product_name}</p>
                      </Tooltip>

                    </Container>
                    <Container margin="4">

                      <p className="p-pos__price">{item.brand}</p>
                    </Container>
                    <Container margin="4">
                      <p className="p-pos__size">
                        <Badge label={item.size ? item.size : "none"} danger={!item.size} />
                        &nbsp; | &nbsp;
                        <Badge
                          label={item.color ? item.color : "none"}
                          danger={!item.color}
                        />
                      </p>
                    </Container>
                    <Container margin="4">
                      <p className="p-pos__price">
                        {Math.round(item.selling_price)} Tk
                      </p>
                    </Container>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
    </Container>
  </Admin>)
}

export default Stock;