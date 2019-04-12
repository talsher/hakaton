import SupplierData from "../../assets/data.json";
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import MoneyIcon from "@material-ui/icons/AttachMoney";
import ShareIcon from "@material-ui/icons/Share";
import { Input } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import SubmitIcon from "@material-ui/icons/LocalShipping";

const styles = theme => ({
  card: {
    position: "relative",
    width: 300,
    height: 330,
    float: "left",
    marginRight: 12,
    marginTop: 12
  },
  media: {
    flex: 1,
    resizeMode: "contain",
    ...StyleSheet.absoluteFillObject,
    height: 140
  },
  text_icons: {
    fontSize: "20px"
  },
  card_action_bottom: {
    position: "absolute",
    bottom: 0
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

class SupplierProductsCard extends React.Component {
  state = { products: [] };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    fetch(
      "http://34.222.158.120:4000/supplier/products?supplier_name=" +
        this.props.supplier_name
    )
      .then(response => response.json())
      .then(resData => {
        console.log(resData);
        this.setState({
          products: resData.map((data, index) => {
            let new_data = data;
            new_data.count = 0;
            new_data.added = false;
            return new_data;
          })
        }); //this is an asynchronous function
      });
  }

  handleChange = (event, key) => {
    let { products } = this.state;
    products[key].count = event.target.value;
    this.setState({ products: products });
  };

  handleClick = (event, key) => {
    let { products } = this.state;
    products[key].added = !products[key].added;
    this.setState({ products: products });
  };

  addButtonText = index => {
    if (!this.state.products[index].added) return <span>Add</span>;
    else return <span>Remove</span>;
  };

  showCount = index => {
    if (this.state.products[index].added)
      return (
        <Input
          type="number"
          key={"count_" + index}
          value={this.state.products[index].count}
          onChange={event => this.handleChange(event, index)}
        />
      );
    else return <span />;
  };

  handleSubmit = () => {
    console.log("why im here");
    let products = this.state.products
      .filter(product => product.added)
      .map((product, index) => {
        return {
          prd_name: product.prd_name,
          count: product.count
        };
      });
    let request = {
      item: {
        customer_name: "raed",
        supplier_name: this.props.supplier_name,
        status: "new",
        products: products,
        total_cost: this.state.products.reduce(
          (prev, curr) => prev + parseInt(curr.prd_price),
          0
        )
      }
    };

    console.log(request);

    fetch("http://34.222.158.120:4000/insert/order/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request)
    }).then(response => {
      alert("entered successfully");
      this.props.moveToOrdersPage();
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.state.products.map((data, index) => {
          return (
            <div key={"dev" + index}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={"http://34.222.158.120:80/imgs/" + data.prd_img}
                    // image={require({data.img_src})}
                    title="Supplier"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {data.prd_name}
                    </Typography>
                    <Typography component="p">{data.prd_details}</Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions className={classes.card_action_bottom}>
                  <Button
                    key={index}
                    size="small"
                    color="primary"
                    onClick={event => this.handleClick(event, index)}
                  >
                    {this.addButtonText(index)}
                  </Button>

                  {this.showCount(index)}

                  <IconButton className={classes.text_icons} aria-label="Rate">
                    <p>{data.prd_price}</p>
                    <MoneyIcon />
                  </IconButton>
                </CardActions>
              </Card>

              <Fab
                variant="extended"
                color="primary"
                size="large"
                style={{ position: "fixed", bottom: 40, right: 40 }}
                className={classes.extendedIcon}
                onClick={() => this.handleSubmit()}
              >
                <SubmitIcon className={classes.extendedIcon} />
                Submit
              </Fab>
            </div>
          );
        })}
      </div>
    );
  }
}

export default withStyles(styles)(SupplierProductsCard);
