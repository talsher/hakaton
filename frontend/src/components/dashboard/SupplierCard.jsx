import SupplierData from '../../assets/data.json'
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import IconStar from '@material-ui/icons/StarRate';
import ShareIcon from '@material-ui/icons/Share';

const styles = {
  card: {
    minWidth: 300,
    float: "left",
    marginRight: 12
  },
  media: {
    height: 140,
  },
  text_icons:{
    fontSize: "20px",
  }
};

class SupplierCard extends React.Component{

    constructor(props){
        super(props);
        this.suppliers = [
            {
                "supplier_name": "Supplier1",
                "details": "Text go here",
                "rate": 4,
                "precentege": '15',
                "img_src": "../../assets/logo.jpeg"
            },
            {
                "supplier_name": "Supplier2",
                "details": "Text go here",
                "rate": 5,
                "precentege": '10',
                "img_src": "../../assets/logo.jpeg"
            },
            {
                "supplier_name": "Supplier3",
                "details": "Text go here",
                "rate": 2,
                "precentege": '20',
                "img_src": "../../assets/logo.jpeg"
            },
            {
                "supplier_name": "Supplier4",
                "details": "Text go here",
                "rate": 5,
                "precentege": '7',
                "img_src": "../../assets/logo.jpeg"
            }
        ]
    }

    
    render(){
        const { classes } = this.props;
        return(
    <div>
        {this.suppliers.map((data, index) => {
            return <div> 
                <Card className={classes.card}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={require("../../assets/logo.jpeg")}
                            // image={require({data.img_src})}
                            title="Supplier" />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {data.supplier_name}
                        </Typography>
                        <Typography component="p">
                            {data.details}
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                        Order
                        </Button>
                        <Button size="small" color="primary">
                        View
                        </Button>
                        <IconButton className={classes.text_icons} 
                            aria-label="Rate"
                            >
                            <text >{data.rate}</text><IconStar />
                        </IconButton>
                        <IconButton className={classes.text_icons} 
                        aria-label="Share">
                        <text class>{data.precentege}</text><ShareIcon />
                        </IconButton>
                    </CardActions>
                </Card>
            </div> 
        })}
    </div>
        )    
    }
    
}

export default withStyles(styles)(SupplierCard);