import { Component } from "react";
import { Card, Col, Row, Divider, Empty } from "antd";
import axios from "axios";

class Transaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
    };
  }

  componentDidMount() {
    const username = localStorage.getItem("username");
    axios
      .request({
        method: "get",
        url: "http://localhost:8082/app/transaction",
        params: {
          username: username,
        },
      })
      .then((response) => {
        this.setState({ transactions: response.data["transactionsList"] });
        console.log(this.state.transactions);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  render() {
    return (
      <div>
        <div className="site-card-wrapper">
          <Row gutter={[24, 24]} style={{ padding: "0px 50px 50px 50px" }}>
            {this.state.transactions.length > 0 ? (
              this.state.transactions.map((item) => (
                <Col span={12}>
                  <Card
                    style={{
                      alignItem: "center",
                    }}
                    title={"Transaction ID:   " + item.transaction_id["$oid"]}
                  >
                    {item["products_list"].map((products) => (
                      <div>
                        <p>{"Product Name:  " + products.product_name}</p>
                        <p>{"Product Price:  " + products.discount_price}</p>
                        <p>{"Quantity:  " + products.quantity}</p>
                        <Divider plain></Divider>
                      </div>
                    ))}
                    Final Price: {item.final_price}
                  </Card>
                </Col>
              ))
            ) : (
              <Col span={24}>
                <Empty
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                    fontSize: "23px",
                    paddingBottom: "100px",
                  }}
                  imageStyle={{
                    height: 200,
                  }}
                  description="No transaction history"
                />{" "}
              </Col>
            )}
          </Row>
        </div>
      </div>
    );
  }
}

export default Transaction;
