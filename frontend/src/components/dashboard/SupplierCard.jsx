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
import IconStar from "@material-ui/icons/StarRate";
import ShareIcon from "@material-ui/icons/Share";

const styles = {
  card: {
    position: "relative",
    width: 300,
    height: 400,
    float: "left",
    marginRight: 12,
    marginBottom: 12
  },
  media: {
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

class SupplierCard extends React.Component {
  state = { suppliers: [] };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    fetch("http://34.222.158.120:4000/get/suppliers")
      .then(response => response.json())
      .then(resData => {
        console.log(resData);
        this.setState({ suppliers: resData }); //this is an asynchronous function
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.state.suppliers.map((data, index) => {
          return (
            <div key={index}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    onClick={() => {
                      console.log("clicked!!!!!!!!");
                      this.props.moveToSupplier(data.supplier_name);
                    }}
                    className={classes.media}
                    image={"http://34.222.158.120:80/imgs/" + data.img_src}
                    // image={require({data.img_src})}
                    title="Supplier"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {data.supplier_name}
                    </Typography>
                    <Typography component="p">{data.details}</Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions className={classes.card_action_bottom}>
                  <Button size="small" color="primary">
                    Order
                  </Button>
                  <Button size="small" color="primary">
                    View
                  </Button>
                  <IconButton className={classes.text_icons} aria-label="Rate">
                    <p>{data.rate}</p>
                    <IconStar />
                  </IconButton>
                  <IconButton className={classes.text_icons} aria-label="Share">
                    <p>{data.precentege}</p>
                    <ShareIcon />
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

export default withStyles(styles)(SupplierCard);
