import { Component } from "react";
import { Row, Col, Select, Card } from "antd";

const { Meta } = Card;
const { Option } = Select;
class Home extends Component {
  constructor(props) {
    super(props);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }

  handleCategoryChange(value) {
    console.log(value);
  }

  categories = [
    "Foods",
    "Drinks",
    "Chips",
    "Fruits",
    "Vegetables",
    "Meat",
    "Grocery",
  ];

  data = [
    {
      alt: "example",
      src: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      title: "Europe Street beat",
      description: "www.instagram.com",
    },
    {
      alt: "example",
      src: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      title: "Europe Street beat",
      description: "www.instagram.com",
    },
    {
      alt: "example",
      src: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      title: "Europe Street beat",
      description: "www.instagram.com",
    },
    {
      alt: "example",
      src: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      title: "Europe Street beat",
      description: "www.instagram.com",
    },
    {
      alt: "example",
      src: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      title: "Europe Street beat",
      description: "www.instagram.com",
    },
    {
      alt: "example",
      src: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      title: "Europe Street beat",
      description: "www.instagram.com",
    },
    {
      alt: "example",
      src: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      title: "Europe Street beat",
      description: "www.instagram.com",
    },
    {
      alt: "example",
      src: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      title: "Europe Street beat",
      description: "www.instagram.com",
    },
  ];

  render() {
    return (
      <div>
        <div
          style={{
            paddingLeft: "100px",
            paddingRight: "140px",
            marginTop: "1%",
            fontSize: "20px",
          }}
        >
          <p>Category List</p>
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Select Category"
            defaultValue={["Fruits", "Vegetables"]}
            onChange={this.handleCategoryChange}
          >
            {this.categories.map((item) => (
              <Option key={item}>{item}</Option>
            ))}
          </Select>
        </div>
        <Row
          style={{ paddingLeft: "100px", paddingTop: "70px" }}
          gutter={[24, 24]}
        >
          {this.data.map((item) => (
            <Col span={8}>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt={item.alt} src={item.src} />}
              >
                <Meta title={item.title} description={item.description} />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}

export default Home;
