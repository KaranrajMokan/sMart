import { Component } from "react";
import { Row, Col, Select, Card, Modal, InputNumber, message } from "antd";
import axios from "axios";

const { Option } = Select;
let items = [];
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      modalVisibility: false,
      modalData: {},
      quantity: 1,
    };
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.onNumberChange = this.onNumberChange.bind(this);
  }

  handleCategoryChange(value) {
    console.log(value);
  }

  handleClick(item) {
    this.setState({
      modalVisibility: true,
      modalData: item,
    });
  }

  addToCart() {
    const modalData = this.state.modalData;
    const tempData = {
      product_name: modalData.title,
      retail_price: modalData.retail_price,
      discount_price: modalData.discount_price,
      image: modalData.src,
      rating: modalData.rating,
      quantity: this.state.quantity,
    };

    axios
      .request({
        method: "post",
        url: "http://localhost:8083/app/cart",
        params: {
          username: localStorage.getItem("username"),
          products: tempData,
        },
      })
      .then((response) => {
        if (response.data["Updation"] === true)
          message.success("Successfully added to cart");
        else message.error("Error in Cart Updation");
      })
      .catch((error) => {
        console.log(error.response);
      });

    this.setState({ modalVisibility: false, modalData: [], quantity: 1 });
  }

  onNumberChange(value) {
    this.setState({ quantity: value });
  }

  componentDidMount() {
    axios
      .request({
        method: "get",
        url: "http://localhost:8081/app/random",
      })
      .then((response) => {
        for (let i = 0; i < response.data["productsList"].length; i++) {
          let tempsrc = response.data["productsList"][i]["image"].split(",");
          let temp = {
            alt: response.data["productsList"][i]["product_name"],
            src: tempsrc[0],
            title: response.data["productsList"][i]["product_name"],
            description: response.data["productsList"][i]["description"],
            discount_price:
              response.data["productsList"][i]["discounted_price"],
            retail_price: response.data["productsList"][i]["retail_price"],
            rating: response.data["productsList"][i]["product_rating"],
          };
          items.push(temp);
        }
        this.setState({
          data: items,
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  categories = [
    "Action Figures",
    "Appliance Covers",
    "Aprons",
    "Backpacks",
    "Badminton",
    "Beauty Accessories",
    "Bedroom Furniture",
    "Beds",
    "Boards",
    "Briefs",
    "Car Electronics & Accessories",
    "Casual",
    "Ceiling Lights",
    "Churidars",
    "Computers",
    "Conditioners",
    "Cricket",
    "Cutlery",
    "Decorations",
    "Deodorants",
    "Ethnic Wear",
    "Facial KitsFirst Aid",
    "Football",
    "Footwear",
    "Fountain Pens",
    "Fragrances",
    "Frames",
    "Frocks",
    "Gloves",
    "Hats",
    "Helmets",
    "Herbs",
    "Incense Sticks",
    "Jackets",
    "Jeans",
    "Jugs & Pitchers",
    "Kitchen Scissors",
    "Kurta",
    "Kurtas & Kurtis",
    "Laptop Accessories",
    "Laundry",
    "Lehengas",
    "Makeup Kits",
    "Masks",
    "Mats",
    "Mattresses",
    "Medicines & Treatment",
    "Men's Clothing",
    "Night Lamps",
    "Perfumes",
    "Plants",
    "Riding Gear",
    "Sandals",
    "Scarfs",
    "Sherwanis",
    "Shirt",
    "Sippers",
    "Skirts",
    "Soaps",
    "Socks",
    "Soft Toys",
    "Sports & Fitness",
    "Sports Jackets",
    "Sprays",
    "Stockings",
    "Storage",
    "Suitcases",
    "T-Shirts",
    "Ties",
    "Tops",
    "Towels",
    "Trimmers",
    "Tyres & Tube",
    "Utensils",
    "Vests",
    "Wallets",
    "Watches",
    "Wires",
    "Women's Clothing",
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
                style={{ width: 300 }}
                cover={<img alt={item.alt} src={item.src} />}
                onClick={() => this.handleClick(item)}
              >
                <h1>{item.title}</h1>
                <div
                  style={{ flexDirection: "row", flex: 1, flexWrap: "wrap" }}
                >
                  <h3
                    style={{
                      textDecorationLine: "line-through",
                      color: "red",
                    }}
                  >
                    &#8377;{item.retail_price}
                  </h3>
                  <h2 style={{ textDecorationStyle: "solid" }}>
                    &#8377;{item.discount_price}
                  </h2>
                </div>
              </Card>
            </Col>
          ))}
          <Modal
            title={<b>{this.state.modalData?.title}</b>}
            centered
            visible={this.state.modalVisibility}
            onOk={this.addToCart}
            onCancel={() => this.setState({ modalVisibility: false })}
            okText="Add to Cart"
            cancelText="Cancel"
            width={650}
          >
            <h3>Product Description:</h3>
            <p>{this.state.modalData?.description}</p>
            <h3>Product Rating: {this.state.modalData?.rating}</h3>
            <h3>Retail Price: {this.state.modalData?.retail_price}</h3>
            <h3>Discount Price: {this.state.modalData?.discount_price}</h3>
            <h3>
              Quantity: &nbsp;&nbsp;
              <InputNumber
                min={1}
                max={10}
                defaultValue={1}
                onChange={this.onNumberChange}
                value={this.state.quantity}
              />
            </h3>
          </Modal>
        </Row>
      </div>
    );
  }
}

export default Home;
