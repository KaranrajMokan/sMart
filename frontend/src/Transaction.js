import { Component } from "react";
import { Card, Col, Row } from "antd";

const data = [
  {
    content: "Card content",
    title: "Card title",
  },
  {
    content: "Card content",
    title: "Card title",
  },
  {
    content: "Card content",
    title: "Card title",
  },
  {
    content: "Card content",
    title: "Card title",
  },
  {
    content: "Card content",
    title: "Card title",
  },
  {
    content: "Card content",
    title: "Card title",
  },
  {
    content: "Card content",
    title: "Card title",
  },
  {
    content: "Card content",
    title: "Card title",
  },
  {
    content: "Card content",
    title: "Card title",
  },
  {
    content: "Card content",
    title: "Card title",
  },
  {
    content: "Card content",
    title: "Card title",
  },
];

class Transaction extends Component {
  render() {
    return (
      <div>
        <div className="site-card-wrapper">
          <Row gutter={[24, 24]} style={{ padding: "0px 50px 50px 50px" }}>
            {data.map((item) => (
              <Col span={12}>
                <Card title={item.title}>{item.content}</Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    );
  }
}

export default Transaction;
