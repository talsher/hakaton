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
import Icon from '@material-ui/core/Icon';
import MoneyIcon from "@material-ui/icons/AttachMoney";
import ShareIcon from "@material-ui/icons/Share";

const styles = {
  card: {
    position: "relative",
    width: 200,
    height: 330,
    float: "left",
    marginRight: 12,
    marginTop: 12
  },
  media: {
    flex: 1,
    resizeMode: 'contain',
    ...StyleSheet.absoluteFillObject,
    height: 140
  },
  text_icons: {
    fontSize: "20px"
  },
  card_action_bottom: {
    position: "absolute",
    bottom: 0
  }
};

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
        this.setState({ products: resData }); //this is an asynchronous function
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.state.products.map((data, index) => {
          return (
            <div key={index}>
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
                  <Button size="small" color="primary">
                    Add
                  </Button>
                  <IconButton className={classes.text_icons} aria-label="Rate">
                    <p>{data.prd_price}</p>
                    <MoneyIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </div>
          );
        })}
      </div>
    );
  }
}

export default withStyles(styles)(SupplierProductsCard);
