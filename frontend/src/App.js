import "./App.css";
import { Layout, Menu, Row, Col, Button } from "antd";
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
      menu: "home",
      username: "",
      password: "",
      isLoggedIn: false,
    };
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLoginData = this.handleLoginData.bind(this);
  }

  handleMenuClick(e) {
    this.setState({ menu: e.key });
  }

  handleLogin(e) {
    this.setState({ menu: "login" });
  }

  handleLoginData(data) {
    this.setState({
      username: data.username,
      password: data.password,
      isLoggedIn: data.authentication,
      menu: "home",
    });
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
            <Col span={15}>
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
            <Col span={3} style={{ paddingRight: "10x", fontSize: "25px" }}>
              <Button
                type="primary"
                ghost
                disabled={this.state.isLoggedIn}
                onClick={this.handleLogin}
              >
                Login
              </Button>
            </Col>
          </Row>
          <Content style={{ padding: "40px 50px 0px" }}>
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
