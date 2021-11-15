import "./App.css";
import { Layout, Menu, Row, Col, Button } from "antd";
import message from "antd/es/message";
import { Component } from "react";
import Home from "./Home";
import Login from "./Login";
import Cart from "./Cart";
import Transaction from "./Transaction";

const { Content, Footer } = Layout;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      menu: "login",
      username: "",
      password: "",
      isLoggedIn: false,
    };
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleLoginData = this.handleLoginData.bind(this);
  }

  handleMenuClick(e) {
    this.setState({ menu: e.key });
  }

  handleLogout(e) {
    this.setState({ menu: "login", isLoggedIn: false });
    localStorage.clear();
  }

  handleLoginData(data) {
    this.setState({
      username: data.username,
      password: data.password,
      isLoggedIn: data.authentication,
    });
    if (this.state.isLoggedIn === true) {
      this.setState({ menu: "home" });
    } else {
      message.error("Username/Password is incorrect");
    }
    localStorage.setItem("username", data.username);
    localStorage.setItem("password", data.password);
  }

  render() {
    return (
      <div>
        <Layout>
          <Row
            style={{
              alignItems: "center",
              textAlign: "center",
              background: "#d2e4f6",
            }}
          >
            <Col span={6}>
              <img
                style={{ padding: "3px" }}
                height="90px"
                src="./logo.png"
                alt="Logo"
              />
            </Col>
            <Col span={18}>
              {this.state.isLoggedIn === true ? (
                <Row>
                  <Col span={21}>
                    <Menu
                      onClick={this.handleMenuClick}
                      style={{
                        paddingLeft: "25px",
                        alignItems: "center",
                        textAlign: "center",
                        fontSize: "20px",
                        background: "#d2e4f6",
                        border: "none",
                      }}
                      mode="horizontal"
                      defaultSelectedKeys={["home"]}
                    >
                      <Menu.Item key="home">Home</Menu.Item>
                      <Menu.Item key="cart">Cart</Menu.Item>
                      <Menu.Item key="trans">Transaction</Menu.Item>
                    </Menu>
                  </Col>
                  <Col
                    span={3}
                    style={{
                      float: "right",
                      paddingLeft: "100x",
                      fontSize: "25px",
                    }}
                  >
                    <Button type="primary" onClick={this.handleLogout}>
                      Logout
                    </Button>
                  </Col>{" "}
                </Row>
              ) : (
                <div></div>
              )}
            </Col>
          </Row>
          <Content style={{ padding: "40px 50px" }}>
            <div className="site-layout-content">
              {this.state.menu === "home" ? (
                <Home />
              ) : this.state.menu === "cart" ? (
                <Cart />
              ) : this.state.menu === "login" ? (
                <Login loginData={this.handleLoginData} />
              ) : (
                <Transaction />
              )}
            </div>
          </Content>
          <Footer style={{ textAlign: "right" }}>
            {this.state.date.toDateString()}
          </Footer>
        </Layout>
      </div>
    );
  }
}

export default App;
