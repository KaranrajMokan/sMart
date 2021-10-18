import { Component } from "react";
import { Input, Button } from "antd";
import {
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import message from "antd/es/message";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleSubmit(e) {
    if (this.state.username !== "" && this.state.password !== "") {
      const data = {
        username: this.state.username,
        password: this.state.password,
        authentication: true,
      };
      this.props.loginData(data);
    } else {
      message.error("Please enter Login creds");
    }
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2 style={{ paddingTop: "80px", margin: "auto" }}>Login</h2>
        <div
          style={{
            paddingTop: "15px",
            fontSize: "20px",
            width: "500px",
            alignItems: "center",
          }}
        >
          <Input
            name="username"
            type="text"
            placeholder="Enter username"
            onChange={this.handleUsernameChange}
            prefix={<UserOutlined />}
          />
        </div>{" "}
        &nbsp;
        <div
          style={{
            fontSize: "20px",
            width: "500px",
          }}
        >
          <Input.Password
            name="password"
            placeholder="Enter password"
            onChange={this.handlePasswordChange}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </div>
        <div style={{ paddingTop: "25px" }}>
          <Button type="primary" onClick={this.handleSubmit}>
            {" "}
            Submit{" "}
          </Button>
        </div>
      </div>
    );
  }
}

export default Login;
