import { Component } from "react";
import { Row, Col, List, InputNumber, Card, Button } from "antd";
import "./App.css";

const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: "https://ant.design",
    title: `ant design part ${i}`,
    description:
      "Ant Design, a design language for background applications, is refined by Ant UED Team.",
    content:
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
  });
}

const { Meta } = Card;
class Cart extends Component {
  constructor(props) {
    super(props);
    this.changeQuantity = this.changeQuantity.bind(this);
    this.checkout = this.checkout.bind(this);
  }

  changeQuantity(e) {
    console.log(e);
  }

  checkout(e) {
    console.log(e);
  }

  render() {
    return (
      <div>
        <Row>
          <Col span={15}>
            <div
              style={{
                paddingTop: "15px",
                fontSize: "20px",
                width: "700px",
              }}
            >
              <List
                itemLayout="vertical"
                pagination={{
                  pageSize: 3,
                }}
                dataSource={listData}
                renderItem={(item) => (
                  <List.Item
                    key={item.title}
                    extra={
                      <div>
                        <div>
                          <InputNumber
                            style={{ float: "right", paddingRight: "50px" }}
                            min={0}
                            max={10}
                            defaultValue={1}
                            onChange={this.changeQuantity}
                          />
                        </div>
                        <img
                          width={250}
                          style={{ paddingTop: "20px" }}
                          alt="logo"
                          src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                        />
                      </div>
                    }
                  >
                    <List.Item.Meta
                      title={<a href={item.href}>{item.title}</a>}
                      description={item.description}
                    />
                    {item.content}
                  </List.Item>
                )}
              />
            </div>
          </Col>
          <Col span={9}>
            <div className="site-card-border-less-wrapper">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                  fontSize: "20px",
                }}
              >
                <Card
                  title="The total amount of"
                  bordered={false}
                  style={{ width: 400, height: 400 }}
                >
                  <p>Temporary amount</p>
                  <p>Discount</p>
                  <p>Total amount</p>
                  <p>GST amount</p>
                  &nbsp;
                  <Meta title="The final amount" />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      alignItems: "center",
                      fontSize: "20px",
                      paddingTop: "40px",
                    }}
                  >
                    <Button type="primary" onClick={this.checkout}>
                      Proceed to Checkout
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Cart;
