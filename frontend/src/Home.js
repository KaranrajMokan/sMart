import { Component } from "react";
import { Row, Col, Select, Card } from "antd";
import axios from "axios";

const { Meta } = Card;
const { Option } = Select;
let items = []
class Home extends Component {
  constructor(props) {
    super(props);
    this.state ={
      data :[]
    }
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }

  handleCategoryChange(value) {
    console.log(value);
  }
  componentDidMount()
  {
      axios.request({
                    method: 'get',
                    url: 'http://localhost:8081/app/random'
                    }).then((response)=>{
                              //console.log(response.data)
                              
                              for(let i=0;i<response.data['productsList'].length;i++)
                              {
                                let tempsrc = response.data['productsList'][i]['image'].split(",")
                                let temp = {
                                  alt: 'example',
                                  src: tempsrc[0],
                                  title: response.data['productsList'][i]['product_name'],
                                  description: response.data['productsList'][i]['description']
                                  
                                }
                                items.push(temp)
                                console.log(items)
                              }
                              this.setState({
                                data: items
                              })
                           }).catch((error) => {
                              console.log(error.response);
                          });
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
          {this.state.data.map((item) => (
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
