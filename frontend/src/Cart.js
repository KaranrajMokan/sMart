import { Component } from "react";
import {
  Row,
  Col,
  List,
  InputNumber,
  Card,
  Button,
  Empty,
  message,
} from "antd";
import axios from "axios";
import "./App.css";

const { Meta } = Card;
class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartData: {},
      totalPrice: 0,
      discountPrice: 0,
    };
    this.checkout = this.checkout.bind(this);
  }

  componentDidMount() {
    axios
      .request({
        method: "get",
        url: "http://localhost:8083/app/cart",
        params: {
          username: localStorage.getItem("username"),
        },
      })
      .then((response) => {
        this.setState({
          cartData: response.data["cartList"],
        });
        if (this.state.cartData.length > 0) {
          var sum = 0;
          for (
            let i = 0;
            i < this.state.cartData[0].products_list.length;
            i++
          ) {
            sum =
              sum +
              this.state.cartData[0].products_list[i]["quantity"] *
                this.state.cartData[0].products_list[i]["retail_price"];
          }
          const discount = sum - this.state.cartData[0].final_price;
          this.setState({ totalPrice: sum, discountPrice: discount });
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  checkout(e) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    var today = new Date();
    axios
      .request({
        method: "post",
        url: "http://localhost:8084/app/transaction",
        params: {
          username: localStorage.getItem("username"),
          date: today.toLocaleDateString("en-US", options),
        },
      })
      .then((response) => {
        if (response.data["Updation"] === true) {
          message.success(
            <div>
              <h2>Thank you for the purchase</h2>
              <p>Your order is confirmed. Will be delivered shortly.</p>
            </div>,
            2
          );
          this.componentDidMount();
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  render() {
    return (
      <div>
        {this.state.cartData.length > 0 ? (
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
                  dataSource={this.state.cartData[0].products_list}
                  renderItem={(item) => (
                    <List.Item
                      key={item.product_name}
                      extra={
                        <div>
                          <div>
                            <div style={{ float: "right" }}>
                              Quantity: &nbsp;&nbsp;
                              <InputNumber
                                min={1}
                                max={10}
                                defaultValue={item.quantity}
                                disabled={true}
                              />
                            </div>
                          </div>
                          <img
                            width={250}
                            style={{ paddingTop: "20px" }}
                            alt={item.product_name}
                            src={item.image}
                          />
                        </div>
                      }
                    >
                      <List.Item.Meta
                        title={item.product_name}
                        description={item.description}
                      />
                      <p>Retail Price : {item.retail_price}</p>
                      <p>Discount Price : {item.discount_price}</p>
                      <p>Product Rating : {item.rating}</p>
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
                    <p>Temporary amount : &#8377;{this.state.totalPrice}</p>
                    <p>Discount : &#8377;{this.state.discountPrice}</p>
                    <p>
                      Total amount : &#8377;{this.state.cartData[0].final_price}
                    </p>
                    &nbsp;
                    <Meta
                      title={
                        <p>
                          The final amount is &#8377;
                          {this.state.cartData[0].final_price}
                        </p>
                      }
                    />
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
        ) : (
          <Row>
            <Col span={24}>
              <Empty
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                  fontSize: "23px",
                  marginTop: "50px",
                }}
                imageStyle={{
                  height: 200,
                }}
                description="No items in cart"
              />{" "}
            </Col>
          </Row>
        )}
      </div>
    );
  }
}

export default Cart;
